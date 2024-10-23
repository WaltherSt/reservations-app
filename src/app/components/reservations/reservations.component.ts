import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroListBullet,
  heroPencilSquare,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { Reservation } from '../../models/Reservation';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'reservations',
  standalone: true,
  imports: [NgIconComponent, DatePipe, TableComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  providers: [provideIcons({ heroTrash, heroPencilSquare, heroListBullet })],
})
export class ReservationsComponent implements OnInit {
  reservationsList: Reservation[] = [];

  constructor(
    private store: Store<{ reservations: { reservations: Reservation[] } }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch({ type: '[Reservation Page] Load reservations' });

    this.store.select('reservations').subscribe((reservations) => {
      this.reservationsList = reservations.reservations;
    });
  }
}
