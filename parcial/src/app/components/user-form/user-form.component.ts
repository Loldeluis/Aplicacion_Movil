
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-user-form',
  template: `
    <form>

    <ion-item>
    <ion-label position="floating">ID</ion-label>
    <ion-input [(ngModel)]="user.id" name="id" readonly></ion-input>
  </ion-item>
  
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input [(ngModel)]="user.name" name="username"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Apellido</ion-label>
        <ion-input [(ngModel)]="user.lastName" name="lastname"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Correo</ion-label>
        <ion-input [(ngModel)]="user.email" name="email"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">País</ion-label>
        <ion-input [(ngModel)]="user.country" name="country"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input [(ngModel)]="user.password" type="password" name="password"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirmar Contraseña</ion-label>
        <ion-input [(ngModel)]="user.confirmPassword" type="password" name="confirmPassword"></ion-input>
      </ion-item>
    </form>
  `
})
export class UserFormComponent {
  @Input() user: any;
}
