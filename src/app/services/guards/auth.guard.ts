import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // 👈 Usa AngularFireAuth
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth, // 👈 Inyecta correctamente
    private router: Router
  ) {}

  canActivate() {
    return this.afAuth.authState.pipe(
      first(), // Toma el primer estado
      map(user => {
        if (user) return true; // Usuario logueado
        return this.router.createUrlTree(['/not-logged']); // Redirige si no está autenticado
      })
    );
  }
}