import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  constructor(public loginService : LoginService, private domSanitizer: DomSanitizer)
  {
  }

  myProperty = "<svg>blah</svg>"; //prueba de seguridad XSS
  //myProperty2 = "<script>alert(document.cookie)</script>"; 
  myProperty2 = this.domSanitizer.bypassSecurityTrustHtml("<iframe src='http://www.lipsum.com'></iframe>");
  myProperty3 = this.domSanitizer.bypassSecurityTrustUrl("javascript:window.open('http://www.google.com')");
  myProperty4 = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg");

  onSearchClick()
  {
    console.log(this.loginService.currentUserName);
  }
}