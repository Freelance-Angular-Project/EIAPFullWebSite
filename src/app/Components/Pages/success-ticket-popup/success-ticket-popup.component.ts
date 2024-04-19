import { Component } from '@angular/core';

@Component({
  selector: 'app-success-ticket-popup',
  standalone: true,
  imports: [],
  templateUrl: './success-ticket-popup.component.html',
  styleUrl: './success-ticket-popup.component.scss'
})
export class SuccessTicketPopupComponent {
hideModel1 :boolean = false;
hideFunc():boolean{
  return this.hideModel1=false;
  // console.log("jjjjj");

}
}
