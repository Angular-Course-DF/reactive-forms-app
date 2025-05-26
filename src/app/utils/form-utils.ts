import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export class FormUtils {
  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getErrorMessage(errors: ValidationErrors) {
    console.log('Errores de validación:', errors);

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
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return `El valor ingresado no parece un correo electrónico válido..`;
          }
          return 'Error de patrón contra expresión regular';
        default:
          return `Error de validación no controlado: ${key}`;
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

  static isFieldOneEqualToFieldTwo(field: string, field2: string) {
    /**
     * * AbstractControl nos permite acceder a los valores de los campos del formulario
     * * y a sus validaciones
     */
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field)?.value; // *puede que el valor no exista o este nulo en ese momento
      const field2Value = formGroup.get(field2)?.value; // *puede que el valor no exista o este nulo en ese momento
      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }
}
