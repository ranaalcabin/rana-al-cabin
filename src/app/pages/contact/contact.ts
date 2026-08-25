import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';
import { LanguageService } from '../../core/language.service';
import { SeoService } from '../../core/seo.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: false,
})
export class Contact implements OnInit, OnDestroy {
  @ViewChild('cursorGlow', { static: false }) cursorGlow!: ElementRef<HTMLDivElement>;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef<HTMLElement>;
  @ViewChild('contactFormSection') contactFormSection!: ElementRef;

  private mouseX = 0;
  private mouseY = 0;
  private isMouseInside = false;
  private animationId: number = 0;
  private particleInterval: any;

  private formFieldIds = {
    name: 'entry.1519890954',
    email: 'entry.1449302494',
    phone: 'entry.111059898',
    subject: 'entry.1701591484',
    message: 'entry.1054961384',
    consent: 'entry.250811116'
  };

  socialLinks = [
    { icon: 'fab fa-twitter', url: 'https://twitter.com/ranaalcabin', label: 'Twitter' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com/company/ranaalcabin', label: 'LinkedIn' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/ranaalcabin', label: 'Instagram' },
    { icon: 'fas fa-envelope', url: 'mailto:ranaalcabin@gmail.com', label: 'Email' }
  ];

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;
  currentLang: string = 'en';
  private langSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    public themeService: ThemeService,
    private languageService: LanguageService,
    private seoService: SeoService,
    private route: ActivatedRoute,
  private http: HttpClient,
   @Inject(PLATFORM_ID) private platformId: Object,

  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\+\-\s]+$/)]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue]
    });
  }
ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.startCursorAnimation();
    this.createParticles();
    // this.loadFontAwesome();

    this.route.queryParams.subscribe(params => {
      if (params['type'] === 'quote') {
        this.contactForm.get('subject')?.setValue('quote');
        setTimeout(() => {
          if (this.contactFormSection) {
            this.contactFormSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  this.seoService.updateMetaTags('contact');
  this.currentLang = this.languageService.getCurrentLanguage();
  this.translate.use(this.currentLang);

  this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
    this.currentLang = lang;
    this.translate.use(lang);
    this.seoService.updateMetaTags('contact');
  });
}

  // ngOnInit(): void {
  //   this.startCursorAnimation();
  //   this.createParticles();
  //   this.seoService.updateMetaTags('contact');

  //   this.currentLang = this.languageService.getCurrentLanguage();
  //   this.translate.use(this.currentLang);

  //   this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
  //     this.currentLang = lang;
  //     this.translate.use(lang);
  //     this.seoService.updateMetaTags('contact');
  //   });

  //   this.route.queryParams.subscribe(params => {
  //     if (params['type'] === 'quote') {
  //       this.contactForm.get('subject')?.setValue('quote');
  //       setTimeout(() => {
  //         if (this.contactFormSection) {
  //           this.contactFormSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //         }
  //       }, 100);
  //     }
  //   });

  //   this.loadFontAwesome();
  // }
// private loadFontAwesome() {
//   if (isPlatformBrowser(this.platformId)) {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
//     document.head.appendChild(link);
//   }
// }

  // private loadFontAwesome() {
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  //   document.head.appendChild(link);
  // }
private startCursorAnimation() {
  if (isPlatformBrowser(this.platformId)) {
    this.animationId = requestAnimationFrame(this.updateCursor);
  }
}
  // private startCursorAnimation() {
  //   this.animationId = requestAnimationFrame(this.updateCursor);
  // }

  private updateCursor = () => {
    if (this.isMouseInside && this.cursorGlow?.nativeElement) {
      this.cursorGlow.nativeElement.style.left = `${this.mouseX}px`;
      this.cursorGlow.nativeElement.style.top = `${this.mouseY}px`;
    }
    this.animationId = requestAnimationFrame(this.updateCursor);
  };
private createParticles() {
  if (isPlatformBrowser(this.platformId)) {
    this.particleInterval = setInterval(() => {
      this.createParticle();
    }, 2000);
  }
}
  // private createParticles() {
  //   this.particleInterval = setInterval(() => {
  //     this.createParticle();
  //   }, 2000);
  // }
private createParticle() {
  if (!isPlatformBrowser(this.platformId)) return;
  if (!this.heroSection?.nativeElement) return;

  const particle = document.createElement('div');
  particle.className = 'dynamic-particle';
  particle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(240, 147, 251, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 5;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
  `;
  this.heroSection.nativeElement.appendChild(particle);

  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 15000);
}

  // private createParticle() {
  //   if (!this.heroSection?.nativeElement) return;
  //   const particle = document.createElement('div');
  //   particle.className = 'dynamic-particle';
  //   particle.style.cssText = `
  //     position: absolute;
  //     width: 4px;
  //     height: 4px;
  //     background: rgba(240, 147, 251, 0.6);
  //     border-radius: 50%;
  //     pointer-events: none;
  //     z-index: 5;
  //     left: ${Math.random() * 100}%;
  //     top: ${Math.random() * 100}%;
  //     animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
  //   `;
  //   this.heroSection.nativeElement.appendChild(particle);
  //   setTimeout(() => {
  //     if (particle.parentNode) {
  //       particle.parentNode.removeChild(particle);
  //     }
  //   }, 15000);
  // }
@HostListener('mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (isPlatformBrowser(this.platformId)) {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.ticking = false;
        this.updateParallaxShapes(event);
      });
      this.ticking = true;
    }
  }
}

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (!this.ticking) {
  //     requestAnimationFrame(() => {
  //       this.mouseX = event.clientX;
  //       this.mouseY = event.clientY;
  //       this.ticking = false;
  //       this.updateParallaxShapes(event);
  //     });
  //     this.ticking = true;
  //   }
  // }

  private ticking = false;
  private updateParallaxShapes(event: MouseEvent) {
  if (!isPlatformBrowser(this.platformId)) return;
  if (!this.heroSection?.nativeElement) return;

  const shapes = this.heroSection.nativeElement.querySelectorAll<HTMLElement>('.shape');
  const mouseX = event.clientX / window.innerWidth;
  const mouseY = event.clientY / window.innerHeight;

  shapes.forEach((shape: HTMLElement, index: number) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed * 20;
    const y = (mouseY - 0.5) * speed * 20;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
}

  // private updateParallaxShapes(event: MouseEvent) {
  //   if (!this.heroSection?.nativeElement) return;
  //   const shapes = this.heroSection.nativeElement.querySelectorAll<HTMLElement>('.shape');
  //   const mouseX = event.clientX / window.innerWidth;
  //   const mouseY = event.clientY / window.innerHeight;
  //   shapes.forEach((shape: HTMLElement, index: number) => {
  //     const speed = (index + 1) * 0.5;
  //     const x = (mouseX - 0.5) * speed * 20;
  //     const y = (mouseY - 0.5) * speed * 20;
  //     shape.style.transform = `translate(${x}px, ${y}px)`;
  //   });
  // }
onMouseEnter() {
  if (isPlatformBrowser(this.platformId)) {
    this.isMouseInside = true;
    document.body.classList.add('cursor-active');
    if (this.cursorGlow?.nativeElement) {
      this.cursorGlow.nativeElement.style.opacity = '1';
    }
  }
}

onMouseLeave() {
  if (isPlatformBrowser(this.platformId)) {
    this.isMouseInside = false;
    document.body.classList.remove('cursor-active');
    if (this.cursorGlow?.nativeElement) {
      this.cursorGlow.nativeElement.style.opacity = '0';
    }
  }
}

  // onMouseEnter() {
  //   this.isMouseInside = true;
  //   document.body.classList.add('cursor-active');
  //   if (this.cursorGlow?.nativeElement) {
  //     this.cursorGlow.nativeElement.style.opacity = '1';
  //   }
  // }

  // onMouseLeave() {
  //   this.isMouseInside = false;
  //   document.body.classList.remove('cursor-active');
  //   if (this.cursorGlow?.nativeElement) {
  //     this.cursorGlow.nativeElement.style.opacity = '0';
  //   }
  // }

onSubmit(): void {
  if (this.contactForm.invalid) {
    this.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  this.submitSuccess = false;
  this.submitError = null;

  const formValue = this.contactForm.value;

  // Format data as a simple array of arrays (recommended for Google Sheets API)
  const data = [
    [
      new Date().toISOString(),
      formValue.name || "",
      formValue.email || "",
      formValue.phone || "",
      formValue.subject || "",
      formValue.message || "",
      formValue.consent === true ? 'Yes' : 'No'
    ]
  ];

  // Alternative object format (try this if array format doesn't work)
  /*
  const data = {
    "Timestamp": new Date().toISOString(),
    "Name": formValue.name || "",
    "Email": formValue.email || "",
    "Phone": formValue.phone || "",
    "Subject": formValue.subject || "",
    "Message": formValue.message || "",
    "Consent": formValue.consent === true ? 'Yes' : 'No'
  };
  */

  //const tabName = 'TestingSheet'; // Make sure this matches your actual sheet tab name
  const apiURL = `https://v1.nocodeapi.com/ranaalcabin/google_sheets/wfvySgRNHjlyhQeq?tabId=TestingSheet`;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  console.log('Sending data:', data); // Debug log

  this.http.post(apiURL, data, { headers }).subscribe({
    next: (response) => {
      console.log('Success! API Response:', response);
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      // Reset form state
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.setErrors(null);
      });
      setTimeout(() => this.submitSuccess = false, 5000);
    },
    error: (err) => {
      console.error('Full error details:', err);
      this.isSubmitting = false;
      
      // Enhanced error handling
      if (err.status === 400) {
        this.submitError = 'Invalid data format. Please check all fields and try again.';
      } else if (err.status === 401) {
        this.submitError = 'Authentication failed. Please contact support.';
      } else if (err.status === 404) {
        this.submitError = 'Service not found. Please contact support.';
      } else if (err.status === 0) {
        this.submitError = 'Network error. Please check your internet connection.';
      } else if (err.error?.message) {
        this.submitError = err.error.message;
      } else {
        this.submitError = 'An unexpected error occurred. Please try again.';
      }
      
      setTimeout(() => this.submitError = null, 8000);
    }
  });
}

  private markAllAsTouched() {
    Object.values(this.contactForm.controls).forEach(control => control.markAsTouched());
  }
ngOnDestroy() {
  if (isPlatformBrowser(this.platformId)) {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    document.body.classList.remove('cursor-active');
  }

  if (this.langSubscription) {
    this.langSubscription.unsubscribe();
  }
}

  // ngOnDestroy() {
  //   if (this.animationId) {
  //     cancelAnimationFrame(this.animationId);
  //   }
  //   if (this.particleInterval) {
  //     clearInterval(this.particleInterval);
  //   }
  //   document.body.classList.remove('cursor-active');
  //   if (this.langSubscription) {
  //     this.langSubscription.unsubscribe();
  //   }
  // }
}
