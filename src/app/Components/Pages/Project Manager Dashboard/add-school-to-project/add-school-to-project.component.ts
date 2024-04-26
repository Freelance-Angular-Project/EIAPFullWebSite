import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '../../../../Services/School/school.service';
import { AddSchoolToProject } from '../../../../Models/Projects/add-school-to-project';
import { ToastService } from '../../../../Services/Toast/toast.service';
import { ProjectService } from '../../../../Services/Project/project.service';
import { SchoolToProject } from '../../../../Models/Schools/school-to-project';
import { Schooltoselect } from '../../../../Models/Schools/schooltoselect';

@Component({
  selector: 'app-add-school-to-project',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-school-to-project.component.html',
  styleUrl: './add-school-to-project.component.scss'
})
export class AddSchoolToProjectComponent {
  schoolProjectForm: FormGroup;
  addSchool: AddSchoolToProject = {} as AddSchoolToProject;
  schools:Schooltoselect[]=[]
  constructor(
    private fb: FormBuilder,
    private schoolservice: SchoolService,
    private projectservice: ProjectService,
    public toastService: ToastService
  ) {
    this.schoolProjectForm = this.fb.group({
      projectId: ['', Validators.required],
      schoolsIds: this.fb.array([], [Validators.required]),

    });
  }
  ngOnInit(): void {
    this.schoolservice.getAllSchoolsToSelect().subscribe({
      next: (school) => {
        console.log(school);
        this.schools = school;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Define getters for form controls
  get projectId() {
    return this.schoolProjectForm.get('projectId');
  }

  get schoolsIds(): FormArray {
    return this.schoolProjectForm.get('schoolsIds') as FormArray;
  }

  onSubmitSchool() {
    if (this.schoolProjectForm.valid) {
      this.addSchool = {
        projectId: this.schoolProjectForm.value.projectId,
        schoolsIds: this.schoolProjectForm.value.code,
      };
      console.log(this.addSchool);

      this.projectservice.addSchoolToProject(this.addSchool).subscribe({
        next: (school) => {
          console.log(school);
          this.schoolProjectForm.reset();
          this.toastService.show(
            'School has been successfully added to ptoject.',
            false
          );
        },
        error: (err) => {
          // console.log(err);
          this.toastService.show(
            'School has been error in create ',
            true
          );
        },
      });
    }
  }
}
