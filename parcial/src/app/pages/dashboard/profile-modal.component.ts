import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-profile-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Editar Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input [(ngModel)]="user.username"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Apellido</ion-label>
        <ion-input [(ngModel)]="user.lastname"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Correo</ion-label>
        <ion-input [(ngModel)]="user.email"></ion-input>
      </ion-item>

      <div style="margin-top: 20px;">
        <ion-button expand="block" color="success" (click)="saveChanges()">
          Guardar Cambios
        </ion-button>
      </div>
    </ion-content>
  `
})
export class ProfileModalComponent {
  @Input() user: any;

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveChanges() {
    console.log('Usuario actualizado:', this.user);
    this.modalCtrl.dismiss(this.user);
  }
}
