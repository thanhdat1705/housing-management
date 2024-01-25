import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageService, SecurityService } from '../data-access';
import { STORAGE_KEY } from './constants';

export const authGuard: CanActivateFn = () => {
  if (!inject(SecurityService).isAuthenticated()) {
    inject(LocalStorageService).removeData(STORAGE_KEY.authInfo);
    inject(Router).navigate(['/auth']);

    return false;
  }

  return true;
};
