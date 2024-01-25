import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { PricePipe } from '../../../common/utils';
import { HouseStore } from '../../data-access';
import { SecurityService } from '../../../common/data-access';

@Component({
  selector: 'hm-data-grid',
  templateUrl: 'data-grid.component.html',
  styleUrls: ['data-grid.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbAccordionModule, AsyncPipe, NgIf, PricePipe, RouterModule],
})
export class DataGridComponent implements OnInit {
  houseStore = inject(HouseStore);
  securityService = inject(SecurityService);

  ngOnInit(): void {}

  detailHouse() {}
}
