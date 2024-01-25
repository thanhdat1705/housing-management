import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { APP_CONFIG } from '../app-config/app-config.token';
import {
  BaseHouse,
  CommonResponse,
  HouseInfor,
  HouseModel,
  HouseModelInfor,
  QueryListResponse,
} from '../utils/interfaces';

@Injectable({ providedIn: 'root' })
export class HouseService {
  #httpClient = inject(HttpClient);
  #appConfig = inject(APP_CONFIG);

  getHouseList() {
    return this.#httpClient.get<QueryListResponse<BaseHouse<HouseInfor>[]>>(
      `${this.#appConfig.baseURL}/houses`
    );
  }

  getHouseModelList() {
    return this.#httpClient.get<CommonResponse<BaseHouse<HouseModel>[]>>(
      `${this.#appConfig.baseURL}/house_models`
    );
  }

  createHouse(house: BaseHouse<HouseInfor>) {
    return this.#httpClient.post<CommonResponse<HouseInfor>>(
      `${this.#appConfig.baseURL}/houses`,
      house
    );
  }

  updateHouse(house: BaseHouse<HouseInfor>) {
    return this.#httpClient.patch<CommonResponse<Location>>(
      `${this.#appConfig.baseURL}/houses/${house.id}`,
      house
    );
  }

  getDetailHouseModel(id: string) {
    return this.#httpClient.get<CommonResponse<BaseHouse<HouseModelInfor>>>(
      `${this.#appConfig.baseURL}/house_models/${id}`
    );
  }
}
