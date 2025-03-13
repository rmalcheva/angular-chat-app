import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from 'express';
import { catchError, of, throwError } from 'rxjs';
import { RoutesPaths } from '../../shared/models/routes';
import { AuthService } from '../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const authService = inject(AuthService);
      // const toastr = inject(ToastrService);
      if (error) {
        switch (error.status) {
          case 401:
            authService.clearSession();
            // toastr.error(error.statusText);
            break;
          case 403:
            // toastr.error(error.statusText);
            break;
          case 404:
            // toastr.error(error.statusText);
            break;
          case 500:
            // toastr.error(error.statusText);
            break;
          default:
            console.log('Something went wrong.Please try again later.');
        }
      }
      return throwError(() => error);
    })
  );
};
