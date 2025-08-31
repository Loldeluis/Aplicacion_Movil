import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  news: any[] = [];
  loading = true;
  error = '';

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    this.loading = true;
    this.http.get<any>('https://newsapi.org/v2/everything?q=tesla&from=2025-07-31&sortBy=publishedAt&apiKey=4e933b43792842b6be7c199ab7a2352d')
      .subscribe({
        next: res => {
          this.news = res.articles || [];
          this.loading = false;
        },
        error: err => {
          this.error = 'No se pudieron cargar las noticias.';
          this.loading = false;
        }
      });
  }

  logout() {
    this.authService.logout();
  }
}
