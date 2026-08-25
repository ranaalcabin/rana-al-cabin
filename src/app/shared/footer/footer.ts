import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';
import { LanguageService } from '../../core/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: false,
})
export class Footer implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  emailAddress = '';
  isDarkTheme = false;
  currentLang: string = 'en';
  salesPhone$ = new BehaviorSubject<string>('');
  supportPhone$ = new BehaviorSubject<string>('');
  email$ = new BehaviorSubject<string>('');
  private langSubscription?: Subscription;
  private themeSubscription?: Subscription;

  constructor(
    private router:Router,
    private translate: TranslateService,
    private themeService: ThemeService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.setDefaultLang('en');
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = this.languageService.getCurrentLanguage();
      this.isDarkTheme = this.themeService.getCurrentTheme() === 'dark';
    }
  }


  onServiceClick(): void {
  // Add logic if needed, e.g., tracking clicks
  console.log('Footer service link clicked');
}
  ngOnInit() {
    // Initialize translations
    this.updateTranslations();
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.translate.use(lang);
      this.updateTranslations();
    });

    this.themeSubscription = this.themeService.themeChanged.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  private updateTranslations() {
    this.translate.get('FOOTER.SALES_PHONE').subscribe(value => this.salesPhone$.next(value));
    this.translate.get('FOOTER.SUPPORT_PHONE').subscribe(value => this.supportPhone$.next(value));
    this.translate.get('FOOTER.EMAIL_ADDRESS').subscribe(value => this.email$.next(value));
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  navigateTo(route: string) {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([route]);
  });
}


  onSubscribe() {
    if (this.emailAddress) {
      console.log('Subscribed email:', this.emailAddress);
      this.translate.get('FOOTER.SUBSCRIBE_SUCCESS').subscribe((message: string) => {
        alert(message);
      });
      this.emailAddress = '';
    }
  }
}