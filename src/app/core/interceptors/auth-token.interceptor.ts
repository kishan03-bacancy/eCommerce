import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { environment } from '../../../environments/environment';

import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const localStorage = inject(LocalStorageService);
  const serverUrl = request.url.includes(environment.ApiURL);
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (serverUrl && token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
};
