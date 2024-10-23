import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/User';
import {
  addUserFailure,
  addUserSuccess,
  clearUser,
  clearUserState,
  deleteUserSuccess,
  loadUsers,
  setLoading,
  setUser,
  updateUser,
} from '../actions/users.actions';

export interface UserState {
  users: User[];
  userSelected: User;
  updateMode: boolean;
  totalPages: number;
  pageNumber: number;
  loading: boolean;
  success: boolean;
  errors: string[];
}

export const initialState: UserState = {
  users: [],
  userSelected: new User(),
  updateMode: false,
  totalPages: 0,
  pageNumber: 0,
  loading: false,
  success: false,
  errors: [],
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state, { users }) => ({
    ...state,
    users: [...users.users],
    totalPages: users.totalPages,
    pageNumber: users.pageNumber,
  })),

  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    success: true,
    loading: false,
  })),

  on(addUserFailure, (state, { errors }) => ({
    ...state,
    loading: false,
    success: false,
    errors: errors,
  })),
  on(clearUserState, (state) => ({
    ...state,
    success: false,
    errors: [],
  })),

  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),

  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  })),

  on(updateUser, (state, { user, id }) => ({
    ...state,
    users: state.users.map((u) =>
      u.id == id ? { ...u, name: user.name, email: user.email } : u
    ),
    success: true,
    loading: false,
  })),
  on(setUser, (state, { user }) => ({
    ...state,
    userSelected: { ...user },
    updateMode: true,
  })),
  on(clearUser, (state) => ({
    ...state,
    userSelected: new User(),
    updateMode: false,
  }))
);
