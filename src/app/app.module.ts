import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterDirective } from './directives/repeater.directive';
import { EmployeeModule } from './employee/employee.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './admin/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,    
    AlertDirective,
    RepeaterDirective,
    AboutComponent
  ],
  imports: [ SharedModule,
    BrowserModule,
    AppRoutingModule,    
    EmployeeModule,
    BrowserAnimationsModule,  
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser")).token : null)
        }
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
