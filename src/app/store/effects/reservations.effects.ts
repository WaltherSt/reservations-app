import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { loadReservations } from '../actions/reservations.actions';

@Injectable()
export class ReservationsEffects {
  constructor(
    private actions$: Actions,
    private reservationsService: ReservationService
  ) {}

  loadReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Reservation Page] Load reservations'),
      exhaustMap(() =>
        this.reservationsService.findAll().pipe(
          map((reservations) => loadReservations({ reservations })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
