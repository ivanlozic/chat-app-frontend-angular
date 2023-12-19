import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateUserProfile(user: User): Observable<any> {
    const url = `${this.baseUrl}/user/${user.id}`;
    return this.http.put(url, user);
  }
}
