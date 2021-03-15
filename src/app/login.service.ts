import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginViewModel } from './login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  currentUserName: string = "";

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    return this.httpClient.post<any>("/authenticate", loginViewModel, {responseType: "json"})
    .pipe(map(user => {
      if (user) {
        this.currentUserName = user.UserName;
      }
      return user;
    }));
  }

  public Logout(){
    this.currentUserName = "";
  }
}
