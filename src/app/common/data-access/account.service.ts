import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { APP_CONFIG } from '../app-config/app-config.token';
import { AccountRequest, AuthInfo, BaseAccount } from '../utils/interfaces';

@Injectable({ providedIn: 'root' })
export class AccountService {
  #httpClient = inject(HttpClient);
  #appConfig = inject(APP_CONFIG);

  login(data: BaseAccount<AccountRequest>) {
    return this.#httpClient.post<{ data: BaseAccount<AuthInfo> }>(
      `${this.#appConfig.baseURL}/auth`,
      { data }
    );
  }
}
