import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin, switchMap, tap, withLatestFrom } from 'rxjs';

import { HouseService, ToastService } from '../../common/data-access';
import {
  BaseHouse,
  House,
  HouseData,
  HouseFilter,
  HouseInfor,
  houseFilterHandler,
} from '../../common/utils';
import { Router } from '@angular/router';

interface State {
  isLoading: boolean;
  total: number;
  data: House[];
  filter: HouseFilter;
  detail: HouseInfor | null;
}

@Injectable()
export class HouseStore extends ComponentStore<State> {
  #ngxLoader = inject(NgxUiLoaderService);
  #toastService = inject(ToastService);
  #houseService = inject(HouseService);
  #router = inject(Router);

  constructor() {
    super({
      isLoading: false,
      total: 0,
      data: [],
      detail: null,
      filter: {
        block_number: '',
        house_number: '',
        land_number: '',
        min_price: 0,
        max_price: 0
      },
    });
  }

  readonly data$ = this.select((state) => state.data);
  readonly detail$ = this.select((state) => state.detail);
  readonly total$ = this.select((state) => state.total);
  readonly filter$ = this.select((state) => state.filter);

  readonly vm$ = this.select(
    this.data$,
    this.total$,
    this.filter$,
    (data, total, filter) => ({ data, total, filter })
  );

  getHouseList = this.effect<{
    filter?: Partial<HouseFilter>;
  }>((params$) =>
    params$.pipe(
      tap(() => this.#ngxLoader.start()),
      withLatestFrom(this.vm$),
      switchMap(([{ filter }, vm]) => {
        const newFilter = {
          ...vm.filter,
          ...filter,
        };

        return forkJoin([
          this.#houseService.getHouseList(),
          this.#houseService.getHouseModelList(),
        ]).pipe(
          tapResponse(
            ([houseList, houseModelList]) => {
              const houseFilterData = houseFilterHandler(
                newFilter,
                houseList.data
              );

              const houseData: House[] = houseModelList.data.map((model) => ({
                ...model.attributes.media,
                id: model.id as string,
                model: model.attributes.model,
                data: houseFilterData
                  .filter(
                    (house) => house.attributes.model === model.attributes.model
                  )
                  .map(
                    (data) => ({ ...data.attributes, id: data.id } as HouseData)
                  ),
              }));

              this.patchState({
                data: houseData,
                total: houseData.length,
                filter: newFilter,
              });

              this.#ngxLoader.stop();
            },
            (error: HttpErrorResponse) => this.#errorHandler(error)
          )
        );
      })
    )
  );

  createHouse = this.effect<HouseInfor>((house$) =>
    house$.pipe(
      tap(() => this.#ngxLoader.start()),
      switchMap((house) =>
        this.#houseService
          .createHouse({
            data: {
              type: 'houses',
              attributes: house,
            },
          })
          .pipe(
            tapResponse(
              (response) => {
                this.#toastService.show({
                  message: 'Created Successfully',
                  classname: 'bg-success text-light',
                });
                this.#router.navigate(['/house']);
                this.#ngxLoader.stop();
              },
              (error: HttpErrorResponse) => this.#errorHandler(error)
            )
          )
      )
    )
  );

  updateHouse = this.effect<{ id: string; house: HouseInfor }>((params$) =>
    params$.pipe(
      tap(() => this.#ngxLoader.start()),
      withLatestFrom(this.vm$),
      switchMap(([params, vm]) => {
        const request: {
          data: BaseHouse<HouseInfor>;
        } = {
          data: { id: params.id, type: 'houses', attributes: params.house },
        };
        return this.#houseService.updateHouse(request).pipe(
          tapResponse(
            (response) => {
              this.#toastService.show({
                message: 'Updated Successfully',
                classname: 'bg-success text-light',
              });
              this.#router.navigate(['/house']);
              this.#ngxLoader.stop();
            },
            (error: HttpErrorResponse) => this.#errorHandler(error)
          )
        );
      })
    )
  );

  getHouseDetails = this.effect<string>((houseId$) =>
    houseId$.pipe(
      tap(() => this.#ngxLoader.start()),
      switchMap((houseId) =>
        this.#houseService.getHouseDetails(houseId).pipe(
          tapResponse(
            (response) => {
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
    if (errors && errors?.length > 0) {
      this.#toastService.show({
        message: errors[0].detail,
        classname: 'bg-danger text-light',
        delay: 5000,
      });
    }

    this.#ngxLoader.stop();
  }
}
