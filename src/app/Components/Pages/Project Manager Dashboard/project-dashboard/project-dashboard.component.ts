import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../Services/Project/project.service';
import { ProjectDashboard } from '../../../../Models/Projects/project-dashboard';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboardComponent implements OnInit  {
  AllProjects : ProjectDashboard[] = [];
  FilteredProjects : ProjectDashboard[] = [];
  selectedProjectId : string | null = null;
constructor(private projectService : ProjectService,private router: Router){}
  ngOnInit(): void {
    this.projectService.getAllProjectsToDashboard().subscribe({
      next: (projects) => {
        this.AllProjects = projects;
        this.FilteredProjects = this.AllProjects;

      },
      error: (err)=> {console.log(err);
      }
    });
  }
  filter:string="";
  onFilterChange(){
    this.FilteredProjects = this.AllProjects.filter((project) =>
      project.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    console.log(this.FilteredProjects);
  }
  selectProject(id :string){
    this.selectedProjectId = id;
  }
  goProjectDetails(id:string){
    this.router.navigate(['/GetProjectDetails', id]);
  }
  openConfirmModal(){
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }

  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteSchool(){
    if (this.selectedProjectId) {
      this.projectService.deleteProject(this.selectedProjectId).subscribe({
        next: (data) => {
          const confirmModal = bootstrap.Modal.getInstance(
            document.getElementById('confirmDeleteModal')
          );
          confirmModal.hide();
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('No school selected for deletion');
    }
  }

}
