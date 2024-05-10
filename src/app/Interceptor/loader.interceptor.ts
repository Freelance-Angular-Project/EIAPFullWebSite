import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize, tap, throwError } from 'rxjs';
import { LoaderProjectService } from '../Services/Loading/loader-project.service';

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const loaderService = inject(LoaderProjectService);
  loaderService.startLoading(); // Show spinner

  return next(request).pipe(
    // tap(
    //   (event) => {
    //     if (event instanceof HttpResponse) {
    //       loaderService.stopLoading();
    //     }
    //   },
    //   (error: HttpErrorResponse) => {
    //     loaderService.stopLoading();
    //     return throwError(error);
    //   }
    // ),
    finalize(() => {
      loaderService.stopLoading(); // Hide spinner
    })
  );
};
