import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearUser } from '../../store/actions/users.actions';
import { UserState } from '../../store/reducers/users.reducer';

@Component({
  selector: 'navbar-reservation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private store: Store<UserState>) {}

  clearUserSelected() {
    this.store.dispatch(clearUser());
  }
}
