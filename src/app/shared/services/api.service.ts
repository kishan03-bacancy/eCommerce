import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment';
import { SnackBarService, SnackBarType } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // vars
  private url = environment.ApiURL;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private _snackBarService: SnackBarService
  ) {}

  private handleErrors(
    error: HttpErrorResponse | any
  ): Observable<APIResponse> {
    let message = '';

    if (error instanceof HttpErrorResponse && !error.status) {
      // Handing Server Error with popup
    }

    if (error && error.error) {
      message = error.error.message ? error.error.message : error.error.errors;
    }
    if (error.status === 401) {
      this.localStorageService.clearAll();
    }
    if (message != '') {
      message = message?.trim();
    }

    if (error.status === 500) {
      message = 'Internal Server Error';
    }

    if (!message || message === '') {
      message = 'Something went wrong';
    }

    this._snackBarService.openSnackBar(message, '', SnackBarType.ERROR);
    return of({ status: false, message: 'error' });
  }

  get(
    path: string,
    queryParams: any = {},
    isDirectURL = false
  ): Observable<APIResponse> {
    path = path.charAt(0) !== '/' ? `/${path}` : path;
    const params = this.createQueryParams(queryParams);
    const url = isDirectURL ? path : this.url + path;
    const headers = this.getHeaders();
    return this.http.get(url, { params, headers }).pipe(
      map((res) => res as APIResponse),
      catchError((err) => this.handleErrors(err))
    );
  }

  post(
    path: string,
    body: any = {},
    queryParams: any = {}
  ): Observable<APIResponse> {
    const params = this.createQueryParams(queryParams);
    const headers = this.getHeaders();
    path = path.charAt(0) !== '/' ? `/${path}` : path;
    return this.http.post(this.url + path, body, { params, headers }).pipe(
      map((res) => res as APIResponse),
      catchError((err) => this.handleErrors(err))
    );
  }

  put(
    path: string,
    body: any = {},
    queryParams: any = {}
  ): Observable<APIResponse> {
    const params = this.createQueryParams(queryParams);
    const headers = this.getHeaders();
    path = path.charAt(0) !== '/' ? `/${path}` : path;
    return this.http.put(this.url + path, body, { params, headers }).pipe(
      map((res) => res as APIResponse),
      catchError((err) => this.handleErrors(err))
    );
  }

  patch(
    path: string,
    body: any = {},
    queryParams: any = {}
  ): Observable<APIResponse> {
    const params = this.createQueryParams(queryParams);
    const headers = this.getHeaders();
    path = path.charAt(0) !== '/' ? `/${path}` : path;
    return this.http.patch(this.url + path, body, { params, headers }).pipe(
      map((res) => res as APIResponse),
      catchError((err) => this.handleErrors(err))
    );
  }

  delete(path: string, queryParams: any = {}): Observable<APIResponse> {
    const params = this.createQueryParams(queryParams);
    const headers = this.getHeaders();
    path = path.charAt(0) !== '/' ? `/${path}` : path;
    return this.http.delete(this.url + path, { params, headers }).pipe(
      map((res) => res as APIResponse),
      catchError((err) => this.handleErrors(err))
    );
  }

  private createQueryParams(object: any = {}) {
    let params = new HttpParams();
    if (object && Object.keys(object).length) {
      for (const key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
          params = params.set(key, object[key]);
        }
      }
    }
    return params;
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'timezone',
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    return headers;
  }
}

export interface APIResponse {
  status: boolean;
  message: string;
  data?: any;
}
