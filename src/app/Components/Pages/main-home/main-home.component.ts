import { Component, HostListener, OnInit } from '@angular/core';
import { FooterComponent } from '../../Shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../../Models/project';
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
import { LoadingService } from '../../../Services/Loading/loading.service';
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
  lastIndexOfdisplayedNews: number = 0;
  itemsPerPage = 2; // Default value for large screens

  // handle login
  loginForm: FormGroup;
  userLog: boolean = true;
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
      this.loadingService.startLoading();
      // Assume some data loading logic here
    // get all projects
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;

        // related with next , previous
        this.displayedNews = this.projects;
        this.lastIndexOfdisplayedNews = this.projects.length;
        this.updateDisplayedNews();
      },
      error: (err) => {
        console.log(err);
      },
    });

    // this.userLog = this.userService.isUserLogged;
    this.userService.getUserLoggedStatus().subscribe({
      next: (userStatus) => {
        this.userLog = userStatus;
        console.log(this.userLog);
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
    // console.log("hhhhhhhhhhhhhhhhhh");

    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log(email, password);

    this.userService.login(email, password).subscribe({
      next: (response) => {
        if (response.isAuthenticated) {
          console.log('Login successful:', response.message, response.role[0]);
          this.userLog = this.userService.isUserLogged;
          console.log(this.userLog);
          this.loginForm.reset()
        } else {
          console.log('Login failed:', response.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }
  //Handle Next and Previous
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.adjustItemsPerScreen();
  }

  private adjustItemsPerScreen(): void {
    this.itemsPerPage = window.innerWidth <= 768 ? 1 : 3; // 768px is a common breakpoint for tablets
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

  private updateDisplayedNews(): void {
    this.displayedNews = this.projects.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

}
