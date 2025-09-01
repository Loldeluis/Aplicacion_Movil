import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { StorageUtil } from '../../shared/providers/storage/storage.util';
import { ApiService } from '../../shared/providers/http/api.service';
import { ModalController } from '@ionic/angular';
import { NewsModalComponent } from './news-modal.component';
import { ProfileModalComponent } from './profile-modal.component';
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
  user: any = { username: '', lastname: '' };

  constructor(
    private authService: AuthService,
  private api: ApiService,
    private modalCtrl: ModalController
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
    componentProps: { user: { ...this.user } } // enviamos copia del usuario
  });

  modal.onDidDismiss().then(result => {
    if (result.data) {
      this.user = result.data; // actualizamos usuario si se guardó
    }
  });

  return await modal.present();
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
    const url = `https://newsapi.org/v2/everything?q=${this.selectedCategory}&from=2025-07-31&sortBy=publishedAt&apiKey=4e933b43792842b6be7c199ab7a2352d`;
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
