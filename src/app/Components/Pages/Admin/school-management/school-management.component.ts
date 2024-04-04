import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SchoolService } from '../../../../Services/School/school.service';
import { PostSchool } from '../../../../Models/post-school';
import { UserService } from '../../../../Services/User/user.service';
import { Role } from '../../../../Models/role';
import { ToastService } from '../../../../Services/Toast/toast.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-school-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './school-management.component.html',
  styleUrl: './school-management.component.scss',
})
export class SchoolManagementComponent implements OnInit {
  schoolForm: FormGroup;
  school: PostSchool = {} as PostSchool;
  schoolmanagers: Role[] = [];
  filteredSchoolManagers: Role[] = [];
  selectedManagerName: string = '';
  constructor(
    private fb: FormBuilder,
    private schoolservice: SchoolService,
    private userservice: UserService,
    public toastService: ToastService
  ) {
    this.schoolForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      curriculums: ['', Validators.required],
      educationType: ['', Validators.required],
      grade: ['', Validators.required],
      zone: ['', Validators.required],
      userId: ['', [Validators.required]], // email
      newUserId: ['', [Validators.required]], // userId send to api
    });
  }
  ngOnInit(): void {
    this.userservice.getUsersInRole('SchoolManager').subscribe({
      next: (smanager) => {
        console.log(smanager);
        this.schoolmanagers = smanager;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Define getters for form controls
  get name() {
    return this.schoolForm.get('name');
  }

  get code() {
    return this.schoolForm.get('code');
  }

  get curriculums() {
    return this.schoolForm.get('curriculums');
  }

  get educationType() {
    return this.schoolForm.get('educationType');
  }

  get grade() {
    return this.schoolForm.get('grade');
  }

  get zone() {
    return this.schoolForm.get('zone');
  }

  get userId() {
    return this.schoolForm.get('userId');
  }

  onSubmitSchool() {
    if (this.schoolForm.valid) {
      this.school = {
        name: this.schoolForm.value.name,
        code: this.schoolForm.value.code,
        curriculums: this.schoolForm.value.curriculums,
        educationType: this.schoolForm.value.educationType,
        grade: this.schoolForm.value.grade,
        zone: this.schoolForm.value.zone,
        userId: this.schoolForm.value.newUserId,
      };
      console.log(this.school);

      this.schoolservice.createSchool(this.school).subscribe({
        next: (school) => {
          // console.log(school);
          this.schoolForm.reset();
          this.toastService.show(
            'School has been successfully created.',
            false
          );
        },
        error: (err) => {
          // console.log(err);
          this.toastService.show(
            'School has been error in create make sure this manager doesnot have school',
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
      console.log(filterByRole);

      this.filteredSchoolManagers = this.schoolmanagers.filter(
        (manager: Role) =>
          manager.email &&
          manager.email.toLowerCase().includes(filterByRole.toLowerCase())
      );
    } else {
      this.filteredSchoolManagers = [...this.schoolmanagers];
    }
  }
  selectManager(manager: Role): void {
    this.selectedManagerName = manager.email;
    console.log(this.selectedManagerName);
    this.schoolForm.controls['userId'].setValue(manager.email);
    this.schoolForm.controls['newUserId'].setValue(manager.id);
    this.filteredSchoolManagers = [];
  }
}
