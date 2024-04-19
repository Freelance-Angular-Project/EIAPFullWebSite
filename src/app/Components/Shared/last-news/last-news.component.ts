import { Component, HostListener, OnInit } from '@angular/core';
import { NewsService } from '../../../Services/News/news.service';
import { News } from '../../../Models/News/news';

@Component({
  selector: 'app-last-news',
  standalone: true,
  imports: [],
  templateUrl: './last-news.component.html',
  styleUrl: './last-news.component.scss'
})
export class LastNewsComponent implements OnInit {
  news: News[] = [];
  currentIndex = 0;
  displayedNews: News[] = [];
  itemsPerPage = 2; // Default value for large screens

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getPublicNews().subscribe({
      next: (data) => {
        this.news = data;
        this.updateDisplayedNews();
      }
    });
    this.adjustItemsPerScreen();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.adjustItemsPerScreen();
  }

  private adjustItemsPerScreen(): void {
    this.itemsPerPage = window.innerWidth <= 786 ? 1 : 2; // 768px is a common breakpoint for tablets
    this.updateDisplayedNews();
  }

  next(): void {
    if (this.currentIndex < this.news.length - this.itemsPerPage) {
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
    this.displayedNews = this.news.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

}
