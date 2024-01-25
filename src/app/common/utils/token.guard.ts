import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageService } from '../data-access';
import { STORAGE_KEY } from './constants';

export const tokenGuard: CanActivateFn = () => {
  const hasToken = inject(LocalStorageService).getData<{
    token: string;
    refreshToken: string;
  }>(STORAGE_KEY.authInfo);

  if (hasToken) {
    inject(Router).navigate(['/house']);
    return false;
  }

  return true;
};
