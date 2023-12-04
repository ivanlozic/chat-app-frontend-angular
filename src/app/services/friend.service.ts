import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_ROUTES } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {}

  addFriend(currentUser: string, friendUsername: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}${API_ROUTES.ADD_FRIEND}`, {
      currentUser,friendUsername,
    });
  }
}
