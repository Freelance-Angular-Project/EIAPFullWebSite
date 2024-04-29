import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../Services/Project/project.service';
import { ProjectDetailsAll, ProjectFileForProjectDetails, SchoolForProjectDetails, TaskForProjectDetails } from '../../../../Models/Projects/project-details-all';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  project: ProjectDetailsAll = {} as ProjectDetailsAll;
  ProjectFiles : ProjectFileForProjectDetails[] | undefined=[];
  SchoolsProject:SchoolForProjectDetails[]| undefined=[];
  TasksProject : TaskForProjectDetails[] | undefined=[];
  currentProjectID: string = '';
  selectedProjectFileId : string = '';
  selectedProjectSchoolId:string = '';
  selectedProjectTaskId:string = '';
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private projectservices: ProjectService
  ) {}
  ngOnInit(): void {
    this.currentProjectID =
      this.activatedrouter.snapshot.paramMap.get('id') || '';

    this.projectservices.GetByIdToDashboard(this.currentProjectID).subscribe({
      next: (currentproject) => {
        this.project = currentproject;
        console.log(this.project);

        this.ProjectFiles = this.project.files;
        this.SchoolsProject = this.project.schools;
        this.TasksProject= this.project.tasks
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack(){
    this.router.navigate(['/ProjectDashboard'])
  }
  selectProjectFile(id :string){
    this.selectedProjectFileId = id;
  }
  selectSchoolFile(id :string){
    this.selectedProjectSchoolId = id;
  }
  selectProjectTask(id :string){
    this.selectedProjectTaskId = id;
  }
}
