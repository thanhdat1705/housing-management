import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { LocalStorageService, SecurityService } from '../data-access';

import { STORAGE_KEY } from './constants';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthInfo } from './interfaces';

export const securityInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const securityService = inject(SecurityService);
  const ngxLoader = inject(NgxUiLoaderService);

  const token = localStorageService.getData<AuthInfo>(STORAGE_KEY.authInfo);

  if (!token) {
    // router.navigate(['/auth']);

    // return throwError(null);
  }

  const modifiedReq = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/vnd.api+json')
      .set('authentication', `${token}`),
  });

  return next(modifiedReq).pipe(
    catchError((response) => {
      if (response.status === 403) {
        securityService.handleRemoveToken();
        securityService.isAuthenticated.set(false);
        router.navigate(['/auth']);
      }

      ngxLoader.stop();
      return throwError(response);
    })
  );
};
