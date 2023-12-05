import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_ROUTES, ROUTES } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(formData: any): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}${API_ROUTES.REGISTER}`,
      formData
    );
  }
}
