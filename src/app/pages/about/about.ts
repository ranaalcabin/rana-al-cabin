import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { ThemeService } from '../../core/theme.service';
import { LanguageService } from '../../core/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface CompanyStat {
  value: string;
  label: string;
}

interface GlobalLocation {
  country: string;
  x: string;
  y: string;
}

interface GlobalStat {
  icon: string;
  value: string;
  label: string;
}

interface SocialLink {
  icon: string;
  url: string;
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  social: SocialLink[];
}

interface Certification {
  name: string;
  image: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  standalone: false
})
export class About implements OnInit, OnDestroy {
  gridItems = new Array(9); // Creates array of 9 items for the grid
  private destroy$ = new Subject<void>();
  currentLang: string = 'en';
  isLoading: boolean = true;

  // Company Statistics
  companyStats: CompanyStat[] = [
    { value: '15+', label: 'ABOUT.YEARS_EXPERIENCE' },
    { value: '2000+', label: 'ABOUT.PROJECTS_COMPLETED' },
    { value: '25+', label: 'ABOUT.COUNTRIES_SERVED' },
    { value: '100%', label: 'ABOUT.CLIENT_SATISFACTION' }
  ];

  // Global Locations with precise positioning
  globalLocations: GlobalLocation[] = [
    { country: 'KSA', x: '65%', y: '45%' },
    { country: 'UAE', x: '68%', y: '48%' },
    { country: 'Qatar', x: '66%', y: '46%' },
    { country: 'Kuwait', x: '64%', y: '44%' },
    { country: 'Oman', x: '69%', y: '50%' },
    { country: 'Bahrain', x: '66%', y: '47%' },
    { country: 'Egypt', x: '58%', y: '42%' },
    { country: 'Jordan', x: '59%', y: '41%' },
    { country: 'Lebanon', x: '58%', y: '40%' },
    { country: 'Syria', x: '58%', y: '39%' },
    { country: 'Iraq', x: '62%', y: '42%' },
    { country: 'India', x: '72%', y: '48%' },
    { country: 'Pakistan', x: '70%', y: '43%' },
    { country: 'Bangladesh', x: '74%', y: '47%' },
    { country: 'Afghanistan', x: '68%', y: '41%' }
  ];

  // Global Statistics
  globalStats: GlobalStat[] = [
    { icon: '🌎', value: '25+', label: 'ABOUT.COUNTRIES' },
    { icon: '🏢', value: '2000+', label: 'ABOUT.CLIENTS' },
    { icon: '🏗️', value: '5000+', label: 'ABOUT.CABINS_DELIVERED' },
    { icon: '👷', value: '150+', label: 'ABOUT.TEAM_MEMBERS' }
  ];

  // Team Members
  teamMembers: TeamMember[] = [
    {
      name: 'Rana Waqas',
      position: 'ABOUT.FOUNDER_CEO',
      bio: 'ABOUT.FOUNDER_BIO',
      image: 'assets/team/rana-waqas.jpg',
      social: [
        { icon: '📱', url: 'tel:+923104498417' },
        { icon: '📧', url: 'mailto:contact@ranaalcabin.com' }
      ]
    },
    {
      name: 'Rana Waqas',
      position: 'ABOUT.OPERATIONS_DIRECTOR',
      bio: 'ABOUT.OPERATIONS_BIO',
      image: 'assets/team/awais-ameer.jpg',
      social: [
        { icon: '💼', url: 'https://linkedin.com/in/awaisameer' },
        { icon: '📧', url: 'mailto:awais.ameer181@gmail.com' },
        { icon: '📱', url: 'tel:966503622842 ' }
      ]
    },
    {
      name: 'Azeem Tariq',
      position: 'ABOUT.DESIGN_HEAD',
      bio: 'ABOUT.DESIGN_BIO',
      image: 'assets/team/azeem-tariq.jpg',
      social: [
        { icon: '📱', url: 'tel:+923302166813' },
        { icon: '📧', url: 'mailto:design@ranaalcabin.com' }
      ]
    },
    {
      name: 'Ahmed',
      position: 'ABOUT.QUALITY_MANAGER',
      bio: 'ABOUT.QUALITY_BIO',
      image: 'assets/team/ahmed.jpg',
      social: [
        { icon: '📧', url: 'mailto:quality@ranaalcabin.com' },
        { icon: '📱', url: 'tel:+966501234570' }
      ]
    },
    {
      name: 'Fatima',
      position: 'ABOUT.PROJECT_MANAGER',
      bio: 'ABOUT.PROJECT_BIO',
      image: 'assets/team/fatima.jpg',
      social: [
        { icon: '📧', url: 'mailto:projects@ranaalcabin.com' },
        { icon: '📱', url: 'tel:+966501234571' }
      ]
    },
    {
      name: 'Khalid',
      position: 'ABOUT.TECHNICAL_DIRECTOR',
      bio: 'ABOUT.TECHNICAL_BIO',
      image: 'assets/team/khalid.jpg',
      social: [
        { icon: '📧', url: 'mailto:technical@ranaalcabin.com' },
        { icon: '📱', url: 'tel:+966501234572' }
      ]
    },
    {
      name: 'Al-Ghamdi',
      position: 'ABOUT.TEAM_MEMBER4_ROLE',
      bio: 'ABOUT.TEAM_MEMBER4_BIO',
      image: 'assets/team/al-ghamdi.jpg',
      social: [
        { icon: '📧', url: 'mailto:clientrelations@ranaalcabin.com' },
        { icon: '📱', url: 'tel:+966501234573' }
      ]
    }
  ];

  // Certifications
  certifications: Certification[] = [
    { name: 'ABOUT.ISO_9001_CERT', image: 'assets/certifications/iso-9001.png' },
    { name: 'ABOUT.ISO_14001_CERT', image: 'assets/certifications/iso-14001.png' },
    { name: 'ABOUT.SASO_APPROVED', image: 'assets/certifications/saso.png' },
    { name: 'ABOUT.GCC_STANDARDS', image: 'assets/certifications/gcc.png' },
    { name: 'ABOUT.SAFETY_CERT', image: 'assets/certifications/safety.png' },
    { name: 'ABOUT.GREEN_BUILDING', image: 'assets/certifications/green-building.png' },
    { name: 'ABOUT.CE_MARKING', image: 'assets/certifications/ce-marking.png' },
    { name: 'ABOUT.FIRE_SAFETY', image: 'assets/certifications/fire-safety.png' }
  ];

  constructor(
    private seoService: SeoService,
    public themeService: ThemeService,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
    this.setupLanguageSubscription();
    // this.setupSEO();

    // Simulate loading delay for smooth animation
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeComponent(): void {
    // Initialize current language
    this.currentLang = this.languageService.getCurrentLanguage();
    this.translate.use(this.currentLang);
  }

  private setupLanguageSubscription(): void {
    this.languageService.currentLang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
        this.translate.use(lang);
        // this.updateSEOForLanguage(lang);
      });
  }

  // private setupSEO(): void {
  //   this.seoService.updateMetaTags('about');
  //   this.updateSEOForLanguage(this.currentLang);
  // }

  // private updateSEOForLanguage(lang: string): void {
  //   // Update SEO meta tags based on current language
  //   this.translate.get([
  //     'ABOUT.META_TITLE',
  //     'ABOUT.META_DESCRIPTION',
  //     'ABOUT.META_KEYWORDS'
  //   ]).subscribe(translations => {
  //     this.seoService.updateTitle(translations['ABOUT.META_TITLE']);
  //     this.seoService.updateMetaTag('description', translations['ABOUT.META_DESCRIPTION']);
  //     this.seoService.updateMetaTag('keywords', translations['ABOUT.META_KEYWORDS']);
  //   });
  // }

  // Utility methods for template interactions
  onLocationMarkerClick(location: GlobalLocation): void {
    console.log(`Location clicked: ${location.country}`);
    // Add any additional functionality for location interaction
  }

  onTeamMemberClick(member: TeamMember): void {
    console.log(`Team member clicked: ${member.name}`);
    // Add modal or detailed view functionality
  }

  onCertificationClick(cert: Certification): void {
    console.log(`Certification clicked: ${cert.name}`);
    // Add certification details modal
  }

  // Animation trigger methods
  onHeroAnimationComplete(): void {
    // Trigger subsequent animations
    this.isLoading = false;
  }

  // Scroll to section method
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Get current theme
  get isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'dark';
  }

  // Get text direction for RTL support
  get textDirection(): string {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  // Format phone number based on language
  formatPhoneNumber(phone: string): string {
    return this.currentLang === 'ar' ? phone.replace('+966', '٠٥٦٦+').replace('+92', '٠٠٩٢+') : phone;
  }

  // Track by functions for *ngFor optimization
  trackByLocation(index: number, location: GlobalLocation): string {
    return location.country;
  }

  trackByTeamMember(index: number, member: TeamMember): string {
    return member.name;
  }

  trackByCertification(index: number, cert: Certification): string {
    return cert.name;
  }

  trackByStat(index: number, stat: CompanyStat | GlobalStat): string {
    return stat.label;
  }
}