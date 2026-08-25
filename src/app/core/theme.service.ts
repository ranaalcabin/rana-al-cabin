// src/app/core/theme/theme.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'preferred-theme';
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  themeChanged = this.themeSubject.asObservable(); // <-- keep this name same

  private _currentTheme: 'light' | 'dark' = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.themeKey);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        this._currentTheme = savedTheme;
      } else {
        this._currentTheme = 'light';
      }
      this.applyTheme(this._currentTheme);
    } else {
      this._currentTheme = 'light';
      this.themeSubject.next('light');
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem(this.themeKey, theme);
    this.themeSubject.next(theme);
  }

  setTheme(theme: 'light' | 'dark') {
    this._currentTheme = theme;
    this.applyTheme(theme);
  }

  toggleTheme() {
    const next = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this._currentTheme;
  }
}