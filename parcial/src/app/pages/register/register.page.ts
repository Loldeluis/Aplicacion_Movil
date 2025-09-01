import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { EncryptUtil } from '../../shared/providers/encrypt/encrypt.util';
import { StorageUtil } from '../../shared/providers/storage/storage.util';
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
  country: any = '';
  password: string = '';
  confirmPassword: string = '';
  countries: any[] = [];
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

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

    // Validar que no exista un usuario con el mismo email
    let emailExists = false;
    for (const key of StorageUtil.getAllKeys()) {
      let userData;
      try {
        userData = StorageUtil.getItem<any>(key);
      } catch {
        continue; // Si no es JSON válido, ignora esta clave
      }
      if (userData && userData.email === this.email) {
        emailExists = true;
        break;
      }
    }
    if (emailExists) {
      this.showAlert('Error', 'Ya existe un usuario con ese correo');
      return;
    }


    // Buscar el país seleccionado en el array de países
    const selectedCountry = this.countries.find(c => c.name === this.country);

    const userData = {
      id: uuidv4(),
      name: this.username,
      lastName: this.lastname,
      email: this.email,
  password: EncryptUtil.hashPassword(this.password),
      country: selectedCountry
        ? { id: selectedCountry.name, value: `${selectedCountry.unicodeFlag} ${selectedCountry.name}` }
        : { id: this.country, value: this.country }
    };

    // Guardar usando el email como clave
  StorageUtil.setItem(this.email, userData);
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
