import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ReservationsEffects } from './store/effects/reservations.effects';
import { UsersEffects } from './store/effects/users.effects';
import { reservationReducer } from './store/reducers/reservations.reducer';
import { usersReducer } from './store/reducers/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      users: usersReducer,
      reservations: reservationReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(UsersEffects, ReservationsEffects),
  ],
};
