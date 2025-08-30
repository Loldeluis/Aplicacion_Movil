import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:  false
})
export class RegisterPage implements OnInit {
  username: string = '';
  lastname: string = '';
  email: string = '';
  country: string = '';
  password: string = '';
  confirmPassword: string = '';
  countries: any[] = [];

  constructor(
    private router: Router,
     private alertCtrl: AlertController,
    private http: HttpClient
    ) { }

  ngOnInit() { //La api
   
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries/flag/unicode')
      .subscribe(res => {
        this.countries = res.data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      });
  }

    isFormValid(): boolean {
    return (
      this.username.trim().length > 0 &&
      this.lastname.trim().length > 0 &&
      this.validateEmail(this.email) &&
      this.country !== '' &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword
    );
  }

    validateEmail(email: string): boolean {
    // Solo correos Gmail
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  }


  async register() {
    if (!this.isFormValid()) {
      this.showAlert('Error', 'Por favor completa correctamente todos los campos.');
      return;
    }

  if (localStorage.getItem(this.username)) {
      this.showAlert('Error', 'El usuario ya existe');
      return;
    }

  const userData = {
      username: this.username,
      lastname: this.lastname,
      email: this.email,
      country: this.country,
      password: this.password
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
