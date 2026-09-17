import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          console.log('Login successful! The token has been saved.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = Array.isArray(err.error) ? err.error.join(', ') : 'Login error';
          this.loading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
