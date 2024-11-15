import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Question } from "../../../models/entities/question";
import { QuestionService } from "../../../services/question.service";
import { OptionService } from "../../../services/option.service";
import { AlertifyService } from "../../../services/alertify.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-option",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./option.component.html",
  styleUrl: "./option.component.css",
})
export class OptionComponent {
  optionForm: FormGroup;
  questions: Question[] = [];
  selectedQuestionId: number;
  alert: string;

  constructor(
    private fb: FormBuilder,
    private optionService: OptionService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService
  ) {
    this.optionForm = this.fb.group({
      text: ["", Validators.required],
      image: [null],
      isCorrect: [false],
      question: ["", Validators.required],
    });

    this.listQuestions();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedQuestionId = +params.get("questionId");
      if (this.selectedQuestionId) {
        this.optionForm.patchValue({ question: this.selectedQuestionId });
      }
    });
  }

  listQuestions(): void {
    this.questionService.list().subscribe(
      (response) => {
        if (response.success) {
          this.questions = response.data;
        }
      },
      (error) => {
        this.alertifyService.error(error.error.message);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.optionForm.patchValue({
      image: file,
    });
  }

  onSubmit(): void {
    if (!this.optionForm.valid) {
      return this.alertifyService.warning("Geçersiz Form");
    }

    const formData = new FormData();
    formData.append("text", this.optionForm.value.text);
    if (this.optionForm.value.image) {
      formData.append("image", this.optionForm.value.image);
    }
    formData.append("isCorrect", this.optionForm.value.isCorrect.toString());
    formData.append("question", this.optionForm.value.question);

    this.optionService.create(formData).subscribe(
      (response) => {
        if (response.success) {
          return this.alertifyService.success(response.message);
        }
        return this.alertifyService.error(response.message);
      },
      (error) => {
        this.alertifyService.error(error.error.message);
      }
    );
  }
}
