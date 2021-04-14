import { Component, OnInit, Input, EventEmitter, Output, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

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
  MySubscription: Subscription;

  constructor(public projectsService : ProjectsService)
  {
  }

  ngOnInit()
  {
    this.MySubscription = this.projectsService.MySubject.subscribe((hide) => {
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

  ngOnDestroy()
  {
    this.MySubscription.unsubscribe();
  }

  @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent;

  isAllCheckedChange(b: boolean)
  {
    if (b)
    {
      this.selectionBox.check(); 
    }
    else
    {
      this.selectionBox.unCheck();
    }
  }
}

