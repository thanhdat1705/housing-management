import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../common/ui';
import { HouseStore } from './data-access';

@Component({
  selector: 'hm-house',
  templateUrl: 'house.component.html',
  styleUrls: ['house.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HouseStore],
  imports: [RouterOutlet, HeaderComponent],
})
export class HouseComponent {}
