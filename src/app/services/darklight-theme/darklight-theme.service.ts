import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarklightThemeService {
  private readonly THEME_KEY = 'theme_preference';
  private darkMode = false;

  constructor() {
    this.loadInitialTheme();
  }

  private loadInitialTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
    } else {
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    localStorage.setItem(this.THEME_KEY, this.darkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}