import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  signup() {
    console.log(this.signupForm.value.email, this.signupForm.value.password);
    this.authService
      .signup(
        this.signupForm.value.username || '',
        this.signupForm.value.email || '',
        this.signupForm.value.password || ''
      )
      .subscribe({
        next: (response: any) => {
          // Supposons que la réponse contienne le jeton
          // const token = response.token;
          this.router.navigate(['/signin']); // Naviguer vers une autre page
          console.log('réponse', response);
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error:', err);
        },
      });
  }
}
