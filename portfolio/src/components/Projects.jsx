// components/Projects.jsx - CODE COMPLET
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 1,
      title: "Application E-commerce",
      description: "Plateforme de vente en ligne avec React, Redux et Stripe. Interface utilisateur moderne, panier d'achat, système de paiement sécurisé.",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "Stripe"],
      icon: "🛒"
    },
    {
      id: 2,
      title: "Tableau de Bord Analytics",
      description: "Visualisation de données en temps réel avec graphiques interactifs. Tableaux de bord personnalisables pour le suivi des performances.",
      technologies: ["React", "D3.js", "Express", "Firebase", "Chart.js"],
      icon: "📊"
    },
    {
      id: 3,
      title: "Réseau Social",
      description: "Application de partage de contenu avec fonctionnalités de chat en temps réel, notifications et système d'amis.",
      technologies: ["React", "Socket.io", "PostgreSQL", "AWS", "Redis"],
      icon: "👥"
    },
    {
      id: 4,
      title: "Application Météo",
      description: "Prévisions météo avec géolocalisation, notifications push et mode hors ligne. Application Progressive Web App (PWA).",
      technologies: ["React", "API REST", "Service Workers", "PWA", "Geolocation API"],
      icon: "🌤️"
    },
    {
      id: 5,
      title: "Gestion de Projet",
      description: "Outil de collaboration d'équipe avec tableaux Kanban, gestion des tâches, calendrier et chat intégré.",
      technologies: ["React", "TypeScript", "GraphQL", "MongoDB", "WebSockets"],
      icon: "📋"
    },
    {
      id: 6,
      title: "Portfolio Artistique",
      description: "Galerie interactive pour artistes avec système de commentaires, filtres avancés et galerie virtuelle en 3D.",
      technologies: ["React", "Three.js", "Cloudinary", "Firebase", "Framer Motion"],
      icon: "🎨"
    }
  ];

  const handleViewProject = (projectId) => {
    // Tous les projets ouvrent leur page détaillée
    navigate(`/project/${projectId}`);
  };

  const handleViewCode = (projectTitle) => {
    alert(`Code source pour: ${projectTitle}\n(Lien GitHub à configurer)`);
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <h2 className="section-title">Mes Projets</h2>
        <p className="section-subtitle">Découvrez une sélection de mes réalisations récentes</p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={project.id}>
              <div className="project-number">0{index + 1}</div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tech-list">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="project-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-actions">
                  <button 
                    className="project-btn"
                    onClick={() => handleViewProject(project.id)}
                  >
                    Voir le projet
                  </button>
                  <button 
                    className="project-btn outline"
                    onClick={() => handleViewCode(project.title)}
                  >
                    Code source
                  </button>
                </div>
              </div>
              
              <div className="project-preview">
                <div className="project-preview-icon">{project.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;