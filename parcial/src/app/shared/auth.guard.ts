import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isLogged = this.authService.isLogged();
    const url = state.url;

    // Si está logueado y trata de ir a /register o /home, redirigir a dashboard
    if (isLogged && (url === '/register' || url === '/home' || url === '/')) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Si NO está logueado y trata de ir a /dashboard, redirigir a home
    if (!isLogged && url.startsWith('/dashboard')) {
      this.router.navigate(['/home']);
      return false;
    }

    // Permitir acceso en otros casos
    return true;
  }
}
