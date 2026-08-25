// src/app/translate.loader.server.ts

import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

export class TranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const possiblePaths = [
      path.join(process.cwd(), 'dist', 'rana-al-cabin', 'browser', 'assets', 'i18n', `${lang}.json`),
      path.join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`),
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, 'utf-8');
        return of(JSON.parse(file));
      }
    }

    throw new Error(`Translation file not found for language "${lang}". Searched paths: ${possiblePaths.join(', ')}`);
  }
}
