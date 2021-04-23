import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateGuardService } from 'src/app/can-activate-guard.service';
import { TasksComponent } from '../tasks/tasks.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "employee", canActivate: [ CanActivateGuardService ], data: { expectedRole: "Employee" }, children: [
    { path: "tasks", component: TasksComponent },
  ]},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
