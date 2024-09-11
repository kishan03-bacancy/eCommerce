import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UtilsService } from './utils.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    private utilsService: UtilsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getItem(key: string, defaultValue: any = null) {
    if (!isPlatformBrowser(this.platformId)) {
      return defaultValue;
    }
    try {
      return window?.localStorage?.getItem(key)
        ? JSON.parse(
            this.utilsService.decode(window?.localStorage?.getItem(key))
          )
        : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage[key] = this.utilsService.encode(
        JSON.stringify(value)
      );
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      window?.localStorage?.removeItem(key);
    }
  }

  clearAll() {
    if (isPlatformBrowser(this.platformId)) {
      window?.localStorage?.clear();
    }
  }

  // push item in array locally
  pushItemInLocalStorageArray(key: string, obj: any, limit = 0) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    let data = this.getItem(key) ? this.getItem(key) : [];
    if (data.length) {
      const findExiting = data.find((o: any) => o.id === obj.id);
      if (!findExiting) {
        data.splice(0, 0, obj);
      }
    } else {
      data.splice(0, 0, obj);
    }
    // apply limit
    if (limit > 0 && data.length > limit) {
      data = data.slice(0, limit);
    }

    this.setItem(key, data);
  }
}
