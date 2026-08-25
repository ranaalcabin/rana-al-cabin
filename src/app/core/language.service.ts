// src/app/core/language/language.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable(); // <-- match this

  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.setDefaultLang('en');
    const savedLang = this.isBrowser ? localStorage.getItem('lang') || 'en' : 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLangSubject.value;
  }
}