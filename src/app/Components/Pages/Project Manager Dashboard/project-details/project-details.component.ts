import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../Services/Project/project.service';
import { Project, ProjectFile } from '../../../../Models/Projects/project';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  project: Project = {} as Project;
  ProjectFiles : ProjectFile[] | undefined=[];
  currentProjectID: string = '';
  selectedProjectFileId : string = '';
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private projectservices: ProjectService
  ) {}
  ngOnInit(): void {
    this.currentProjectID =
      this.activatedrouter.snapshot.paramMap.get('id') || '';

    this.projectservices.getProjectById(this.currentProjectID).subscribe({
      next: (currentproject) => {
        this.project = currentproject;
        console.log(this.project);

        this.ProjectFiles = this.project.files;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack(){
    this.router.navigate(['/ProjectDashboard'])
  }
  selectProjectFile(id :string){
    this.selectedProjectFileId = id;
  }
}
