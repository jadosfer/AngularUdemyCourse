import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/admin/services/login.service';
import { LoginViewModel } from 'src/app/models/login-view-model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";

  constructor(private loginService: LoginService, private router : Router)
  {
  }

  @ViewChild("logOut") logOut: ElementRef;

  ngOnInit()
  {
    setTimeout(() => {
      this.logOut.nativeElement.focus();
    }, 100);
  }

  onLoginClick(event)
  {
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) => {
        this.router.navigate(["/admin", "dashboard"]);
      },
      (error) => {
        console.log(error);
        this.loginError = "Invalid Username or Password";
      },
    );
  }

}
