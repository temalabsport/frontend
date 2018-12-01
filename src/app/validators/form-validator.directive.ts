import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const inputDate = new Date(control.value);
    const forbidden = new Date() > inputDate;
    return forbidden ? {'forbiddenDate': {value: control.value}} : null;
  };
}
