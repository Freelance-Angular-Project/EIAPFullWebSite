import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EditProject } from '../../../../Models/Projects/edit-project';
import { ProjectService } from '../../../../Services/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../Models/Projects/project';
import { Role } from '../../../../Models/Accounts/role';
import { UserService } from '../../../../Services/User/user.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent {
  project: EditProject = {} as EditProject; // Assuming you have a class or interface named School
  CurrentProject: Project = {} as Project; // Assuming you have a class or interface named School
  currentProjectId: string = '';
  investigator: Role[] = [];
  filteredinvestigator: Role[] = [];
  selectedinvestigatorName: string = '';
  selectedInvestigatorId: string='';
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
  ) {}

  ngOnInit(): void {
    this.currentProjectId = this.route.snapshot.paramMap.get('projectid') || '';
    if (this.currentProjectId) {
      // Assuming you have a method to fetch a school by ID
      this.projectService.getProjectById(this.currentProjectId).subscribe({
        next: (data) => {
          this.CurrentProject = data;
          console.log(data);
        },
        error: (err) => console.error(err),
      });
    }


    this.userservice.getUsersInRole('Investigated').subscribe({
      next: (invest) => {
        this.investigator = invest;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.projectService.editProject(this.currentProjectId,this.CurrentProject).subscribe({
        next: (updatedproject) => {
          // this.project=updatedproject;
          console.log('Project updated:', updatedproject);
          this.router.navigate(['/ProjectDashboard']);
        },
        error: (error) => console.error(error),
      });
    }
  }
  performFilter(event: Event) {
    // filterByRole = filterByRole.toLocaleLowerCase();
    const filterByRole = (event.target as HTMLInputElement).value;

    if (filterByRole) {
      console.log(filterByRole);

      this.filteredinvestigator = this.investigator.filter(
        (manager: Role) =>
          manager.email &&
          manager.email.toLowerCase().includes(filterByRole.toLowerCase())
      );
    } else {
      this.filteredinvestigator = [...this.investigator];
    }
  }
  selectInvest(investgate: Role): void {
    this.selectedinvestigatorName = investgate.email;
    this.selectedInvestigatorId = investgate.id;
    this.filteredinvestigator = []; // Clear filtered list after selection
  }
}
