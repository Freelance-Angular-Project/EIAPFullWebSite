import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../../../Services/Tickets/tickets.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../../Services/Toast/toast.service';
import { CommonModule } from '@angular/common';
import { AddResponsePublicTickets } from '../../../../../Models/Tickets/add-response-public-tickets';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-response',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-response.component.html',
  styleUrl: './add-response.component.scss'
})
export class AddResponseComponent implements OnInit  {
  AddResponseForm:FormGroup;
  addResponseObject: AddResponsePublicTickets = {} as AddResponsePublicTickets;


  ticketId : string | null = null;
constructor(private ticketService : TicketsService,
  private fb: FormBuilder,
  public toastService: ToastService,
  private route: ActivatedRoute,
  private router: Router
){
  this.AddResponseForm = this.fb.group({
    Response: ['', [Validators.required]],
  });
}

get Response() {
  return this.AddResponseForm.get('Response');
}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ID');  // Get the ID passed through the route

    });
  }

  onSubmitResponse() {

    if (this.AddResponseForm.valid && this.ticketId) {
        this.addResponseObject = {
            id: this.ticketId,
            response: this.AddResponseForm.value.Response,
        };
        // console.log('addResponseObject:', this.addResponseObject);

        this.ticketService.AddResponse(this.addResponseObject.id, this.addResponseObject.response).subscribe({
            next: (addResponse) => {
                this.AddResponseForm.reset();
                this.toastService.show('Add Response has been successfully created.', false);

                this.router.navigate(['/TicketsAdminDashboard']);
            },
            error: (err) => {
                this.toastService.show('Add Response has been error in create', true);
                // console.log(err);
            },
        });
    } else {
        console.log('Form is invalid or ticketId is null');
    }
}






}
