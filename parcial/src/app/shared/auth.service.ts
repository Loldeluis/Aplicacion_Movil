import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  isLogged(): boolean {
    // Puedes mejorar esto usando JWT o un token real
    return !!localStorage.getItem('loggedUserEmail');
  }

  login(email: string) {
    localStorage.setItem('loggedUserEmail', email);
  }

  logout() {
    localStorage.removeItem('loggedUserEmail');
    this.router.navigate(['/home']);
  }

  getLoggedUserEmail(): string | null {
    return localStorage.getItem('loggedUserEmail');
  }
}
