// components/Skills.jsx - MODIFIÉ POUR SYSTÈMES EMBARQUÉS
import React from 'react';
import './Skills.css';

const Skills = () => {
  const programming = [
    { name: "C/C++", level: 85, description: "Programmation microcontrôleurs, drivers" },
    { name: "VHDL", level: 75, description: "Design numérique, synthèse FPGA" },
    { name: "Python", level: 70, description: "Scripting, automation, test" },
    { name: "JavaScript", level: 80, description: "Sites web, interfaces" },
    { name: "HTML/CSS", level: 85, description: "Développement frontend" }
  ];

  const embeddedTech = [
    { name: "ESP32", level: 85 },
    { name: "Arduino", level: 90 },
    { name: "FreeRTOS", level: 75 },
    { name: "MQTT", level: 80 },
    { name: "WiFi/BLE", level: 70 },
    { name: "GPIO/PWM", level: 85 }
  ];

  const frameworks = [
    { name: "React", level: 75, description: "Sites web interactifs" },
    { name: "Node.js", level: 70, description: "Serveurs backend" },
    { name: "Express", level: 65, description: "APIs REST" },
    { name: "Arduino IDE", level: 90, description: "Développement embarqué" },
    { name: "Xilinx Vivado", level: 70, description: "Simulation FPGA" },
    { name: "PlatformIO", level: 75, description: "IDE avancé ESP32" }
  ];

  const tools = [
    { name: "Git/GitHub", icon: "🔧", description: "Version control" },
    { name: "VS Code", icon: "💻", description: "Éditeur principal" },
    { name: "ModelSim", icon: "📊", description: "Simulation VHDL" },
    { name: "Oscilloscope", icon: "📈", description: "Analyse signaux" },
    { name: "Logic Analyzer", icon: "🔍", description: "Debugging hardware" }
  ];

  const protocols = [
    { name: "I2C", icon: "🔄", description: "Communication bus" },
    { name: "SPI", icon: "⚡", description: "Interface série" },
    { name: "UART", icon: "📡", description: "Communication série" },
    { name: "HTTP", icon: "🌐", description: "Protocole web" },
    { name: "WebSocket", icon: "🔗", description: "Communication temps réel" },
    { name: "TCP/IP", icon: "📶", description: "Réseaux" }
  ];

  return (
    <section className="skills">
      <div className="skills-container">
        <h2 className="section-title">Mes Compétences</h2>
        <p className="section-subtitle">Expertises techniques en systèmes embarqués et développement</p>
        
        {/* Section Programmation */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">💻</span>
            Programmation & Languages
          </h3>
          <div className="skills-list">
            {programming.map(lang => (
              <div className="skill-item" key={lang.name}>
                <div className="skill-header">
                  <div className="skill-icon">{lang.name.charAt(0)}</div>
                  <div className="skill-info">
                    <div className="skill-name">{lang.name}</div>
                    <div className="skill-description">{lang.description}</div>
                  </div>
                  <div className="skill-level">{lang.level}%</div>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${lang.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Technologies Embarquées */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">🔌</span>
            Technologies Embarquées
          </h3>
          <div className="embedded-grid">
            {embeddedTech.map(tech => (
              <div className="embedded-item" key={tech.name}>
                <div className="embedded-name">{tech.name}</div>
                <div className="embedded-level">
                  <div className="embedded-bar">
                    <div 
                      className="embedded-fill" 
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                  <div className="embedded-value">{tech.level}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Frameworks */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">⚛️</span>
            Frameworks & Outils
          </h3>
          <div className="frameworks-grid">
            {frameworks.map(fw => (
              <div className="framework-item" key={fw.name}>
                <div className="framework-name">{fw.name}</div>
                <div className="framework-description">{fw.description}</div>
                <div className="framework-level">
                  <div className="framework-bar">
                    <div 
                      className="framework-fill" 
                      style={{ width: `${fw.level}%` }}
                    ></div>
                  </div>
                  <div className="framework-label">
                    {fw.level >= 90 ? "Expert" : 
                     fw.level >= 75 ? "Avancé" : 
                     fw.level >= 60 ? "Intermédiaire" : "Débutant"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Outils Hardware */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">🛠️</span>
            Outils & Matériel
          </h3>
          <div className="tools-grid">
            {tools.map(tool => (
              <div className="tool-item" key={tool.name}>
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-info">
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-description">{tool.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Protocoles */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">📡</span>
            Protocoles & Communications
          </h3>
          <div className="protocols-grid">
            {protocols.map(protocol => (
              <div className="protocol-item" key={protocol.name}>
                <div className="protocol-icon">{protocol.icon}</div>
                <div className="protocol-info">
                  <div className="protocol-name">{protocol.name}</div>
                  <div className="protocol-description">{protocol.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section compétences générales */}
        <div className="soft-skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">🌟</span>
            Compétences Générales
          </h3>
          <div className="soft-skills">
            <div className="soft-skill-category">
              <h4>Développement</h4>
              <ul>
                <li>Architecture système embarqué</li>
                <li>Debugging hardware/software</li>
                <li>Optimisation mémoire/CPU</li>
                <li>Gestion de l'énergie</li>
              </ul>
            </div>
            <div className="soft-skill-category">
              <h4>Projet</h4>
              <ul>
                <li>Conception de circuit</li>
                <li>Documentation technique</li>
                <li>Tests et validation</li>
                <li>Gestion de version (Git)</li>
              </ul>
            </div>
            <div className="soft-skill-category">
              <h4>Personnel</h4>
              <ul>
                <li>Résolution de problèmes</li>
                <li>Autonomie</li>
                <li>Curiosité technique</li>
                <li>Capacité d'apprentissage</li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Skills;