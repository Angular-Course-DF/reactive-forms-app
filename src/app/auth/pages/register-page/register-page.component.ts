import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;
  registerForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(FormUtils.namePattern)],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(FormUtils.notOnlySpacesPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);
  }
}
