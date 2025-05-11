import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("request sent")
    return next.handle(req).pipe(
      catchError((error:HttpResponse<any>) => {
        if(error.status == 400) {
          console.log("Bad Requset", error.body)
        }
        else{
          console.log("Some Other Errors")
        }
        return of()
      } )
    )
  }


}
