// src/app/translate.loader.server.ts

import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

export class TranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const filePath = path.join(
      process.cwd(),
      'dist', 'rana-al-cabin', 'browser', 'assets', 'i18n', `${lang}.json`
    );
    const file = fs.readFileSync(filePath, 'utf-8');
    return of(JSON.parse(file));
  }
}
