
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageUtil } from './providers/storage/storage.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  isLogged(): boolean {
    // Puedes mejorar esto usando JWT o un token real
  return !!StorageUtil.getItem('loggedUserEmail');
  }

  login(email: string) {
  StorageUtil.setItem('loggedUserEmail', email);
  }

  logout() {
  StorageUtil.removeItem('loggedUserEmail');
    this.router.navigate(['/home']);
  }

  getLoggedUserEmail(): string | null {
  return StorageUtil.getItem('loggedUserEmail');
  }
}
