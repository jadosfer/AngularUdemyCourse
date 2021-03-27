import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CustomValidatorsService } from '../custom-validators.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit
{
  signUpForm: FormGroup;
  genders = ["male", "female"];
  countries: Country[] = []
  submitted: boolean = false;

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder, private customValidatorsService: CustomValidatorsService, private loginService: LoginService, private router: Router)
  {
  }

  ngOnInit()
  {
    this.countries = this.countriesService.getCountries();

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [ Validators.required, Validators.minLength(2)]],
        lastName: [null, [ Validators.required, Validators.minLength(2)]],
      }),
      
      email: [null, [ Validators.required, Validators.email]],
      mobile: [null, [ Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],      
      dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      gender: [null, [ Validators.required]],
      countryID: [null, [ Validators.required]],
      receiveNewsLetters: [null],
      skills: this.formBuilder.array([])
    });

    this.signUpForm.valueChanges.subscribe((value) =>
    {
      //console.log(value);
    });
  }

  onSubmitClick()
  {
    //Display current form value
    this.signUpForm["submitted"] = true;
    this.submitted = true;
    console.log(this.signUpForm);

    //setValue
    // this.signUpForm.setValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com",
    //   mobile: "9876543210",
    //   dateOfBirth: "2020-01-01",
    //   gender: "male",
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    //patchValue
    // this.signUpForm.patchValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });

    //reset
    //this.signUpForm.reset();

    //reset with Parameters
    // this.signUpForm.reset({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });
  }

  onAddSkill()
  {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, [ Validators.required]),
      level: new FormControl(null, [ Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }
}
