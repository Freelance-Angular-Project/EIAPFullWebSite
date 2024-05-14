import { Component } from '@angular/core';
import { TicketResponse } from '../../../../../Models/Tickets/ticket-response';
import { TicketsService } from '../../../../../Services/Tickets/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent {
  ticket: TicketResponse = {} as TicketResponse;
  currentTicketID: string = '';
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private ticketservices: TicketsService
  ) {}
  ngOnInit(): void {
    this.currentTicketID = this.activatedrouter.snapshot.paramMap.get('id') || '';

    this.ticketservices.getTicketById(this.currentTicketID).subscribe({
      next: (currentTicket) => {
        this.ticket = currentTicket;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack() {
    this.router.navigate(['/TicketsDashboard']);
  }
}
