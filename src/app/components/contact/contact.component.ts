import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactForm } from '../../models/contact-form.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  showAlert = false;

  constructor(public contactService: ContactService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializar el formulario reactivo con validadores
   */
  private initializeForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  /**
   * Obtener controles del formulario para acceso más fácil en la plantilla
   */
  get f() {
    return this.contactForm.controls;
  }

  /**
   * Verificar si un campo tiene un error y ha sido tocado
   */
  hasError(fieldName: string, errorName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.hasError(errorName) && (field.dirty || field.touched || this.submitted));
  }

  /**
   * Manejar envío del formulario
   */
  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.contactForm.invalid) {
      this.errorMessage = 'Es necesario rellenar todos los campos.';
      this.showAlert = true;
      return;
    }

    // Validar usando el servicio
    const validation = this.contactService.validateForm(this.contactForm.value);
    if (!validation.valid) {
      this.errorMessage = Object.values(validation.errors)[0] || 'La validación del formulario falló.';
      this.showAlert = true;
      return;
    }

    try {
      const formData: ContactForm = this.contactForm.value;
      const success = await this.contactService.submitContactForm(formData);

      if (success) {
        this.successMessage = 'Mensaje enviado con éxito.';
        this.contactForm.reset();
        this.submitted = false;
        this.showAlert = true;

        // Ocultar alerta después de 5 segundos
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      } else {
        this.errorMessage = this.contactService.lastSubmitError() || 'Error al enviar el formulario. Por favor, intenta de nuevo.';
        this.showAlert = true;
      }
    } catch (error) {
      this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo.';
      this.showAlert = true;
      console.error('Error en envío de formulario de contacto:', error);
    }
  }

  /**
   * Restablecer el formulario
   */
  resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.showAlert = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}

