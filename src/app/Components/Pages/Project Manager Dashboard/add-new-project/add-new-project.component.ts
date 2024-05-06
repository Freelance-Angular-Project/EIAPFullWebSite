import { Component } from '@angular/core';
import { Project } from '../../../../Models/Projects/project';
import { Role } from '../../../../Models/Accounts/role';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../Services/Project/project.service';
import { UserService } from '../../../../Services/User/user.service';
import { ToastService } from '../../../../Services/Toast/toast.service';
import { CreateProject } from '../../../../Models/Projects/create-project';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-new-project',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-new-project.component.html',
  styleUrl: './add-new-project.component.scss'
})
export class AddNewProjectComponent {
  projectForm: FormGroup;
  project: CreateProject = {} as CreateProject;
  investigator: Role[] = [];
  filteredinvestigator: Role[] = [];
  selectedinvestigatorName: string = '';

   // form file input check
   fileTouched = false;
   fileInvalid = false;
   isUploading: boolean = false;
   selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    private projectservice: ProjectService,
    private userservice: UserService,
    public toastService: ToastService,
    public router: Router
  ) {
    this.projectForm = this.fb.group({
      Name: ['', Validators.required],
      Title1: ['', Validators.required],
      Description1: ['', Validators.required],
      Title2: ['', Validators.required],
      Description2: ['', Validators.required],
      Title3: ['', Validators.required],
      Description3: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      ResultAnnouncement: ['', [Validators.required]],
      InvestigatorId: ['', [Validators.required]],
      newUserId: ['', [Validators.required]],
      Image: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.userservice.getUsersInRole('Investigated').subscribe({
      next: (invest) => {
        this.investigator = invest;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Define getters for form controls
  get Name() {
    return this.projectForm.get('Name');
  }

  get Title1() {
    return this.projectForm.get('Title1');
  }
  get Description1() {
    return this.projectForm.get('Description1');
  }
  get Title2() {
    return this.projectForm.get('Title2');
  }
  get Description2() {
    return this.projectForm.get('Description2');
  }
  get Title3() {
    return this.projectForm.get('Title3');
  }
  get Description3() {
    return this.projectForm.get('Description3');
  }

  get StartDate() {
    return this.projectForm.get('StartDate');
  }
  get EndDate() {
    return this.projectForm.get('EndDate');
  }
  get ResultAnnouncement() {
    return this.projectForm.get('ResultAnnouncement');
  }
  get InvestigatorId() {
    return this.projectForm.get('InvestigatorId');
  }
  get Image() {
    return this.projectForm.get('Image');
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.project.Image = this.selectedFile = event.target.files[0];
      this.fileTouched = true;
      this.fileInvalid = false;
    } else {
      this.fileInvalid = true; // No file selected
    }
  }
  onSubmitSchool() {
    if (this.projectForm.valid) {

      let formData = new FormData();
      formData.append('Name', this.projectForm.value.Name);
      formData.append('Title1', this.projectForm.value.Title1);
      formData.append('Title2', this.projectForm.value.Title2);
      formData.append('Title3', this.projectForm.value.Title3);
      formData.append('Description1', this.projectForm.value.Description1);
      formData.append('Description2', this.projectForm.value.Description2);
      formData.append('Description3', this.projectForm.value.Description3);
      formData.append('StartDate', this.projectForm.value.StartDate);
      formData.append('EndDate', this.projectForm.value.EndDate);
      formData.append('ResultAnnouncement', this.projectForm.value.ResultAnnouncement);
      formData.append('InvestigatorId', this.projectForm.value.newUserId);

      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }
      this.projectservice.createProject(formData).subscribe({
        next: () => {

          this.router.navigate(['/ProjectDashboard']).then(success => {
            if (success) {
              window.location.reload();
            } else {
              console.error('Navigation Failed');
            }
          });
        },
        error: (err) => {
          console.log(err);
          this.toastService.show(
            'Project has been error in create ',
            true
          );
        },
      });
    }
  }
  performFilter(event: Event) {
    // filterByRole = filterByRole.toLocaleLowerCase();
    const filterByRole = (event.target as HTMLInputElement).value;

    if (filterByRole) {

      this.filteredinvestigator = this.investigator.filter(
        (manager: Role) =>
          manager.email &&
          manager.email.toLowerCase().includes(filterByRole.toLowerCase())
      );
    } else {
      this.filteredinvestigator = [...this.investigator];
    }
  }
  selectInvest(investgate: Role): void {
    this.selectedinvestigatorName = investgate.email;
    // console.log(this.selectedManagerName);
    this.projectForm.controls['InvestigatorId'].setValue(investgate.email);
    this.projectForm.controls['newUserId'].setValue(investgate.id);
    this.filteredinvestigator = [];
  }
}
