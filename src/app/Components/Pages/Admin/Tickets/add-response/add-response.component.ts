import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../../../Services/Tickets/tickets.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketResponse } from '../../../../../Models/Tickets/ticket-response';
import { ToastService } from '../../../../../Services/Toast/toast.service';
import { CommonModule } from '@angular/common';
import { AddResponsePublicTickets } from '../../../../../Models/Tickets/add-response-public-tickets';

@Component({
  selector: 'app-add-response',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-response.component.html',
  styleUrl: './add-response.component.scss'
})
export class AddResponseComponent implements OnInit  {
  AddResponseForm:FormGroup;
  AllTickets : TicketResponse[] = [];
  FilterAllTickets : TicketResponse[] = [];
  selectedResponseName: string = '';
  addResponseObject: AddResponsePublicTickets = {} as AddResponsePublicTickets;

constructor(private ticketService : TicketsService,private fb: FormBuilder,public toastService: ToastService){
  this.AddResponseForm = this.fb.group({
    TicketId: ['', [Validators.required]],
    Response: ['', [Validators.required]],
    newUserId: ['', [Validators.required]], // userId send to api
  });
}

get Response() {
  return this.AddResponseForm.get('Response');
}
get TicketId() {
  return this.AddResponseForm.get('TicketId');
}
  ngOnInit(): void {
    this.ticketService.getPublicTickets().subscribe({
      next: (allTickets)=>{
        this.AllTickets = allTickets;
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }

  onSubmitResponse(){
    if (this.AddResponseForm.valid) {
      this.addResponseObject = {
        id: this.AddResponseForm.value.newUserId,
        response: this.AddResponseForm.value.Response,
      };
      // console.log(this.addResponseObject);

      this.ticketService.AddResponse(this.addResponseObject.id, this.addResponseObject.response).subscribe({
        next: (addResponse) => {
          // console.log(addResponse);
          this.AddResponseForm.reset();
          this.toastService.show(
            'Add Response has been successfully created.',
            false
          );
        },
        error: (err) => {
          // console.log(err);
          this.toastService.show(
            'Add Response has been error in create',
            true
          );
          console.log(err);

        },
      });
    }
  }



  performFilter(event: Event) {
    // filterByRole = filterByRole.toLocaleLowerCase();
    const filterByRole = (event.target as HTMLInputElement).value;

    if (filterByRole) {
      // console.log(filterByRole);

      this.FilterAllTickets = this.AllTickets.filter(
        (addResponse: TicketResponse) =>
          addResponse.subject &&
        addResponse.subject.toLowerCase().includes(filterByRole.toLowerCase())
      );
    } else {
      this.FilterAllTickets = [...this.AllTickets];
    }
    // console.log(this.FilterAllTickets);

  }
  selectManager(addResponse: TicketResponse): void {
    this.selectedResponseName = addResponse.subject;
    // console.log(this.selectedResponseName);
    this.AddResponseForm.controls['TicketId'].setValue(addResponse.subject);
    this.AddResponseForm.controls['newUserId'].setValue(addResponse.id);
    this.FilterAllTickets = [];
  }


}
