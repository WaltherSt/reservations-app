import { createReducer, on } from '@ngrx/store';
import { Reservation } from '../../models/Reservation';
import { loadReservations } from '../actions/reservations.actions';

export interface reservationState {
  reservations: Reservation[];
}

export const initialState: reservationState = {
  reservations: [],
};

export const reservationReducer = createReducer(
  initialState,
  on(loadReservations, (state, { reservations }) => ({
    reservations: [...reservations],
  }))
);
