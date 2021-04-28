
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { AboutComponent } from "./about/about.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../directives/project-idunique-validator.directive';
import { ProjectComponent } from './components/project/project.component';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { CommonModule } from "@angular/common";
import { NumberToWordsPipe } from "../pipes/number-to-words.pipe";
import { FilterPipe } from "../pipes/filter.pipe";
import { PagingPipe } from "../pipes/paging.pipe";
import { DashboardService } from "./services/dashboard.service";



@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    ProjectComponent,
    CheckBoxPrinterComponent,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    ProjectDetailsComponent
  ],
  imports: [ CommonModule, FormsModule, AdminRoutingModule ],
  exports: [ DashboardComponent, MyProfileComponent, AboutComponent, ProjectsComponent, TeamSizeValidatorDirective, ClientLocationStatusValidatorDirective, ProjectIDUniqueValidatorDirective, ProjectDetailsComponent],
  providers: [ DashboardService ]
})
export class AdminModule
{
}
