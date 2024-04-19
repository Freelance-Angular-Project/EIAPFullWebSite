import { Injectable } from '@angular/core';
import { Events } from '../../Models/Events/events';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = `${environment.baseApiURL}/News`; // Replace with the actual base URL
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getEvents(take: number = 100, skip: number = 0): Observable<Events[]> {
    return this.http.get<Events[]>(
      `${this.baseUrl}/Events?take=${take}&skip=${skip}`
    );
  }
}
