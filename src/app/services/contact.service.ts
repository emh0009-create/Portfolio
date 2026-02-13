import { Injectable, signal } from '@angular/core';
import { ContactForm } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly MESSAGES_KEY = 'contact_messages';

  messages = signal<ContactForm[]>([]);
  isSubmitting = signal<boolean>(false);
  lastSubmitError = signal<string | null>(null);

  constructor(private storageService: StorageService) {
    this.loadMessagesFromStorage();
  }

  /**
   * Cargar todos los mensajes de contacto desde localStorage
   */
  private loadMessagesFromStorage(): void {
    try {
      const savedMessages = this.storageService.getItem<ContactForm[]>(this.MESSAGES_KEY, []);
      if (savedMessages && Array.isArray(savedMessages)) {
        this.messages.set(savedMessages);
      }
    } catch (error) {
      console.error('Error al cargar los mensajes de contacto', error);
    }
  }

  /**
   * Enviar un formulario de contacto
   * @param form Los datos del formulario de contacto
   * @returns Promesa que se resuelve a true si tiene éxito
   */
  async submitContactForm(form: ContactForm): Promise<boolean> {
    this.isSubmitting.set(true);
    this.lastSubmitError.set(null);

    try {
      // Simular llamada a API con retraso
      await this.simulateApiCall();

      // Agregar marca de tiempo
      const formWithTimestamp: ContactForm = {
        ...form,
        createdAt: new Date()
      };

      // Guardar en almacenamiento
      const currentMessages = this.messages();
      const updatedMessages = [...currentMessages, formWithTimestamp];
      this.messages.set(updatedMessages);
      this.storageService.setItem(this.MESSAGES_KEY, updatedMessages);

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al enviar el formulario';
      this.lastSubmitError.set(errorMessage);
      console.error('Error al enviar el formulario de contacto', error);
      return false;
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /**
   * Simular una llamada a API (en una aplicación real, esto llamaría a un backend real)
   */
  private simulateApiCall(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  /**
   * Obtener todos los mensajes de contacto
   */
  getAllMessages(): ContactForm[] {
    return this.messages();
  }

  /**
   * Limpiar todos los mensajes de contacto
   */
  clearAllMessages(): void {
    try {
      this.messages.set([]);
      this.storageService.removeItem(this.MESSAGES_KEY);
    } catch (error) {
      console.error('Error al limpiar los mensajes de contacto', error);
    }
  }

  /**
   * Obtener la cantidad de mensajes de contacto
   */
  getMessageCount(): number {
    return this.messages().length;
  }

  /**
   * Validar formulario de contacto
   */
  validateForm(form: Partial<ContactForm>): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!form.fullName || form.fullName.trim() === '') {
      errors['fullName'] = 'El nombre completo es requerido';
    }

    if (!form.email || form.email.trim() === '') {
      errors['email'] = 'El correo electrónico es requerido';
    } else if (!this.isValidEmail(form.email)) {
      errors['email'] = 'Formato de correo electrónico inválido';
    }

    if (!form.subject || form.subject.trim() === '') {
      errors['subject'] = 'El asunto es requerido';
    }

    if (!form.message || form.message.trim() === '') {
      errors['message'] = 'El mensaje es requerido';
    } else if (form.message.trim().length < 10) {
      errors['message'] = 'El mensaje debe tener al menos 10 caracteres';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Validar formato de correo electrónico
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
