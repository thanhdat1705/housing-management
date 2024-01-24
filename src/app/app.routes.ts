import { Routes } from '@angular/router';
import { tokenGuard } from './common/utils/token.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./authentication/authentication.component').then(
        (r) => r.AuthenticationComponent
      ),
    canActivate: [tokenGuard],
  },
];
