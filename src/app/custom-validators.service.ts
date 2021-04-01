import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService
{
  constructor(private loginService: LoginService) { }

  public minimumAgeValidator(minAge: number): ValidatorFn
  {
    return (control: AbstractControl): ValidationErrors | null =>
    {
      if (!control.value)
        return null; //return, if the date of birth is null

      var today = new Date();
      var dateOfBirth = new Date(control.value);
      var diffMilliSeconds = Math.abs(today.getTime() - dateOfBirth.getTime());
      var diffYears = (diffMilliSeconds / (1000 * 60 * 60 * 24)) / 365.25;

      if (diffYears >= minAge)
        return null; //valid
      else
        return { minAge: { valid: false } }; //invalid
    };
  } 
  
  public confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
      }
    }

  public DuplicateEmailValidator(): AsyncValidatorFn
  {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
    {
      return this.loginService.getUserByEmail(control.value).pipe(map((existingUser: any) =>
      {
        if (existingUser != null)
        {
          return { uniqueEmail: { valid: false } }; //invalid
        }
        else
        {
          return null;
        }
      }));
    };
  }
}

