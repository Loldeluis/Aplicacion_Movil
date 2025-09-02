
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
        <ion-label position="floating">Name</ion-label>
        <ion-input [(ngModel)]="user.name" name="username"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Last Name</ion-label>
        <ion-input [(ngModel)]="user.lastName" name="lastname"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input [(ngModel)]="user.email" name="email"></ion-input>
      </ion-item>

  <ion-item class="input-box">
    <ion-label>Country</ion-label>
<ion-select [(ngModel)]="selectedCountryName" (ionChange)="onCountryChange($event)" interface="popover" placeholder="Select country">
  <ion-select-option *ngFor="let c of countries" [value]="c.name">
    <span class="flag">{{ c.unicodeFlag }}</span> {{ c.name }}
  </ion-select-option>
</ion-select>
  </ion-item>

<ion-item>
  <ion-label position="floating">Password</ion-label>
  <ion-input 
    [(ngModel)]="user.password" 
    [type]="showPassword ? 'text' : 'password'" 
    name="password">
  </ion-input>
  <ion-icon 
    slot="end" 
    [name]="showPassword ? 'eye-off-outline' : 'eye-outline'" 
    (click)="togglePassword()" 
    style="cursor: pointer;">
  </ion-icon>
</ion-item>

<ion-item>
  <ion-label position="floating">Confirm password</ion-label>
  <ion-input 
    [(ngModel)]="user.confirmPassword" 
    [type]="showConfirmPassword ? 'text' : 'password'" 
    name="confirmPassword">
  </ion-input>
  <ion-icon 
    slot="end" 
    [name]="showConfirmPassword ? 'eye-off-outline' : 'eye-outline'" 
    (click)="toggleConfirmPassword()" 
    style="cursor: pointer;">
  </ion-icon>
</ion-item>

    </form>
  `
})
export class UserFormComponent {
  @Input() user: any;

  countries: any[] = [];
  selectedCountryName: string = '';
  showPassword: boolean = false;
showConfirmPassword: boolean = false;
  

  constructor(
    private api: ApiService
  ) {}

ngOnInit() {
  // si ya viene con bandera desde localstorage, úsala
    if (this.user?.country?.value) {
      this.selectedCountryName = this.user.country.value;
    }
    this.loadCountries();
  }

 loadCountries() {
    this.api.getCountries().subscribe(res => {
      this.countries = res.data.sort((a: any, b: any) => a.name.localeCompare(b.name));

      // intentar hacer match con lo guardado en localStorage
      if (this.user?.country?.value) {
        const selected = this.countries.find(c => 
          c.name === this.user.country.value || 
          this.user.country.value.includes(c.name) // por si venía con bandera guardada "🇲🇽 México"
        );
        if (selected) {
          this.user.country = { 
            id: selected.id, 
            value: selected.name, 
            unicodeFlag: selected.unicodeFlag 
          };
          this.selectedCountryName = selected.name;
        }
      }
    });
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

   // Método que se llama automáticamente cuando cambias el select
 onCountryChange(ev: any) {
    const selected = this.countries.find(c => c.name === ev.detail.value);
    if (selected) {
      this.user.country = { 
        id: selected.id, 
        value: selected.name, 
        unicodeFlag: selected.unicodeFlag 
      };
    }
  }
}

