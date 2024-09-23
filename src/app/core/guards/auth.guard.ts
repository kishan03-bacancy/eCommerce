import { PLATFORM_ID, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../shared/services/local-storage.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localStorage: LocalStorageService = inject(LocalStorageService);
  const platform = inject(PLATFORM_ID);

  // logic for routing...
  const token = localStorage.getItem('ACCESS_TOKEN', '');

  if (isPlatformBrowser(platform)) {
    if (!token) {
      return inject(Router).createUrlTree(['/auth/login']);
    }
  }

  return true;
};
