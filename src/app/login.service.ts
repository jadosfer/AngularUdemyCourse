import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  private httpClient : HttpClient; //esto es para que no se llame al interceptor cuando quiero autorizar (el intercep me agrega el token en el request)
  constructor(private httpBackend: HttpBackend) //esto tambien
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
}