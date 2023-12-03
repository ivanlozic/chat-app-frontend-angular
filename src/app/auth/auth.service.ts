import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000'; // Replace with your NestJS server URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    const credentials = { username, password };
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, credentials);
  }
}
