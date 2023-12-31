import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_ROUTES } from '../app.constants';
import { Message } from '../shared/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {}

  addFriend(currentUser: string, friendUsername: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}${API_ROUTES.ADD_FRIEND}`, {
      currentUser,
      friendUsername,
    });
  }

  sendFriendRequest(
    currentUser: string,
    friendUsername: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${API_ROUTES.SEND_FRIEND_REQUEST}`,
      {
        currentUser,
        friendUsername,
      }
    );
  }

  rejectFriendRequest(
    currentUser: string,
    friendUsername: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${API_ROUTES.REJECT_FRIEND_REQUEST}`,
      {
        currentUser,
        friendUsername,
      }
    );
  }

  sendMessage(
    currentUser: string,
    friendUsername: string,
    message: Message
  ): Observable<any> {
    const url = `${environment.apiUrl}${API_ROUTES.SEND_MESSAGE}`;
    const requestBody = {
      currentUser,
      friendUsername,
      message,
    };
    return this.http.post(url, requestBody);
  }
}
