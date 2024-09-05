import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private usersUrl = 'http://localhost:5000/api/users';
  private authUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir tous les utilisateurs
  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  // Méthode pour inscrire un nouvel utilisateur
  signup(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.authUrl}/signup`, body);
  }

  // Méthode pour se connecter et obtenir un jeton
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  // Méthode pour stocker le jeton dans le localStorage
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Méthode pour récupérer le jeton depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Méthode pour supprimer le jeton lors de la déconnexion
  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken(); // Récupère le token JWT stocké
    // Vérifie s'il y a un token et s'il n'est pas expiré (si nécessaire)
    // return !!token; // Retourne true si le token est valide
    if(token)return true; else return false
  }
}
