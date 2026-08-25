// src/app/core/seo/seo.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly baseUrl = 'https://www.ranaalcabin.com';
  private readonly defaultImage = '/assets/og-image.jpg';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateMetaTags(
    page: 'home' | 'about' | 'services' | 'contact',
    customUrl: string = ''
  ): void {
    const metaData = this.getMetaData(page);
    const pageUrl = `${this.baseUrl}${customUrl || '/' + page}`;

    this.title.setTitle(metaData.title);

    this.updateTag('description', metaData.description);
    this.updateTag('keywords', metaData.keywords);

    // Open Graph Tags
    this.updateTag('og:title', metaData.title, true);
    this.updateTag('og:description', metaData.description, true);
    this.updateTag('og:image', this.defaultImage, true);
    this.updateTag('og:url', pageUrl, true);

    // Optional: Twitter Meta (you can extend this as needed)
    this.updateTag('twitter:card', 'summary_large_image');
    this.updateTag('twitter:title', metaData.title);
    this.updateTag('twitter:description', metaData.description);
    this.updateTag('twitter:image', this.defaultImage);
  }

  private updateTag(name: string, content: string, isProperty: boolean = false) {
    if (!content) return;

    this.meta.updateTag(
      isProperty ? { property: name, content } : { name, content }
    );
  }

  private getMetaData(page: 'home' | 'about' | 'services' | 'contact') {
    const meta = {
      home: {
        title: 'Rana Al Cabin - Portable Cabins in Saudi Arabia',
        description:
          'Rana Al Cabin offers high-quality, durable, and customized portable cabins in Saudi Arabia for offices, mosques, accommodations, and more.',
        keywords:
          'portable cabins, Rana Al Cabin, Saudi Arabia, porta cabin office, mosque cabins, security cabins, accommodation cabins',
      },
      about: {
        title: 'About Rana Al Cabin - Leading Portable Cabin Manufacturer',
        description:
          'Learn about Rana Al Cabin, the top manufacturer of portable cabins in Saudi Arabia, delivering innovative and durable solutions.',
        keywords:
          'about Rana Al Cabin, portable cabin manufacturer, Saudi Arabia cabins',
      },
      services: {
        title: 'Portable Cabin Services by Rana Al Cabin',
        description:
          'Explore our range of portable cabin services, including offices, mosques, toilets, security cabins, and accommodations.',
        keywords:
          'portable cabin services, Rana Al Cabin services, Saudi Arabia portable cabins',
      },
      contact: {
        title: 'Contact Rana Al Cabin - Get Your Portable Cabin Quote',
        description:
          'Contact Rana Al Cabin for customized portable cabin solutions. Reach out for sales, support, or inquiries.',
        keywords:
          'contact Rana Al Cabin, portable cabin quote, Saudi Arabia cabin supplier',
      },
    };

    return meta[page] || meta['home'];
  }
}