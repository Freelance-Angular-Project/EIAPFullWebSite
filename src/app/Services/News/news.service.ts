import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../../Models/News/news';
import { Observable } from 'rxjs';
import { NewsImageUpdate } from '../../Models/News/news-image-update';
import { environment } from '../../../environments/environment.development';
import { AddNews } from '../../Models/News/add-news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = `${environment.baseApiURL}/News`; // Replace with the actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getPublicNews(take: number = 50, skip: number = 0): Observable<News[]> {
    return this.http.get<News[]>(
      `${this.baseUrl}/publicNews?take=${take}&skip=${skip}`
    );
  }

  getProjectNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/ProjectNews`);
  }

  getNewsByID(newsID:string): Observable<News>{
    return this.http.get<News>(`${this.baseUrl}/GetById?Id=${newsID}`)
  }

  getEvents(take: number = 50, skip: number = 0): Observable<News[]> {
    return this.http.get<News[]>(
      `${this.baseUrl}/Events?take=${take}&skip=${skip}`
    );
  }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/GetAll`);
  }

  createNews(newsItem: FormData): Observable<any> {
    return this.http.post(this.baseUrl, newsItem, this.httpOptions);
  }

  deleteNews(id: string): Observable<News> {
    return this.http.delete<News>(`${this.baseUrl}?id=${id}`);
  }
  updateNews(newsid: string, news: News): Observable<News> {
    // return this.http.put<News>(`${this.baseUrl}/${news.id}`, news, this.httpOptions);
    return this.http.put<News>(
      `${this.baseUrl}/${newsid}`,
      news,
      this.httpOptions
    );
  }
  updateNewsImage(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put(
      `${this.baseUrl}/UpdateImage/${id}`,
      formData,
      this.httpOptions
    );
  }
}
