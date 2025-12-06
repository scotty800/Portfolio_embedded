// components/blocks/SocialBlocks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SocialBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const blocksData = {
    1: {
      title: "Chat en Temps Réel - Réseau Social",
      subtitle: "Messagerie instantanée avec Socket.io et WebRTC",
      description: "Système de messagerie en temps réel offrant une expérience fluide de chat avec support des messages multimédias, groupes et notifications push.",
      features: [
        "Messages instantanés avec délai < 100ms",
        "Notifications push en temps réel",
        "Transfert de fichiers multimédias",
        "Groupes de discussion avec administration",
        "Messages éphémères et suppression automatique"
      ],
      technologies: ["Socket.io", "WebRTC", "React", "MongoDB", "Redis", "Node.js"],
      screenshot: "💬",
      videoLink: "#",
      codeSnippet: `socket.on('new-message', (message) => {
  setMessages(prev => [...prev, message]);
});`,
      challenges: [
        "Latence réseau et synchronisation des messages",
        "Gestion des reconnexions et messages en attente",
        "Performance avec des milliers d'utilisateurs simultanés",
        "Stockage et livraison des messages multimédias"
      ],
      solutions: [
        "Optimisation WebSocket avec compression",
        "Queue de messages avec Redis et système de retry",
        "Cluster Socket.io avec Redis adapter",
        "CDN pour les fichiers et streaming progressif"
      ]
    },
    2: {
      title: "Profils Utilisateurs - Réseau Social",
      subtitle: "Profils personnalisables avec galerie photos et statistiques",
      description: "Système complet de gestion de profils utilisateurs avec personnalisation avancée, galerie multimédia et statistiques d'activité.",
      features: [
        "Photos de profil et bannières personnalisables",
        "Galerie photos/vidéos avec organisation par albums",
        "Biographies et informations personnelles",
        "Statistiques d'activité et d'engagement",
        "Mode privé et contrôles de confidentialité"
      ],
      technologies: ["React", "Cloudinary", "MongoDB", "GraphQL", "AWS S3"],
      screenshot: "👤",
      videoLink: "#",
      codeSnippet: `const updateProfile = async (userId, data) => {
  return await User.findByIdAndUpdate(userId, data, { new: true });
};`,
      challenges: [
        "Gestion des fichiers multimédias de grande taille",
        "Optimisation des performances des galeries",
        "Synchronisation des données de profil en temps réel",
        "Gestion des permissions et confidentialité"
      ],
      solutions: [
        "Upload progressif et compression intelligente",
        "Lazy loading et pagination infinie",
        "WebSockets pour les mises à jour de profil",
        "Système de règles de confidentialité granulaire"
      ]
    },
    3: {
      title: "Système d'Amis - Réseau Social",
      subtitle: "Gestion des relations sociales, invitations et suggestions",
      description: "Système complet de gestion des relations sociales avec demandes d'amis, listes, suggestions intelligentes et contrôles de blocage.",
      features: [
        "Demandes d'amis avec notifications",
        "Listes d'amis organisées par catégories",
        "Suggestions d'amis basées sur les intérêts communs",
        "Fonctionnalités de blocage et signalement",
        "Statistiques de réseau social"
      ],
      technologies: ["Graph Database", "Redis", "Node.js", "React", "Machine Learning"],
      screenshot: "🤝",
      videoLink: "#",
      codeSnippet: `const sendFriendRequest = (userId) => {
  dispatch({ type: 'SEND_FRIEND_REQUEST', payload: userId });
};`,
      challenges: [
        "Gestion des relations complexes (blocage, suivi, etc.)",
        "Performance des requêtes de graphe",
        "Suggestions pertinentes et non intrusives",
        "Synchronisation des états de relation"
      ],
      solutions: [
        "Base de données graphe optimisée pour les relations sociales",
        "Indexation des chemins fréquemment utilisés",
        "Algorithmes de recommandation hybrides",
        "Événements WebSocket pour les changements d'état"
      ]
    },
    4: {
      title: "Fil d'Actualités - Réseau Social",
      subtitle: "Algorithme de contenu personnalisé avec machine learning",
      description: "Système intelligent de fil d'actualités qui apprend des préférences utilisateur pour afficher un contenu personnalisé et pertinent.",
      features: [
        "Posts multimédias avec images, vidéos et liens",
        "Système de likes, commentaires et partages",
        "Hashtags trending et recherche",
        "Algorithme de ranking personnalisé",
        "Filtrage de contenu et modération"
      ],
      technologies: ["Elasticsearch", "Apache Kafka", "TensorFlow", "React", "Redis"],
      screenshot: "📰",
      videoLink: "#",
      codeSnippet: `const getFeed = async (userId) => {
  return await Post.find({ authorId: { $in: userFriends } });
};`,
      challenges: [
        "Performance avec des millions de posts",
        "Personnalisation en temps réel",
        "Détection de contenu inapproprié",
        "Équilibre entre nouveauté et pertinence"
      ],
      solutions: [
        "Indexation avancée avec Elasticsearch",
        "Modèles ML entraînés sur les interactions",
        "API de modération de contenu",
        "Algorithmes hybrides"
      ]
    },
    5: {
      title: "Modération Contenu - Réseau Social",
      subtitle: "Système de signalement et modération automatisée",
      description: "Système complet de modération de contenu avec signalement utilisateur, analyse automatisée et modération manuelle.",
      features: [
        "Signalement de contenu par les utilisateurs",
        "Analyse automatisée avec IA",
        "Interface de modération manuelle",
        "Filtres de contenu configurables",
        "Journal d'activité et transparence"
      ],
      technologies: ["TensorFlow", "Google Vision API", "React Admin", "MongoDB", "Node.js"],
      screenshot: "🛡️",
      videoLink: "#",
      codeSnippet: `const reportContent = (contentId, reason) => {
  return api.post('/reports', { contentId, reason });
};`,
      challenges: [
        "Analyse en temps réel de grands volumes de contenu",
        "Équilibre entre liberté d'expression et sécurité",
        "Détection des fausses accusations",
        "Transparence et confiance des utilisateurs"
      ],
      solutions: [
        "Pipeline de traitement parallèle avec Kafka",
        "Système de règles configurables et auditable",
        "Analyse de patterns et réputation des rapporteurs",
        "Journalisation complète et processus d'appel"
      ]
    },
    6: {
      title: "Notifications Intelligentes - Réseau Social",
      subtitle: "Système de notifications personnalisées et configurables",
      description: "Système avancé de notifications avec personnalisation, regroupement intelligent et gestion des préférences utilisateur.",
      features: [
        "Notifications push en temps réel",
        "Email digest personnalisés",
        "Paramètres granulaire par type de notification",
        "Modes ne pas déranger programmables",
        "Analytics d'engagement des notifications"
      ],
      technologies: ["Firebase Cloud Messaging", "SendGrid", "Redis", "Node.js", "React"],
      screenshot: "🔔",
      videoLink: "#",
      codeSnippet: `const sendNotification = (userId, message) => {
  if (Notification.permission === 'granted') {
    new Notification('Nouveau message', { body: message });
  }
};`,
      challenges: [
        "Gestion des préférences utilisateur complexes",
        "Performance avec des millions d'utilisateurs",
        "Personnalisation en temps réel",
        "Équilibre entre engagement et spam"
      ],
      solutions: [
        "Système de règles basé sur les segments",
        "Queue asynchrone avec priorisation",
        "Machine learning pour la personnalisation",
        "Limites de fréquence et regroupement intelligent"
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

export default SocialBlocks;