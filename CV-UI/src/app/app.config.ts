import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideAnimations(), 
    provideToastr(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
  ],
};
