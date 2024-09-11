import { Routes } from '@angular/router';
import { dashboardGuard } from '../guards/dashboard.guard';
import { authGuard } from '../guards/auth.guard';

export const coreRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../features/auth/auth-wrapper/auth-wrapper.component').then(
        (feature) => feature.AuthWrapperComponent
      ),
    loadChildren: () =>
      import('../../features/auth/configs/auth.routes').then(
        (feature) => feature.routes
      ),
    canActivate: [dashboardGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../../features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
];
