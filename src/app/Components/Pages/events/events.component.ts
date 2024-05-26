import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../Shared/footer/footer.component';
import { NewsService } from '../../../Services/News/news.service';
import { News } from '../../../Models/News/news';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  news: News[] = [];
  uniqueYears: string[] = [];
  filteredNews: News[] = [];
  selectedItem: string = '2024';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.newsService.getEvents().subscribe({
      next: (data) => {
        this.news = data;
        this.filteredNews = this.news;
        console.log(this.filteredNews);

        this.extractUniqueYears();
        if (this.news.length > 0) {
          const firstItemYear = this.getYearFromDate(this.news[0].year);
          this.FilterByYear(firstItemYear, this.selectedItem);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  extractUniqueYears() {
    const yearsSet = new Set(
      this.news.map((item) => {
        return this.getYearFromDate(item.year);
      })
    );

    this.uniqueYears = Array.from(yearsSet).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
  }

  FilterByYear(year: string, item: string) {
    const selectedYear = parseInt(year);

    this.filteredNews = this.news.filter((item) => {
      const itemYear = parseInt(this.getYearFromDate(item.year));
      return itemYear === selectedYear;
    });

    this.selectedItem = item;
  }

  getYearFromDate(date: string): string {
    const parts = date.split('/');
    return parts[2];
  }
  trackById(index: number, item: News): string {
    return item.id;
  }
}
