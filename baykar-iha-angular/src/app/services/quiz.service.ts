import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiConstant } from "../constants/apiConstant";
import { ListResponseModel } from "../models/request/listResponseModel";
import { Quiz } from "../models/entities/quiz";
import { SingleResponseModel } from "../models/request/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  apiUrl = `${ApiConstant.root}/quiz/quizzes/`;
  constructor(private httpClient: HttpClient) {}

  list(): Observable<ListResponseModel<Quiz>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<Quiz>>(fullUrl);
  }

  retrieve(quizId: number): Observable<SingleResponseModel<Quiz>> {
    let fullUrl = `${this.apiUrl}${quizId}`;
    return this.httpClient.get<SingleResponseModel<Quiz>>(fullUrl);
  }
}
