import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserResponse } from '../store/actions/users.actions';
import { UserState } from '../store/reducers/users.reducer';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  // private url: string = 'http://localhost:8080/user';
  private url: string = 'http://ec2-34-226-190-76.compute-1.amazonaws.com/user';
  pageNumber: number = 0;

  constructor(
    private http: HttpClient,
    private store: Store<{ users: UserState }>
  ) {
    this.store.select('users').subscribe((users) => {
      this.pageNumber = users.pageNumber;
    });
  }

  findAll(page: number = 0): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.url}/${page}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateUser(user: User, id: number): Observable<Object> {
    return this.http.patch(`${this.url}/${id}`, user);
  }
}
