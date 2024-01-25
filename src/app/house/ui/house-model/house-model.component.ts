import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { HouseStore } from '../../data-access';
import { DataGridComponent } from '../data-grid';

@Component({
  selector: 'hm-house-model',
  templateUrl: 'house-model.component.html',
  styleUrls: ['house-model.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataGridComponent],
})
export class HouseModelComponent implements OnInit {
  // #dialog = inject(MatDialog);
  // #locationStore = inject(LocationsStore);
  houseStore = inject(HouseStore);

  ngOnInit(): void {
    this.houseStore.getHouseList({});
  }

  onCreate(): void {}
}
