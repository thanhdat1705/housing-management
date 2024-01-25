import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { LocalStorageService, SecurityService } from '../data-access';

import { STORAGE_KEY } from './constants';

import { AuthInfo } from './interfaces';

export const securityInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const securityService = inject(SecurityService);

  const authInfo = localStorageService.getData<AuthInfo>(STORAGE_KEY.authInfo);

  if (!authInfo) {
    router.navigate(['/auth']);

    return throwError(null);
  }

  const { token } = authInfo;

  const modifiedReq = req.clone({
    withCredentials: true,
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq).pipe(
    catchError((response) => {
      if (response.status === 403) {
        securityService.handleRemoveToken();
        securityService.isAuthenticated.set(false);
        router.navigate(['/auth']);
      }

      return throwError(response);
    })
  );
};
