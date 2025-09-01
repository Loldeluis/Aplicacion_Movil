// src/app/pages/dashboard/profile-modal.component.ts
import { Component, Input } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

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
      <app-user-form [user]="user"></app-user-form>

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

  constructor(
      private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

   async saveChanges() {
    if (this.user.password !== this.user.confirmPassword) {
      // Mostrar mensaje de error si las contraseñas no coinciden
      const toast = await this.toastCtrl.create({
        message: "Passwords didn't match",
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      return; // detenemos el flujo
    }

      console.log('Usuario actualizado:', this.user);

         const toast = await this.toastCtrl.create({
      message: 'User updated',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();

      // Cerramos modal enviando datos
    this.modalCtrl.dismiss(this.user);
  }
  
}
