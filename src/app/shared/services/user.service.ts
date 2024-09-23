import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, filter, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { API } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser = signal(null);
  private _currentUser$ = new BehaviorSubject<any>(null);

  readonly currentUser$ = this._currentUser$.asObservable().pipe(
    filter((user) => !!user),
    map((user) => user)
  );

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

  get currentUserValue$(): any {
    return this._currentUser$.getValue();
  }

  set currentUserValue$(value: any) {
    this._currentUser$.next(value);
  }

  getUserDetail() {
    this.apiService
      .get(API.USER.AUTH_USER)
      .pipe(
        map((user: any) => {
          if (!user) {
            user = this.localStorageService.getItem('USER_DATA');
          }
          this._currentUser.set(user);
          this._currentUser$.next(user);
          this.localStorageService.setItem('USER_DATA', user);
        })
      )
      .subscribe();
  }
}
