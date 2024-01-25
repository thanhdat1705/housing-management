import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'house',
    pathMatch: 'full',
  },
  {
    path: 'house',
    loadComponent: () =>
      import('./house.component').then((r) => r.HouseComponent),
  },
];
