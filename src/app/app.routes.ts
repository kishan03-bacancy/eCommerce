import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/config/core.routes').then((feature) => feature.coreRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/page-not-found/page-not-found.component'
      ).then((feature) => feature.PageNotFoundComponent),
    data: {
      title: '404 | Page Not Found  | Sample',
    },
  },
];
