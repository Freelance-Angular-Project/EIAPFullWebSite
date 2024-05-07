import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../../Services/Task/task.service';
import { TasksToDashboard } from '../../../../../Models/Tasks/tasks-to-dashboard';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../../Services/Project/project.service';
import { ProjectDashboard } from '../../../../../Models/Projects/project-dashboard';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilesService } from '../../../../../Services/Files/files.service';
declare var bootstrap: any;

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent implements OnInit {
 tasksInDashboard:TasksToDashboard[]=[];
 projects:ProjectDashboard[]=[];
 form!: FormGroup;

 selectedTaskId : string | null = null;
 SelectedProjectId:string='';
constructor(private taskdashboardService: TaskService,
  private router: Router,
  private projectService:ProjectService,
  private fb: FormBuilder,
  private fileService: FilesService
){
  this.form = this.fb.group({
    projectId: ['', Validators.required] // Initialize the form control
  });
}
  ngOnInit(): void {

    this.loadProjects();
    this.onChangeProject();
  }
  loadProjects(): void {
    this.projectService.getAllProjectsToDashboard().subscribe({
      next: (allprojects) => {
        this.projects = allprojects;
        this.selectProjectId(this.SelectedProjectId);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onChangeProject(): void {
    this.form.get('projectId')?.valueChanges.subscribe(selectedProjectId => {
      this.loadProjectDetails(selectedProjectId);
    });
  }
  loadProjectDetails(projectId: string): void {
    this.taskdashboardService.getTasksByProjectIdDashboard(projectId).subscribe({
      next:(tasks)=>{
        this.tasksInDashboard=tasks;
      },
      error:(err)=>{
        console.log(err);

      }
    });
  }
  selectProjectId(id :string){
    this.SelectedProjectId = id;
  }


  selectProject(id :string){
    this.selectedTaskId = id;
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

  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteSchool(){
    if (this.selectedTaskId) {
      this.taskdashboardService.deleteTask(this.selectedTaskId).subscribe({
        next: (data) => {
          const confirmModal = bootstrap.Modal.getInstance(
            document.getElementById('confirmDeleteModal')
          );
          confirmModal.hide();
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('No Task selected for deletion');
    }
  }

  goTaskDetails(id:string){

     this.router.navigate(['/TaskDetailsInDashboard',id])
  }
  UploadFile(): void {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput instanceof HTMLInputElement && fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();
      if(this.selectedTaskId){
      formData.append('TaskId', this.selectedTaskId);}

      formData.append('ProjectId', this.SelectedProjectId);
      // formData.append('SchoolId', );
      // formData.append('Name', );
      // formData.append('Description', );
      // formData.append('EndDate', );
      // formData.append('IsPublic', );


      this.fileService.uploadFile(formData).subscribe({
        next: (response) => {
          console.log('Upload successful', response);

        },
        error: (error) => console.error('Error uploading file', error)
      });
    } else {
      console.error('No file selected or file input not found');
    }
  }


  // Method to trigger file download - here you might need more details depending on how you handle it
  DownloadFile(fileId: string): void {
    // You'd typically pass a fileId or some identifier to download specific file
    this.fileService.deleteFile(fileId).subscribe({
      next: (response) => console.log('File successfully deleted', response),
      error: (error) => console.error('Error deleting file', error)
    });
  }
}
