// components/Projects.jsx - MODIFIÉ (projet 5 = Mini Racer, projet 6 supprimé)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 1,
      title: "Projet Arduino ESP32",
      description: "Développement de systèmes embarqués intelligents avec microcontrôleurs ESP32 pour la domotique et l'automatisation industrielle.",
      technologies: ["Arduino IDE", "C/C++", "ESP32", "Capteurs"],
      icon: "🔌"
    },
    {
      id: 2,
      title: "Projet IoT ESP32",
      description: "Système IoT complet avec collecte de données environnementales, dashboard temps réel et notifications pour le monitoring intelligent.",
      technologies: ["Arduino IDE", "C/C++", "ESP32", "WiFi/BLE", "MQTT", "WebSockets", "Capteurs"],
      icon: "📡"
    },
    {
      id: 3,
      title: "Projet FPGA Simulation",
      description: "Conception et simulation de circuits numériques avec VHDL et Vivado, incluant circuits combinatoires, séquentiels et synthèse sur FPGA.",
      technologies: ["VHDL", "Xilinx Vivado", "FPGA", "ModelSim", "Circuit Design", "Timing Analysis"],
      icon: "⚡"
    },
    {
      id: 4,
      title: "Projet FreeRTOS ESP32",
      description: "Système temps réel multitâche avec FreeRTOS sur ESP32, gestion de périphériques via I2C, UART, SPI et synchronisation de tâches.",
      technologies: ["FreeRTOS", "Arduino IDE", "C/C++", "ESP32", "I2C", "UART", "SPI", "Sémaphores", "Queues"],
      icon: "⏱️"
    },
    {
      id: 5,
      title: "Projet Mini Racer",
      description: "Jeu de course multijoueur en 3D développé avec Unity, offrant des courses frénétiques de 1 à 4 joueurs avec mécaniques de drift et power-ups.",
      technologies: ["Unity", "C#", "Multiplayer", "3D Modeling", "Game Physics", "UI/UX", "Version Control"],
      icon: "🏎️"
    }
    // Projet 6 supprimé
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
                  {/* Bouton Code source supprimé */}
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