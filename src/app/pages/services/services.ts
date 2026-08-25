import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { LanguageService } from '../../core/language.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-service',
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
  standalone: false,
})
export class Services implements OnInit, AfterViewInit {
  services: any[] = [];
  currentLanguage = 'en';
  isSidebarCollapsed = true;


  @ViewChildren('serviceSection', { read: ElementRef })
  sections!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    public themeService: ThemeService,
    private router: Router, 
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    
  ) {}
selectedImage: string | null = null;

// openModal(imageUrl: string): void {
//   this.selectedImage = imageUrl;
//   document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
// }
openModal(imageUrl: string): void {
  this.selectedImage = imageUrl;
  if (isPlatformBrowser(this.platformId)) {
    document.body.style.overflow = 'hidden';
  }
}

// closeModal(): void {
//   this.selectedImage = null;
//   document.body.style.overflow = ''; // Re-enable scrolling
// }
closeModal(): void {
  this.selectedImage = null;
  if (isPlatformBrowser(this.platformId)) {
    document.body.style.overflow = '';
  }
}
  ngOnInit(): void {
    this.initServices();
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.currentLang$.subscribe(
      (lang) => (this.currentLanguage = lang)
    );
  }

  ngAfterViewInit(): void {
  this.route.fragment.subscribe((fragment) => {
    if (fragment) {
      const target = document.getElementById(fragment);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }

      // ✨ Clear the fragment from the URL
      history.replaceState({}, document.title, this.router.url.split('#')[0]);
    }
  });
}


  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

scrollTo(event: Event, sectionId: string){
   event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  contactForService(serviceId: string): void {
    console.log('Contact requested for:', serviceId);
    this.router.navigate(['/quote'], { fragment: 'contact-form' });

  }
getThemeClass() {
  return this.themeService.getCurrentTheme() ? 'dark' : '';
}

  private initServices(): void {
 this.services = [
  {
    id: 'modular-workspaces',
    icon: 'fas fa-briefcase',
    title: 'SERVICES.MODULAR.TITLE',
    shortDescription: 'SERVICES.MODULAR.SHORT',
    fullDescription: 'SERVICES.MODULAR.FULL',
    image: 'assets/Services/Workspace/WorkspaceMain.jpg',
    features: [
      'SERVICES.MODULAR.FEATURE_1',
      'SERVICES.MODULAR.FEATURE_2',
      'SERVICES.MODULAR.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.MODULAR.SPEC_1_LABEL', value: 'SERVICES.MODULAR.SPEC_1_VALUE' },
      { label: 'SERVICES.MODULAR.SPEC_2_LABEL', value: 'SERVICES.MODULAR.SPEC_2_VALUE' },
      { label: 'SERVICES.MODULAR.SPEC_3_LABEL', value: 'SERVICES.MODULAR.SPEC_3_VALUE' }
    ],
    gallery: [
      'assets/Services/Picture1.jpg',
     'assets/Services/Picture4.jpg'
    ]
  },
  {
    id: 'portable-residences',
    icon: 'fas fa-home',
    title: 'SERVICES.RESIDENCES.TITLE',
    shortDescription: 'SERVICES.RESIDENCES.SHORT',
    fullDescription: 'SERVICES.RESIDENCES.FULL',
    image: 'assets/Services/portableresidencecabin/residence.jpeg',
    
    features: [
      'SERVICES.RESIDENCES.FEATURE_1',
      'SERVICES.RESIDENCES.FEATURE_2',
      'SERVICES.RESIDENCES.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.RESIDENCES.SPEC_1_LABEL', value: 'SERVICES.RESIDENCES.SPEC_1_VALUE' },
      { label: 'SERVICES.RESIDENCES.SPEC_2_LABEL', value: 'SERVICES.RESIDENCES.SPEC_2_VALUE' },
      { label: 'SERVICES.RESIDENCES.SPEC_3_LABEL', value: 'SERVICES.RESIDENCES.SPEC_3_VALUE' }
    ],
    gallery: [
      'assets/Services/Picture24.png',
      'assets/Services/Picture25.png'
    ]
  },
  {
    id: 'secure-storage',
    icon: 'fas fa-lock',
    title: 'SERVICES.STORAGE.TITLE',
    shortDescription: 'SERVICES.STORAGE.SHORT',
    fullDescription: 'SERVICES.STORAGE.FULL',
    image: 'assets/Services/securestorage/securestoragecabin.jpeg',
    
    features: [
      'SERVICES.STORAGE.FEATURE_1',
      'SERVICES.STORAGE.FEATURE_2',
      'SERVICES.STORAGE.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.STORAGE.SPEC_1_LABEL', value: 'SERVICES.STORAGE.SPEC_1_VALUE' },
      { label: 'SERVICES.STORAGE.SPEC_2_LABEL', value: 'SERVICES.STORAGE.SPEC_2_VALUE' },
      { label: 'SERVICES.STORAGE.SPEC_3_LABEL', value: 'SERVICES.STORAGE.SPEC_3_VALUE' }
    ],
    gallery: [
    'assets/Services/Picture8.jpg',
      'assets/Services/Picture9.jpg'
    ]
  },
  {
    id: 'event-modules',
    icon: 'fas fa-calendar-alt',
    title: 'SERVICES.EVENT.TITLE',
    shortDescription: 'SERVICES.EVENT.SHORT',
    fullDescription: 'SERVICES.EVENT.FULL',
    image:    'assets/Services/Picture17.jpg',
    features: [
      'SERVICES.EVENT.FEATURE_1',
      'SERVICES.EVENT.FEATURE_2',
      'SERVICES.EVENT.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.EVENT.SPEC_1_LABEL', value: 'SERVICES.EVENT.SPEC_1_VALUE' },
      { label: 'SERVICES.EVENT.SPEC_2_LABEL', value: 'SERVICES.EVENT.SPEC_2_VALUE' },
      { label: 'SERVICES.EVENT.SPEC_3_LABEL', value: 'SERVICES.EVENT.SPEC_3_VALUE' }
    ],
    gallery: [
         'assets/Services/Picture10.jpg',
      'assets/Services/Picture11.jpg'
    ]
  },
  {
    id: 'sanitation-facilities',
    icon: 'fas fa-restroom',
    title: 'SERVICES.SANITATION.TITLE',
    shortDescription: 'SERVICES.SANITATION.SHORT',
    fullDescription: 'SERVICES.SANITATION.FULL',
    image:    'assets/Services/Picture8.jpg',
    features: [
      'SERVICES.SANITATION.FEATURE_1',
      'SERVICES.SANITATION.FEATURE_2',
      'SERVICES.SANITATION.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.SANITATION.SPEC_1_LABEL', value: 'SERVICES.SANITATION.SPEC_1_VALUE' },
      { label: 'SERVICES.SANITATION.SPEC_2_LABEL', value: 'SERVICES.SANITATION.SPEC_2_VALUE' },
      { label: 'SERVICES.SANITATION.SPEC_3_LABEL', value: 'SERVICES.SANITATION.SPEC_3_VALUE' }
    ],
    gallery: [
            'assets/Services/Picture10.jpg',
      'assets/Services/Picture29.jpg'
    ]
  },
  {
    id: 'prayer-sanctuaries',
    icon: 'fas fa-praying-hands',
    title: 'SERVICES.PRAYER.TITLE',
    shortDescription: 'SERVICES.PRAYER.SHORT',
    fullDescription: 'SERVICES.PRAYER.FULL',
    image: 'assets/Services/mosquecabin/prayers.jpeg',
    features: [
      'SERVICES.PRAYER.FEATURE_1',
      'SERVICES.PRAYER.FEATURE_2',
      'SERVICES.PRAYER.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.PRAYER.SPEC_1_LABEL', value: 'SERVICES.PRAYER.SPEC_1_VALUE' },
      { label: 'SERVICES.PRAYER.SPEC_2_LABEL', value: 'SERVICES.PRAYER.SPEC_2_VALUE' },
      { label: 'SERVICES.PRAYER.SPEC_3_LABEL', value: 'SERVICES.PRAYER.SPEC_3_VALUE' }
    ],
    gallery: [
      'assets/Services/Picture12.jpg',
     'assets/Services/Picture28.jpg'
    ]
  },
  {
    id: 'protective-shelters',
    icon: 'fas fa-shield-alt',
    title: 'SERVICES.SHELTER.TITLE',
    shortDescription: 'SERVICES.SHELTER.SHORT',
    fullDescription: 'SERVICES.SHELTER.FULL',
    image: 'assets/Services/protectivesheltercabin/protectiveshltercabin.png',
    features: [
      'SERVICES.SHELTER.FEATURE_1',
      'SERVICES.SHELTER.FEATURE_2',
      'SERVICES.SHELTER.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.SHELTER.SPEC_1_LABEL', value: 'SERVICES.SHELTER.SPEC_1_VALUE' },
      { label: 'SERVICES.SHELTER.SPEC_2_LABEL', value: 'SERVICES.SHELTER.SPEC_2_VALUE' },
      { label: 'SERVICES.SHELTER.SPEC_3_LABEL', value: 'SERVICES.SHELTER.SPEC_3_VALUE' }
    ],
    gallery: [
    'assets/Services/protectivesheltercabin/protectiveshltercabin1.png',
     'assets/Services/Picture15.jpg'
    ]
  },
  {
    id: 'multi-level-cabins',
    icon: 'fas fa-building',
    title: 'SERVICES.MULTI.TITLE',
    shortDescription: 'SERVICES.MULTI.SHORT',
    fullDescription: 'SERVICES.MULTI.FULL',
    image: 'assets/Services/MULTIlevelcabins/Picture13.jpg',
    features: [
      'SERVICES.MULTI.FEATURE_1',
      'SERVICES.MULTI.FEATURE_2',
      'SERVICES.MULTI.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.MULTI.SPEC_1_LABEL', value: 'SERVICES.MULTI.SPEC_1_VALUE' },
      { label: 'SERVICES.MULTI.SPEC_2_LABEL', value: 'SERVICES.MULTI.SPEC_2_VALUE' },
      { label: 'SERVICES.MULTI.SPEC_3_LABEL', value: 'SERVICES.MULTI.SPEC_3_VALUE' }
    ],
    gallery: [
         'assets/Services/Picture16.jpg',
     'assets/Services/Picture17.jpg'
    ]
  },
  {
    id: 'medical-units',
    icon: 'fas fa-medkit',
    title: 'SERVICES.MEDICAL.TITLE',
    shortDescription: 'SERVICES.MEDICAL.SHORT',
    fullDescription: 'SERVICES.MEDICAL.FULL',
    image: 'assets/Services/medicalcabin/portablemedicalcabin.jpg',
    features: [
      'SERVICES.MEDICAL.FEATURE_1',
      'SERVICES.MEDICAL.FEATURE_2',
      'SERVICES.MEDICAL.FEATURE_3'
    ],
    specifications: [
      { label: 'SERVICES.MEDICAL.SPEC_1_LABEL', value: 'SERVICES.MEDICAL.SPEC_1_VALUE' },
      { label: 'SERVICES.MEDICAL.SPEC_2_LABEL', value: 'SERVICES.MEDICAL.SPEC_2_VALUE' },
      { label: 'SERVICES.MEDICAL.SPEC_3_LABEL', value: 'SERVICES.MEDICAL.SPEC_3_VALUE' }
    ],
    gallery: [
     'assets/Services/Picture18.png',
     'assets/Services/Picture19.png'
    ]
  }
];


  }
}
