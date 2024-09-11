import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, filter, map, single } from 'rxjs';
import { ThemeService } from './theme.service';
import { LocalStorageService } from './local-storage.service';
import { API } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser = signal(null);

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {}

  get currentUser(): any {
    return this._currentUser();
  }

  set currentUser(value: any) {
    this._currentUser.set(value);
  }

  getUserDetail() {
    this.apiService
      .get(API.USER.GET_DETAIL)
      .pipe(
        map((res) => res?.data?.user),
        map((user: any) => {
          if (!user) {
            user = this.localStorageService.getItem('USER_DATA');
          }
          this._currentUser.set(user);
          this.localStorageService.setItem('USER_DATA', user);
        })
      )
      .subscribe();
  }
}
