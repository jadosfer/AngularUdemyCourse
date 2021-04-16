import { Component, OnInit, Input, EventEmitter, Output, ContentChild, ContentChildren, QueryList, SimpleChanges, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges, OnInit
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

  ngOnChanges(simpleChanges: SimpleChanges){
    console.info("------------ngOnChanges called");
    for (let propName in simpleChanges)
    {
      let chng = simpleChanges[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    if (simpleChanges["project"])
    {
      //this.project.teamSize += 1; //esto fue un ejercicio para ver qué se puede hacer en ngOnChanges
    }   
  }


  ngOnInit()
  {
    console.info("------------ngOnInit called");
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

  @ContentChildren("selectionBox") selectionBoxes: QueryList<CheckBoxPrinterComponent>;

  isAllCheckedChange(b: boolean)
  {
    let selectionBox = this.selectionBoxes.toArray();
    if (b)
    {
      for (let i=0;i<selectionBox.length;i++) {
        selectionBox[i].check(); 
      }      
    }
    else
    {
      for (let i=0;i<selectionBox.length;i++) {
        selectionBox[i].unCheck();
      }            
    }
  }
}

