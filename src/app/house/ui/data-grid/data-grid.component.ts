import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HouseStore } from '../../data-access';
import { PricePipe } from '../../../common/utils';

@Component({
  selector: 'hm-data-grid',
  templateUrl: 'data-grid.component.html',
  styleUrls: ['data-grid.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbAccordionModule, AsyncPipe, NgIf, PricePipe],
})
export class DataGridComponent implements OnInit {
  houseStore = inject(HouseStore);

  ngOnInit(): void {}

  detailHouse() {}
}
