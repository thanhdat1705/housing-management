import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { getAppConfigProvider } from './common/app-config/app-config.token';
import { LocalStorageService, SecurityService } from './common/data-access';
import { STORAGE_KEY, securityInterceptor } from './common/utils';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [SecurityService, LocalStorageService],
      useFactory:
        (
          securityService: SecurityService,
          localStorageService: LocalStorageService
        ) =>
        () => {
          const auth = localStorageService.getData<{
            token: string;
            refreshToken: string;
          }>(STORAGE_KEY.authInfo);

          securityService.isAuthenticated.set(!!auth);
        },
    },
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([securityInterceptor])),
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
