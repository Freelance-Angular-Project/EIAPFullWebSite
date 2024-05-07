import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../../Services/Task/task.service';
import { TasksToDashboard } from '../../../../../Models/Tasks/tasks-to-dashboard';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../../Services/Project/project.service';
import { ProjectDashboard } from '../../../../../Models/Projects/project-dashboard';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilesService } from '../../../../../Services/Files/files.service';
import { AddAssignment } from '../../../../../Models/Assignments/add-assignment';
declare var bootstrap: any;

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss',
})
export class TasksDashboardComponent implements OnInit {
  tasksInDashboard: TasksToDashboard[] = [];
  projects: ProjectDashboard[] = [];
  form!: FormGroup;

  selectedTaskId: string | null = null;
  SelectedProjectId: string = '';
  // form file input check
  fileTouched = false;
  fileInvalid = false;
  isUploading: boolean = false;
  fileUploaded: boolean = false;

  numberOfFileSelected:number=0;

  model: AddAssignment = {} as AddAssignment;

  constructor(
    private taskdashboardService: TaskService,
    private router: Router,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private fileService: FilesService
  ) {
    this.form = this.fb.group({
      projectId: ['', Validators.required], // Initialize the form control
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
      },
    });
  }
  onChangeProject(): void {
    this.form.get('projectId')?.valueChanges.subscribe((selectedProjectId) => {
      this.loadProjectDetails(selectedProjectId);
    });
  }
  loadProjectDetails(projectId: string): void {
    this.taskdashboardService
      .getTasksByProjectIdDashboard(projectId)
      .subscribe({
        next: (tasks) => {
          this.tasksInDashboard = tasks;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  selectProjectId(id: string) {
    this.SelectedProjectId = id;
  }

  selectProject(id: string) {
    this.selectedTaskId = id;
  }
  openConfirmModal() {
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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteSchool() {
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

  goTaskDetails(id: string) {
    this.router.navigate(['/TaskDetailsInDashboard', id]);
  }
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.model.File = element.files[0];
      this.fileTouched = true;  // Flag to indicate the file input was touched
      this.fileInvalid = false; // Reset any previous invalid file flag
    } else {
      this.fileInvalid = true;  // Set invalid file flag if no file is selected
    }



    this.UploadFile();
  }


  UploadFile(): void {
    this.numberOfFileSelected = 0;
    // Only proceed if a file has been selected and the upload hasn't been triggered yet
    if (this.fileTouched && !this.isUploading) {
      const formData = new FormData();
      this.isUploading = true; // Set uploading flag

      if (this.selectedTaskId) {
        formData.append('TaskId', this.selectedTaskId);
      }
      formData.append('Name', 'test');

      // Append model data to formData
      Object.keys(this.model).forEach(key => {
        const value = this.model[key];
        if (value !== undefined && value !== null) { // Check for both undefined and null
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, String(value));
          }
        }
      });


      // Perform the file upload
      this.fileService.uploadFile(formData).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.isUploading = true; // Reset uploading flag after successful upload
          this.fileTouched = false; // Reset file touched flag after successful upload
          this.numberOfFileSelected = 1;
        },
        error: (error) => {
          console.error('Error uploading file', error);
          this.isUploading = false; // Reset uploading flag if error occurs
        }
      });
    } else {
      if (!this.fileTouched) {
        console.log('No file change detected, not uploading.');
      }
      if (this.isUploading) {
        console.log('Upload already in progress.');
      }
    }


  }

  // deleteFile(fileId: string): void {
  //   // You'd typically pass a fileId or some identifier to download specific file
  //   this.fileService.deleteFile(fileId).subscribe({
  //     next: (response) => console.log('File successfully deleted', response),
  //     error: (error) => console.error('Error deleting file', error),
  //   });
  // }
}
