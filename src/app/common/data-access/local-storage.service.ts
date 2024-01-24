import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getData<T>(key: string): T | null {
    const result = localStorage.getItem(key);

    if (!result) {
      return null;
    }

    try {
      return JSON.parse(result) as T;
    } catch (error) {
      return result as T;
    }
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
}
