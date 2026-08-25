import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Home } from './home';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Home],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Home }]),
    TranslateModule
  ],
})
export class HomeModule { }