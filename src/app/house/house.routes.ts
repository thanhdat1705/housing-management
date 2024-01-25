import { Route } from '@angular/router';
import { HouseComponent } from './house.component';

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
        loadComponent: () =>
          import('./house.component').then((r) => r.HouseComponent),
      },
    ],
  },
];
