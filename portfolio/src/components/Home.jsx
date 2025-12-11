// components/Home.jsx - MODIFIÉ POUR SYSTÈMES EMBARQUÉS
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import de votre photo
import scottyPhoto from '../assets/scotty.jpg';

const Home = () => {
  return (
    <div className="home" id="home">
      <div className="home-container">
        
        {/* Section héro */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">Scotty</span>
              <span className="title-line">Développeur Systèmes Embarqués</span>
            </h1>
            
            <p className="hero-subtitle">
              Passionné par la programmation bas niveau, les microcontrôleurs ESP32, 
              le développement FPGA et la création de systèmes IoT intelligents
            </p>
            
            <div className="hero-actions">
              <Link to="/projects" className="hero-btn primary">
                Voir mes projets
              </Link>
              <a 
                href="https://github.com/scotty800" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-btn secondary"
              >
                <span className="github-icon">🐙</span> GitHub
              </a>
            </div>
          </div>
          
          {/* Section photo avec votre image */}
          <div className="hero-photo-section">
            <div className="photo-container">
              <img 
                src={scottyPhoto} 
                alt="Scotty - Développeur Systèmes Embarqués" 
                className="profile-photo"
              />
            </div>
          </div>
        </div>
        
        {/* Section technologies embarquées */}
        <div className="tech-section">
          <h2 className="section-title">Technologies Maîtrisées</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">🔌</div>
              <h3>Arduino/ESP32</h3>
              <p>Programmation de microcontrôleurs, drivers matériels, contrôle PWM</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">⚡</div>
              <h3>VHDL/FPGA</h3>
              <p>Design numérique, synthèse logique, machines à états finis avec Vivado</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">⏱️</div>
              <h3>FreeRTOS</h3>
              <p>Systèmes temps réel, multitâche, synchronisation et gestion mémoire</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📡</div>
              <h3>IoT & Réseaux</h3>
              <p>MQTT, WiFi, Bluetooth, communication client-serveur et APIs REST</p>
            </div>
          </div>
        </div>
        
        {/* Section à propos */}
        <div className="about-section">
          <h2 className="section-title">À propos de moi</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                <strong>Scotty</strong> - Développeur Junior en Systèmes Embarqués passionné 
                par l'électronique et la programmation bas niveau. Mon expertise s'étend 
                de la programmation de microcontrôleurs ESP32 au design FPGA avec VHDL, 
                en passant par le développement de systèmes temps réel avec FreeRTOS.
              </p>
              <p>
                Je combine une solide compréhension du hardware avec des compétences en 
                développement logiciel pour créer des systèmes embarqués robustes et 
                efficaces. Mes projets incluent des systèmes IoT, des contrôleurs 
                matériels et des simulations numériques.
              </p>
              <p>
                Toujours en quête de nouveaux défis techniques, je m'intéresse 
                particulièrement à l'optimisation des performances, à la gestion 
                de l'énergie et aux architectures distribuées pour systèmes embarqués.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Projets Complets</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Domaines Maîtrisés</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Code Fonctionnel</span>
              </div>
            </div>
            
            {/* Section compétences spécifiques */}
            <div className="skills-details">
              <h3 className="skills-title">Compétences Techniques</h3>
              <div className="skills-grid">
                <div className="skill-category">
                  <h4>Hardware</h4>
                  <ul>
                    <li>ESP32/Arduino</li>
                    <li>FPGA (Xilinx)</li>
                    <li>Capteurs & Actuateurs</li>
                    <li>Circuits Numériques</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h4>Logiciel</h4>
                  <ul>
                    <li>C/C++ Embarqué</li>
                    <li>VHDL</li>
                    <li>FreeRTOS</li>
                    <li>ARM Assembly</li>
                    <li>Python</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h4>Outils</h4>
                  <ul>
                    <li>Arduino IDE</li>
                    <li>Xilinx Vivado</li>
                    <li>Git/GitHub</li>
                    <li>PlatformIO</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section projets récents */}
        <div className="projects-preview">
          <h2 className="section-title">Projets Récents</h2>
          <div className="projects-grid-mini">
            <div className="project-mini-card">
              <div className="project-mini-icon">🔌</div>
              <h3>Arduino ESP32</h3>
              <p>Contrôle LEDs, capteurs, moteurs avec ESP32</p>
              <Link to="/project/1" className="project-mini-link">
                Voir le projet →
              </Link>
            </div>
            <div className="project-mini-card">
              <div className="project-mini-icon">📡</div>
              <h3>IoT ESP32</h3>
              <p>Systèmes connectés MQTT, serveurs web, BLE</p>
              <Link to="/project/2" className="project-mini-link">
                Voir le projet →
              </Link>
            </div>
            <div className="project-mini-card">
              <div className="project-mini-icon">⚡</div>
              <h3>FPGA Simulation</h3>
              <p>Design VHDL, machines à états, circuits logiques</p>
              <Link to="/project/3" className="project-mini-link">
                Voir le projet →
              </Link>
            </div>
          </div>
          <div className="view-all-projects">
            <Link to="/projects" className="view-all-btn">
              Voir tous mes projets
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;