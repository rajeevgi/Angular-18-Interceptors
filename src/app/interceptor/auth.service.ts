import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders : {
        Authorization : 'Bearer my-secret-token'
      }
    });
    console.log('Intercepted Http Request:', modifiedReq);
    return next.handle(modifiedReq);       // for a single interceptor.
  }
}
