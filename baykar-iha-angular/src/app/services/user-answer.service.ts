import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiConstant } from "../constants/apiConstant";
import { UserAnswer } from "../models/entities/userAnswer";
import { ResponseModel } from "../models/request/responseModel";

@Injectable({
  providedIn: "root",
})
export class UserAnswerService {
  apiUrl = `${ApiConstant.root}/quiz/user-answers/`;
  constructor(private httpClient: HttpClient) {}

  saveUserAnswers(answers: UserAnswer[]): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.post<ResponseModel>(fullUrl, answers);
  }
}
