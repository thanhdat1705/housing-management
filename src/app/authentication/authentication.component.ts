import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationStore } from './data-access';

@Component({
  selector: 'acorn-authentication',
  templateUrl: 'authentication.component.html',
  styleUrls: ['authentication.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthenticationStore],
  imports: [FormsModule, ReactiveFormsModule],
})
export class AuthenticationComponent {
  #authenticationStore = inject(AuthenticationStore);

  form = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  signIn() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return;
    }

    this.#authenticationStore.signIn(this.form.getRawValue());
  }
}
