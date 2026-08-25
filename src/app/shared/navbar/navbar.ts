import { Component, OnInit, Inject, PLATFORM_ID, HostListener, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../core/language.service';
import { ThemeService } from '../../core/theme.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  standalone: false,
  styleUrls: ['./navbar.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translateX(100px)'
      })),
      transition('in => out', [
        animate('300ms ease-in-out')
      ]),
      transition('out => in', [
        animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ])
    ])
  ]
})
export class Navbar implements OnInit, OnDestroy {
  menuOpen = false;
  showFloatingControls = false;
  isDarkTheme = false;
  isServicesDropdownOpen = false;
  isTabletView = false;
  currentLang: string = 'en';
  private themeSubscription: Subscription | undefined;
  private langSubscription: Subscription | undefined;
  private scrollThreshold = 150; // Adjust this value to control when floating controls appear

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const shouldShow = offset > this.scrollThreshold;
      
      // Add slight delay to prevent flicker
      if (shouldShow !== this.showFloatingControls) {
        setTimeout(() => {
          this.showFloatingControls = shouldShow;
        }, 50);
      }
    }
  }

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.currentLang = this.languageService.getCurrentLanguage();
    }
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.getCurrentTheme() === 'dark';
    this.themeSubscription = this.themeService.themeChanged.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      if (event.target.innerWidth > 768 && this.menuOpen) {
        this.closeMenu();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown');
    if (!dropdown && this.isServicesDropdownOpen) {
      this.closeServicesDropdown();
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isTabletView = window.innerWidth >= 769 && window.innerWidth <= 1024;
    }
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    // Add haptic feedback for mobile
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    // Add haptic feedback for mobile
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.isServicesDropdownOpen = false;
    }
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('menu-open', this.menuOpen);
    }
  }

  closeMenu() {
    this.menuOpen = false;
    this.isServicesDropdownOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('menu-open');
    }
  }

  toggleServicesDropdown(event: Event) {
    event.stopPropagation();
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
  }

  closeServicesDropdown() {
    this.isServicesDropdownOpen = false;
  }

  onServiceClick() {
    this.closeMenu();
    this.closeServicesDropdown();
  }

  onDropdownClick(event: Event) {
    event.stopPropagation();
  }

  openWhatsApp() {
    const phoneNumber = '966503622842';
    const message = encodeURIComponent('Hello! I would like to know more about your services.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Add haptic feedback for mobile
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    window.open(url, '_blank');
  }

  // Method to manually show/hide floating controls (useful for testing)
  toggleFloatingControls() {
    this.showFloatingControls = !this.showFloatingControls;
  }
}