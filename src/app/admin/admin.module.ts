import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { AboutComponent } from "./about/about.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { NgModule } from '@angular/core';
import { ProjectComponent } from './components/project/project.component';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { DashboardService } from "./services/dashboard.service";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent
  ],
  imports: [ SharedModule, AdminRoutingModule ],
  exports: [ DashboardComponent, MyProfileComponent, AboutComponent, ProjectsComponent, ProjectDetailsComponent],
  providers: [ DashboardService ]
})
export class AdminModule
{
}
