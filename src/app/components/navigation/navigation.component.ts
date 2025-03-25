import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.closeMenu();
  }

  async logout() {
    localStorage.clear(); // Limpia el localStorage
    sessionStorage.clear(); // Limpia el sessionStorage
    try {
      await this.authService.logout();
      this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  }
}
