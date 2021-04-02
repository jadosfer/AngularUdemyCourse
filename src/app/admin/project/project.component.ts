import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit
{
  @Input("currentProject") project: Project;
  @Input("recordIndex") i: number;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  hideDetails: boolean = false;

  constructor(public projectsService : ProjectsService)
  {
  }

  ngOnInit()
  {
    this.projectsService.MyObservable.subscribe((hide) => {
      this.hideDetails = hide;
    });
  }

  onEditClick(event, i)
  {
    this.editClick.emit({ event, i});
  }

  onDeleteClick(event, i)
  {
    this.deleteClick.emit({ event, i});
  }
}


