import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProjectService } from '../../../../Services/Project/project.service';
import { Project } from '../../../../Models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project1.component.html',
  styleUrl: './project1.component.scss',
})
export class Project1Component implements OnInit {
  projectObj: Project = {} as Project;
  currentID: string = '';
  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      this.currentID = params.get('id') ? String(params.get('id')) : '';

      this.projectService.getProjectById(this.currentID).subscribe({
        next: (project1) => {
          this.projectObj=project1;
          console.log(this.projectObj);

        },
        error: (err) => {
          this.router.navigate(['**']);
          console.log(err);
        },
      });
    });
  }


}
