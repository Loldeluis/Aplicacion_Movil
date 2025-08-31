import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() url: string = '';
  @Input() text: string = '';

  constructor(private router: Router) {}

  navigate() {
    this.router.navigateByUrl(this.url);
  }
}
