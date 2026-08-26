import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/seo.service';
import { ThemeService } from '../../core/theme.service';
import { LanguageService } from '../../core/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: false,
})
export class Home implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  selectedCabin: any = null;
  currentLang: string = 'en';
  cabins: any[] = [];
  private routerSubscription?: Subscription;

  testimonials: any[] = [];
  isModalOpen: boolean = false;
  private langSubscription?: Subscription;
  private visibilityChangeHandler?: () => void;
  private videoLoadedHandler?: () => void;
  isVideoReady = false;

  constructor(
    private seoService: SeoService,
    public themeService: ThemeService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = this.languageService.getCurrentLanguage();
    }
  }

  ngOnInit() {
    this.seoService.updateMetaTags('home');
    this.initTranslations();
    this.initAnimations();
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.initTranslations();
    });
    this.routerSubscription = this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) {
    this.closeModal(); // <-- Close modal when navigating
  }
});

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.videoPlayer) {
      // Defer video loading to after page paint
      setTimeout(() => {
        this.initializeVideo();
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
  this.routerSubscription.unsubscribe();
}

    
    if (isPlatformBrowser(this.platformId)) {
      if (this.visibilityChangeHandler) {
        document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
      }
      if (this.videoPlayer && this.videoLoadedHandler) {
        this.videoPlayer.nativeElement.removeEventListener('loadeddata', this.videoLoadedHandler);
      }
    }
    
  }

  private initializeVideo(): void {
    const video = this.videoPlayer.nativeElement;
    
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    
    this.videoLoadedHandler = () => {
      this.isVideoReady = true;
      this.tryPlayVideo(video);
    };
    
    video.addEventListener('loadeddata', this.videoLoadedHandler);
    
    this.visibilityChangeHandler = () => {
      if (!document.hidden && this.isVideoReady) {
        setTimeout(() => {
          this.tryPlayVideo(video);
        }, 100);
      }
    };
    
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    
    video.addEventListener('error', (e) => {
      console.error('Video playback error:', e);
    });
    
    video.addEventListener('pause', () => {
      if (!document.hidden && this.isVideoReady) {
        setTimeout(() => {
          this.tryPlayVideo(video);
        }, 100);
      }
    });
    
    if (video.readyState >= 2) {
      this.isVideoReady = true;
      this.tryPlayVideo(video);
    }
  }

  private tryPlayVideo(video: HTMLVideoElement): void {
    if (!video || video.paused === false) return;
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video playing successfully');
        })
        .catch((error) => {
          console.warn('Video autoplay failed:', error);
          setTimeout(() => {
            if (video.paused && !document.hidden) {
              video.play().catch(() => {
                console.warn('Second video play attempt failed');
              });
            }
          }, 1000);
        });
    }
  }

  private initTranslations() {
    const cabinsBase = [
      {
        id: 'executive_office',
        image: 'assets/luxury-accommodation.jpg',
        size: 'SIZE_6X3',
        price: 'PRICE_45000',
        specs: [
          { name: 'dimensions', value: 'DIM_6X3X2_8', icon: '📏' },
          { name: 'material', value: 'AEROSPACE_ALUMINUM', icon: '🛠️' },
          { name: 'insulation', value: 'THERMAL_ACOUSTIC', icon: '🔇' },
          { name: 'warranty', value: 'FIVE_YEARS', icon: '🛡️' },
        ],
      },
      {
        id: 'luxury_accommodation',
        image: 'assets/executive-office.jpg',
        size: 'SIZE_7X4',
        price: 'PRICE_65000',
        specs: [
          { name: 'dimensions', value: 'DIM_7X4X3', icon: '📏' },
          { name: 'material', value: 'MARINE_GRADE_COMPOSITE', icon: '🛠️' },
          { name: 'features', value: 'SMART_CLIMATE_CONTROL', icon: '🌡️' },
          { name: 'warranty', value: 'SEVEN_YEARS', icon: '🛡️' },
        ],
      },
      {
        id: 'vip_event',
        image: 'assets/vip-event.jpg',
        size: 'SIZE_8X5',
        price: 'PRICE_85000',
        specs: [
          { name: 'dimensions', value: 'DIM_8X5X3_2', icon: '📏' },
          { name: 'material', value: 'PREMIUM_STEEL_FRAME', icon: '🛠️' },
          { name: 'capacity', value: '20_25_PEOPLE', icon: '👥' },
          { name: 'warranty', value: 'TEN_YEARS', icon: '🛡️' },
        ],
      }
    ];

    const testimonialsBase = [
      {
        id: 'ahmed_al_rashid',
        position: 'CEO_CONSTRUCTION',
        image: 'assets/client-1.jpg',
      },
      {
        id: 'fatima_al_mansour',
        position: 'DIRECTOR_EVENTS',
        image: 'assets/client-2.jpg',
      },
      {
        id: 'khalid_al_farsi',
        position: 'PROJECT_MANAGER',
        image: 'assets/client-3.jpg',
      },
    ];

    const featuresBase = [
      {
        id: 'premium_materials',
        image: 'assets/hero-cabin6.png',
        translationKey: 'FEATURES.PREMIUM_MATERIALS',
        descriptionKey: 'FEATURES.PREMIUM_MATERIALS_DESC'
      },
      {
        id: 'bespoke_design',
        image: 'assets/hero-cabin5.png',
        translationKey: 'FEATURES.BESPOKE_DESIGN',
        descriptionKey: 'FEATURES.BESPOKE_DESIGN_DESC'
      },
      {
        id: 'smart_tech',
        image: 'assets/hero-cabin4.png',
        translationKey: 'FEATURES.SMART_TECH',
        descriptionKey: 'FEATURES.SMART_TECH_DESC'
      }
    ];

    this.translate.get([
      ...cabinsBase.map(cabin => `PRODUCTS.${cabin.id.toUpperCase()}`),
      ...cabinsBase.map(cabin => `SIZES.${cabin.size}`),
      ...cabinsBase.map(cabin => `PRICES.${cabin.price}`),
      ...cabinsBase.flatMap(cabin => cabin.specs.map(spec => `SPECS.${spec.name.toUpperCase()}`)),
      ...cabinsBase.flatMap(cabin => cabin.specs.map(spec =>
        spec.name === 'dimensions' ? `DIMENSIONS.${spec.value}` :
        spec.name === 'material' ? `MATERIALS.${spec.value}` :
        spec.name === 'insulation' ? `MATERIALS.${spec.value}` :
        spec.name === 'warranty' ? `WARRANTY.${spec.value}` :
        spec.name === 'capacity' ? `CAPACITIES.${spec.value}` :
        spec.name === 'features' ? `FEATURES.${spec.value}` : spec.value
      )),
      ...testimonialsBase.map(testimonial => `TESTIMONIALS.${testimonial.id.toUpperCase()}.NAME`),
      ...testimonialsBase.map(testimonial => `TESTIMONIALS.${testimonial.id.toUpperCase()}.QUOTE`),
      ...testimonialsBase.map(testimonial => `POSITIONS.${testimonial.position}`),
      ...featuresBase.map(feature => feature.translationKey),
      ...featuresBase.map(feature => feature.descriptionKey)
    ]).subscribe(translations => {
      this.cabins = cabinsBase.map(cabin => ({
        ...cabin,
        name: translations[`PRODUCTS.${cabin.id.toUpperCase()}`],
        size: translations[`SIZES.${cabin.size}`],
        price: translations[`PRICES.${cabin.price}`],
        specs: cabin.specs.map((spec: any) => ({
          ...spec,
          name: translations[`SPECS.${spec.name.toUpperCase()}`],
          value: translations[
            spec.name === 'dimensions' ? `DIMENSIONS.${spec.value}` :
            spec.name === 'material' ? `MATERIALS.${spec.value}` :
            spec.name === 'insulation' ? `MATERIALS.${spec.value}` :
            spec.name === 'warranty' ? `WARRANTY.${spec.value}` :
            spec.name === 'capacity' ? `CAPACITIES.${spec.value}` :
            spec.name === 'features' ? `FEATURES.${spec.value}` : spec.value
          ],
        })),
        type: 'cabin'
      }));

      this.testimonials = testimonialsBase.map(testimonial => ({
        ...testimonial,
        name: translations[`TESTIMONIALS.${testimonial.id.toUpperCase()}.NAME`],
        position: translations[`POSITIONS.${testimonial.position}`],
        quote: translations[`TESTIMONIALS.${testimonial.id.toUpperCase()}.QUOTE`],
      }));

      this.features = featuresBase.map(feature => ({
        ...feature,
        name: translations[feature.translationKey],
        description: translations[feature.descriptionKey],
        type: 'feature'
      }));
    });
  }

  private initAnimations() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .cabin-card');
        elements.forEach((el, index) => {
          setTimeout(() => el.classList.add('animate-in'), index * 100);
        });
      }, 100);
    }
  }

  features: any[] = [];

  openFeatureModal(featureId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const feature = this.features.find(f => f.id === featureId);
      if (feature) {
        this.selectedCabin = feature;
        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
      }
    }
  }

  openModal(cabin: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCabin = cabin;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCabin = null;
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
    }
  }
}