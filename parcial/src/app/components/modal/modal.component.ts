import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Input() info: any;
  @Output() close = new EventEmitter<void>();
  openInAppBrowser() {
    // Aquí se llamaría al plugin de InAppBrowser de Capacitor
  }
}
