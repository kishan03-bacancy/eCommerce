import { Routes } from '@angular/router';
import { dashboardGuard } from '../guards/dashboard.guard';
import { authGuard } from '../guards/auth.guard';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'Dashboard | eCommerce',
        },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../../features/category/category.component').then(
            (m) => m.CategoryComponent
          ),
        data: {
          title: 'Categories | eCommerce',
        },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../../features/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        data: {
          title: 'Products | eCommerce',
        },
      },
      {
        path: 'products/:category',
        loadComponent: () =>
          import('../../features/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        data: {
          title: 'Products | eCommerce',
        },
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../../features/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        data: {
          title: 'Cart | eCommerce',
        },
      },
    ],
  },
  {
    path: 'auth',
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
];
