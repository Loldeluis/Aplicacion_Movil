import { Component } from '@angular/core';
import {Router } from '@angular/router';
import {AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}
 
   async login() {
    const storedUser = localStorage.getItem(this.username);

    if (!storedUser) {
      this.showAlert('Error', 'Usuario no encontrado');
      return;
    }

      const userData = JSON.parse(storedUser);

    if (userData.password === this.password) {
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
