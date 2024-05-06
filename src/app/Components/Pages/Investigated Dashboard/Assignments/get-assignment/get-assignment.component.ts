import { Component } from '@angular/core';
import { GetAssignment } from '../../../../../Models/Assignments/get-assignment';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../../../../Services/Assignments/assignment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-assignment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-assignment.component.html',
  styleUrl: './get-assignment.component.scss'
})
export class GetAssignmentComponent {
  assignment: GetAssignment[]=[];
  currentTaskID: string = '';

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private assignmentservices: AssignmentService,
    // private fileService: FilesService,
    // private http:HttpClient
  ) {}
  ngOnInit(): void {
    this.currentTaskID = this.activatedrouter.snapshot.paramMap.get('ID') || '';

    this.assignmentservices.getAssignmentByTaskID(this.currentTaskID).subscribe({
      next: (currentTask) => {
        console.log(currentTask);

        this.assignment = currentTask;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack() {
    this.router.navigate(['/TasksDashboard']);
  }
  EditAssignment(id:string){
    this.router.navigate(['/EditAssignment',id])
  }
}
