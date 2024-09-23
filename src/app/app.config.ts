import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ThemeService } from './shared/services/theme.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import { reducers } from './reducers/index';
import { UserService } from './shared/services/user.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Observable, take } from 'rxjs';
import { authTokenInterceptor } from './core/interceptors/auth-token.interceptor';

function initializeAppFactory(
  userService: UserService,
  localStorage: LocalStorageService,
  themeService: ThemeService
): () => any | Observable<any> {
  return () => {
    themeService.initTheme();
    if (localStorage.getItem('ACCESS_TOKEN')) {
      userService.getUserDetail();
      return userService.currentUser$.pipe(take(1));
    } else {
      return true;
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authTokenInterceptor])),
    provideStore(reducers),
    provideEffects(AppEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [UserService, LocalStorageService, ThemeService],
      multi: true,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
