import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Liste des routes qui n'ont pas besoin d'autorisation
    const excludedRoutes = ['/signin', '/signup'];

    // Vérifier si l'URL de la requête fait partie des routes exclues
    const isExcludedRoute = excludedRoutes.some(url => request.url.includes(url));

    // Si la requête cible une route exclue, continuer sans ajouter le token
    if (isExcludedRoute) {
      return next.handle(request);
    }

    // Récupérer le jeton depuis le service AuthService
    const token = this.authService.getToken();

    // Si le jeton existe, cloner la requête et ajouter l'en-tête Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continuer avec la requête modifiée ou non
    return next.handle(request);
  }
}
