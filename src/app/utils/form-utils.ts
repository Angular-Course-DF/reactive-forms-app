import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static getErrorMessage(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'min':
          return `Valor mínimo de ${errors[key].min}`;
        case 'email':
          return `El valor ingresado no es un correo electrónico válido.`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    return this.getErrorMessage(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(formArray: FormArray, index: number) {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};
    return this.getErrorMessage(errors);
  }
}
