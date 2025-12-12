// components/Certifications.jsx - VERSION CORRIGÉE (calcul des heures)
import React, { useState } from 'react';
import './Certifications.css';

// Import des images des certificats
import cert1 from '../assets/certifications/electronique-base.jpg';
import cert2 from '../assets/certifications/electronique-debutants.jpg';
import cert3 from '../assets/certifications/microcontroleurs.jpg';
import cert4 from '../assets/certifications/commande-moteurs.jpg';
import cert5 from '../assets/certifications/circuit-alternatif.jpg';
import cert6 from '../assets/certifications/arduino-robotique.jpg';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      id: 1,
      title: "Cours d'électronique de base pour débutants",
      platform: "Coursera",
      duration: "07h 26min",
      year: "2025",
      skills: ["Circuits simples", "Composants électroniques", "Lois d'Ohm", "Mesures électriques", "Théorie des circuits"],
      description: "Certification complète sur les fondamentaux de l'électronique, incluant la théorie des circuits, les composants passifs (résistances, condensateurs) et les techniques de mesure essentielles pour débuter en électronique.",
      image: cert1
    },
    {
      id: 2,
      title: "Cours d'électronique pour débutants",
      platform: "Coursera",
      duration: "58min",
      year: "2025",
      skills: ["Diodes", "Transistors", "Circuits intégrés", "Breadboard", "Prototypage"],
      description: "Introduction approfondie aux concepts électroniques avec applications pratiques sur breadboard. Ce cours couvre les composants semi-conducteurs et leur utilisation dans des circuits simples.",
      image: cert2
    },
    {
      id: 3,
      title: "Comprendre les microcontrôleurs",
      platform: "Coursera",
      duration: "12h 05min",
      year: "2025",
      skills: ["Architecture ARM", "Registres", "Interruptions", "Périphériques embarqués", "Programmation bas niveau"],
      description: "Étude approfondie de l'architecture et de la programmation des microcontrôleurs modernes. Ce cours couvre les concepts avancés de gestion des interruptions et des périphériques embarqués.",
      image: cert3
    },
    {
      id: 4,
      title: "Commande électronique des moteurs",
      platform: "Coursera",
      duration: "18h 24min",
      year: "2025",
      skills: ["Moteurs DC", "Moteurs pas-à-pas", "Drivers PWM", "Asservissement", "Contrôle de vitesse"],
      description: "Certification avancée sur les techniques de contrôle des moteurs électroniques pour applications industrielles et robotiques. Inclut l'étude des drivers PWM et des systèmes d'asservissement.",
      image: cert4
    },
    {
      id: 5,
      title: "Analyse de circuits à courant alternatif",
      platform: "Coursera",
      duration: "20h 43min",
      year: "2025",
      skills: ["Sinusoïdes", "Impédance complexe", "Résonance", "Filtres actifs", "Circuits RLC"],
      description: "Analyse mathématique et pratique des circuits en régime alternatif. Ce cours approfondi couvre les concepts d'impédance, de résonance et de conception de filtres électroniques.",
      image: cert5
    },
    {
      id: 6,
      title: "Robotique et automatisation Arduino avancé",
      platform: "Coursera",
      duration: "04h 26min",
      year: "2025",
      skills: ["Arduino avancé", "Capteurs industriels", "Asservissement PID", "Systèmes automatisés", "Programmation temps réel"],
      description: "Programmation avancée d'Arduino pour applications robotiques et systèmes automatisés. Certification focalisée sur le contrôle précis et l'intégration de capteurs complexes.",
      image: cert6
    }
  ];

  // Fonction pour convertir "07h 26min" en minutes
  const parseDurationToMinutes = (duration) => {
    let totalMinutes = 0;
    
    // Chercher les heures
    const hourMatch = duration.match(/(\d+)h/);
    if (hourMatch) {
      totalMinutes += parseInt(hourMatch[1]) * 60;
    }
    
    // Chercher les minutes
    const minuteMatch = duration.match(/(\d+)min/);
    if (minuteMatch) {
      totalMinutes += parseInt(minuteMatch[1]);
    }
    
    return totalMinutes;
  };

  // Calcul du total des heures
  const calculateTotalHours = () => {
    const totalMinutes = certifications.reduce((total, cert) => {
      return total + parseDurationToMinutes(cert.duration);
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
  };

  // Afficher le total formaté
  const totalFormation = calculateTotalHours();
  const totalSkills = certifications.reduce((total, cert) => total + cert.skills.length, 0);

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <section className="certifications">
      <div className="certifications-container">
        <h2 className="section-title">Mes Certifications</h2>
        <p className="section-subtitle">
          Formation continue et validation de compétences en systèmes embarqués et électronique - Coursera 2025
        </p>
        
        <div className="certifications-grid">
          {certifications.map(cert => (
            <div 
              key={cert.id} 
              className="cert-card"
              onClick={() => handleCertClick(cert)}
            >
              <div className="cert-image-container">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="cert-image"
                  loading="lazy"
                />
                <div className="cert-overlay">
                  <span className="view-details">Voir les détails</span>
                </div>
              </div>
              
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-platform">{cert.platform}</span>
                  <span className="cert-duration">{cert.duration}</span>
                  <span className="cert-year">{cert.year}</span>
                </div>
                
                <div className="cert-skills">
                  {cert.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="cert-skill-tag">{skill}</span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="cert-skill-more">+{cert.skills.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications-footer">
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Certifications Coursera</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalFormation}</span>
              <span className="stat-label">Total de formation</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalSkills}</span>
              <span className="stat-label">Compétences validées</span>
            </div>
          </div>
          
          <p className="footer-note">
            Ces certifications Coursera 2025 démontrent mon engagement continu dans l'apprentissage 
            et la maîtrise des technologies embarquées, avec un focus sur l'électronique pratique 
            et la programmation de systèmes embarqués.
          </p>
        </div>
      </div>

      {/* Modal pour les détails */}
      {selectedCert && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>
            
            <div className="modal-content">
              <div className="modal-image-container">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title}
                  className="modal-cert-image"
                />
              </div>
              
              <div className="modal-details">
                <h2 className="modal-title">{selectedCert.title}</h2>
                
                <div className="modal-meta">
                  <div className="meta-item">
                    <span className="meta-label">Plateforme :</span>
                    <span className="meta-value">{selectedCert.platform}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Durée :</span>
                    <span className="meta-value">{selectedCert.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Année :</span>
                    <span className="meta-value">{selectedCert.year}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Type :</span>
                    <span className="meta-value">Certification Professionnelle</span>
                  </div>
                </div>
                
                <div className="modal-description">
                  <h3>Description du cours</h3>
                  <p>{selectedCert.description}</p>
                </div>
                
                <div className="modal-skills">
                  <h3>Compétences acquises</h3>
                  <div className="skills-list">
                    {selectedCert.skills.map((skill, index) => (
                      <span key={index} className="skill-item">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="action-btn primary" onClick={closeModal}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;