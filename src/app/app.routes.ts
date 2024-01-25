import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { SecurityService } from './common/data-access';
import { authGuard, securityInterceptor, tokenGuard } from './common/utils';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NotFoundComponent } from './common/ui';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'house',
    pathMatch: 'full',
  },
  {
    path: 'house',
    canActivate: [authGuard],
    providers: [provideHttpClient(withInterceptors([securityInterceptor]))],
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
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
