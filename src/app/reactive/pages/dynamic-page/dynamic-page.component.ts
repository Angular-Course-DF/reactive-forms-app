import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  //hacerlo tipo formGroup facilita para verificar las propiedades del formulario
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear Solid', [Validators.required, Validators.minLength(3)]],
        ['Final Fantasy VII', [Validators.required, Validators.minLength(3)]],
      ],
      [Validators.minLength(4)]
    ),
  });

  getFavoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // isValidFieldInArray(formArray: FormArray, index: number) {
  //   return (
  //     formArray.controls[index].errors && formArray.controls[index].touched
  //   );
  // }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
