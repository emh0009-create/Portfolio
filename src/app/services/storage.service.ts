import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_PREFIX = 'portfolio_';
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  /**
   * Verifica si está ejecutándose en un entorno navegador
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Guardar datos en localStorage
   * @param key La clave para almacenar los datos
   * @param value El valor a almacenar (será serializado a JSON)
   */
  setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;

    try {
      const prefixedKey = this.STORAGE_PREFIX + key;
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(prefixedKey, serializedValue);
    } catch (error) {
      console.error(`Error al guardar en localStorage: ${key}`, error);
    }
  }

  /**
   * Recuperar datos de localStorage
   * @param key La clave a recuperar
   * @param defaultValue Valor predeterminado opcional si la clave no existe
   * @returns El valor deserializado o null
   */
  getItem<T>(key: string, defaultValue: T | null = null): T | null {
    if (!this.isBrowser()) return defaultValue;

    try {
      const prefixedKey = this.STORAGE_PREFIX + key;
      const item = localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error al recuperar de localStorage: ${key}`, error);
      return defaultValue;
    }
  }

  /**
   * Eliminar un elemento específico de localStorage
   * @param key La clave a eliminar
   */
  removeItem(key: string): void {
    if (!this.isBrowser()) return;

    try {
      const prefixedKey = this.STORAGE_PREFIX + key;
      localStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error(`Error al eliminar de localStorage: ${key}`, error);
    }
  }

  /**
   * Limpiar todos los elementos relacionados con el portafolio de localStorage
   */
  clearAll(): void {
    if (!this.isBrowser()) return;

    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          keys.push(key);
        }
      }
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error al limpiar localStorage', error);
    }
  }

  /**
   * Verificar si una clave existe en localStorage
   * @param key La clave a verificar
   */
  hasItem(key: string): boolean {
    if (!this.isBrowser()) return false;

    const prefixedKey = this.STORAGE_PREFIX + key;
    return localStorage.getItem(prefixedKey) !== null;
  }
}
