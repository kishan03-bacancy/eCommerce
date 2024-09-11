import { Inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeSignal = signal(false);
  themeId!: string;

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  toggleTheme(isThemeDark: boolean) {
    this.localStorageService.setItem(
      'THEME_ID',
      isThemeDark ? 'dark-theme' : 'light-theme'
    );
    this.applyTheme(isThemeDark);
    this.themeSignal.set(isThemeDark);
  }

  initTheme() {
    this.themeId = this.localStorageService.getItem('THEME_ID', '');
    this.applyTheme(this.themeId === 'dark-theme');
    this.themeSignal.set(this.themeId === 'dark-theme');
  }

  applyTheme(isDark: boolean) {
    if (isDark) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }
}
