import { Component } from "@angular/core";
import { QuizService } from "../../../services/quiz.service";
import { Quiz } from "../../../models/dtos/quiz";
import { CommonModule } from "@angular/common";
import { QuizzesTableComponent } from "../../stone/quiz/quizzes-table/quizzes-table.component";

@Component({
  selector: "app-quizzes",
  standalone: true,
  imports: [CommonModule, QuizzesTableComponent],
  templateUrl: "./quizzes.component.html",
  styleUrl: "./quizzes.component.css",
})
export class QuizzesComponent {
  constructor(private quizService: QuizService) {}

  alert: string = null;
  quizzes: Quiz[] = [];

  ngOnInit(): void {
    this.listQuizzes();
  }

  listQuizzes() {
    this.quizService.list().subscribe((response) => {
      if (response.success) {
        this.quizzes = response.data;
      }
    });
  }
}
