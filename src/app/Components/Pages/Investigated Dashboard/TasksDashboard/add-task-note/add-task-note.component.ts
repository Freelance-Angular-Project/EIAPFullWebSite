import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../../../Services/Task/task.service';
import { UserService } from '../../../../../Services/User/user.service';
import { ToastService } from '../../../../../Services/Toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskNoteDetails } from '../../../../../Models/Tasks/task-note-details';
import { Role } from '../../../../../Models/Accounts/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task-note',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task-note.component.html',
  styleUrl: './add-task-note.component.scss',
})
export class AddTaskNoteComponent {
  taskForm: FormGroup;
  taskNote: TaskNoteDetails = {} as TaskNoteDetails;
  investigator: Role[] = [];
  filteredinvestigator: Role[] = [];
  currentTaskID: string = '';
  constructor(
    private fb: FormBuilder,
    private taskservice: TaskService,
    private userservice: UserService,
    public toastService: ToastService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      details: this.fb.array([this.createDetail()]),
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

    this.currentTaskID =
      this.activatedRoute.snapshot.paramMap.get('taskid') || '';
  }
  createDetail(): FormGroup {
    return this.fb.group({
      detail: ['', Validators.required],
    });
  }

  get details(): FormArray {
    return this.taskForm.get('details') as FormArray;
  }

  addDetail() {
    this.details.push(this.createDetail());
  }
  onSubmitAddNote() {
    if (this.taskForm.valid) {
      // this.taskNote = {
      //   details: this.taskForm.value.details,
      // };
      const formattedDetails = this.details.controls.map(control => ({
        details: control.value.detail  // Ensure this matches the form control name used
      }));

      this.taskservice
        .addTaskNoteInDashboard(this.currentTaskID, formattedDetails)
        .subscribe({
          next: (task) => {
            console.log(task);
            console.log(formattedDetails);
            this.router.navigate(['/TasksDashboard']);
            this.taskForm.reset();
            this.toastService.show(
              'Task Note has been successfully created.',
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
  removeDetail(index: number) {
    this.details.removeAt(index);
console.log("removeeeeeeeeeeeeeeeed");

  }

}
