import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  private validationMessages = {
    username: {
      required: 'Please enter your username (email).',
      email: 'Please enter a valid email address.',
    },
    password: {
      required: 'Please enter your password.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    console.log('[Login] Start login process');
    
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill all the required fields correctly.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { username, password } = this.userForm.value;

    try {
      await this.authService.login(username, password);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('[Auth Error]', error);
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private handleError(error: any) {
    console.group('[Error Handling]');
    console.error('Error code:', error.code);
    console.groupEnd();

    switch (error.code) {
      case 'auth/invalid-login-credentials':
        this.errorMessage = 'Invalid email or password. Please check your credentials.';
        break;
      case 'auth/user-not-found':
        this.errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Too many failed attempts. Account temporarily locked.';
        break;
      case 'auth/user-disabled':
        this.errorMessage = 'This account has been disabled.';
        break;
      default:
        this.errorMessage = 'Login failed. Please try again later.';
    }
  }

  public getValidationMessage(field: string, errorType: string): string {
    const fieldObj = this.userForm.get(field);
    if (!fieldObj?.errors) return '';
    
    const messages = this.validationMessages as Record<string, Record<string, string>>;
    return messages[field]?.[errorType] || '';
  }
}