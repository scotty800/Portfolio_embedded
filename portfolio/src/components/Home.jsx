// components/Home.jsx - MISE À JOUR
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <div className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line">DÉVELOPPEUR</span>
              <span className="hero-title-line accent">REACT</span>
              <span className="hero-title-line">CRÉATIF</span>
            </h1>
            <p className="hero-subtitle">
              Je crée des expériences web modernes, performantes et intuitives
            </p>
            <p className="hero-description">
              Passionné par le développement front-end, je transforme vos idées en interfaces 
              interactives et responsives. Spécialiste React avec une approche centrée sur 
              l'utilisateur et les bonnes pratiques du développement web.
            </p>
            <div className="hero-buttons">
              <button className="btn" onClick={() => window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' })}>
                Voir mes projets
              </button>
              <button className="btn-outline">
                Me contacter
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="code-container">
              <div className="code-header">
                <div className="code-dots">
                  <span className="code-dot red"></span>
                  <span className="code-dot yellow"></span>
                  <span className="code-dot green"></span>
                </div>
              </div>
              <div className="code-snippet">
                <pre>{`import React from 'react';\nimport creativity from './passion';\n\nconst Portfolio = () => {\n  return (\n    <div className="innovative-solutions">\n      <CleanCode />\n      <ModernDesign />\n      <OptimalPerformance />\n    </div>\n  );\n};\n\nexport default Portfolio;`}</pre>
              </div>
            </div>
          </div>
        </div>
        
        <div className="services">
          <h2 className="section-title">Mes Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚛️</div>
              <h3>Développement React</h3>
              <p>Applications web modernes avec React, Redux et les dernières fonctionnalités</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Interfaces utilisateur intuitives et expériences optimisées</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Sites adaptés à tous les appareils et tailles d'écran</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;