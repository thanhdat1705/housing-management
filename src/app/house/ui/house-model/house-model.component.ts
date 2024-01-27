import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { SecurityService } from '../../../common/data-access';
import { HouseStore } from '../../data-access';
import { DataGridComponent } from '../data-grid';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'hm-house-model',
  templateUrl: 'house-model.component.html',
  styleUrls: ['house-model.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DataGridComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
})
export class HouseModelComponent implements OnInit {
  houseStore = inject(HouseStore);
  securityService = inject(SecurityService);

  blockControl: FormControl = new FormControl(null);
  houseControl: FormControl = new FormControl(null);
  landControl: FormControl = new FormControl(null);
  minControl: FormControl = new FormControl(null);
  maxControl: FormControl = new FormControl(null);

  ngOnInit(): void {
    this.houseStore.getHouseList({});

    this.blockControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.houseStore.getHouseList({ filter: { block_number: query } });
      });

    this.houseControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.houseStore.getHouseList({ filter: { house_number: query } });
      });

    this.landControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.houseStore.getHouseList({ filter: { land_number: query } });
      });

    this.minControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: number) => {
        this.houseStore.getHouseList({ filter: { min_price: query } });
      });

    this.maxControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: number) => {
        this.houseStore.getHouseList({ filter: { max_price: query } });
      });
  }

  onCreate(): void {}
}
