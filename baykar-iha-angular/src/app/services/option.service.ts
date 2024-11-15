import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiConstant } from "../constants/apiConstant";
import { ResponseModel } from "../models/request/responseModel";
import { ListResponseModel } from "../models/request/listResponseModel";
import { Question } from "../models/entities/question";
import { Option } from "../models/entities/option";

@Injectable({
  providedIn: "root",
})
export class OptionService {
  apiUrl = `${ApiConstant.root}/quiz/options/`;
  constructor(private httpClient: HttpClient) {}

  list(): Observable<ListResponseModel<Option>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<Question>>(fullUrl);
  }

  create(data: FormData): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.post<ResponseModel>(fullUrl, data);
  }
}
