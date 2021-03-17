import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  private httpClient : HttpClient; //esto es para que no se llame al interceptor cuando quiero autorizar (el intercep me agrega el token en el request)
  constructor(private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService) //esto tambien
  {
  }

  currentUserName: string  = null;

  public Login(loginViewModel: LoginViewModel): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend); //esto tambien
    return this.httpClient.post<any>("/authenticate", loginViewModel, { responseType: "json" })
    .pipe(map(user => {      
      if (user)
      {
        console.log("nombre user: " + user.userName);
        this.currentUserName = user.userName;
        sessionStorage.currentUser = JSON.stringify(user);
      }
      return user;
    }));
  }

  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }

  public isAuthenticated(): boolean
  {
    var token = sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser")).token : null;
    if (this.jwtHelperService.isTokenExpired())
    {
      return false; //token is not valid
    }
    else
    {
      return true; //token is valid
    }
  }
}



