import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketsService } from '../../../Services/Tickets/tickets.service';
import { Tickets } from '../../../Models/tickets';
import { SuccessTicketPopupComponent } from '../success-ticket-popup/success-ticket-popup.component';
import { ProjectToSelect } from '../../../Models/project-to-select';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterModule, FormsModule, SuccessTicketPopupComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent implements OnInit {
  ticket: Tickets = {} as Tickets;
  successModel: boolean = false;
  projectsToselect: ProjectToSelect[] = [];
  constructor(private ticketservice: TicketsService, private router: Router) {}
  ngOnInit(): void {
    this.ticketservice.getProjectsToSelect().subscribe({
      next: (projects) => {
        console.log(projects);
        this.projectsToselect = projects;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  AddTicket(form: NgForm) {
    this.ticketservice.addTicket(this.ticket).subscribe({
      next: (data) => {
        console.log('Success add ticket', data);
        this.successModel = true;
        // this.router.navigate(['/Home']);
        // Clear the form
        form.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hideFunc(): boolean {
    return (this.successModel = false);
    // console.log("jjjjj");
  }
}
