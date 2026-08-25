import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from './footer';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Footer
  ],
  imports: [
    CommonModule,
    RouterModule, // <--- Add this line
    TranslateModule
  ],
  exports: [
    Footer
  ],
})
export class FooterModule { }