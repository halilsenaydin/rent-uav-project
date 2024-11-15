import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { QuestionService } from "../../../services/question.service";
import { AlertifyService } from "../../../services/alertify.service";

@Component({
  selector: "app-question",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup;
  alert: string = null;
  showAddOptionButton: boolean = false;

  questionTypes = [
    { value: "multiple_choice", label: "Çoktan Seçmeli" },
    { value: "classic", label: "Klasik" },
    { value: "true_false", label: "Doğru/Yanlış" },
    { value: "fill_in_the_blank", label: "Boşluk Doldurma" },
  ];

  questionLevels = [
    { value: "1", label: "Acemi" },
    { value: "2", label: "Deneyimli" },
    { value: "3", label: "Usta" },
    { value: "4", label: "Bilge" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.createQuestionForm();
  }

  get options() {
    return this.questionForm.get("options") as FormArray;
  }

  createQuestionForm(): FormGroup {
    return this.formBuilder.group({
      text: ["", Validators.required],
      type: ["", Validators.required],
      level: ["", Validators.required],
      image: [null],
      options: this.formBuilder.array([]),
    });
  }

  createOptionForm(): FormGroup {
    return this.formBuilder.group({
      text: ["", Validators.required],
      image: [null],
      isCorrect: [false],
    });
  }

  addOption(): void {
    this.options.push(this.createOptionForm());
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onQuestionImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.questionForm.patchValue({ image: file });
      this.questionForm.get("image")?.updateValueAndValidity();
    }
  }

  onOptionImageSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.options.at(index).patchValue({ image: file });
      this.options.at(index).get("optionImage")?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      return this.alertifyService.warning("Geçersiz Form");
    }

    const formData = new FormData();

    formData.append("text", this.questionForm.value.text);
    formData.append("type", this.questionForm.value.type);
    formData.append("level", this.questionForm.value.level);

    if (this.questionForm.value.image) {
      formData.append("image", this.questionForm.value.image);
    }

    formData.append("options", JSON.stringify(this.questionForm.value.options));

    this.questionService.create(formData).subscribe((response) => {
      if (response.success) {
        this.alertifyService.success(response.message);
      } else {
        this.alertifyService.error(response.message);
      }
    });
  }
}
