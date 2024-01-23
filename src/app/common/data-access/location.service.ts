import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { APP_CONFIG } from '../app-config/app-config.token';
import { CommonResponse, Location } from '../utils/interfaces';

@Injectable({ providedIn: 'root' })
export class LocationService {
  #httpClient = inject(HttpClient);
  #appConfig = inject(APP_CONFIG);

  getLocations() {
    return this.#httpClient.get<Location[]>(`${this.#appConfig.baseURL}`);
  }

  getLocationById(id: string) {
    return this.#httpClient.get<CommonResponse<Location>>(
      `${this.#appConfig.baseURL}/${id}`
    );
  }

  createLocation(location: Location) {
    return this.#httpClient.post<CommonResponse<Location>>(
      `${this.#appConfig.baseURL}`,
      location
    );
  }

  updateLocation(location: Location) {
    return this.#httpClient.put<CommonResponse<Location>>(
      `${this.#appConfig.baseURL}/${location.id}`,
      location
    );
  }

  deleteLocation(id: string) {
    return this.#httpClient.delete<CommonResponse<Location>>(
      `${this.#appConfig.baseURL}/${id}`
    );
  }
}
