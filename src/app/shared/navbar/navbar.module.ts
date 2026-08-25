import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './navbar';

@NgModule({
  declarations: [Navbar],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Navbar }]),
    TranslateModule
  ],
   exports: [Navbar]
})
export class NavbarModule { }