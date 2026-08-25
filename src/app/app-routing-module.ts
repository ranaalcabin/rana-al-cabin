import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'quote',
    loadChildren: () =>
      import('./shared/quote/quote.module').then((m) => m.QuoteModule),
  },  
  {
    path: '**',
    redirectTo: '', // Or you can create a NotFound page later
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking', // SSR required
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }