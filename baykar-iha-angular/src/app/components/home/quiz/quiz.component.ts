import { Component, OnInit } from "@angular/core";
import { Quiz } from "../../../models/entities/quiz";
import { UserAnswer } from "../../../models/entities/userAnswer";
import { QuizService } from "../../../services/quiz.service";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { Question } from "../../../models/entities/question";
import { Option } from "../../../models/entities/option";
import { UserAnswerService } from "../../../services/user-answer.service";
import { AlertifyService } from "../../../services/alertify.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ApiConstant } from "../../../constants/apiConstant";

@Component({
  selector: "app-quiz",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./quiz.component.html",
  styleUrl: "./quiz.component.css",
})
export class QuizComponent implements OnInit {
  apiRoot: string = ApiConstant.root;
  quizId: number;
  quiz: Quiz;
  quizForm: FormGroup;
  readonly: boolean = false;

  constructor(
    private quizService: QuizService,
    private userAnswerService: UserAnswerService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get("id");
    this.retrieveQuiz(this.quizId);
  }

  initializeForm(): void {
    const group: { [key: string]: FormControl } = {};

    this.quiz.questions.forEach((question: Question, index: number) => {
      const controlName = "question" + index;

      if (
        question.type === "multiple_choice" ||
        question.type === "true_false"
      ) {
        const userAnswer = question.userAnswers && question.userAnswers[0];
        const value = userAnswer
          ? (userAnswer.selectedOption as Option)?.id
          : null;

        group[controlName] = new FormControl(value);
      } else if (
        question.type === "classic" ||
        question.type === "fill_in_the_blank"
      ) {
        const userAnswer = question.userAnswers && question.userAnswers[0];
        const value = userAnswer ? userAnswer.answerText : "";
        group[controlName] = new FormControl(value, []);
      }

      if (this.readonly) {
        group[controlName].disable();
      }
    });

    this.quizForm = this.formBuilder.group(group);
  }

  retrieveQuiz(quizId: number): void {
    this.quizService.retrieve(quizId).subscribe(
      (response) => {
        this.quiz = response.data;
        this.isReadonly();
        this.initializeForm();
      },
      (error) => {
        this.alertifyService.alert(
          "Quiz yüklenirken hata oluştu",
          error.error.message
        );
      }
    );
  }

  isAnswerCorrect(question: Question, option: Option): boolean {
    const userAnswer = question.userAnswers[0];
    return (
      userAnswer &&
      (userAnswer.selectedOption as Option)?.id === option.id &&
      option.isCorrect
    );
  }

  isAnswerIncorrect(question: Question, option: Option): boolean {
    const userAnswer = question.userAnswers[0];
    return (
      userAnswer &&
      (userAnswer.selectedOption as Option)?.id === option.id &&
      !option.isCorrect
    );
  }

  isCorrectAnswer(question: Question, option: Option) {
    let correctOption = question.options.find(
      (option) => option.isCorrect === true
    );
    return option.id === correctOption.id;
  }

  isReadonly() {
    for (let i = 0; i < this.quiz.questions.length; i++) {
      const question = this.quiz.questions[i];
      if (question.userAnswers?.length > 0) {
        this.readonly = true;
        break;
      }
    }
  }

  submitQuiz(): void {
    if (this.quizForm.valid) {
      const answers: UserAnswer[] = [];

      this.quiz.questions.forEach((question: Question, index: number) => {
        const control = this.quizForm.get("question" + index);
        let userAnswer: UserAnswer = { question: question.id };

        if (
          question.type === "multiple_choice" ||
          question.type === "true_false"
        ) {
          userAnswer.selectedOption = (question.options as Option[]).find(
            (option: Option) => option.id === control?.value.id
          ).id;
          userAnswer.answerText = null;
        } else if (
          question.type === "classic" ||
          question.type === "fill_in_the_blank"
        ) {
          userAnswer.answerText = control?.value;
          userAnswer.selectedOption = null;
        }

        answers.push(userAnswer);
      });

      this.userAnswerService.saveUserAnswers(answers).subscribe(
        (response) => {
          if (response.success) {
            this.alertifyService.success(response.message);
          } else {
            this.alertifyService.error(response.message);
          }
        },
        (error) => {
          this.alertifyService.alert(
            "Cevaplar gönderilirken hata oluştu",
            error.error.message
          );
        }
      );
    } else {
      this.alertifyService.warning("Form geçersiz");
    }
  }
}
