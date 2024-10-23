import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Event } from '../../models/Event';

@Component({
  selector: 'card-event',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css',
})
export class CardEventComponent {
  @Input() data!: Event;
}
