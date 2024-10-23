import { createAction, props } from '@ngrx/store';
import { Reservation } from '../../models/Reservation';

export const loadReservations = createAction(
  '[Reservation Component] Load reservation',
  props<{ reservations: Reservation[] }>()
);
