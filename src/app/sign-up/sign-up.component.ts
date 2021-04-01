import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CustomValidatorsService } from '../custom-validators.service';
import { LoginService } from '../login.service';
import { SignUpViewModel } from '../sign-up-view-model';


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
  submitted: boolean = false; //lo agregué  yo para poder determinar el submitted
  registerError: string = null;

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder, private customValidatorsService: CustomValidatorsService, private loginService: LoginService, private router: Router)
  {
  }

  ngOnInit()
  {    
    this.countriesService.getCountries().subscribe((response) =>
    {
      this.countries = response;
    });

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
      skills: this.formBuilder.array([]),
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { 
      validator: this.customValidatorsService.confirmedValidator('password', 'confirmPassword')    
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
    this.submitted = true; //esto lo agregué porque no funcionaba el submited hecho como arriba
    console.log(this.signUpForm);

    if (this.signUpForm.valid)
    {
      var signUpVieModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpVieModel).subscribe(
        (response) => {
          this.router.navigate( [ "tasks" ]);
        },
        (error) => {
          console.log(error);
          this.registerError = "Unable to submit";
        });
    }
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
