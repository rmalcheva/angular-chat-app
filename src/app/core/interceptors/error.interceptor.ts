import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from 'express';
import { catchError, of, throwError } from 'rxjs';
import { RoutesPaths } from '../../shared/models/routes';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const authService = inject(AuthService);
      if (error) {
        switch (error.status) {
          case 401:
            authService.clearSession();
            console.log(error.statusText);
            break;
          case 403:
            console.log(error.statusText);
            break;
          case 404:
            console.log(error.statusText);
            break;
          case 500:
            console.log(error.statusText);
            break;
          default:
            console.log('Something went wrong.Please try again later.');
        }
      }
      return throwError(() => error);
    })
  );
};
