import { Component, Input } from "@angular/core";
import { Quiz } from "../../../../models/dtos/quiz";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-quizzes-table",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./quizzes-table.component.html",
  styleUrl: "./quizzes-table.component.css",
})
export class QuizzesTableComponent {
  @Input() data: Quiz[];
}
