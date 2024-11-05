import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstant } from '../constants/apiConstant';
import { LoginDto } from '../models/dtos/loginDto';
import { TokenModelDto } from '../models/dtos/tokenModelDto';
import { SingleResponseModel } from '../models/request/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${ApiConstant.root}/users`;

  constructor(private httpClient: HttpClient) {}

  login(login: LoginDto): Observable<SingleResponseModel<TokenModelDto>> {
    let fullUrl = `${this.apiUrl}/login/`;
    return this.httpClient.post<SingleResponseModel<TokenModelDto>>(
      fullUrl,
      login
    );
  }

  refreshToken(refreshToken: string): Observable<TokenModelDto> {
    return this.httpClient.post<TokenModelDto>(`${this.apiUrl}/refresh/`, {
      refresh: refreshToken,
    });
  }

  isAuthenticated() {
    let token: string = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userName');
  }
}
