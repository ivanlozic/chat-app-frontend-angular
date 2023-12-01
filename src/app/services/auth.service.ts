import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = { username: 'Ivan', password: 'programiranje' };

  constructor(private store: Store) {}

  login(username: string, password: string): Observable<void> {
    if (username === this.user.username && password === this.user.password) {
        this.store.dispatch(AuthActions.loginSuccess());
      return of()
    } else {
      throw new Error('Invalid username or password');
    }
  }
}
