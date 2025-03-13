import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserChat } from '../../shared/models/user-chat';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}
  getStartedChatsWithUsers(): Observable<UserChat[]> {
    const url = `${environment.apiUrl}/users/started/conversations`;
    return this.http.get<UserChat[]>(url);
  }

  getAllRegisteredUsers(): Observable<User[]> {
    const url = `${environment.apiUrl}/users/all/registered`;
    return this.http.get<User[]>(url);
  }
}
