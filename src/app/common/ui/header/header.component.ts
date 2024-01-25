import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, SecurityService } from '../../data-access';

@Component({
  selector: 'hm-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
})
export class HeaderComponent {
  #router = inject(Router);
  securityService = inject(SecurityService);

  onReload(): void {
    window.location.reload();
  }

  signOut() {
    this.securityService.handleRemoveToken();
    this.#router.navigate(['/auth']);
  }
}
