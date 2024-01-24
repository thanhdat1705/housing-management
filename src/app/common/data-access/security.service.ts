import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { STORAGE_KEY } from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  #localStorageService = inject(LocalStorageService);

  isAuthenticated = signal<boolean>(false);

  handleRemoveToken(): void {
    this.#localStorageService.removeData(STORAGE_KEY.authInfo);
    this.isAuthenticated.set(false);
  }
}
