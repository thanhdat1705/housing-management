import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { SecurityService } from './common/data-access';
import { authGuard, tokenGuard } from './common/utils';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('././house/house.routes').then((r) => r.routes),
  },
  {
    path: 'auth',
    canActivate: [tokenGuard],
    loadComponent: () =>
      import('./authentication/authentication.component').then(
        (r) => r.AuthenticationComponent
      ),
  },
];
