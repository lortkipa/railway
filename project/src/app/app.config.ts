import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { routes } from './app.routes';
import {HttpInterceptorService} from './services/http-interceptor.service';

// 🔁 Bridge from class-based to function-based interceptor
function classInterceptorAdapter(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const interceptor = inject(HttpInterceptorService);
  // Wrap next.handle-like function in HttpHandler-style object
  return interceptor.intercept(req, {
    handle: next
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([classInterceptorAdapter])
    )
  ]
};

