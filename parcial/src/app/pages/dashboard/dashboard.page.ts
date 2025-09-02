import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { StorageUtil } from '../../shared/providers/storage/storage.util';
import { ApiService } from '../../shared/providers/http/api.service';
import { ModalController, ToastController } from '@ionic/angular';
import { NewsModalComponent } from './news-modal.component';
import { ProfileModalComponent } from './profile-modal.component';
import { EncryptUtil } from '../../shared/providers/encrypt/encrypt.util';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  news: any[] = [];
  loading = true;
  error = '';
  showProfile = false;
  categories = [
    { key: 'tesla', label: 'Tesla' },
    { key: 'technology', label: 'Tecnología' },
    { key: 'sports', label: 'Deportes' },
    { key: 'business', label: 'Negocios' },
    { key: 'science', label: 'Ciencia' },
    { key: 'health', label: 'Salud' },
    { key: 'entertainment', label: 'Entretenimiento' }
  ];
  selectedCategory = this.categories[0].key;
user: any = { id:'', name:'', lastName:'', email:'', password:'', country: { id:'', value:'' } };


  constructor(
    private authService: AuthService,
  private api: ApiService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadUser();
    this.fetchNews();
  }

  loadUser() {
    const email = this.authService.getLoggedUserEmail();
    if (email) {
      for (const key of StorageUtil.getAllKeys()) {
        const userData = StorageUtil.getItem<any>(key);
        if (userData && userData.email === email) {
          this.user = userData;
          break;
        }
      }
    }
  }

  async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileModalComponent,
      componentProps: { user: { ...this.user, confirmPassword: '' } } // copia segura
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.persistUpdatedUser(data);
      }
    });

    await modal.present();
  }

  // --- PERSISTENCIA REAL EN STORAGE ---
  private persistUpdatedUser(updated: any) {
    const oldEmail = this.user.email;



    // fusionar cambios
    const nextUser = { ...this.user, ...updated };



    // normalizar country 
 if (updated.country && typeof updated.country === 'object') {
    nextUser.country = updated.country; // ya tiene id, value, unicodeFlag
  } else if (typeof updated.country === 'string') {
    nextUser.country = { id: updated.country, value: updated.country, unicodeFlag: '' };
  } else {
    nextUser.country = { id: '', value: '', unicodeFlag: '' };
  }


    // contraseña: si se proporcionó y coincide, hasheamos; si no, mantenemos la anterior
    if (updated.password && updated.password.trim()) {
      if (updated.password !== updated.confirmPassword) {
        this.presentToast("Passwords didn't match", 'danger');
        return; // no guardamos nada
      }
      nextUser.password = EncryptUtil.hashPassword(updated.password);
    }
    delete nextUser.confirmPassword;

    // escribir en storage (si cambió email, cambiar clave)
    try {
      if (oldEmail && nextUser.email && oldEmail !== nextUser.email) {
        if (typeof (StorageUtil as any).removeItem === 'function') {
          (StorageUtil as any).removeItem(oldEmail);
        } else {
          // fallback: sobreescribe la clave vieja con algo neutro si tu util no expone remove
          StorageUtil.setItem(oldEmail + '_old', null);
        }
        StorageUtil.setItem(nextUser.email, nextUser);

        // si tu AuthService guarda el email de sesión, actualízalo
        if ((this.authService as any).setLoggedUserEmail) {
          (this.authService as any).setLoggedUserEmail(nextUser.email);
        }
      } else {
        StorageUtil.setItem(nextUser.email, nextUser);
      }

      this.user = nextUser; // actualizar UI
      this.presentToast('User updated', 'success');
    } catch (e) {
      this.presentToast('No se pudo guardar el usuario', 'danger');
      console.error(e);
    }
  }

  private async presentToast(message: string, color: 'success'|'danger'|'warning'|'primary' = 'primary') {
    const t = await this.toastCtrl.create({ message, duration: 2000, color, position: 'top' });
    await t.present();
  }


  async openNews(article: any) {
    const modal = await this.modalCtrl.create({
      component: NewsModalComponent,
      componentProps: { article }
    });
    await modal.present();
  }

  fetchNews() {
    this.loading = true;
    this.news = [];
    this.error = '';
    this.api.getNews(this.selectedCategory)
      .subscribe({
        next: res => {
          this.news = res.articles || [];
          this.loading = false;
        },
        error: err => {
          this.error = 'No se pudieron cargar las noticias.';
          this.loading = false;
        }
      });
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.fetchNews();
    this.showProfile = false;
  }

  logout() {
    this.authService.logout();
  }
}
