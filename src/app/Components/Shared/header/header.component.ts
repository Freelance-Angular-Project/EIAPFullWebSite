import {
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Project } from '../../../Models/Projects/project';
import { ProjectService } from '../../../Services/Project/project.service';
import { UserService } from '../../../Services/User/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  // isProjectsDropdownOpen: boolean = false;
  isProjectnav: boolean = true;
  projects: Project[] = [];
  userLogg: boolean;
  selectedProject: string = '';
  isNavbarCollapsed = true;
  constructor(
    private projectService: ProjectService,
    public userService: UserService,
    private router: Router
  ) {
    this.userLogg = this.userService.isUserLogged;
  }

  ngOnInit(): void {
    // get all projects
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.userService.getUserLoggedStatus().subscribe({
      next: (userStatus) => {
        this.userLogg = userStatus;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event) => {
      if (!(event as NavigationEnd).url.startsWith('/Project')) {
        this.selectedProject = '';
      }
    });


  }
  toggleNavbarCollapsing() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logOutFunc() {
    this.userService.logout();
    this.userLogg = this.userService.isUserLogged;
    this.router.navigate(['/Home']);
  }

  onProjectChange(): void {
    if (this.selectedProject) {
      this.router.navigate(['/Project', this.selectedProject]);
    }
  }
}
