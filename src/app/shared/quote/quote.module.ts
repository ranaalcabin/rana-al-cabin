import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Quote } from './quote';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Quote],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Quote }]),
    TranslateModule
  ],
   exports: [Quote]
})
export class QuoteModule { }