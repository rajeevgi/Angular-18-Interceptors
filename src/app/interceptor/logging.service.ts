import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService implements HttpInterceptor {

  constructor() { 
    console.log("Login Interceptor is called....");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL:', req.url);

    return next.handle(req).pipe(
      tap(event => console.log('Response Received:', event))
    );
  }
}
