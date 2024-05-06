import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SchoolService } from '../../../../Services/School/school.service';
import { AddSchoolToProject } from '../../../../Models/Projects/add-school-to-project';
import { ToastService } from '../../../../Services/Toast/toast.service';
import { ProjectService } from '../../../../Services/Project/project.service';
import { SchoolToProject } from '../../../../Models/Schools/school-to-project';
import { Schooltoselect } from '../../../../Models/Schools/schooltoselect';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-school-to-project',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-school-to-project.component.html',
  styleUrl: './add-school-to-project.component.scss',
})
export class AddSchoolToProjectComponent {
  schoolProjectForm: FormGroup;
  addSchool: AddSchoolToProject = {} as AddSchoolToProject;
  schools: Schooltoselect[] = [];
  SchoolsAtCurrentProject: Schooltoselect[] = [];
  availableSchools: Schooltoselect[] = [];
  currentProjectId: string = '';
  isLoading: boolean = false;

  selectedSchoolIds: Schooltoselect[] = [];
  constructor(
    private fb: FormBuilder,
    private schoolservice: SchoolService,
    private projectservice: ProjectService,
    public toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.schoolProjectForm = this.fb.group({
      schoolsIds: this.fb.array([], [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.currentProjectId = this.route.snapshot.paramMap.get('id') || '';
    this.isLoading = true; // Set loading to true when the component initializes

    this.projectservice.GetByIdToDashboard(this.currentProjectId).pipe(
      switchMap(currentproject => {
        this.SchoolsAtCurrentProject = currentproject.schools;
        return this.schoolservice.getAllSchoolsToSelect();
      }),
      catchError(err => {
        console.log('Error fetching project:', err);
        return of([]); // Return an empty observable array on error to continue the stream
      }),
      finalize(() => this.isLoading = false) // Set loading to false when the stream completes or errors out
    ).subscribe({
      next: (schools) => {
        this.schools = schools;
        this.availableSchools = this.schools.filter(outerSchool =>
          !this.SchoolsAtCurrentProject.some(innerSchool => innerSchool.id === outerSchool.id)
        );
      },
      error: err => {
        console.log('Error fetching schools:', err);
      }
    });
  }

  // Define getters for form controls
  get projectId() {
    return this.schoolProjectForm.get('projectId');
  }

  get schoolsIds(): FormArray {
    return this.schoolProjectForm.get('schoolsIds') as FormArray;
  }

  onSchoolSelectionChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    const selectedIds = Array.from(
      element.selectedOptions,
      (option) => option.value
    );
    this.updateSchoolsIds(selectedIds);
  }

  updateSchoolsIds(selectedIds: string[]): void {
    this.schoolsIds.clear();
    selectedIds.forEach((id) => this.schoolsIds.push(new FormControl(id)));
  }

  onSubmitSchool() {
    if (this.schoolProjectForm.valid) {
      this.addSchool = {
        projectId: this.currentProjectId,
        schoolsIds: this.schoolProjectForm.value.schoolsIds,
      };

      this.projectservice.addSchoolToProject(this.addSchool).subscribe({
        next: (school) => {
          this.schoolProjectForm.reset();
          this.toastService.show(
            'School has been successfully added to ptoject.',
            false
          );
          this.router.navigate(['/ProjectDashboard']);
        },
        error: (err) => {
          // console.log(err);
          this.toastService.show(
            'School has been added for this project before ',
            true
          );
        },
      });
    }
  }
  backToDashboard() {
    this.router.navigate(['/ProjectDashboard']);
  }
}
