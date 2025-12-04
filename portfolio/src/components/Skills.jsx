// components/Skills.jsx - STRUCTURE COMME ACCUEIL
import React from 'react';
import './Skills.css';

const Skills = () => {
  const languages = [
    { name: "JavaScript", level: 95, icon: "JS" },
    { name: "TypeScript", level: 85, icon: "TS" },
    { name: "HTML/CSS", level: 98, icon: "</>" },
    { name: "Python", level: 75, icon: "Py" },
    { name: "Java", level: 70, icon: "Java" },
    { name: "SQL", level: 80, icon: "SQL" }
  ];

  const frameworks = [
    { name: "React", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "Vue.js", level: 75 },
    { name: "Express", level: 80 },
    { name: "Next.js", level: 85 },
    { name: "React Native", level: 70 }
  ];

  const tools = [
    { name: "Git", icon: "🔧" },
    { name: "Webpack", icon: "📦" },
    { name: "Docker", icon: "🐳" },
    { name: "Figma", icon: "🎨" },
    { name: "Jest", icon: "🧪" },
    { name: "AWS", icon: "☁️" }
  ];

  return (
    <section className="skills">
      <div className="skills-container">
        <h2 className="section-title">Mes Compétences</h2>
        
        {/* Section Langages */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">💻</span>
            Langages de Programmation
          </h3>
          <div className="skills-list">
            {languages.map(lang => (
              <div className="skill-item" key={lang.name}>
                <div className="skill-header">
                  <div className="skill-icon">{lang.icon}</div>
                  <div className="skill-name">{lang.name}</div>
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
        
        {/* Section Frameworks */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">⚛️</span>
            Frameworks & Bibliothèques
          </h3>
          <div className="frameworks-grid">
            {frameworks.map(fw => (
              <div className="framework-item" key={fw.name}>
                <div className="framework-name">{fw.name}</div>
                <div className="framework-level">
                  <div className="framework-bar">
                    <div 
                      className="framework-fill" 
                      style={{ width: `${fw.level}%` }}
                    ></div>
                  </div>
                  <span className="framework-label">
                    {fw.level >= 90 ? "Expert" : 
                     fw.level >= 75 ? "Avancé" : 
                     fw.level >= 60 ? "Intermédiaire" : "Débutant"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Outils */}
        <div className="skills-section">
          <h3 className="skills-category-title">
            <span className="category-icon">🛠️</span>
            Outils & Technologies
          </h3>
          <div className="tools-grid">
            {tools.map(tool => (
              <div className="tool-item" key={tool.name}>
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;