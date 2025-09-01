
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/shared/providers/http/api.service';
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

  <ion-item class="input-box">
    <ion-label>Country</ion-label>
    <ion-select [(ngModel)]="country" interface="popover" placeholder="Select country">
      <ion-select-option *ngFor="let c of countries" [value]="c.name">
        <span class="flag">{{ c.unicodeFlag }}</span> {{ c.name }}
      </ion-select-option>
    </ion-select>
  </ion-item>

      <ion-item>
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input [(ngModel)]="user.password" type="password" name="password"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirm password</ion-label>
        <ion-input [(ngModel)]="user.confirmPassword" type="password" name="confirmPassword"></ion-input>
      </ion-item>
    </form>
  `
})
export class UserFormComponent {
  @Input() user: any;

  countries: any[] = [];
  country: string = '';
  

  constructor(
    private api: ApiService
  ) {}

ngOnInit() {
   if (this.user) {
      this.country = this.user.country?.name || '';

    }

    this.loadCountries();
  }

    loadCountries() {
    this.api.getCountries().subscribe((res) => {
      if (res && res.data) {
        this.countries = res.data; // [{name: 'Colombia', unicodeFlag: '🇨🇴'}, ...]
      }
    });
  }



}
