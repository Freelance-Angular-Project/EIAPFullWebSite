import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../../../Services/Tickets/tickets.service';
import { TicketResponse } from '../../../../../Models/Tickets/ticket-response';
import { Router, RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-view-tickets',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-tickets.component.html',
  styleUrl: './view-tickets.component.scss',
})
export class ViewTicketsComponent implements OnInit {
  ticketsresponse:TicketResponse[]=[];
  selectedTicketId: string | null = null;

  constructor(private ticketservice: TicketsService,private router: Router) {}
  ngOnInit(): void {
    this.ticketservice.getPublicTickets().subscribe({
      next: (tickets) => {
        // console.log(tickets);
        this.ticketsresponse=tickets;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openConfirmModal(): void {
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  selectTicket(ticketId: string) {
    this.selectedTicketId = ticketId;
  }
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deleteTicket() {
    if (this.selectedTicketId) {
      this.ticketservice.deleteTicket(this.selectedTicketId).subscribe({
        next: (data) => {
          const confirmModal = bootstrap.Modal.getInstance(
            document.getElementById('confirmDeleteModal')
          );
          confirmModal.hide();
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('No Ticket selected for deletion');
    }
  }
}
