import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', 
        [Validators.required, Validators.minLength(4)],
        [this.usernameValidator.bind(this)]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  // Validador personalizado para contraseñas
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  // Validador asíncrono para username
  async usernameValidator(control: any) {
    if (await this.isUsernameTaken(control.value)) {
      return { usernameTaken: true };
    }
    return null;
  }

  // Verifica si el username ya existe
  async isUsernameTaken(username: string): Promise<boolean> {
    if (!username || username.length < 4) return false;
    
    try {
      const query = this.firestore.collection('users', ref => 
        ref.where('username', '==', username).limit(1)
      ).get();
      
      const snapshot = await firstValueFrom(query);
      return snapshot?.empty === false;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  }

  async onSubmit() {
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const { firstName, lastName, username, email, password } = this.registerForm.value;

    try {
      // Crea el usuario en Firebase Auth
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      // Guarda los datos adicionales en Firestore
      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        firstName,
        lastName,
        username,
        email,
        createdAt: new Date()
      });

      // Redirige al dashboard después del registro
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Error en registro:', error);
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'El correo electrónico ya está registrado.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'El correo electrónico no es válido.';
        break;
      default:
        this.errorMessage = 'Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.';
    }
  }
}