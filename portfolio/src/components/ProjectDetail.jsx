// components/ProjectDetail.jsx - CODE COMPLET CORRIGÉ
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const projectId = parseInt(id);

  // Correction : Navigation directe vers la liste des projets
  const handleBackToProjects = () => {
    navigate('/projects'); // Retour direct à la liste des projets
  };

  // DONNÉES POUR CHAQUE PROJET

  // PROJET 1 - E-commerce
  const project1Blocks = [
    {
      id: 1,
      title: "Interface Utilisateur",
      description: "Design moderne et responsive avec React et Material-UI",
      icon: "🎨",
      features: ["Design responsive", "Navigation intuitive", "Animations fluides", "Dark/Light mode"]
    },
    {
      id: 2,
      title: "Panier d'Achat",
      description: "Gestion complète du panier avec Redux State Management",
      icon: "🛒",
      features: ["Ajout/Suppression produits", "Quantités dynamiques", "Calcul automatique", "Sauvegarde locale"]
    },
    {
      id: 3,
      title: "Paiement Sécurisé",
      description: "Intégration Stripe pour paiements 100% sécurisés",
      icon: "💳",
      features: ["Stripe API intégrée", "Validation cartes", "Chiffrement SSL", "Emails de confirmation"]
    },
    {
      id: 4,
      title: "Backend Node.js",
      description: "API REST robuste avec Express et MongoDB",
      icon: "⚙️",
      features: ["API RESTful complète", "Authentification JWT", "Base de données MongoDB", "Middleware de sécurité"]
    },
    {
      id: 5,
      title: "Gestion Produits",
      description: "Système CRUD complet pour la gestion des produits",
      icon: "📦",
      features: ["Ajout/modification produits", "Catégories dynamiques", "Recherche avancée", "Filtres multiples"]
    },
    {
      id: 6,
      title: "Dashboard Admin",
      description: "Interface d'administration complète avec analytics",
      icon: "📊",
      features: ["Statistiques ventes", "Gestion commandes", "Rapports PDF", "Notifications en temps réel"]
    }
  ];

  // PROJET 2 - Tableau de Bord Analytics
  const project2Blocks = [
    {
      id: 1,
      title: "Visualisation Données",
      description: "Graphiques interactifs avec D3.js et Chart.js",
      icon: "📈",
      features: ["Graphiques en temps réel", "Zoom et panoramique", "Export PNG/PDF", "Personnalisation thèmes"]
    },
    {
      id: 2,
      title: "Dashboard Personnalisable",
      description: "Widgets modulaires et dispositions flexibles",
      icon: "🖥️",
      features: ["Widgets drag & drop", "Layouts personnalisables", "Thèmes couleurs", "Mode plein écran"]
    },
    {
      id: 3,
      title: "Analytics Avancés",
      description: "Analyse de données en temps réel avec machine learning",
      icon: "🧠",
      features: ["Prédictions ML", "Tendances détectées", "Alertes automatiques", "Rapports intelligents"]
    },
    {
      id: 4,
      title: "Intégration API",
      description: "Connexion à multiples sources de données",
      icon: "🔗",
      features: ["REST APIs", "WebSockets", "Bases de données", "Services cloud"]
    },
    {
      id: 5,
      title: "Partage & Collaboration",
      description: "Fonctionnalités de partage et travail d'équipe",
      icon: "👥",
      features: ["Partage de dashboards", "Commentaires en temps réel", "Permissions granulaire", "Historique versions"]
    },
    {
      id: 6,
      title: "Mobile First",
      description: "Application optimisée pour mobile et tablette",
      icon: "📱",
      features: ["PWA installable", "Notifications push", "Mode hors ligne", "Performances optimisées"]
    }
  ];

  // PROJET 3 - Réseau Social
  const project3Blocks = [
    {
      id: 1,
      title: "Chat en Temps Réel",
      description: "Messagerie instantanée avec Socket.io",
      icon: "💬",
      features: ["Messages instantanés", "Notifications push", "Fichiers multimédias", "Groupes de discussion"]
    },
    {
      id: 2,
      title: "Profils Utilisateurs",
      description: "Profils personnalisables avec galerie photos",
      icon: "👤",
      features: ["Photos de profil", "Bannières personnalisées", "Biographies", "Statistiques activité"]
    },
    {
      id: 3,
      title: "Système d'Amis",
      description: "Gestion des relations et invitations",
      icon: "🤝",
      features: ["Demandes d'amis", "Listes d'amis", "Suggestions", "Bloquage utilisateurs"]
    },
    {
      id: 4,
      title: "Fil d'Actualités",
      description: "Algorithme de contenu personnalisé",
      icon: "📰",
      features: ["Posts multimédias", "Likes/commentaires", "Partages", "Hashtags trending"]
    },
    {
      id: 5,
      title: "Modération Contenu",
      description: "Système de signalement et modération",
      icon: "🛡️",
      features: ["Signalement contenu", "Modération manuelle", "Filtres automatiques", "Journal d'activité"]
    },
    {
      id: 6,
      title: "Notifications Intelligentes",
      description: "Système de notifications personnalisées",
      icon: "🔔",
      features: ["Notifications push", "Email digest", "Paramètres granulaire", "Modes ne pas déranger"]
    }
  ];

  // PROJET 4 - Application Météo
  const project4Blocks = [
    {
      id: 1,
      title: "Prévisions Localisées",
      description: "Météo précise par géolocalisation",
      icon: "📍",
      features: ["Géolocalisation auto", "Prévisions 7 jours", "Heure par heure", "Alertes météo"]
    },
    {
      id: 2,
      title: "Interface Visuelle",
      description: "Design intuitif avec animations météo",
      icon: "🌈",
      features: ["Animations temps réel", "Thèmes saisonniers", "Cartes interactives", "Graphiques météo"]
    },
    {
      id: 3,
      title: "PWA Avancée",
      description: "Application Progressive Web App complète",
      icon: "⚡",
      features: ["Installation native", "Mode hors ligne", "Notifications push", "Performances optimisées"]
    },
    {
      id: 4,
      title: "Widgets & Extensions",
      description: "Widgets pour bureau et extensions navigateur",
      icon: "🧩",
      features: ["Widgets desktop", "Extension Chrome", "Widgets Android/iOS", "Personnalisation widgets"]
    },
    {
      id: 5,
      title: "Données Historiques",
      description: "Accès aux données météo historiques",
      icon: "📅",
      features: ["Archives 10 ans", "Comparaisons", "Statistiques", "Tendances climatiques"]
    },
    {
      id: 6,
      title: "API Météo",
      description: "Service API pour développeurs",
      icon: "🔌",
      features: ["API RESTful", "Documentation complète", "Clés API", "Limite requêtes configurable"]
    }
  ];

  // PROJET 5 - Gestion de Projet
  const project5Blocks = [
    {
      id: 1,
      title: "Tableaux Kanban",
      description: "Gestion visuelle des tâches avec drag & drop",
      icon: "📋",
      features: ["Colonnes personnalisables", "Cartes drag & drop", "Étiquettes couleurs", "Filtres avancés"]
    },
    {
      id: 2,
      title: "Gestion Tâches",
      description: "Création et suivi des tâches détaillées",
      icon: "✅",
      features: ["Tâches sous-tâches", "Dates échéance", "Priorités", "Attribution membres"]
    },
    {
      id: 3,
      title: "Calendrier Projet",
      description: "Vue calendrier pour planification",
      icon: "📅",
      features: ["Vue mensuelle/semaine", "Glisser-déposer dates", "Événements récurrents", "Synchronisation"]
    },
    {
      id: 4,
      title: "Chat d'Équipe",
      description: "Communication intégrée pour l'équipe",
      icon: "💬",
      features: ["Canaux par projet", "Messages privés", "Fichiers partagés", "Intégration notifications"]
    },
    {
      id: 5,
      title: "Rapports & Analytics",
      description: "Suivi des performances et productivité",
      icon: "📊",
      features: ["Graphiques avancés", "Rapports automatiques", "KPIs personnalisés", "Export données"]
    },
    {
      id: 6,
      title: "Intégrations",
      description: "Connexion avec outils externes",
      icon: "🔗",
      features: ["GitHub/GitLab", "Slack/Discord", "Google Drive", "APIs personnalisées"]
    }
  ];

  // PROJET 6 - Portfolio Artistique
  const project6Blocks = [
    {
      id: 1,
      title: "Galerie 3D",
      description: "Visualisation 3D avec Three.js",
      icon: "🎭",
      features: ["Modèles 3D interactifs", "Rotation 360°", "Zoom HD", "Éclairage dynamique"]
    },
    {
      id: 2,
      title: "Upload Multimédia",
      description: "Téléchargement optimisé pour artistes",
      icon: "📤",
      features: ["Images HD", "Vidéos 4K", "Audio haute qualité", "Compression intelligente"]
    },
    {
      id: 3,
      title: "Système Commentaires",
      description: "Interactions sociales modérées",
      icon: "💬",
      features: ["Commentaires threadés", "Modération", "Notifications réponses", "Signalement contenu"]
    },
    {
      id: 4,
      title: "Filtres & Recherche",
      description: "Recherche avancée dans les œuvres",
      icon: "🔍",
      features: ["Recherche par tags", "Filtres multiples", "Reconnaissance visuelle", "Suggestions"]
    },
    {
      id: 5,
      title: "Portfolio Personnalisable",
      description: "Thèmes et layouts pour artistes",
      icon: "🎨",
      features: ["Thèmes personnalisés", "Layouts flexibles", "Domaines personnels", "SEO optimisé"]
    },
    {
      id: 6,
      title: "E-commerce Intégré",
      description: "Vente d'œuvres et produits dérivés",
      icon: "🛍️",
      features: ["Boutique en ligne", "Paiements sécurisés", "Gestion stocks", "Livraisons suivies"]
    }
  ];

  // Sélectionner les blocs selon le projet
  const getProjectBlocks = (id) => {
    switch(id) {
      case 1: return project1Blocks;
      case 2: return project2Blocks;
      case 3: return project3Blocks;
      case 4: return project4Blocks;
      case 5: return project5Blocks;
      case 6: return project6Blocks;
      default: return project1Blocks;
    }
  };

  // Données principales des projets
  const projectDetails = {
    1: {
      title: "Application E-commerce",
      description: "Plateforme complète de vente en ligne avec toutes les fonctionnalités modernes d'un e-commerce professionnel.",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "Stripe", "Express", "Material-UI", "JWT", "Socket.io"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    2: {
      title: "Tableau de Bord Analytics",
      description: "Application de visualisation de données avancée avec tableaux de bord personnalisables et analytics en temps réel.",
      technologies: ["React", "D3.js", "Chart.js", "Express", "Firebase", "WebSockets", "Machine Learning"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    3: {
      title: "Réseau Social",
      description: "Plateforme sociale complète avec chat en temps réel, gestion de profils et système de contenu intelligent.",
      technologies: ["React", "Socket.io", "PostgreSQL", "AWS", "Redis", "Node.js", "Cloudinary"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    4: {
      title: "Application Météo",
      description: "Application météo moderne avec prévisions précises, interface visuelle et fonctionnalités PWA avancées.",
      technologies: ["React", "PWA", "Service Workers", "Geolocation API", "Weather APIs", "IndexedDB"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    5: {
      title: "Gestion de Projet",
      description: "Outil complet de gestion de projet avec tableaux Kanban, calendrier intégré et collaboration d'équipe.",
      technologies: ["React", "TypeScript", "GraphQL", "MongoDB", "WebSockets", "DnD Kit", "Chart.js"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    6: {
      title: "Portfolio Artistique",
      description: "Plateforme portfolio pour artistes avec galerie 3D, e-commerce intégré et système de commentaires.",
      technologies: ["React", "Three.js", "Cloudinary", "Firebase", "Framer Motion", "Stripe", "Node.js"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    }
  };

  const project = projectDetails[projectId] || projectDetails[1];
  const projectBlocks = getProjectBlocks(projectId);

  return (
    <div className="project-detail">
      {/* Header avec bouton retour CORRIGÉ */}
      <div className="project-detail-header">
        <button className="back-btn" onClick={handleBackToProjects}>
          ← Retour aux projets
        </button>
        <div className="project-header-content">
          <h1 className="project-detail-title">{project.title}</h1>
          <span className="project-status">{project.status}</span>
        </div>
      </div>

      {/* Description principale */}
      <div className="project-detail-container">
        <div className="project-overview">
          <p className="project-full-description">
            {project.description}
          </p>
          
          <div className="project-technologies">
            <h3>Technologies utilisées :</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <span className="link-icon">📂</span> Code source GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo">
              <span className="link-icon">🚀</span> Voir la démo live
            </a>
          </div>
        </div>

        {/* Grille des 6 blocs (3 colonnes × 2 lignes) - CLIQUABLES */}
        <div className="project-blocks-section">
          <h2 className="blocks-title">Fonctionnalités détaillées</h2>
          <p className="blocks-subtitle">Cliquez sur une fonctionnalité pour voir les détails complets</p>
          
          <div className="project-blocks-grid">
            {projectBlocks.map(block => (
              <Link 
                to={`/project/${projectId}/block/${block.id}`}
                className="project-block clickable-block"
                key={block.id}
              >
                <div className="block-header">
                  <div className="block-icon">{block.icon}</div>
                  <h3 className="block-title">{block.title}</h3>
                </div>
                <p className="block-description">{block.description}</p>
                <ul className="block-features">
                  {block.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="block-click-hint">
                  <span className="click-icon">🔍</span> Cliquer pour plus de détails
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section conclusion */}
        <div className="project-conclusion">
          <h3 className="conclusion-title">Conclusion</h3>
          <p className="conclusion-text">
            Ce projet démontre ma capacité à concevoir et développer des applications web complètes 
            avec une architecture robuste, une interface utilisateur moderne et des fonctionnalités avancées. 
            Chaque aspect a été soigneusement pensé pour offrir la meilleure expérience utilisateur possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;