import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class EditProjectComponent implements OnInit {
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

          this.project = {
            Name: this.CurrentProject.name,
            InvestigatorId: this.selectedManagerId,
            Title1: this.CurrentProject.title1,
            Description1: this.CurrentProject.description1,
            Title2: this.CurrentProject.title2,
            Description2: this.CurrentProject.description2,
            Title3: this.CurrentProject.title3,
            Description3: this.CurrentProject.description3,
            StartDate: this.convertDateDMYtoYMD( this.CurrentProject.startDate.toString()),
            EndDate: this.convertDateDMYtoYMD(this.CurrentProject.endDate.toString()),
            ResultAnnouncement: this.convertDateDMYtoYMD(this.CurrentProject.resultAnnouncement),

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


  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.projectService
        .editProject(this.currentProjectId, this.project)
        .subscribe({
          next: () => {
            this.router.navigate(['/ProjectDashboard']);
          },
          error: (error) => console.error(error),
        });
    }
  }

  convertDateDMYtoYMD(dateStr: string): string {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  }

  ShowList:boolean = false;
  performFilter(value: string): void {
    this.ShowList= true;
    this.filteredinvestigator = this.investigatorManager.filter(manager =>
      manager.email.toLowerCase().includes(value.toLowerCase())
    );
  }
  selectedManagerName:string='';
  selectedManagerId:string='';
  selectManager(manager: Role): void {
    this.ShowList= true;
    this.selectedManagerName = manager.email;
    this.selectedManagerId = manager.id;
    this.filteredinvestigator = [];
  }



}
