import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(authReq);
};