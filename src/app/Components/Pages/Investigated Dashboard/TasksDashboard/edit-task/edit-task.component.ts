import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Role } from '../../../../../Models/Accounts/role';
import { TaskService } from '../../../../../Services/Task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { TaskDetails } from '../../../../../Models/Tasks/task-details';
import { EditTask } from '../../../../../Models/Tasks/edit-task';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  task: EditTask = {} as EditTask; // Assuming you have a class or interface named School
  CurrentTask: TaskDetails = {} as TaskDetails; // Assuming you have a class or interface named School
  currentTaskId: string = '';
  investigatorManager: Role[] = [];
  filteredinvestigator: Role[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.currentTaskId = this.route.snapshot.paramMap.get('taskID') || '';
    if (this.currentTaskId) {
      this.taskService.getTaskById(this.currentTaskId).subscribe({
        next: (data) => {
          this.CurrentTask = data;
          this.task = {
            name: this.CurrentTask.name,
            details: this.CurrentTask.details,
            numberOfFilesToAssignment: this.CurrentTask.numberOfFilesToAssignment,
            endDate: this.CurrentTask.endDate
          };


        },
        error: (err) => console.error(err),
      });
    }


    this.userservice.getUsersInRole('Investigated').subscribe({
      next: (invest) => {
        this.investigatorManager = invest;
        this.filteredinvestigator= this.investigatorManager;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formatDate(date: Date | string): string {
    return new Date(date).toISOString().split('T')[0];
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.taskService
        .updateTask(this.currentTaskId, this.task)
        .subscribe({
          next: () => {
            // console.log('Task updated:', this.task);
            this.router.navigate(['/TasksDashboard']);
          },
          error: (error) => console.error(error),
        });
    }
  }
}
