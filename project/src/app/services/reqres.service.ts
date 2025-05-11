import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  private endpoint: string = "https://reqres.in/api"; // Base URL for the API

  constructor(private http: HttpClient) {}

  // POST request for logging in with email and password
  post_login(data: admin): Observable<any> {
    // Add headers (if necessary, like x-api-key)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1' // Example of adding API key
    });

    // Send POST request to the login endpoint
    return this.http.post(`${this.endpoint}/login`, data, { headers });
  }

  // POST request for registering a new user
  post_register(data: admin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1' // Example of adding API key
    });

    return this.http.post(`${this.endpoint}/register`, data, { headers });
  }

  // You can add more endpoints here as necessary
  // For example, to get users, fetch a list of users, etc.
  get_users(): Observable<any> {
    return this.http.get(`${this.endpoint}/users`);
  }
}

