import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

  constructor(private alert : AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error.status >= 400 && error.status < 500) {
          this.alert.information("Bad Request Sent", error.error, true)
        } else {
          this.alert.information("Some Other Error", error.error, true)
        }
        return throwError(() => error);
      })
    );
  }
}

