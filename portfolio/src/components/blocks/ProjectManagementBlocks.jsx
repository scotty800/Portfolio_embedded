// components/blocks/ProjectManagementBlocks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectManagementBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const blocksData = {
    1: {
      title: "Tableaux Kanban - Gestion de Projet",
      subtitle: "Gestion visuelle des tâches avec drag & drop avancé",
      description: "Système de tableaux Kanban interactifs permettant une gestion visuelle des workflows avec fonctionnalités avancées de drag & drop, colonnes personnalisables et filtres intelligents.",
      features: [
        "Colonnes personnalisables selon les workflows",
        "Cartes drag & drop avec prévisualisation",
        "Étiquettes couleurs et catégories",
        "Filtres avancés et recherche",
        "Vues multiples (tableau, liste, calendrier)"
      ],
      technologies: ["React DnD", "React", "Redux", "CSS Grid", "IndexedDB"],
      screenshot: "📋",
      videoLink: "#",
      codeSnippet: `// Composant KanbanColumn
const KanbanColumn = ({ column, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => moveTask(item.id, column.id),
    collect: monitor => ({ isOver: !!monitor.isOver() })
  });
  
  return (
    <div ref={drop} className={\`column \${isOver ? 'drag-over' : ''}\`}>
      <h3>{column.name} ({tasks.length})</h3>
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
};`,
      challenges: [
        "Performance avec de nombreux éléments drag & drop",
        "Persistance des positions après reload",
        "Synchronisation en temps réel multi-utilisateurs",
        "Responsive design sur mobile"
      ],
      solutions: [
        "Virtualisation des listes pour les performances",
        "Sauvegarde automatique dans IndexedDB",
        "WebSockets avec optimistic updates",
        "Touch gestures pour mobile"
      ]
    },
    2: {
      title: "Gestion Tâches - Gestion de Projet",
      subtitle: "Création et suivi des tâches détaillées avec hiérarchie",
      description: "Système complet de gestion des tâches avec hiérarchie, dépendances, dates d'échéance et attribution d'équipe. Support des sous-tâches, checklist et pièces jointes.",
      features: [
        "Tâches et sous-tâches hiérarchiques",
        "Dates échéance et rappels",
        "Système de priorités et labels",
        "Attribution aux membres d'équipe",
        "Checklists et progression"
      ],
      technologies: ["React", "GraphQL", "MongoDB", "Express", "JWT"],
      screenshot: "✅",
      videoLink: "#",
      codeSnippet: `// Création de tâche avec sous-tâches
const createTask = async (taskData) => {
  const task = await Task.create({
    ...taskData,
    subtasks: taskData.subtasks.map(sub => ({
      ...sub,
      progress: 0,
      completed: false
    }))
  });
  return task;
};`,
      challenges: [
        "Gestion des dépendances complexes entre tâches",
        "Calcul automatique des dates d'échéance",
        "Notifications de rappel efficaces",
        "Performance avec des projets volumineux"
      ],
      solutions: [
        "Graphe de dépendances avec validation cyclique",
        "Algorithmes de propagation des dates",
        "Systeme de notifications par priorité",
        "Pagination et lazy loading"
      ]
    },
    3: {
      title: "Calendrier Projet - Gestion de Projet",
      subtitle: "Vue calendrier interactive pour planification",
      description: "Calendrier interactif permettant la visualisation et la planification des tâches sur des périodes quotidiennes, hebdomadaires et mensuelles avec glisser-déposer et vues personnalisables.",
      features: [
        "Vues quotidienne, hebdomadaire, mensuelle",
        "Glisser-déposer des tâches sur le calendrier",
        "Événements récurrents et exceptions",
        "Synchronisation avec Google Calendar",
        "Vue équipe et ressources"
      ],
      technologies: ["FullCalendar", "React", "Node.js", "Google API", "WebSockets"],
      screenshot: "📅",
      videoLink: "#",
      codeSnippet: `// Intégration FullCalendar
const ProjectCalendar = ({ events }) => {
  const calendarRef = useRef();
  
  useEffect(() => {
    const calendar = new FullCalendar.Calendar(calendarRef.current, {
      events,
      editable: true,
      eventDrop: handleEventDrop
    });
    calendar.render();
  }, [events]);
  
  return <div ref={calendarRef} />;
};`,
      challenges: [
        "Performance avec de nombreux événements",
        "Synchronisation multi-calendriers",
        "Gestion des fuseaux horaires",
        "Interface mobile intuitive"
      ],
      solutions: [
        "Lazy loading des événements",
        "Cache et préchargement",
        "Conversion automatique des timezones",
        "Vue agenda pour mobile"
      ]
    },
    4: {
      title: "Chat d'Équipe - Gestion de Projet",
      subtitle: "Communication intégrée pour la collaboration",
      description: "Système de chat en temps réel spécifique aux projets avec canaux organisés, partage de fichiers et intégration des tâches. Support des discussions privées et de groupe.",
      features: [
        "Canaux par projet et par équipe",
        "Messages privés et discussions de groupe",
        "Partage de fichiers et intégrations",
        "Notifications intelligentes",
        "Historique de conversations"
      ],
      technologies: ["Socket.io", "React", "MongoDB", "AWS S3", "Redis"],
      screenshot: "💬",
      videoLink: "#",
      codeSnippet: `// Gestionnaire de messages temps réel
socket.on('new-message', (message) => {
  dispatch(addMessage(message));
  if (!isChannelVisible(message.channelId)) {
    showNotification('Nouveau message', message.content);
  }
});`,
      challenges: [
        "Scalabilité avec de nombreuses connexions",
        "Stockage et recherche des messages",
        "Notifications pertinentes",
        "Sécurité des discussions privées"
      ],
      solutions: [
        "Cluster Socket.io avec Redis adapter",
        "Base de données optimisée pour la recherche",
        "Filtrage intelligent des notifications",
        "Chiffrement end-to-end optionnel"
      ]
    },
    5: {
      title: "Rapports & Analytics - Gestion de Projet",
      subtitle: "Suivi des performances et productivité",
      description: "Dashboard d'analytics avancé avec métriques de productivité, rapports automatisés et visualisations de données pour le suivi des projets et de l'équipe.",
      features: [
        "Graphiques avancés et KPI personnalisés",
        "Rapports automatisés PDF/Excel",
        "Suivi du temps et productivité",
        "Prédictions et tendances",
        "Export des données"
      ],
      technologies: ["Chart.js", "D3.js", "Node.js", "PDFKit", "Python"],
      screenshot: "📊",
      videoLink: "#",
      codeSnippet: `// Génération de rapport de productivité
const generateProductivityReport = async (projectId) => {
  const data = await AnalyticsService.getProjectData(projectId);
  return ReportGenerator.createPDF(data);
};`,
      challenges: [
        "Calcul en temps réel des métriques",
        "Génération performante des rapports",
        "Personnalisation des dashboards",
        "Intégration des données hétérogènes"
      ],
      solutions: [
        "Aggrégats pré-calculés et cache",
        "Génération asynchrone avec queue",
        "Widgets modulaires configurables",
        "API unifiée pour les données"
      ]
    },
    6: {
      title: "Intégrations - Gestion de Projet",
      subtitle: "Connexion avec outils externes et APIs",
      description: "Système d'intégration extensible permettant la connexion avec les outils de développement, communication et productivité les plus populaires.",
      features: [
        "Intégration GitHub/GitLab",
        "Connecteurs Slack/Discord",
        "Synchronisation Google Drive",
        "APIs personnalisées webhooks",
        "Marketplace d'extensions"
      ],
      technologies: ["OAuth2", "Webhooks", "Express", "React", "PostgreSQL"],
      screenshot: "🔗",
      videoLink: "#",
      codeSnippet: `// Intégration GitHub webhook
app.post('/webhooks/github', (req, res) => {
  const event = req.headers['x-github-event'];
  handleGitHubEvent(event, req.body);
  res.status(200).end();
});`,
      challenges: [
        "Gestion des tokens OAuth sécurisée",
        "Synchronisation bidirectionnelle",
        "Gestion des erreurs d'intégration",
        "Maintenance des connecteurs"
      ],
      solutions: [
        "Stockage chiffré des tokens",
        "Queue de synchronisation avec retry",
        "Monitoring des intégrations",
        "Système de plugins extensible"
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

export default ProjectManagementBlocks;