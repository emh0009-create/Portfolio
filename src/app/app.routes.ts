import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Inicio - Portafolio' }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    data: { title: 'Portafolio - Mi Trabajo' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contacto - Ponte en Contacto' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
