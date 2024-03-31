import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Project } from '../../../Models/project';
import { ProjectService } from '../../../Services/Project/project.service';
import { UserService } from '../../../Services/User/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
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
        console.log(this.userLogg);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toggleNavbarCollapsing() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  // dropdownClick(event: MouseEvent): void {
  // dropdownClick(): void {
  // // event.stopPropagation();
  // console.log("ddd");

  // this.isProjectsDropdownOpen = !this.isProjectsDropdownOpen;
  // // this.isProjectnav;
  // console.log(this.isProjectsDropdownOpen);

  // }

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
