import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoggingService } from './interceptor/logging.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide : HTTP_INTERCEPTORS, useClass: LoggingService, multi : true},
    { provide : HTTP_INTERCEPTORS, useClass: AuthService, multi : true}
  ],
};
