import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { About } from './about';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [About],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: About }]),
    TranslateModule
  ],
})
export class AboutModule { }