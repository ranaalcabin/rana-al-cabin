import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';
import { LanguageService } from '../../core/language.service';
import { SeoService } from '../../core/seo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.html',
  styleUrls: ['./quote.css'],
  standalone: false,
})
export class Quote implements OnInit, OnDestroy {
  quoteForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;
  currentLang: string = 'en';
  private langSubscription?: Subscription;
  
  // Service categories for quote
  serviceCategories = [
    { value: 'modular-workspaces', icon: 'fas fa-briefcase' },
    { value: 'portable-residences', icon: 'fas fa-home' },
    { value: 'secure-storage', icon: 'fas fa-lock' },
    { value: 'event-modules', icon: 'fas fa-calendar-alt' },
    { value: 'sanitation-facilities', icon: 'fas fa-restroom' },
    { value: 'prayer-sanctuaries', icon: 'fas fa-praying-hands' },
    { value: 'protective-shelters', icon: 'fas fa-shield-alt' },
    { value: 'multi-level-cabins', icon: 'fas fa-building' },
    { value: 'medical-units', icon: 'fas fa-medkit' }
  ];

  // Google Sheets field mapping
  private formFieldIds = {
    name: 'entry.1234567890', // Replace with your actual field IDs
    email: 'entry.2345678901',
    phone: 'entry.3456789012',
    company: 'entry.4567890123',
    projectType: 'entry.5678901234',
    serviceCategory: 'entry.6789012345',
    projectSize: 'entry.7890123456',
    budget: 'entry.8901234567',
    timeline: 'entry.9012345678',
    location: 'entry.0123456789',
    specifications: 'entry.9876543210',
    specialRequirements: 'entry.8765432109',
    hasUtilities: 'entry.7654321098',
    needsPermits: 'entry.6543210987',
    previousExperience: 'entry.5432109876',
    consent: 'entry.4321098765',
    newsletter: 'entry.3210987654'
  };

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    public themeService: ThemeService,
    private languageService: LanguageService,
    private seoService: SeoService,
    private http: HttpClient
  ) {
    this.quoteForm = this.fb.group({
      // Personal Information
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\+\-\s]+$/)]],
      company: [''],
      
      // Project Information
      projectType: ['', Validators.required],
      serviceCategory: ['', Validators.required],
      projectSize: ['', Validators.required],
      budget: ['', Validators.required],
      timeline: ['', Validators.required],
      location: ['', Validators.required],
      
      // Specifications
      specifications: ['', [Validators.required, Validators.minLength(20)]],
      specialRequirements: [''],
      
      // Additional Information
      hasUtilities: [false],
      needsPermits: [false],
      previousExperience: [''],
      
      // Consent
      consent: [false, Validators.requiredTrue],
      newsletter: [false]
    });
  }

  ngOnInit(): void {
  //  this.seoService.updateMetaTags('quote');
    
    // Initialize language
    this.currentLang = this.languageService.getCurrentLanguage();
    this.translate.use(this.currentLang);
    
    // Subscribe to language changes
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.translate.use(lang);
     // this.seoService.updateMetaTags('quote');
    });

    // Load Font Awesome
    // this.loadFontAwesome();
  }

  // private loadFontAwesome() {
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  //   document.head.appendChild(link);
  // }

onSubmit(): void {
  if (this.quoteForm.invalid) {
    this.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  this.submitSuccess = false;
  this.submitError = null;

  const formValue = this.quoteForm.value;

  // Format data as a 2D array exactly matching your form fields
  const data = [
    [
      new Date().toISOString(), // Timestamp
      formValue.name || "", // Full Name
      formValue.email || "", // Email Address
      formValue.phone || "", // Phone Number
      formValue.company || "", // Company Name
      formValue.projectType || "", // Project Type
      formValue.serviceCategory || "", // Service Category
      formValue.projectSize || "", // Project Size
      formValue.budget || "", // Budget Range
      formValue.timeline || "", // Project Timeline
      formValue.location || "", // Project Location
      formValue.specifications || "", // Detailed Specifications
      formValue.specialRequirements || "", // Special Requirements
      formValue.hasUtilities ? 'Yes' : 'No', // Site has utilities
      formValue.needsPermits ? 'Yes' : 'No', // Need permits
      formValue.previousExperience || "", // Previous Experience
      formValue.consent ? 'Yes' : 'No', // Privacy consent
      formValue.newsletter ? 'Yes' : 'No' // Newsletter subscription
    ]
  ];

  const apiURL = `https://v1.nocodeapi.com/ranaalcabin/google_sheets/lUhiLGKpyMTnvWyD?tabId=QuoteSheet`;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  console.log('Form data being sent:', JSON.stringify(data, null, 2));

  this.http.post(apiURL, data, { headers }).subscribe({
    next: (response) => {
      console.log('API Response:', response);
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.quoteForm.reset();
      
      // Reset form validation states
      Object.keys(this.quoteForm.controls).forEach(key => {
        this.quoteForm.get(key)?.setErrors(null);
      });
      
      setTimeout(() => this.submitSuccess = false, 5000);
    },
    error: (err) => {
      console.error('Submission error:', err);
      this.isSubmitting = false;
      
      if (err.error?.info === "body param should be a 2d Array") {
        this.submitError = "There was a problem with the data format. Please try again.";
      } else if (err.status === 400) {
        this.submitError = "Please check all required fields and try again.";
      } else if (err.status === 404) {
        this.submitError = "The submission service is currently unavailable. Please try again later.";
      } else {
        this.submitError = "An unexpected error occurred. Please contact support if the problem persists.";
      }
      
      setTimeout(() => this.submitError = null, 8000);
    }
  });
}
  private markAllAsTouched() {
    Object.values(this.quoteForm.controls).forEach(control => control.markAsTouched());
  }

  // Helper method to get service category translation key
  getServiceCategoryKey(value: string): string {
    return `NAVBAR.SERVICE_CATEGORIES.${value.toUpperCase().replace(/-/g, '_')}`;
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}