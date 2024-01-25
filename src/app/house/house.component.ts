import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HeaderComponent } from '../common/ui';

@Component({
  selector: 'hm-house',
  templateUrl: 'house.component.html',
  styleUrls: ['house.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent],
})
export class HouseComponent {
  // #dialog = inject(MatDialog);
  // #locationStore = inject(LocationsStore);

  onCreate(): void {
    // const dialogRef = this.#dialog.open(LocationFormDialogComponent, {
    //   width: '400px',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.#locationStore.createLocation({
    //       ...result,
    //       id: uuid(),
    //       photo:
    //         'https://angular.io/assets/images/tutorials/faa/r-architecture-GGupkreKwxA-unsplash.jpg',
    //     });
    //   }
    // });
  }
}
