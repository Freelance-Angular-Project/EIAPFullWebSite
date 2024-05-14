import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../../Models/Tickets/tickets';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProjectToSelect } from '../../Models/Projects/project-to-select';
import { TicketResponse } from '../../Models/Tickets/ticket-response';
import { AddResponsePublicTickets } from '../../Models/Tickets/add-response-public-tickets';

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

  AddResponse(id: string, response: string): Observable<any> {
    const url = `${
      environment.baseApiURL
    }/Tickets/AddResponse?id=${encodeURIComponent(
      id
    )}&response=${encodeURIComponent(response)}`;
    return this.httpclient.post(
      url,
      {},
      { headers: this.httpOptions.headers, responseType: 'text' }
    );
  }

  getTicketsByProject(
    projectid: string,
    take: number = 100,
    skip: number = 0
  ): Observable<TicketResponse[]> {
    return this.httpclient.get<TicketResponse[]>(
      `${environment.baseApiURL}/Tickets/GetTicketsByProjects?projectId=${projectid}&skip=${skip}&take=${take}`
    );
  }
  getTicketById(ticketID: string): Observable<TicketResponse> {
    return this.httpclient.get<TicketResponse>(
      `${environment.baseApiURL}/Tickets/GetById?id=${ticketID}`
    );
  }
  getTicketsToSchool(
    take: number = 100,
    skip: number = 0
  ): Observable<TicketResponse[]> {
    return this.httpclient.get<TicketResponse[]>(
      `${environment.baseApiURL}/Tickets/GetTicketsToSchool?skip=${skip}&take=${take}`
    );
  }
}
