import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../shared/models/message';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesApiService {
  constructor(private http: HttpClient) {}
  getMessagesFromUser(userId: string): Observable<Message[]> {
    const url = `${environment.apiUrl}/messages/${userId}`;
    return this.http.get<Message[]>(url);
  }

  sendMessageToUser(userId: string, message: string): Observable<Message> {
    const url = `${environment.apiUrl}/messages/send/${userId}`;
    return this.http.post<Message>(url, { message });
  }
}
