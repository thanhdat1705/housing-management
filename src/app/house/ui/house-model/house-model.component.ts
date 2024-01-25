import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SecurityService } from '../../../common/data-access';
import { HouseStore } from '../../data-access';
import { DataGridComponent } from '../data-grid';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hm-house-model',
  templateUrl: 'house-model.component.html',
  styleUrls: ['house-model.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataGridComponent, RouterModule, FormsModule, ReactiveFormsModule],
})
export class HouseModelComponent implements OnInit {
  houseStore = inject(HouseStore);
  securityService = inject(SecurityService);

  blockControl: FormControl = new FormControl('');
  houseControl: FormControl = new FormControl('');
  landControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.houseStore.getHouseList({});

    this.blockControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: string) => {
        this.houseStore.getHouseList({ filter: { blockNumber: query } });
      });
  }

  onCreate(): void {}
}
