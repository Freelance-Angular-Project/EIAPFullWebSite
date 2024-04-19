import { Component } from '@angular/core';
import { News } from '../../../../../Models/News/news';
import { NewsService } from '../../../../../Services/News/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-news',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.scss'
})
export class UpdateNewsComponent {
  news: News = {} as News; // Assuming you have a class or interface named School
  id: string = '';

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('newsid') || '';
    // if (this.id) {
    //   // Assuming you have a method to fetch a school by ID
    //   this.newsService.getSchoolById(this.id).subscribe({
    //     next: (data) => {
    //       this.school = data;
    //       console.log(this.school);
    //     },
    //     error: (err) => console.error(err),
    //   });
    // }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.newsService.updateNews(this.id,this.news).subscribe({
        next: (updatednews) => {
          // console.log('News updated:', updatednews);
          this.router.navigate(['/AllNewsDashboard']);
        },
        error: (error) => console.error(error),
      });
    }
  }
}
