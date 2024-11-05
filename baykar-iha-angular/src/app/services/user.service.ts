import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../constants/apiConstant';
import { User } from '../models/entities/user';
import { ListResponseModel } from '../models/request/listResponseModel';
import { SingleResponseModel } from '../models/request/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = `${ApiConstant.root}/users`;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<User>>(fullUrl);
  }

  getUser(userName: string): Observable<SingleResponseModel<User>> {
    let fullUrl = `${this.apiUrl}/${userName}`;
    return this.httpClient.get<SingleResponseModel<User>>(fullUrl);
  }

  getUserNameFromLocalStorage() {
    return localStorage.getItem('userName');
  }
}
