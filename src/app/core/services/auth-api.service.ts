import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login';
import { UserData } from '../../shared/models/user-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<UserData> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<UserData>(url, data);
  }

  logout(): Observable<{ message: string }> {
    const url = `${environment.apiUrl}/logout`;
    return this.http.post<{ message: string }>(url, {});
  }
}
