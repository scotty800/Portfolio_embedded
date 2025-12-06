// components/Home.jsx - CORRIGÉ (sans snippet code)
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home" id="home">
      <div className="home-container">
        
        {/* Section héro */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">Bienvenue sur mon</span>
              <span className="title-line">Portfolio Développeur</span>
            </h1>
            
            <p className="hero-subtitle">
              Passionné par la création d'applications web modernes et performantes
            </p>
            
            <div className="hero-actions">
              <Link to="/projects" className="hero-btn primary">
                Voir mes projets
              </Link>
              <a href="#contact" className="hero-btn secondary">
                Me contacter
              </a>
            </div>
          </div>
          
          {/* Remplacement du snippet par espace photo */}
          <div className="hero-photo-section">
            <div className="photo-placeholder">
              <div className="photo-icon">📸</div>
              <p className="photo-caption">Votre photo ici</p>
              <p className="photo-instructions">
                Remplacez cette section par votre photo de profil
              </p>
            </div>
          </div>
        </div>
        
        {/* Section technologies */}
        <div className="tech-section">
          <h2 className="section-title">Technologies maîtrisées</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">⚛️</div>
              <h3>React</h3>
              <p>Développement d'interfaces utilisateur modernes et réactives</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🚀</div>
              <h3>Node.js</h3>
              <p>Backend performant avec Express et architectures RESTful</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Création d'expériences utilisateur intuitives et esthétiques</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📱</div>
              <h3>Responsive</h3>
              <p>Design adaptatif pour tous les appareils et tailles d'écran</p>
            </div>
          </div>
        </div>
        
        {/* Section à propos */}
        <div className="about-section">
          <h2 className="section-title">À propos de moi</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Développeur full-stack passionné par la création de solutions web innovantes. 
                Je combine expertise technique et sens du design pour livrer des produits 
                exceptionnels qui répondent parfaitement aux besoins des utilisateurs.
              </p>
              <p>
                Avec une solide expérience en React, Node.js et bases de données modernes, 
                je m'engage à fournir un code de qualité, maintenable et scalable.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Années d'expérience</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction client</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;