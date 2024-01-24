import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { STORAGE_KEY } from './constants';
import { LocalStorageService } from '../data-access';

export const tokenGuard: CanActivateFn = () => {
  const hasToken = inject(LocalStorageService).getData<{
    token: string;
    refreshToken: string;
  }>(STORAGE_KEY.authInfo)?.token;

  if (hasToken) {
    inject(Router).navigate(['/']);
    return false;
  }

  return true;
};
