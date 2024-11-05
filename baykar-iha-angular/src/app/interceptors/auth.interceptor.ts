import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenModelDto } from '../models/dtos/tokenModelDto';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('token');
    let newRequest = request;

    if (accessToken) {
      newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error?.message === 'TokenExpiredError') {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              return this.authService.refreshToken(refreshToken).pipe(
                switchMap((response: TokenModelDto) => {
                  localStorage.setItem('token', response.access);
                  const clonedRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${response.access}`,
                    },
                  });
                  return next.handle(clonedRequest);
                }),
                catchError((err) => {
                  this.authService.logout();
                  return throwError(err);
                })
              );
            } else {
              this.authService.logout();
            }
          }
        }
        return throwError(error);
      })
    );
  }
}
