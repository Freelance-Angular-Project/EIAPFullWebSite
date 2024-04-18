import { Component, OnInit } from '@angular/core';
import { PublicNewsService } from '../../../../../Services/Public News/public-news.service';
import { PublicNews } from '../../../../../Models/News/public-news';

@Component({
  selector: 'app-views-news',
  standalone: true,
  imports: [],
  templateUrl: './views-news.component.html',
  styleUrl: './views-news.component.scss',
})
export class ViewsNewsComponent implements OnInit {
  publicnews: PublicNews[] = [];
  constructor(private publicnewsService: PublicNewsService) {}
  ngOnInit(): void {
    this.publicnewsService.getPublicNews().subscribe({
      next: (news) => {
        this.publicnews = news;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
