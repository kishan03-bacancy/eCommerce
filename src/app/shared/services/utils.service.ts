import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  encode(value: any) {
    return btoa(encodeURIComponent(value));
  }

  decode(value: any) {
    try {
      return decodeURIComponent(atob(value));
    } catch (e) {
      return '';
    }
  }
}
