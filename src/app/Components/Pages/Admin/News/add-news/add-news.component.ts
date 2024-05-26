import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddNews } from '../../../../../Models/News/add-news';
import { Project } from '../../../../../Models/Projects/project';
import { NewsService } from '../../../../../Services/News/news.service';
import { ProjectService } from '../../../../../Services/Project/project.service';
import { ToastService } from '../../../../../Services/Toast/toast.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.scss',
})
export class AddNewsComponent {
  newsForm: FormGroup;
  news: AddNews = {} as AddNews;
  allprojects: Project[] = [];
  // form file input check
  fileTouched = false;
  fileInvalid = false;
  isUploading: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private newsservice: NewsService,
    private projectsservice: ProjectService,
    public toastService: ToastService,
    private router: Router
  ) {
    this.newsForm = this.fb.group({
      ProjectId: ['', Validators.required],
      Details: ['', Validators.required],
      Year: ['', Validators.required],
      IsEvent: ['', Validators.required],
      Image: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.projectsservice.getAllProjects().subscribe({
      next: (projects) => {
        this.allprojects = projects;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Define getters for form controls
  get ProjectId() {
    return this.newsForm.get('ProjectId');
  }

  get Details() {
    return this.newsForm.get('Details');
  }

  get Year() {
    return this.newsForm.get('Year');
  }

  get IsEvent() {
    return this.newsForm.get('IsEvent');
  }

  get Image() {
    return this.newsForm.get('Image');
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.news.Image = this.selectedFile = event.target.files[0];
      this.fileTouched = true;
      this.fileInvalid = false;
    } else {
      this.fileInvalid = true; // No file selected
    }
  }

  onSubmitNews() {
    if (this.newsForm.valid) {

      let formData = new FormData();
      formData.append('Details', this.newsForm.value.Details);
      formData.append('Year', this.newsForm.value.Year);
      formData.append('IsEvent', this.newsForm.value.IsEvent);

      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }

      this.newsservice.createNews(formData).subscribe({

        next: () => {
          this.newsForm.reset();
          this.toastService.show('Item has been successfully created.', false);
        },
        error: (err) => {
          console.log(err);
          this.toastService.show('Item has been error in create', true);
        },
      });
    }
  }
}
