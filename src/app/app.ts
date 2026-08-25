import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/language.service';
import { ThemeService } from './core/theme.service';
import { SeoService } from './core/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone:false,
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  isTranslationsLoaded = true;
  title = 'rana-al-cabin-v1';

  constructor(
    public  seoService: SeoService,
    public  languageService: LanguageService,
    public  themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Set default SEO meta tags for 'home' page
    this.seoService.updateMetaTags('home');

    // Subscribe to language changes to update SEO dynamically if needed
    this.languageService.currentLang$.subscribe((lang: string) => {
      // You can customize which page's meta tags update based on language if needed
      this.seoService.updateMetaTags('home');
    });

    // Initialize theme from saved preference or default
    const currentTheme = this.themeService.getCurrentTheme();
    this.themeService.setTheme(currentTheme);
  }
}
// export class App implements OnInit {
//   isTranslationsLoaded = false;

//   constructor(
//     private translate: TranslateService,
//     public languageService: LanguageService,
//     private themeService: ThemeService,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.translate.setDefaultLang('en');
//   }

//   ngOnInit() {
//     if (isPlatformBrowser(this.platformId)) {
//       const savedLang = this.languageService.getCurrentLanguage() || 'en';
//       this.translate.use(savedLang).subscribe(() => {
//         this.languageService.setLanguage(savedLang);
//         this.isTranslationsLoaded = true;
//       });
//     } else {
//       this.translate.use('en').subscribe(() => {
//         this.isTranslationsLoaded = true;
//       });
//     }
//   }
// }