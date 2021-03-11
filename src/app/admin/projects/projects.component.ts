import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../projects.service";
import { Project } from 'src/app/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit
{
  projects: Project[] = [];
  newProject: Project = new Project();

  constructor(private projectsService: ProjectsService)
  {
  }

  ngOnInit()
  {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      }
    );
  }

  onSaveClick()
  {
    this.projectsService.insertProject(this.newProject).subscribe((response) => {
      this.newProject = response;           
      this.projects.push(this.newProject);

      //Clear New Project Dialog - TextBoxes
      this.newProject.projectID = 0;
      this.newProject.projectName = "";
      this.newProject.dateOfStart = "";
      this.newProject.teamSize = 0;
    }, (error) => {
      console.log(error);
    });
  }
}