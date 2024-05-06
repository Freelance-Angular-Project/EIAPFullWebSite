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
        this.extractUniqueYears();
        if (this.news.length > 0) {
          const firstItemYear = new Date(this.news[0].year)
            .getFullYear()
            .toString();
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
        const date = new Date(item.year);
        return date.getFullYear().toString();
      })
    );

    this.uniqueYears = Array.from(yearsSet).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
  }
  FilterByYear(year: string, item: string) {
    const selectedYear = new Date(`${year}-01-01`).getFullYear();

    this.filteredNews = this.news.filter((item) => {
      const itemYear = new Date(item.year).getFullYear();
      return itemYear === selectedYear;
    });

    // console.log(this.filteredNews);
    this.selectedItem = item;
  }
}
