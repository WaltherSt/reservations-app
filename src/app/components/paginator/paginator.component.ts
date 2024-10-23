import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  pageIterator: number[] = [];
  pageNumber: number = 0;

  constructor(
    private store: Store<{ users: { totalPages: number; pageNumber: number } }>
  ) {
    this.store.select('users').subscribe((users) => {
      this.pageIterator = Array.from(
        { length: users.totalPages },
        (_, i) => i++
      );
      this.pageNumber = users.pageNumber;
    });
  }

  changePage(page: number) {
    this.store.dispatch({
      type: '[Users Page] Load Users',
      pageNumber: page,
    });
  }
}
