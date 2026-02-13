import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.projects = [
      {
        id: 1,
        title: 'Proyecto final de Primero de Daw',
        description:
          'Un proyecto final realizado en parejas, que consiste en un programa creado en Java donde incluyes información personal de un alumno y le agregas las notas y por último lo conectas con una base de datos.',
        imageUrl: 'https://via.placeholder.com/400x250?text=E-Commerce',
        technologies: ['Java', 'MySQL'],
        githubLink: 'https://github.com/nenosfc/TrabajoGrupal'
      },
      {
        id: 2,
        title: 'Página Web sobre el videojuego Minecraft',
        description:
          'Una página que proporciona información sobre los distintos aspectos del juego',
        imageUrl: 'https://via.placeholder.com/400x250?text=Task+Manager',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        githubLink: 'https://github.com/emh0009-create/Pagina-Web'
      },
      {
        id: 3,
        title: 'Portfolio Profesional',
        description:
          'Mi portfolio profesional, donde puedes encontrar información sobre mi, mis proyectos y mis redes sociales para contactar conmigo.',
        imageUrl: 'https://via.placeholder.com/400x250?text=Weather',
        technologies: ['Angular', 'TypeScript', 'HTML', 'Bootstrap', 'CSS'],
        githubLink: 'https://github.com/example/weather-app'
      },

    ];
  }
}
