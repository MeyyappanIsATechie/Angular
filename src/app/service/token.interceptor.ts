import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token = ''; //generated token must be here
  let jwt = req.clone({
    setHeaders: {
      Authorization: `Bearer ${_token}`,
    },
  });
  return next(jwt);
};
