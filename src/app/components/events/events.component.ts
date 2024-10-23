import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventsService } from '../../services/events.service';
import { CardEventComponent } from '../card-event/card-event.component';

@Component({
  selector: 'events',
  standalone: true,
  imports: [DatePipe, CardEventComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  eventList: Event[] = [];

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.findAll().subscribe((events) => {
      this.eventList = events;
    });
  }
}
