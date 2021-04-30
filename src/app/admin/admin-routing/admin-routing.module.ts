import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';
import { MastersComponent } from '../components/masters/masters.component';


const routes: Routes = [
  { path: "", canActivate: [ CanActivateGuardService ], data: { expectedRole: "Admin" }, children: [
    { path: "dashboard", component: DashboardComponent, data : {linkIndex: 0 }  },
    { path: "projects", component: ProjectsComponent, data : {linkIndex: 2 } },
    { path: "projects/view/:projectid", component: ProjectDetailsComponent, data : {linkIndex: 3 } },
    { path: "masters", component: MastersComponent, data : {linkIndex: 4 } },
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
