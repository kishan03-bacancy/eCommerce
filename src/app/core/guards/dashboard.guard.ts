import { inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../shared/services/local-storage.service';

export const dashboardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localStorage: LocalStorageService = inject(LocalStorageService);
  const platform = inject(PLATFORM_ID);

  const token = localStorage.getItem('ACCESS_TOKEN', '');
  if (isPlatformBrowser(platform)) {
    if (token) {
      console.log('token', token);
      return inject(Router).createUrlTree(['/dashboard']);
    }
  }

  return true;
};
