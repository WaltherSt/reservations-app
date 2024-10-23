import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

export interface UserResponse {
  users: User[];
  totalPages: number;
  pageNumber: number;
}

export const loadUsers = createAction(
  '[User Component] Load Users',
  props<{ users: UserResponse }>()
);

export const addUser = createAction(
  '[Register Component] Add user',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[Register API] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[Register] User error',
  props<{ errors: string[] }>()
);

export const clearUserState = createAction('[Users Page] Clear User State');

export const setLoading = createAction(
  '[User Effect] Set loading state',
  props<{ loading: boolean }>()
);

export const deleteUser = createAction(
  '[User Page] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User API] Delete User Success',
  props<{ userId: number }>()
);

export const setUser = createAction(
  '[User API] Set User',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User API] Update User',
  props<{ user: User; id: number }>()
);

export const clearUser = createAction('[User API] Clear User');
