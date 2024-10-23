import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { UsersServiceService } from '../../services/users-service.service';
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserSuccess,
  loadUsers,
  updateUser,
} from '../actions/users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersServiceService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Users Page] Load Users'),
      exhaustMap(({ pageNumber }) =>
        this.usersService.findAll(pageNumber).pipe(
          map((users) => loadUsers({ users })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      exhaustMap((action) => {
        return this.usersService.addUser(action.user).pipe(
          map((user) => {
            return addUserSuccess({ user });
          }),
          catchError((error: any) => {
            return of(addUserFailure({ errors: error.error.errors }));
          })
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      exhaustMap(({ userId }) =>
        this.usersService.deleteUser(userId).pipe(
          map(() => deleteUserSuccess({ userId })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap(({ user, id }) =>
        this.usersService.updateUser(user, id).pipe(
          map(() => updateUser({ user, id })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
