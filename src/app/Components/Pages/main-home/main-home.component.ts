import { Component, HostListener, OnInit } from '@angular/core';
import { FooterComponent } from '../../Shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../../Models/Projects/project';
import { ProjectService } from '../../../Services/Project/project.service';
import { SliceWordPipe } from '../../../Pipes/slice-word.pipe';
import { RouterModule } from '@angular/router';
import { SliceFirstWordPipe } from '../../../Pipes/slice-first-word.pipe';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../Services/User/user.service';
import { SpinnerComponent } from '../../Shared/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LastNewsComponent } from '../../Shared/last-news/last-news.component';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [
    FooterComponent,
    LastNewsComponent,
    CommonModule,
    SliceWordPipe,
    RouterModule,
    SliceFirstWordPipe,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss',
})
export class MainHomeComponent implements OnInit {
  projects: Project[] = [];
  //Handle Next and Previous
  currentIndex: number = 0;
  displayedNews: Project[] | null = null;
  // lastIndexOfdisplayedNews: number = 0;
  // itemsPerPage = 2; // Default value for large screens
  itemsPerPage: number = 3;
  // handle login
  loginForm: FormGroup;
  userLog: boolean = true;
  errorMessage: string = ''; // Property to store error message
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // get all projects
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.updateDisplayedNews();
      },
      error: (err) => console.error(err),
    });
    this.userService.getUserLoggedStatus().subscribe({
      next: (userStatus) => {
        this.userLog = userStatus;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.adjustItemsPerScreen();
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe({
      next: (response) => {
        if (response.isAuthenticated) {
          this.userLog = this.userService.isUserLogged;
          this.loginForm.reset();
        } else {
          this.errorMessage = 'Login failed: Invalid email or password.';
        }
      },
      error: (error) => {
        this.errorMessage = `${error.error}`;
      },
    });
  }
  //Handle Next and Previous
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustItemsPerScreen();
  }

  adjustItemsPerScreen(): void {
    this.itemsPerPage = window.innerWidth <= 768 ? 1 : 3; // Adjust this breakpoint as needed
    this.updateDisplayedNews();
  }

  next(): void {
    if (this.currentIndex < this.projects.length - this.itemsPerPage) {
      this.currentIndex += this.itemsPerPage;
      this.updateDisplayedNews();
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
      this.updateDisplayedNews();
    }
  }

  updateDisplayedNews(): void {
    this.displayedNews = this.projects.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerPage
    );
  }
}
