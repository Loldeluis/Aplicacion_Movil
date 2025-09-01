import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>('https://countriesnow.space/api/v0.1/countries/flag/unicode');
  }

  getNews(category: string): Observable<any> {
    const url = `https://newsapi.org/v2/everything?q=${category}&from=2025-07-31&sortBy=publishedAt&apiKey=4e933b43792842b6be7c199ab7a2352d`;
    return this.http.get<any>(url);
  }
}
