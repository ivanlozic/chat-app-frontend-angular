import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';
import { API_ROUTES } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedUser: User | null = null;
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http
      .post<any>(`${this.baseUrl}${API_ROUTES.AUTH_LOGIN}`, credentials)
      .pipe(
        tap((response) => {
          if (response.token && response.user) {
            this.authenticatedUser = response.user;
            this.store.dispatch(AuthActions.loginSuccess());
          }
        })
      );
  }

  logout() {
    this.authenticatedUser = null;
    this.store.dispatch(AuthActions.logout());
  }

  getAuthenticatedUser(): User | null {
    return this.authenticatedUser;
  }
}
