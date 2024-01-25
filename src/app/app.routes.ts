import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/ui';
import { tokenGuard } from './common/utils';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'house',
    pathMatch: 'full',
  },
  {
    path: 'house',
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
