import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../../Models/news';
import { Observable } from 'rxjs';
import { NewsImageUpdate } from '../../Models/news-image-update';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = `${environment.baseApiURL}/News`; // Replace with the actual base URL

  constructor(private http: HttpClient) { }

  // getPublicNews(): Observable<News[]> {
  //   return this.http.get<News[]>(`${this.baseUrl}/publicNews?take=50&skip=0`);
  // }
  getPublicNews(take:number=50, skip:number=0): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/publicNews?take=${take}&skip=${skip}`);
  }

  getProjectNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/ProjectNews`);
  }

  getEvents(take:number=50,skip:number=0): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/Events?take=${take}&skip=${skip}`);
  }


  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}/GetAll`);
  }

  createNews(newsItem: News): Observable<News> {
    return this.http.post<News>(this.baseUrl, newsItem);
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateNewsImage(id: number, imageUpdate: NewsImageUpdate): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageUpdate.image);

    return this.http.put(`${this.baseUrl}/UpdateImage/${id}`, formData);
  }
}
