// services/form-submission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycby9W_TT54YUJbnP3PB7fcMPutwDZEIkCYMydh2hdXEBR99o9J4GDawYEATnJ6AaWL8wbQ/exec';

  constructor(private http: HttpClient) {}

  submitContactForm(formData: any) {
    return this.http.post(this.apiUrl, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}