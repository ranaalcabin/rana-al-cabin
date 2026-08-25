import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Contact } from './contact';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Contact],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    RouterModule.forChild([{ path: '', component: Contact }]),
    TranslateModule
  ],
  exports: [Contact] 
})
export class ContactModule { }