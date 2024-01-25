import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin, switchMap, tap, withLatestFrom } from 'rxjs';

import { HouseService, ToastService } from '../../common/data-access';
import { House } from '../../common/utils';

interface State {
  isLoading: boolean;
  total: number;
  data: House[];
  filter: any;
}

@Injectable()
export class HouseStore extends ComponentStore<State> {
  #ngxLoader = inject(NgxUiLoaderService);
  #toastService = inject(ToastService);
  #houseService = inject(HouseService);

  constructor() {
    super({
      isLoading: false,
      total: 0,
      data: [],
      filter: {
        search: '',
      },
    });
  }

  readonly data$ = this.select((state) => state.data);
  readonly total$ = this.select((state) => state.total);
  readonly filter$ = this.select((state) => state.filter);

  readonly vm$ = this.select(
    this.data$,
    this.total$,
    this.filter$,
    (data, total, filter) => ({ data, total, filter })
  );

  getHouseList = this.effect<{
    filter?: Partial<any>;
  }>((params$) =>
    params$.pipe(
      tap(() => this.#ngxLoader.start()),
      withLatestFrom(this.vm$),
      switchMap(([{ filter }, vm]) => {
        const newFilter = {
          ...vm.filter,
          ...filter,
        };

        if (newFilter.state === 'None') delete newFilter.state;

        return forkJoin([
          this.#houseService.getHouseList(),
          this.#houseService.getHouseModelList(),
        ]).pipe(
          tapResponse(
            ([houseList, houseModelList]) => {
              const houseData: House[] = houseModelList.data.map((model) => ({
                ...model.attributes.media,
                id: model.id as string,
                model: model.attributes.model,
                data: houseList.data
                  .filter(
                    (house) => house.attributes.model === model.attributes.model
                  )
                  .map((data) => data.attributes),
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

  // createLocation = this.effect<Location>((location$) =>
  //   location$.pipe(
  //     tap(() => this.#ngxLoader.start()),
  //     switchMap((location) =>
  //       this.#locationService.createLocation(location).pipe(
  //         tapResponse(
  //           (response) => {
  //             this.#snackBar.openSnackBar('Create Successfully', 'success');
  //             this.getListLocations({});
  //           },
  //           (error: HttpErrorResponse) => this.#errorHandler(error)
  //         )
  //       )
  //     )
  //   )
  // );

  // updateLocation = this.effect<Location>((location$) =>
  //   location$.pipe(
  //     tap(() => this.#ngxLoader.start()),
  //     withLatestFrom(this.vm$),
  //     switchMap(([location, vm]) =>
  //       this.#locationService.updateLocation(location).pipe(
  //         tapResponse(
  //           (response) => {
  //             this.#snackBar.openSnackBar('Update Successfully', 'success');
  //             this.getListLocations({ filter: vm.filter });
  //           },
  //           (error: HttpErrorResponse) => this.#errorHandler(error)
  //         )
  //       )
  //     )
  //   )
  // );

  // deleteLocation = this.effect<string>((locationId$) =>
  //   locationId$.pipe(
  //     tap(() => this.#ngxLoader.start()),
  //     withLatestFrom(this.vm$),
  //     switchMap(([locationId, vm]) =>
  //       this.#locationService.deleteLocation(locationId).pipe(
  //         tapResponse(
  //           (response) => {
  //             this.#snackBar.openSnackBar('Delete Successfully', 'success');
  //             this.getListLocations({ filter: vm.filter });
  //           },
  //           (error: HttpErrorResponse) => this.#errorHandler(error)
  //         )
  //       )
  //     )
  //   )
  // );

  // getLocationDetails = this.effect<string>((locationId$) =>
  //   locationId$.pipe(
  //     tap(() => this.#ngxLoader.start()),
  //     switchMap((locationId) =>
  //       this.#locationService.getLocationById(locationId).pipe(
  //         tapResponse(
  //           (response) => {
  //             this.#dialog.open(LocationFormDialogComponent, {
  //               width: '400px',
  //               data: response,
  //               disableClose: true,
  //             });

  //             this.#ngxLoader.stop();
  //           },
  //           (error: HttpErrorResponse) => this.#errorHandler(error)
  //         )
  //       )
  //     )
  //   )
  // );

  // readonly sortData = this.updater<{
  //   sortBy: string | undefined;
  //   sortDirection: string | undefined;
  // }>((state, { sortBy, sortDirection }) => {
  //   let sortedData = state.data.slice();
  //   if (!sortBy || sortDirection === '') {
  //     return state;
  //   }

  //   sortedData = sortedData.sort((a, b) => {
  //     const isAsc = sortDirection === 'asc';
  //     switch (sortBy) {
  //       case 'name':
  //         return compare(a.name, b.name, isAsc);
  //       case 'city':
  //         return compare(a.city, b.city, isAsc);
  //       case 'state':
  //         return compare(a.state, b.state, isAsc);
  //       case 'availableUnits':
  //         return compare(a.availableUnits, b.availableUnits, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });

  //   return {
  //     ...state,
  //     data: sortedData,
  //     filter: {
  //       ...state.filter,
  //       sortBy,
  //       sortDirection,
  //     },
  //   };
  // });

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
