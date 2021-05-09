import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { LoginService } from '../../../services/login.service';
import { GroupedTask } from '../../../models/grouped-task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit
{
  taskGroups: GroupedTask[];

  constructor(private tasksService: TasksService, public loginService: LoginService)
  {
  }

  ngOnInit()
  {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroups = response;
    });
  }

  /* Get background color based on task status */
  getTaskGroupBgCssClass(taskStatusName) : string
  {
    var className;
    switch (taskStatusName)
    {
      case "Holding": className = "bg-secondary text-white"; break; //gray
      case "Prioritized": className = "bg-primary text-white"; break; //blue
      case "Started": className = "bg-info text-white"; break; // light
      case "Finished": className = "bg-success text-white"; break; //green
      case "Reverted": className = "bg-danger text-white"; break; //red
    }
    return className;
  }

  /* Get background color based on task priority */
  getTaskPriorityBadgeCssClass(taskPriorityName) : string
  {
    var className;
    switch (taskPriorityName)
    {
      case "Urgent": className = "badge-danger"; break; //red
      case "Normal": className = "badge-primary"; break; //blue
      case "Below Normal": className = "badge-info"; break; // light blue
      case "Low": className = "badge-secondary"; break; // gray
    }
    return className;
  }

  /* Get text color based on task status */
  getTaskGroupTextCssClass(taskStatusName) : string
  {
    var className;
    switch (taskStatusName)
    {
      case "Holding": className = "text-secondary"; break; //gray
      case "Prioritized": className = "text-primary"; break; //blue
      case "Started": className = "text-info"; break;// light blue
      case "Finished": className = "text-success"; break; //green
      case "Reverted": className = "text-danger"; break; //red
    }
    return className;
  }
}
