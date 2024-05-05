import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTaskDashboard } from '../../../../../Models/Tasks/add-task-dashboard';
import { Role } from '../../../../../Models/Accounts/role';
import { TaskService } from '../../../../../Services/Task/task.service';
import { UserService } from '../../../../../Services/User/user.service';
import { ToastService } from '../../../../../Services/Toast/toast.service';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../../Services/Project/project.service';
import { ProjectDashboard } from '../../../../../Models/Projects/project-dashboard';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  taskForm: FormGroup;
  task: AddTaskDashboard = {} as AddTaskDashboard;
  investigator: Role[] = [];
  filteredinvestigator: Role[] = [];
  projects:ProjectDashboard[]=[];
  // selectedinvestigatorName: string = '';


  // form file input check
  constructor(
    private fb: FormBuilder,
    private taskservice: TaskService,
    private userservice: UserService,
    public toastService: ToastService,
    public router: Router,
    private projectservices: ProjectService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      endDate: ['', Validators.required],
      numberOfFilesToAssignment: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.projectservices.getAllProjectsToDashboard().subscribe({
      next: (allprojects) => {
        // console.log(allprojects);

        this.projects = allprojects;
      },
      error: (err) => {
        console.log(err);
      }
    })
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
  get name() {
    return this.taskForm.get('name');
  }

  get details() {
    return this.taskForm.get('details');
  }
  get endDate() {
    return this.taskForm.get('endDate');
  }
  get numberOfFilesToAssignment() {
    return this.taskForm.get('numberOfFilesToAssignment');
  }
  get projectId() {
    return this.taskForm.get('projectId');
  }
  onSubmitSchool() {
    if (this.taskForm.valid) {

      this.task={
        Name:this.taskForm.value.name,
        Details:this.taskForm.value.details,
        EndDate:this.taskForm.value.endDate,
        NumberOfFilesToAssignment:this.taskForm.value.numberOfFilesToAssignment,
        ProjectId:this.taskForm.value.projectId,

      };
      this.taskservice.AddTaskToDashboard(this.task).subscribe({
        next: (task) => {
          // console.log(school);
          this.router.navigate(['/TasksDashboard']);
          this.taskForm.reset();
          this.toastService.show(
            'Task has been successfully created.',
            false
          );
        },
        error: (err) => {
          console.log(err);
          this.toastService.show('Task has been error in create ', true);
        },
      });
    }
  }
}
