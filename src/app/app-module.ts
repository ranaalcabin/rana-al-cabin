import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing-module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Main App Component
import { App } from './app';

// Import Shared Layout Modules instead of components directly
// Make sure these paths are correct, assuming you have these modules
import { NavbarModule } from './shared/navbar/navbar.module'; // Import NavbarModule
import { FooterModule } from './shared/footer/footer.module'; // Import FooterModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Feature Modules
import { AboutModule } from './pages/about/about.module';
import { ContactModule } from './pages/contact/contact.module';
import { HomeModule } from './pages/home/home.module';
import { ServicesModule } from './pages/services/services.module';
import { QuoteModule } from './shared/quote/quote.module'; // Ensure QuoteModule exists and declares Quote component
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TranslateBrowserLoader } from './translate.loader';

// Factory function for TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    App,
    // REMOVE Navbar and Footer from declarations here!
    // They are declared in their own modules (NavbarModule, FooterModule)
    // and you will import those modules instead.
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
     BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass:TranslateBrowserLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    // Import NavbarModule and FooterModule here
    NavbarModule,  // <--- IMPORT THE MODULE
    FooterModule,  // <--- IMPORT THE MODULE

    // Keep your feature modules
    HomeModule,
    AboutModule,
    ContactModule,
    QuoteModule,
    ServicesModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }