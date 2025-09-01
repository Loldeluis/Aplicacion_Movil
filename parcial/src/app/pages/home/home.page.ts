import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../shared/auth.service';
import { StorageUtil } from '../../shared/providers/storage/storage.util';
import { EncryptUtil } from '../../shared/providers/encrypt/encrypt.util';

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
    // Buscar usuario por email en StorageUtil
    let foundUser = null;
    for (const key of StorageUtil.getAllKeys()) {
      const userData = StorageUtil.getItem<any>(key);
      if (userData && userData.email === this.email) {
        foundUser = userData;
        break;
      }
    }

    if (!foundUser) {
      this.showAlert('Error', 'Correo no encontrado');
      return;
    }

  if (foundUser.password === EncryptUtil.hashPassword(this.password)) {
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