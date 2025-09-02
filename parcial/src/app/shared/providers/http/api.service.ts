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
  // Tomamos la fecha actual
  const today = new Date();
  
  // Si quieres, por ejemplo, restarle 1 día para que siempre busque noticias recientes
  const fromDate = new Date();
  fromDate.setDate(today.getDate() - 1);

  // Convertimos a formato YYYY-MM-DD
  const formattedDate = fromDate.toISOString().split('T')[0];

  const url = `https://newsapi.org/v2/everything?q=${category}&from=${formattedDate}&sortBy=publishedAt&apiKey=4e933b43792842b6be7c199ab7a2352d`;
  
  return this.http.get<any>(url);
}
}
