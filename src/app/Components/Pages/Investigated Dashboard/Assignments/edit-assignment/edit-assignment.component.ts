import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EditAssignment } from '../../../../../Models/Assignments/edit-assignment';
import { GetAssignment } from '../../../../../Models/Assignments/get-assignment';
import { Role } from '../../../../../Models/Accounts/role';
import { AssignmentService } from '../../../../../Services/Assignments/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { CommonModule } from '@angular/common';
import { AssignmentStatus } from '../../../../../Enums/assignment-status';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.scss',
})
export class EditAssignmentComponent {
  Assignment: EditAssignment = {} as EditAssignment; // Assuming you have a class or interface named School
  CurrentAssignment: GetAssignment[]=[]; // Assuming you have a class or interface named School
  currentAssignmentId: string = '';
  investigatorManager: Role[] = [];
  filteredinvestigator: Role[] = [];
  // statusKeys = Object.keys(AssignmentStatus).filter(k => typeof AssignmentStatus[k as any] === "number");
  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) {
    // this.Assignment.status = AssignmentStatus.New; // Set default status
  }

  ngOnInit(): void {
    this.currentAssignmentId = this.route.snapshot.paramMap.get('id') || '';
    // if (this.currentAssignmentId) {
    //   this.assignmentService.getAssignmentByTaskID(this.currentAssignmentId).subscribe({
    //     next: (data) => {
    //       this.CurrentAssignment = data;
    //       this.Assignment = {
    //         status: AssignmentStatus.New,
    //         commentToSchool:this.CurrentAssignment[0].commentToSchool,

    //       };

    //     },
    //     error: (err) => console.error(err),
    //   });
    // }

    this.userservice.getUsersInRole('Investigated').subscribe({
      next: (invest) => {
        this.investigatorManager = invest;
        this.filteredinvestigator = this.investigatorManager;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // getStatusName(status: any): AssignmentStatus {
  //   return AssignmentStatus[status as keyof typeof AssignmentStatus];
  // }
  get statusOptions() {
    return Object.keys(AssignmentStatus)
      .filter((key) => isNaN(Number(key))) // Filter out the reverse mappings
      .map((key) => ({
        key: key,
        value: AssignmentStatus[key as keyof typeof AssignmentStatus],
      }));
  }
  onSubmit(form: NgForm): void {

    this.Assignment={
      assignmentId:this.currentAssignmentId,
      status:this.Assignment.status,
      commentToSchool:this.Assignment.commentToSchool
    };

    if (form.valid) {
      this.assignmentService
        .editAssignment(this.Assignment)
        .subscribe({
          next: (data) => {
            this.router.navigate(['/TasksDashboard']);
          },
          error: (error) => console.error(error),
        });
    }
  }
}
