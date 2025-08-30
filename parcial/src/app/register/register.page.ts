import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:  false
})
export class RegisterPage {
 username: string = '';
  password: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) { }

   async register() {
    if (!this.username || !this.password) {
      this.showAlert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (localStorage.getItem(this.username)) {
      this.showAlert('Error', 'El usuario ya existe');
      return;
    }

      const userData = {
      username: this.username,
      password: this.password,
    };

     localStorage.setItem(this.username, JSON.stringify(userData));
    this.showAlert('Éxito', 'Usuario registrado correctamente');
    this.router.navigate(['/home']);
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
