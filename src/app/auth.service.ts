import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http : HttpClient) { }

  getData() {
    console.log("Api call triggered...")
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }
}
