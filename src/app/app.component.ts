import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InterceptorApp';

  posts : any[] = [];

  constructor(private authService : AuthService){}

  fetchData() {
    this.authService.getData().subscribe(( res : any) => {
      this.posts = res;
    })
  }
}
