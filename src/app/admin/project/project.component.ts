import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/project';


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

  constructor()
  {
  }

  ngOnInit()
  {
  }

  
}

