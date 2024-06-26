import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../../Services/Task/task.service';
import { Task } from '../../../../../Models/Tasks/task';
import { TaskDetails } from '../../../../../Models/Tasks/task-details';
import { FilesService } from '../../../../../Services/Files/files.service';
import { HttpClient } from '@angular/common/http';
declare var bootstrap: any;

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  task: TaskDetails = {} as TaskDetails;
  currentTaskID: string = '';
  TaskNotesLength: number = 0;
  TaskFilesLength: number = 0;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private taskservices: TaskService,
    private fileService: FilesService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.currentTaskID = this.activatedrouter.snapshot.paramMap.get('ID') || '';

    this.taskservices.getTaskById(this.currentTaskID).subscribe({
      next: (currentTask) => {
        this.task = currentTask;
        this.TaskNotesLength = this.task.taskNotes.length;
        this.TaskFilesLength = this.task.files.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack() {
    this.router.navigate(['/TasksDashboard']);
  }

  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  selectedTaskNoteId: string = '';
  selectTaskNoteId(id: string) {
    this.selectedTaskNoteId = id;
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
  deleteTaskNote() {
    this.taskservices.deleteTaskNotes(this.selectedTaskNoteId).subscribe({
      next: () => {
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
  }
  SelectedTaskFileId: string = '';
  selectTaskFileId(id: string) {
    this.SelectedTaskFileId = id;
  }
  openConfirmModal1() {
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal1'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  deleteTaskFile() {
    this.fileService.deleteFile(this.SelectedTaskFileId).subscribe({
      next: () => {
        const confirmModal = bootstrap.Modal.getInstance(
          document.getElementById('confirmDeleteModal1')
        );
        confirmModal.hide();
        this.reloadComponent();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  private extractFilename(url: string): string {
    // Extract filename from URL
    return url.split('/').pop() ?? 'downloaded_file';
  }
  DownloadFile(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob) => {
        // Create a new blob object with the received data
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.extractFilename(url);
        link.click();

        // Clean up by revoking the object URL
        window.URL.revokeObjectURL(downloadURL);
      },
      (error) => {
        console.error('Error downloading the file.', error);
      }
    );
  }
}
