import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EditProject } from '../../../../Models/Projects/edit-project';
import { ProjectService } from '../../../../Services/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../Models/Projects/project';
import { Role } from '../../../../Models/Accounts/role';
import { UserService } from '../../../../Services/User/user.service';
import { ProjectDashboard } from '../../../../Models/Projects/project-dashboard';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  project: EditProject = {} as EditProject; // Assuming you have a class or interface named School
  CurrentProject: Project = {} as Project; // Assuming you have a class or interface named School
  currentProjectId: string = '';
  investigatorManager: Role[] = [];
  filteredinvestigator: Role[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.currentProjectId = this.route.snapshot.paramMap.get('projectid') || '';
    if (this.currentProjectId) {
      this.projectService.getProjectById(this.currentProjectId).subscribe({
        next: (data) => {
          this.CurrentProject = data;
          console.log(this.CurrentProject);

          this.project = {
            Name: this.CurrentProject.name,
            InvestigatorId: this.selectedManagerId,
            Title1: this.CurrentProject.title1,
            Description1: this.CurrentProject.description1,
            Title2: this.CurrentProject.title2,
            Description2: this.CurrentProject.description2,
            Title3: this.CurrentProject.title3,
            Description3: this.CurrentProject.description3,
            StartDate: new Date(this.CurrentProject.startDate),
            EndDate: new Date(this.CurrentProject.endDate),
            ResultAnnouncement: new Date(this.CurrentProject.resultAnnouncement),
          };
          console.log(this.project);
          console.log(this.currentProjectId);

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


  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.projectService
        .editProject(this.currentProjectId, this.project)
        .subscribe({
          next: () => {
            console.log('Project updated:', this.project);
            this.router.navigate(['/ProjectDashboard']);
          },
          error: (error) => console.error(error),
        });
    }
  }

  performFilter(value: string): void {
    this.filteredinvestigator = this.investigatorManager.filter(manager =>
      manager.email.toLowerCase().includes(value.toLowerCase())
    );
  }
  selectedManagerName:string='';
  selectedManagerId:string='';
  selectManager(manager: Role): void {
    this.selectedManagerName = manager.email;
    this.selectedManagerId = manager.id;
    this.filteredinvestigator = [];
  }



}
