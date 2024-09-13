import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { delay, map, Observable, of } from 'rxjs';
import {
  SnackBarService,
  SnackBarType,
} from '../../../shared/services/snack-bar.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { RoutingService } from '../../../shared/services/routing.service';
import { UserService } from '../../../shared/services/user.service';

import { auth } from '../models/auth.interface';
import { API } from '../../../shared/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: any;

  constructor(
    private apiService: ApiService,
    private snackBarService: SnackBarService,
    private localStorageService: LocalStorageService,
    private routingService: RoutingService,
    private userService: UserService
  ) {
    const user = this.localStorageService.getItem('USER_DATA');
    if (user) {
      this.currentUser = user;
    }
  }

  login(payload: auth.login.Request): Observable<auth.login.Response> {
    return this.apiService.post(API.AUTH.LOGIN, payload).pipe(
      map((res) => res as auth.login.Response),
      map((res: auth.login.Response) => {
        if (res.status) {
          this.processAuthResponse(res);
        }
        return res;
      })
    );
  }

  mockLogin(payload: auth.login.Request): Observable<auth.login.Response> {
    return of('').pipe(
      delay(1500),
      map((string) => {
        console.log('delay done', payload);
        return {
          status: true,
          message: 'success',
          data: {
            token: 'ACCESS_TOKEN',
            user: 'any',
          },
        } as auth.login.Response;
      }),
      map((res: auth.login.Response) => {
        if (res.status) {
          this.processAuthResponse(res);
        }
        return res;
      })
    );
  }

  register(payload: auth.register.Request): Observable<auth.register.Response> {
    return this.apiService.post(API.AUTH.REGISTER, payload).pipe(
      map((res) => res as auth.register.Response),
      map((res) => {
        if (res.status) {
          this.processAuthResponse(res);
        }
        return res;
      })
    );
  }

  logout(): void {
    // logout code
    this.localStorageService.clearAll();
    this.routingService.redirectToAuth();
  }

  registerWithGoogle(): void {
    // code
  }

  private processAuthResponse(
    res: auth.login.Response | auth.register.Response,
    message?: string
  ) {
    this.snackBarService.openSnackBar(
      message || res.message,
      '',
      res.status ? SnackBarType.SUCCESS : SnackBarType.ERROR
    );
    this.setUserInfo(res.data.user, res.data.token);
  }

  private setUserInfo(user: any, token: string): void {
    this.currentUser = user;
    this.userService.currentUser = user;
    this.localStorageService.setItem('USER_DATA', user);
    this.localStorageService.setItem('ACCESS_TOKEN', token);
    this.routingService.redirectToHome();
  }
}
