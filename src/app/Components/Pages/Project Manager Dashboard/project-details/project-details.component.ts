import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../Services/Project/project.service';
import { ProjectDetailsAll, ProjectFileForProjectDetails, SchoolForProjectDetails, TaskForProjectDetails } from '../../../../Models/Projects/project-details-all';
import { FilesService } from '../../../../Services/Files/files.service';
import { TaskService } from '../../../../Services/Task/task.service';
declare var bootstrap: any;
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
    private projectservices: ProjectService,
    private filesService:FilesService,
    private taskService:TaskService
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
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  openConfirmModal(){
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  openConfirmModal1(){
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal1'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  openConfirmModal2(){
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal2'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }


  deleteProjectFile(){
    this.filesService.deleteFile(this.selectedProjectFileId).subscribe({
      next:()=>{
        const confirmModal = bootstrap.Modal.getInstance(
          document.getElementById('confirmDeleteModal')
        );
        confirmModal.hide();
        this.reloadComponent();

      },
      error: (err) => {console.log(err);
      }
     });

  }
  deleteProjectSchool(){
    console.log(this.currentProjectID);
    console.log(this.selectedProjectSchoolId);


    this.projectservices.deleteSchoolFromProject(this.currentProjectID, this.selectedProjectSchoolId).subscribe({
      next:()=>{
        const confirmModal = bootstrap.Modal.getInstance(
          document.getElementById('confirmDeleteModal1')
        );
        confirmModal.hide();
        this.reloadComponent();

      },
      error: (err) => {console.log(err);
      }
     });
  }

  deleteProjectTask(){
    this.taskService.deleteTask(this.selectedProjectTaskId).subscribe({
      next:()=>{
        const confirmModal = bootstrap.Modal.getInstance(
          document.getElementById('confirmDeleteModal2')
        );
        confirmModal.hide();
        this.reloadComponent();

      },
      error: (err) => {console.log(err);
      }
    })
  }
}
