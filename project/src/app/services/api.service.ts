import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get(url : string) : Observable<any> {
    return this.http.get(url)
  }

  post(url: string, data: any): Observable<any> {
    const isTextResponse = url.includes('/tickets/register');

    if (isTextResponse) {
      // text response needs special handling
      return this.http.post(url, data, {
        responseType: 'text' as 'json'
      });
    }

    // default to JSON
    return this.http.post<any>(url, data);
  }

  delete(url: string): Observable<any> {
  const isTextResponse = url.includes('/tickets/cancel');

  if (isTextResponse) {
    // expect plain text, treat it as JSON to avoid parsing error
    return this.http.delete(url, {
      responseType: 'text' as 'json'
    });
  }

  // default to JSON
  return this.http.delete<any>(url);
}

}
