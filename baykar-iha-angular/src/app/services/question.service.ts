import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiConstant } from "../constants/apiConstant";
import { ResponseModel } from "../models/request/responseModel";
import { ListResponseModel } from "../models/request/listResponseModel";
import { Question } from "../models/entities/question";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  apiUrl = `${ApiConstant.root}/quiz/questions/`;
  constructor(private httpClient: HttpClient) {}

  list(): Observable<ListResponseModel<Question>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<Question>>(fullUrl);
  }

  create(question: FormData): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.post<ResponseModel>(fullUrl, question);
  }
}
