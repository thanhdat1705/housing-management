import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { switchMap, tap } from 'rxjs';

import {
  AccountService,
  LocalStorageService,
  SecurityService,
  ToastService,
} from '../../common/data-access';
import { STORAGE_KEY } from '../../common/utils';
import { AccountRequest } from '../../common/utils/interfaces';

interface State {
  isLoading: boolean;
}

@Injectable()
export class AuthenticationStore extends ComponentStore<State> {
  #ngxLoader = inject(NgxUiLoaderService);
  #accountService = inject(AccountService);
  #toastService = inject(ToastService);
  #localStorageService = inject(LocalStorageService);
  #router = inject(Router);
  #securityService = inject(SecurityService);

  constructor() {
    super({
      isLoading: false,
    });
  }

  readonly isLoading$ = this.select((state) => state.isLoading);

  signIn = this.effect<AccountRequest>((account$) =>
    account$.pipe(
      tap(() => this.#ngxLoader.start()),
      switchMap((account) =>
        this.#accountService.login({ type: 'auth', attributes: account }).pipe(
          tapResponse(
            (response) => {
              this.#toastService.show({
                message: 'Login Successfully',
                classname: 'bg-success text-light',
              });

              this.#localStorageService.saveData(
                STORAGE_KEY.authInfo,
                JSON.stringify(response.data.attributes.token)
              );
              this.#securityService.isAuthenticated.set(true);
              this.#router.navigate(['/house']);
              this.#ngxLoader.stop();
            },
            (error: HttpErrorResponse) => this.#errorHandler(error)
          )
        )
      )
    )
  );

  #errorHandler(error: HttpErrorResponse): void {
    const errors = error.error?.errors;
    if (errors && errors.length > 0) {
      this.#toastService.show({
        message: errors[0].detail,
        classname: 'bg-danger text-light',
        delay: 5000,
      });
    }

    this.#ngxLoader.stop();
  }
}
