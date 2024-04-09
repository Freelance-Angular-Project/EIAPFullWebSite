import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../../Models/tickets';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProjectToSelect } from '../../Models/project-to-select';
import { TicketResponse } from '../../Models/ticket-response';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    }),
  };
  constructor(private httpclient: HttpClient) {}
  addTicket(ticket: Tickets): Observable<Tickets> {
    return this.httpclient.post<Tickets>(
      `${environment.baseApiURL}/Tickets`,
      ticket,
      this.httpOptions
    );
  }

  getProjectsToSelect(): Observable<ProjectToSelect[]> {
    return this.httpclient.get<ProjectToSelect[]>(
      `${environment.baseApiURL}/Projects/GetAllProjectToSelect`
    );
  }
  getPublicTickets(
    skip: number = 0,
    take: number = 100
  ): Observable<TicketResponse[]> {
    return this.httpclient.get<TicketResponse[]>(
      `${environment.baseApiURL}/Tickets/GetPublicTickets?skip=${skip}&take=${take}`
    );
  }
  deleteTicket(ticketId: string): Observable<TicketResponse> {
    return this.httpclient.delete<TicketResponse>(
      `${environment.baseApiURL}/Tickets?id=${ticketId}`
    );
  }
}
