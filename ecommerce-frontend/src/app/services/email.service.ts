import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/register';  // URL de tu API en Laravel

  constructor(private http: HttpClient) { }

  sendRegistrationEmail(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
