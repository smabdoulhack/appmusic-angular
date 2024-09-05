import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      return true; // Autorise l'accès
    } else {
      // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
      this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
