# Angular 18 HTTP Interceptors

## Introduction
HTTP Interceptors in Angular 18 are a powerful tool for modifying outgoing HTTP requests and incoming responses. They are commonly used for authentication, logging, error handling, and request transformation.

## Features
- Modify HTTP requests before they are sent.
- Handle global error responses.
- Add authentication tokens.
- Log requests and responses.

## Installation
Ensure you have Angular 18 installed. If not, update your Angular CLI and create a new project:
```sh
npm install -g @angular/cli
ng new my-angular-app
cd my-angular-app
```

## Creating an HTTP Interceptor
Generate an interceptor using the Angular CLI:
```sh
ng generate interceptor auth
```
This will create `auth.interceptor.ts` inside the `src/app` folder.

### Implementing the Interceptor
Edit `auth.interceptor.ts` to include authentication headers:
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }
}
```

## Registering the Interceptor
Modify `app.module.ts` to provide the interceptor:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using the Interceptor
Make an HTTP request in a service:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get('https://api.example.com/data');
  }
}
```

## Error Handling Interceptor Example
To globally handle errors, modify the interceptor:
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
```

## Conclusion
Angular 18 HTTP Interceptors provide a powerful way to manage HTTP requests globally. They are useful for authentication, logging, error handling, and request transformation.

For more information, refer to the [Angular documentation](https://angular.io/guide/http-interceptors).

