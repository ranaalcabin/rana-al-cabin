import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Services } from './services';

@NgModule({
  declarations: [Services],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: Services }]),
    TranslateModule
  ],
})
export class ServicesModule { }