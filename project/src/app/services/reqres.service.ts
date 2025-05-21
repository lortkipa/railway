import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  private endpoint: string = "https://reqres.in/api"; 
  constructor(private http: HttpClient) {}

  post_login(data: admin): Observable<any> {
    // Add headers (if necessary, like x-api-key)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1' 
    });

    return this.http.post(`${this.endpoint}/login`, data, { headers });
  }

  post_register(data: admin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1' 
    });

    return this.http.post(`${this.endpoint}/register`, data, { headers });
  }

  get_users(): Observable<any> {
    return this.http.get(`${this.endpoint}/users`);
  }
}

