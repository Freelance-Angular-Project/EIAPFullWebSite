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
import { EditTask } from '../../../../../Models/Tasks/edit-task';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss',
})
export class TasksDashboardComponent implements OnInit {
  tasksInDashboard: TasksToDashboard[] = [];
  projects: ProjectDashboard[] = [];
  form!: FormGroup;

  selectedTaskId: string = '';
  SelectedProjectId: string = '';
  // form file input check
  fileTouched = false;
  fileInvalid = false;
  isUploading: boolean = false;
  fileUploaded: boolean = false;

  numberOfFileSelected: number = 1;
  uploadedFiles: { [taskId: string]: boolean } = {}; // Dictionary to track upload status per task
  CurrentTask: EditTask = {} as EditTask;

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
    //this.loadUploadStatus();
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

  selectTask(task: TasksToDashboard) {
    this.selectedTaskId = task.id;
    this.CurrentTask = {
      name: task.name,
      details: task.details,
      numberOfFilesToAssignment: task.numberOfFilesToAssignment,
      endDate: this.convertDateDMYtoYMD(task.endDate.toString()),
    };
  }
  convertDateDMYtoYMD(dateStr: string): string {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
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
  onFileSelected(taskId: string, event: Event): void {
    const element = event.target as HTMLInputElement;
    if (
      element.files &&
      element.files.length > 0 &&
      !this.uploadedFiles[taskId]
    ) {
      this.uploadFile(taskId, element.files[0]);
    }
  }

  uploadFile(taskId: string, file: File): void {
    this.isUploading = true;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('TaskId', taskId);

    this.fileService.uploadFile(formData).subscribe({
      next: (response) => {
        this.uploadedFiles[taskId] = true; // Set the upload flag to true for this task
        // this.CurrentTask.numberOfFilesToAssignment = 2;

        // Use switchMap to chain the updateTask call
        this.taskdashboardService
          .updateTask(taskId, this.CurrentTask)
          .subscribe({
            next: () => {
              location.reload();
              this.isUploading = false;
            },
            error: (error) => {
              console.error('Error updating task:', error);
              this.isUploading = false;
            },
          });
      },
      error: (error) =>
        console.error('Error uploading file for task', taskId, error),
    });
  }

  // loadTasks(): void {
  //   // Simulate fetching tasks
  //   this.tasksInDashboard.forEach((task) => {
  //     if (!this.uploadedFiles.hasOwnProperty(task.id)) {
  //       this.uploadedFiles[task.id] = false; // Initialize upload status for new tasks
  //     }
  //   });
  // }
}
