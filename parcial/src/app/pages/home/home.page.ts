import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertCtrl: AlertController, private authService: AuthService) {}

  async login() {
    // Buscar usuario por email en localStorage
    let foundUser = null;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const userData = JSON.parse(localStorage.getItem(key)!);
      if (userData.email === this.email) {
        foundUser = userData;
        break;
      }
    }

    if (!foundUser) {
      this.showAlert('Error', 'Correo no encontrado');
      return;
    }

    if (foundUser.password === this.password) {
      this.authService.login(this.email);
      this.router.navigate(['/dashboard']);
    } else {
      this.showAlert('Error', 'Contraseña incorrecta');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


}