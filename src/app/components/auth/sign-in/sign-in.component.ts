import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  users: any;
  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('sign in component');
    if (this.authService.isAuthenticated()) this.router.navigate(['/albums']);

    this.authService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        console.log('users', this.users);
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }

  login() {
    console.log(this.loginForm.value.email, this.loginForm.value.password);
    this.authService
      .login(
        this.loginForm.value.email || '',
        this.loginForm.value.password || ''
      )
      .subscribe({
        next: (response: any) => {
          // Supposons que la réponse contienne le jeton
          const token = response.token;
          this.authService.storeToken(token); // Stocker le jeton dans le stockage local
          this.router.navigate(['/albums']); // Naviguer vers une autre page
          console.log('token', token);
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error:', err);
        },
      });
  }
}
