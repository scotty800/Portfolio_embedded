// components/blocks/AnalyticsBlocks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AnalyticsBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const blocksData = {
    1: {
      title: "Visualisation Données - Analytics",
      subtitle: "Graphiques interactifs avec D3.js et Chart.js",
      description: "Système de visualisation de données avancé permettant la création de graphiques interactifs et personnalisables.",
      features: [
        "Graphiques en temps réel avec WebSockets",
        "Zoom et panoramique sur les visualisations",
        "Export des graphiques en PNG et PDF",
        "Personnalisation complète des thèmes",
        "Dashboard multi-graphiques"
      ],
      technologies: ["D3.js", "Chart.js", "WebSockets", "React", "Canvas API"],
      screenshot: "📈",
      videoLink: "#",
      codeSnippet: `const LineChart = ({ data }) => (
  <Line data={data} options={chartOptions} />
);`,
      challenges: [
        "Performance avec de grands jeux de données",
        "Interactivité fluide sur mobile",
        "Synchronisation des graphiques multiples"
      ],
      solutions: [
        "Virtualisation des données avec windowing",
        "Utilisation de WebGL pour les performances",
        "État global partagé entre composants"
      ]
    },
    2: {
      title: "Dashboard Personnalisable",
      subtitle: "Widgets modulaires et dispositions flexibles",
      description: "Système de dashboard avec widgets drag & drop permettant aux utilisateurs de créer leur propre interface.",
      features: [
        "Widgets repositionnables par drag & drop",
        "Layouts personnalisables avec grille flexible",
        "Thèmes de couleurs dynamiques",
        "Mode plein écran pour focus",
        "Sauvegarde automatique des layouts"
      ],
      technologies: ["React DnD", "Grid Layout", "Redux", "LocalStorage", "CSS Grid"],
      screenshot: "🖥️",
      videoLink: "#",
      codeSnippet: `const Dashboard = () => (
  <ReactGridLayout cols={12} rowHeight={100}>
    {widgets.map(widget => (
      <div key={widget.id} data-grid={widget.layout}>
        {widget.component}
      </div>
    ))}
  </ReactGridLayout>
);`,
      challenges: [
        "Persistance des positions des widgets",
        "Responsive design sur toutes les tailles d'écran",
        "Performance avec de nombreux widgets"
      ],
      solutions: [
        "Sauvegarde dans IndexedDB",
        "Breakpoints CSS personnalisés",
        "Lazy loading des widgets"
      ]
    },
    3: {
      title: "Analytics Avancés",
      subtitle: "Analyse de données en temps réel avec machine learning",
      description: "Système d'analytics intégrant des algorithmes de machine learning pour la prédiction et la détection d'anomalies.",
      features: [
        "Prédictions basées sur les données historiques",
        "Détection automatique des tendances",
        "Alertes intelligentes sur anomalies",
        "Rapports générés automatiquement",
        "Export des modèles ML"
      ],
      technologies: ["TensorFlow.js", "Python Flask", "Pandas", "Scikit-learn", "WebAssembly"],
      screenshot: "🧠",
      videoLink: "#",
      codeSnippet: `const predictTrend = (data) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  return model.predict(data);
};`,
      challenges: [
        "Exécution de ML dans le navigateur",
        "Performance avec de grandes quantités de données",
        "Intégration avec les données temps réel"
      ],
      solutions: [
        "Utilisation de WebAssembly pour les calculs lourds",
        "Échantillonnage intelligent des données",
        "WebSockets pour les flux de données"
      ]
    },
    4: {
      title: "Intégration API",
      subtitle: "Connexion à multiples sources de données",
      description: "Système d'intégration flexible permettant de se connecter à diverses sources de données via APIs.",
      features: [
        "Support des APIs REST et GraphQL",
        "Connexion WebSocket en temps réel",
        "Intégration bases de données directe",
        "Connecteurs pour services cloud",
        "Cache et mise en mémoire"
      ],
      technologies: ["GraphQL", "Apollo", "WebSocket", "PostgreSQL", "Redis"],
      screenshot: "🔗",
      videoLink: "#",
      codeSnippet: `const fetchDataSources = async () => {
  return await Promise.all(dataSources.map(source => 
    fetch(source.url).then(r => r.json())
  ));
};`,
      challenges: [
        "Gestion des erreurs de connexion",
        "Synchronisation des données hétérogènes",
        "Performance avec de multiples sources"
      ],
      solutions: [
        "Pattern Circuit Breaker pour la résilience",
        "Normalisation des données",
        "Connection pooling et multiplexing"
      ]
    },
    5: {
      title: "Partage & Collaboration",
      subtitle: "Fonctionnalités de partage et travail d'équipe",
      description: "Système de collaboration permettant le partage de dashboards et le travail en équipe en temps réel.",
      features: [
        "Partage de dashboards avec permissions",
        "Commentaires en temps réel sur les données",
        "Permissions granulaire par utilisateur",
        "Historique des versions et restauration",
        "Notifications de changements"
      ],
      technologies: ["Socket.io", "CRDT", "JWT", "MongoDB", "React"],
      screenshot: "👥",
      videoLink: "#",
      codeSnippet: `const shareDashboard = (dashboardId, userId) => {
  socket.emit('share-dashboard', { dashboardId, userId });
};`,
      challenges: [
        "Conflits d'édition simultanée",
        "Performance en temps réel",
        "Gestion des déconnexions"
      ],
      solutions: [
        "Algorithmes CRDT pour la synchronisation",
        "Optimistic UI updates",
        "Heartbeat et reconnexion automatique"
      ]
    },
    6: {
      title: "Mobile First",
      subtitle: "Application optimisée pour mobile et tablette",
      description: "Approche mobile-first avec fonctionnalités PWA avancées pour une expérience native sur mobile.",
      features: [
        "Application PWA installable",
        "Notifications push personnalisées",
        "Mode hors ligne avec cache",
        "Performances optimisées mobile",
        "Support des gestes tactiles"
      ],
      technologies: ["PWA", "Service Workers", "IndexedDB", "Touch Events", "React Native"],
      screenshot: "📱",
      videoLink: "#",
      codeSnippet: `if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}`,
      challenges: [
        "Compatibilité cross-browser",
        "Gestion du cache",
        "Performances sur mobile"
      ],
      solutions: [
        "Feature detection progressive enhancement",
        "Cache stratégique avec Workbox",
        "Optimisation Core Web Vitals"
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

export default AnalyticsBlocks;