import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EditAssignment } from '../../../../../Models/Assignments/edit-assignment';
import { GetAssignment } from '../../../../../Models/Assignments/get-assignment';
import { Role } from '../../../../../Models/Accounts/role';
import { AssignmentService } from '../../../../../Services/Assignments/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../Services/User/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.scss',
})

export class EditAssignmentComponent implements OnInit {
  Assignment: EditAssignment = { status: 0, commentToSchool: '' };  // Default initialization
  currentAssignmentId: string = '';
  investigatorManager: Role[] = [];
  filteredInvestigator: Role[] = [];
  statusOptions = [
    { key: 'New', value: 0 },
    { key: 'Review', value: 1 },
    { key: 'Completed', value: 2 },
    { key: 'Rejected', value: 3 }
  ];

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentAssignmentId = this.route.snapshot.paramMap.get('id') || '';
    this.userService.getUsersInRole('Investigated').subscribe({
      next: (invest) => {
        this.investigatorManager = invest;
        this.filteredInvestigator = this.investigatorManager;
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.assignmentService.editAssignment(this.currentAssignmentId, this.Assignment).subscribe({
        next: (data) => this.router.navigate(['/TasksDashboard']),
        error: (error) => console.error('Error updating assignment:', error)
      });
    }
  }
}
