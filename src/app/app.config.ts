import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { getAppConfigProvider } from './common/app-config/app-config.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    getAppConfigProvider(environment),
    provideEnvironmentNgxMask(),
    importProvidersFrom(
      NgxUiLoaderModule.forRoot({
        bgsSize: 60,
        fgsSize: 60,
        bgsType: 'ball-spin-clockwise',
        fgsPosition: 'center-center',
        fgsType: 'circle',
      })
    ),
  ],
};
