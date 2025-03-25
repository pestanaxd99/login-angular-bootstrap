import { Component } from '@angular/core';
import { DarklightThemeService } from '../../services/darklight-theme/darklight-theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="btn btn-outline-secondary" (click)="toggleTheme()">
      <i class="bi" [class.bi-moon-fill]="!isDark" [class.bi-sun-fill]="isDark"></i>
      {{ isDark ? 'Light Mode' : 'Dark Mode' }}
    </button>
  `,
  styles: [`
    .bi { font-size: 1.2rem; }
  `]
})
export class DarklightThemeComponent {
  isDark = this.themeService.isDarkMode();

  constructor(private themeService: DarklightThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }
}