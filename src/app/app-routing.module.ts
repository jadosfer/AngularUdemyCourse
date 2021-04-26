import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from "./admin/about/about.component";
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TasksComponent } from './employee/tasks/tasks.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, data: { linkIndex: 2 } },
  { path: "signup", component: SignUpComponent, canDeactivate: [ CanDeactivateGuardService ], data: { linkIndex: 3 } },
  { path: "about", component: AboutComponent, data: { linkIndex: 1 } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing:false })],
  exports: [RouterModule]
})
export class AppRoutingModule
{
}
