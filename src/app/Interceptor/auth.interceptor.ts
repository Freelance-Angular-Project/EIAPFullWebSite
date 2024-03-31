import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // If the token exists, clone the request to add the Authorization header.
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Pass the cloned request instead of the original request to the next handle
  return next(req);
};
