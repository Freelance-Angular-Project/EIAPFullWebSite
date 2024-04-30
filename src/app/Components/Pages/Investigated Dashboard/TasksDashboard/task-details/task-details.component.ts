import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../../Services/Task/task.service';
import { Task } from '../../../../../Models/Tasks/task';
import { TaskDetails } from '../../../../../Models/Tasks/task-details';

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

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private taskservices: TaskService
  ) {}
  ngOnInit(): void {
    this.currentTaskID = this.activatedrouter.snapshot.paramMap.get('ID') || '';

    this.taskservices.getTaskById(this.currentTaskID).subscribe({
      next: (currentTask) => {
        this.task = currentTask;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack() {
    this.router.navigate(['/TasksDashboard']);
  }
}
