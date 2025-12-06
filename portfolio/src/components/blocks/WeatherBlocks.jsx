// components/blocks/WeatherBlocks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WeatherBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const blocksData = {
    1: {
      title: "Prévisions Localisées - Application Météo",
      subtitle: "Météo précise par géolocalisation et prévisions intelligentes",
      description: "Système de prévisions météorologiques hyper-locales utilisant la géolocalisation, plusieurs sources de données et algorithmes de prédiction avancés.",
      features: [
        "Géolocalisation automatique précise",
        "Prévisions sur 7 jours avec probabilités",
        "Prévisions heure par heure détaillées",
        "Alertes météo en temps réel",
        "Comparaison de multiples sources de données"
      ],
      technologies: ["Geolocation API", "OpenWeatherMap", "WeatherAPI", "React Native", "Redis"],
      screenshot: "📍",
      videoLink: "#",
      codeSnippet: `const getWeather = async (lat, lon) => {
  return await fetch(\`/api/weather?lat=\${lat}&lon=\${lon}\`);
};`,
      challenges: [
        "Latence des APIs météo externes",
        "Précision des données hyper-locales",
        "Gestion des sources de données multiples",
        "Performance avec des millions d'utilisateurs"
      ],
      solutions: [
        "Cache agressif avec stratégie d'invalidation",
        "Interpolation spatiale des données",
        "Modèle d'ensemble pour combiner les sources",
        "CDN et edge computing pour la distribution"
      ]
    },
    2: {
      title: "Interface Visuelle - Application Météo",
      subtitle: "Design intuitif avec animations météo en temps réel",
      description: "Interface utilisateur immersive avec animations météorologiques réalistes, visualisations de données interactives et thèmes dynamiques.",
      features: [
        "Animations météo en temps réel (pluie, neige, soleil)",
        "Thèmes dynamiques s'adaptant aux conditions",
        "Cartes météo interactives avec couches",
        "Graphiques et visualisations de données",
        "Design responsive mobile-first"
      ],
      technologies: ["React", "Framer Motion", "D3.js", "Three.js", "Canvas API"],
      screenshot: "🌈",
      videoLink: "#",
      codeSnippet: `const WeatherIcon = ({ condition }) => (
  condition === 'rain' ? '🌧️' : 
  condition === 'sun' ? '☀️' : '☁️'
);`,
      challenges: [
        "Performance des animations sur mobile",
        "Synchronisation des animations avec les données réelles",
        "Gestion de la mémoire avec de nombreuses particules",
        "Adaptation aux différentes tailles d'écran"
      ],
      solutions: [
        "Optimisation Canvas avec requestAnimationFrame",
        "Web Workers pour le calcul des particules",
        "Object pooling pour la réutilisation des particules",
        "Responsive design avec breakpoints CSS"
      ]
    },
    3: {
      title: "PWA Avancée - Application Météo",
      subtitle: "Application Progressive Web App avec fonctionnalités natives",
      description: "PWA complète avec installation native, fonctionnement hors ligne, notifications push et performances optimisées.",
      features: [
        "Installation en tant qu'application native",
        "Mode hors ligne avec données en cache",
        "Notifications push pour les alertes météo",
        "Performances optimisées (Core Web Vitals)",
        "Synchronisation en arrière-plan"
      ],
      technologies: ["Service Workers", "IndexedDB", "Workbox", "Web App Manifest", "Push API"],
      screenshot: "⚡",
      videoLink: "#",
      codeSnippet: `self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) || fetch(event.request)
  );
});`,
      challenges: [
        "Gestion complexe du cache pour des données dynamiques",
        "Compatibilité cross-browser des APIs PWA",
        "Performance du Service Worker sur mobile",
        "Synchronisation des données hors ligne"
      ],
      solutions: [
        "Stratégies de cache différenciées par type de contenu",
        "Feature detection et fallbacks progressifs",
        "Optimisation du bundle et lazy loading",
        "IndexedDB avec synchronisation différentielle"
      ]
    },
    4: {
      title: "Widgets & Extensions - Application Météo",
      subtitle: "Widgets pour bureau et extensions navigateur",
      description: "Système de widgets personnalisables pour différents environnements (bureau, mobile, navigateur) avec mise à jour en temps réel.",
      features: [
        "Widgets desktop pour Windows, macOS et Linux",
        "Extension Chrome avec overlay météo",
        "Widgets Android/iOS pour l'écran d'accueil",
        "Personnalisation avancée des widgets",
        "Synchronisation entre tous les appareils"
      ],
      technologies: ["Electron", "Chrome Extensions API", "React Native", "Web Components", "Native APIs"],
      screenshot: "🧩",
      videoLink: "#",
      codeSnippet: `const updateWidget = (widgetId, data) => {
  chrome.runtime.sendMessage({ type: 'UPDATE_WIDGET', widgetId, data });
};`,
      challenges: [
        "Compatibilité multiplateforme complexe",
        "Performance des widgets sur différentes plateformes",
        "Synchronisation des données entre widgets",
        "Gestion des permissions système"
      ],
      solutions: [
        "Architecture modulaire avec adaptateurs par plateforme",
        "Optimisation des ressources et lazy loading",
        "Service de synchronisation centralisé",
        "Gestion fine des permissions avec fallbacks"
      ]
    },
    5: {
      title: "Données Historiques - Application Météo",
      subtitle: "Accès aux données météo historiques et analyses",
      description: "Système complet de stockage et d'analyse des données météo historiques avec comparaisons, statistiques et tendances climatiques.",
      features: [
        "Archives météo sur 10+ années",
        "Comparaisons période à période",
        "Statistiques détaillées par paramètre",
        "Tendances climatiques à long terme",
        "Visualisations avancées des données"
      ],
      technologies: ["PostgreSQL", "TimescaleDB", "Python", "D3.js", "FastAPI"],
      screenshot: "📅",
      videoLink: "#",
      codeSnippet: `const getHistoricalWeather = async (date) => {
  return await WeatherArchive.findOne({ date });
};`,
      challenges: [
        "Stockage et performance avec des milliards de données",
        "Qualité et cohérence des données historiques",
        "Calculs statistiques complexes sur de grands jeux de données",
        "Visualisation efficace de données à long terme"
      ],
      solutions: [
        "Base de données temporelle optimisée (TimescaleDB)",
        "Processus d'ETL pour la validation et le nettoyage",
        "Agrégats pré-calculés et cache multi-niveaux",
        "Rendu côté serveur et streaming de données"
      ]
    },
    6: {
      title: "API Météo - Application Météo",
      subtitle: "Service API complet pour développeurs",
      description: "API RESTful complète offrant l'accès aux données météo actuelles, historiques et prévisions avec documentation interactive et gestion des clés API.",
      features: [
        "API RESTful avec endpoints documentés",
        "Documentation interactive Swagger/OpenAPI",
        "Gestion des clés API avec quotas",
        "Limite de requêtes configurable",
        "Support webhook pour les mises à jour"
      ],
      technologies: ["FastAPI", "Swagger", "Redis", "PostgreSQL", "JWT"],
      screenshot: "🔌",
      videoLink: "#",
      codeSnippet: `app.get('/api/weather/current', (req, res) => {
  const { lat, lon } = req.query;
  res.json(getWeatherData(lat, lon));
});`,
      challenges: [
        "Performance avec des milliers de requêtes simultanées",
        "Sécurité et prévention des abus",
        "Documentation exhaustive et à jour",
        "Compatibilité avec différents clients"
      ],
      solutions: [
        "Cache Redis avec invalidation intelligente",
        "Rate limiting, quotas et authentification robuste",
        "Génération automatique de documentation OpenAPI",
        "Versioning d'API et support long terme"
      ]
    }
  };

  const blockData = blocksData[blockId] || blocksData[1];

  return (
    <>
      <div className="block-title-section">
        <h1 className="block-detail-title">{blockData.title}</h1>
        <p className="block-detail-subtitle">{blockData.subtitle}</p>
      </div>

      <div className="block-detail-container">
        <div className="block-main-content">
          
          <div className="block-section">
            <h2 className="section-title">Description</h2>
            <div className="description-content">
              <p className="block-description">{blockData.description}</p>
              
              <div className="features-list">
                <h3>Fonctionnalités principales :</h3>
                <ul>
                  {blockData.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Technologies utilisées</h2>
            <div className="tech-tags">
              {blockData.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Démonstration</h2>
            <div className="media-container">
              <div className="screenshot-preview">
                <div className="screenshot-placeholder">
                  {blockData.screenshot}
                </div>
                <p className="screenshot-caption">Interface de {blockData.title}</p>
              </div>
              
              {blockData.videoLink !== "#" && (
                <div className="video-container">
                  <h3>Vidéo de démonstration</h3>
                  <a href={blockData.videoLink} target="_blank" rel="noopener noreferrer" className="video-link">
                    <span className="video-icon">▶️</span> Voir la vidéo
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Extrait de code</h2>
            <div className="code-container">
              <div className="code-header">
                <span className="code-filename">Exemple.js</span>
                <button className="copy-btn">Copier</button>
              </div>
              <pre className="code-snippet">{blockData.codeSnippet}</pre>
            </div>
          </div>

          <div className="challenges-section">
            <div className="challenges-col">
              <h3 className="challenges-title">Défis rencontrés</h3>
              <ul className="challenges-list">
                {blockData.challenges.map((challenge, index) => (
                  <li key={index} className="challenge-item">
                    <span className="challenge-icon">⚡</span> {challenge}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="solutions-col">
              <h3 className="solutions-title">Solutions apportées</h3>
              <ul className="solutions-list">
                {blockData.solutions.map((solution, index) => (
                  <li key={index} className="solution-item">
                    <span className="solution-icon">✅</span> {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="block-navigation">
          {prevBlock && (
            <Link to={prevBlock} className="nav-btn prev-btn">
              <span className="nav-icon">←</span>
              <div className="nav-text">
                <span className="nav-label">Précédent</span>
                <span className="nav-block">Bloc {blockId - 1}</span>
              </div>
            </Link>
          )}
          
          {nextBlock && (
            <Link to={nextBlock} className="nav-btn next-btn">
              <div className="nav-text">
                <span className="nav-label">Suivant</span>
                <span className="nav-block">Bloc {parseInt(blockId) + 1}</span>
              </div>
              <span className="nav-icon">→</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherBlocks;