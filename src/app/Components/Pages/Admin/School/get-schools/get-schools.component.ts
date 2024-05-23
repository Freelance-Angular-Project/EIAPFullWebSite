import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../../../Services/School/school.service';
import { School } from '../../../../../Models/Schools/school';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilesService } from '../../../../../Services/Files/files.service';
import { DownloadFileService } from '../../../../../Services/Download File/download-file.service';
declare var bootstrap: any;
@Component({
  selector: 'app-get-schools',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './get-schools.component.html',
  styleUrl: './get-schools.component.scss',
})
export class GetSchoolsComponent implements OnInit {
  schools: School[] = [];
  filteredSchools: School[] = [];
  filter: string = '';
  selectedSchoolId: string | null = null;
  fileTouched = false;
  fileInvalid = false;
  isUploading: boolean = false;
  fileUploaded: boolean = false;
  uploadedFiles: { [taskId: string]: boolean } = {}; // Dictionary to track upload status per task

  // upload school  excel file
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  constructor(
    private schoolservice: SchoolService,
    private router: Router,
    private fileService: FilesService,
    private downloadservice: DownloadFileService
  ) {}
  ngOnInit(): void {
    this.schoolservice.getAllSchools().subscribe({
      next: (allschools) => {
        // console.log(allschools);
        this.schools = allschools;
        this.filteredSchools = allschools;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
  goSchoolDetails(schoolid: string) {
    this.router.navigate(['/GetSchoolDetails', schoolid]);
  }
  onFilterChange() {
    this.filteredSchools = this.schools.filter((school) =>
      school.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    // console.log(this.filteredSchools);
  }
  openConfirmModal(): void {
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  selectSchool(schoolId: string) {
    this.selectedSchoolId = schoolId;
  }
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deleteSchool() {
    if (this.selectedSchoolId) {
      this.schoolservice.deleteSchool(this.selectedSchoolId).subscribe({
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
      console.log('No school selected for deletion');
    }
  }
  onFileSelected(schoolId: string, event: Event): void {
    const element = event.target as HTMLInputElement;
    if (
      element.files &&
      element.files.length > 0 &&
      !this.uploadedFiles[schoolId]
    ) {
      this.uploadFile(schoolId, element.files[0]);
    }
  }

  uploadFile(schoolId: string, file: File): void {
    this.isUploading = true;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('schoolId', schoolId);

    this.fileService.uploadFile(formData).subscribe({
      next: (response) => {
        this.uploadedFiles[schoolId] = true; // Set the upload flag to true for this task
      },
      error: (error) =>
        console.error('Error uploading file for task', schoolId, error),
    });
  }
  downloadFile(): void {
    const fileName = 'Book1.xlsx';
    const fileUrl = 'assets/Template/Book1.xlsx';
    this.downloadservice.downloadFile(fileName, fileUrl);
  }
  onFileSelectedExcel(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')  {
        this.selectedFile = file;
        this.errorMessage = null;
      } else {
        this.selectedFile = null;
        this.errorMessage = 'Please select a valid Excel file.';
      }
    }
  }

  uploadFileExcel(): void {
    if (this.selectedFile) {
      this.schoolservice.AddSchoolFiles(this.selectedFile).subscribe({
        next: (response) => {
          // console.log('File uploaded successfully', response);
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('File upload failed', error);
          this.errorMessage = 'File upload failed. Please try again '+error.error;
        },
      });
    }
  }
}
