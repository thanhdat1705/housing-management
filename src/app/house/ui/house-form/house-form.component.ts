import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxMaskDirective } from 'ngx-mask';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { TitleCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HouseService } from '../../../common/data-access';
import {
  HOUSE_MODEL,
  HOUSE_STATUS,
  HOUSE_TYPE,
  HouseInfor,
} from '../../../common/utils';
import { HouseStore } from '../../data-access';

@Component({
  selector: 'hm-house-form',
  templateUrl: 'house-form.component.html',
  styleUrls: ['house-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, TitleCasePipe, NgxMaskDirective],
})
export class HouseFormComponent implements OnInit {
  houseStore = inject(HouseStore);
  #houseService = inject(HouseService);
  #ngxLoader = inject(NgxUiLoaderService);

  houseId: string | null = null;
  houseInfor = signal<HouseInfor | null>(null);

  HOUSE_TYPE = HOUSE_TYPE;
  HOUSE_STATUS = HOUSE_STATUS;
  HOUSE_MODEL = HOUSE_MODEL;

  formGroup = new FormGroup({
    block_number: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    house_number: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    house_type: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    land_number: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    model: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    status: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number | null>(null, Validators.required),
  });

  constructor(private activatedRoute: ActivatedRoute) {
    this.houseId = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.houseId) {
      this.#ngxLoader.start();
      this.#houseService.getHouseDetails(this.houseId).subscribe((response) => {
        this.houseInfor.set({
          ...response.data.attributes,
        });
        this.formGroup.patchValue(this.houseInfor() as HouseInfor);
        this.#ngxLoader.stop();
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return;
    }

    if (this.houseId) {
      //Update here
      this.houseStore.updateHouse({
        id: this.houseId,
        house: this.formGroup.getRawValue() as HouseInfor,
      });
    } else {
      //Create here
      this.houseStore.createHouse(this.formGroup.getRawValue() as HouseInfor);
    }
  }

  isError(controlName: keyof typeof this.formGroup.controls) {
    return (
      this.formGroup.controls[controlName].invalid &&
      this.formGroup.controls[controlName].dirty
    );
  }
}
