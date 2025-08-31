import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss']
})
export class PrincipalNewsComponent {
  @Input() news: any;
}
