import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroListBullet,
  heroPencilSquare,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';
import { deleteUser, setUser } from '../../store/actions/users.actions';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'users',
  standalone: true,
  imports: [NgIconComponent, TableComponent, PaginatorComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [provideIcons({ heroTrash, heroPencilSquare, heroListBullet })],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  totalPages: number = 0;
  pageNumber: number = 0;

  constructor(
    private router: Router,
    private store: Store<{
      users: { users: User[]; totalPages: number; pageNumber: number };
    }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: '[Users Page] Load Users',
      pageNumber: this.pageNumber,
    });

    this.store.select('users').subscribe((users) => {
      this.users = users.users;
      this.pageNumber = users.pageNumber;
      this.totalPages = users.totalPages;
    });
  }

  deleteUser(item: number) {
    this.store.dispatch(deleteUser({ userId: item }));
  }

  updateUser(user: User) {
    this.store.dispatch(setUser({ user }));
    this.router.navigate(['/update']);
  }
}
