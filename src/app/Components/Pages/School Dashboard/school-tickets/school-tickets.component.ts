import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../../Services/Tickets/tickets.service';
import { TicketResponse } from '../../../../Models/Tickets/ticket-response';

@Component({
  selector: 'app-school-tickets',
  standalone: true,
  imports: [],
  templateUrl: './school-tickets.component.html',
  styleUrl: './school-tickets.component.scss',
})
export class SchoolTicketsComponent implements OnInit {
  schoolTickets: TicketResponse[] = [];
  constructor(private ticketsService: TicketsService) {}
  ngOnInit(): void {
    this.ticketsService.getTicketsToSchool().subscribe({
      next: (tickets) => {
        this.schoolTickets = tickets;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
