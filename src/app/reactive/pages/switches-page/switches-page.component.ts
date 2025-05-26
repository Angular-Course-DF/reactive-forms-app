import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;
  myForm = this.fb.group({
    // gender: ['M', Validators.required],
    gender: [, Validators.required],
    wantsNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  submit() {
    this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
  }
}
