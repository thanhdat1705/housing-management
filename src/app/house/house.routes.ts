import { Route } from '@angular/router';
import { HouseComponent } from './house.component';
import { authGuard } from '../common/utils';

export const routes: Route[] = [
  {
    path: '',
    component: HouseComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/house-model').then((r) => r.HouseModelComponent),
      },
      {
        path: 'detail/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./ui/house-form').then((r) => r.HouseFormComponent),
      },
      {
        path: 'create',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./ui/house-form').then((r) => r.HouseFormComponent),
      },
    ],
  },
];
