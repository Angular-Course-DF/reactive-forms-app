import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // ** la mejor manera de crear el formulario es la siguiente
  private fb = inject(FormBuilder);

  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0],
  });

  // ! esta manera de crear el formulario es la mas comun, pero la mas larga y tediosa
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // isValidField(fieldName: string): boolean | null {
  //   return (
  //     !!this.myForm.controls[fieldName].errors &&
  //     this.myForm.controls[fieldName].touched
  //   );
  // }
  // getFieldError(fieldName: string): string | null {
  //   if (!this.myForm.controls[fieldName]) return null;

  //   const errors = this.myForm.controls[fieldName].errors ?? {};

  //   for (const key of Object.keys(errors)) {
  //     switch (key) {
  //       case 'required':
  //         return 'Este campo es requerido';
  //       case 'minlength':
  //         return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
  //       case 'min':
  //         return `Este campo debe ser mayor a ${errors[key].min}`;
  //     }
  //   }
  //   return null;
  // }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
