import { Injectable, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { Theme, UserPreferences } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly PREFERENCES_KEY = 'preferences';
  private platformId = inject(PLATFORM_ID);

  theme = signal<Theme>(Theme.LIGHT);

  private defaultPreferences: UserPreferences = {
    theme: Theme.LIGHT,
    language: 'es',
    fontSize: 'medium',
    notifications: true
  };

  constructor(private storageService: StorageService) {
    this.initializeTheme();
    this.setupThemeEffect();
  }

  /**
   * Inicializar el tema desde localStorage o preferencia del sistema
   */
  private initializeTheme(): void {
    try {
      const savedTheme = this.storageService.getItem<Theme>(this.THEME_KEY);
      if (savedTheme) {
        this.theme.set(savedTheme);
      } else if (isPlatformBrowser(this.platformId)) {
        // Verificar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme.set(prefersDark ? Theme.DARK : Theme.LIGHT);
      }
    } catch (error) {
      console.error('Error al inicializar el tema', error);
      this.theme.set(Theme.LIGHT);
    }
  }

  /**
   * Configurar efecto para guardar cambios de tema en localStorage
   */
  private setupThemeEffect(): void {
    effect(() => {
      const currentTheme = this.theme();
      this.storageService.setItem(this.THEME_KEY, currentTheme);
      if (isPlatformBrowser(this.platformId)) {
        this.applyThemeToDOM(currentTheme);
      }
    });
  }

  /**
   * Aplicar tema al DOM
   */
  private applyThemeToDOM(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const htmlElement = document.documentElement;
    if (theme === Theme.DARK) {
      htmlElement.classList.add('dark-theme');
      htmlElement.classList.remove('light-theme');
    } else {
      htmlElement.classList.add('light-theme');
      htmlElement.classList.remove('dark-theme');
    }
  }

  /**
   * Alternar entre tema claro y oscuro
   */
  toggleTheme(): void {
    const newTheme = this.theme() === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.theme.set(newTheme);
  }

  /**
   * Establecer un tema específico
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  /**
   * Obtener el tema actual
   */
  getCurrentTheme(): Theme {
    return this.theme();
  }

  /**
   * Cargar preferencias del usuario
   */
  loadUserPreferences(): UserPreferences {
    try {
      return (
        this.storageService.getItem<UserPreferences>(this.PREFERENCES_KEY) ||
        this.defaultPreferences
      );
    } catch (error) {
      console.error('Error al cargar las preferencias del usuario', error);
      return this.defaultPreferences;
    }
  }

  /**
   * Guardar preferencias del usuario
   */
  saveUserPreferences(preferences: UserPreferences): void {
    try {
      this.storageService.setItem(this.PREFERENCES_KEY, preferences);
      this.theme.set(preferences.theme);
    } catch (error) {
      console.error('Error saving user preferences', error);
    }
  }
}
