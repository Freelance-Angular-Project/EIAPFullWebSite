import { Component } from '@angular/core';
import { Events } from '../../../../../Models/Events/events';
import { EventsService } from '../../../../../Services/Events/events.service';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [],
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.scss'
})
export class ViewEventsComponent {
  events: Events[] = [];
  constructor(private eventsservice: EventsService) {}
  ngOnInit(): void {
    this.eventsservice.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
