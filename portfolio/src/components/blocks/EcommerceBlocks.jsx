// components/blocks/EcommerceBlocks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EcommerceBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const blocksData = {
    1: {
      title: "Interface Utilisateur - E-commerce",
      subtitle: "Design moderne et responsive avec React et Material-UI",
      description: "L'interface utilisateur de cette application e-commerce a été conçue avec une approche mobile-first, garantissant une expérience optimale sur tous les appareils. J'ai utilisé React avec Material-UI pour créer des composants réutilisables et maintenables.",
      features: [
        "Design responsive s'adaptant à tous les écrans",
        "Navigation intuitive avec menu déroulant",
        "Animations fluides pour améliorer l'UX",
        "Mode sombre/clair selon les préférences utilisateur",
        "Chargement paresseux des images pour performances"
      ],
      technologies: ["React", "Material-UI", "CSS3", "Framer Motion", "Responsive Design"],
      screenshot: "🎨",
      videoLink: "#",
      codeSnippet: `const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.price}€</p>
  </div>
);`,
      challenges: [
        "Optimisation des performances pour les grandes galeries de produits",
        "Cohérence du design sur tous les navigateurs",
        "Accessibilité WCAG 2.1 niveau AA"
      ],
      solutions: [
        "Implémentation de virtual scrolling pour les listes longues",
        "Utilisation de CSS Grid et Flexbox pour la mise en page",
        "Tests d'accessibilité avec axe-core et Lighthouse"
      ]
    },
    2: {
      title: "Panier d'Achat - E-commerce",
      subtitle: "Gestion complète du panier avec Redux State Management",
      description: "Le système de panier utilise Redux pour gérer l'état global de l'application, avec persistance locale pour conserver les articles entre les sessions.",
      features: [
        "Ajout/Suppression de produits en un clic",
        "Quantités dynamiques avec validation",
        "Calcul automatique des totaux et taxes",
        "Sauvegarde locale avec localStorage",
        "Synchronisation en temps réel"
      ],
      technologies: ["Redux", "Redux Toolkit", "LocalStorage", "React Hooks"],
      screenshot: "🛒",
      videoLink: "#",
      codeSnippet: `const addToCart = (product) => {
  dispatch({ type: 'ADD_TO_CART', payload: product });
};`,
      challenges: [
        "Gestion des stocks en temps réel",
        "Synchronisation entre plusieurs onglets",
        "Performance avec des paniers volumineux"
      ],
      solutions: [
        "WebSockets pour les mises à jour de stock",
        "Utilisation de BroadcastChannel API",
        "Optimisation des sélecteurs Redux avec Reselect"
      ]
    },
    3: {
      title: "Paiement Sécurisé - E-commerce",
      subtitle: "Intégration Stripe pour paiements 100% sécurisés",
      description: "Système de paiement intégré avec Stripe offrant une expérience de checkout fluide et sécurisée.",
      features: [
        "Intégration complète de l'API Stripe",
        "Validation des cartes en temps réel",
        "Chiffrement SSL pour les données sensibles",
        "Emails de confirmation automatiques",
        "Gestion des remboursements"
      ],
      technologies: ["Stripe API", "Node.js", "Express", "React", "Webhooks"],
      screenshot: "💳",
      videoLink: "#",
      codeSnippet: `const processPayment = async (paymentData) => {
  return await stripe.createPaymentIntent(paymentData);
};`,
      challenges: [
        "Conformité PCI DSS pour les paiements",
        "Gestion des échecs de paiement",
        "Support multi-devises"
      ],
      solutions: [
        "Utilisation des éléments de paiement Stripe",
        "Système de retry intelligent",
        "API de conversion de devises"
      ]
    },
    4: {
      title: "Backend Node.js - E-commerce",
      subtitle: "API REST robuste avec Express et MongoDB",
      description: "Backend scalable construit avec Node.js et Express, offrant une API RESTful complète pour l'application.",
      features: [
        "API RESTful avec endpoints documentés",
        "Authentification JWT sécurisée",
        "Base de données MongoDB avec Mongoose",
        "Middleware de sécurité avancé",
        "Logging et monitoring"
      ],
      technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Helmet"],
      screenshot: "⚙️",
      videoLink: "#",
      codeSnippet: `app.post('/api/orders', authMiddleware, async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});`,
      challenges: [
        "Gestion des connexions concurrentes",
        "Optimisation des requêtes MongoDB",
        "Sécurité des endpoints API"
      ],
      solutions: [
        "Pool de connexions MongoDB",
        "Indexation et agrégation",
        "Validation et sanitisation des inputs"
      ]
    },
    5: {
      title: "Gestion Produits - E-commerce",
      subtitle: "Système CRUD complet pour la gestion des produits",
      description: "Interface d'administration complète pour la gestion du catalogue produits avec recherche avancée.",
      features: [
        "CRUD complet pour les produits",
        "Catégories et sous-catégories dynamiques",
        "Recherche full-text avec Elasticsearch",
        "Filtres multiples et facettes",
        "Import/Export CSV"
      ],
      technologies: ["React Admin", "Elasticsearch", "Mongoose", "Multer", "CSV Parser"],
      screenshot: "📦",
      videoLink: "#",
      codeSnippet: `const updateProduct = async (id, updates) => {
  return await Product.findByIdAndUpdate(id, updates, { new: true });
};`,
      challenges: [
        "Performance avec des milliers de produits",
        "Synchronisation des données",
        "Recherche pertinente"
      ],
      solutions: [
        "Pagination et lazy loading",
        "Jobs de synchronisation",
        "Relevancy scoring personnalisé"
      ]
    },
    6: {
      title: "Dashboard Admin - E-commerce",
      subtitle: "Interface d'administration complète avec analytics",
      description: "Dashboard admin avec visualisation des données, gestion des commandes et rapports détaillés.",
      features: [
        "Statistiques ventes en temps réel",
        "Gestion des commandes et expéditions",
        "Rapports PDF automatisés",
        "Notifications en temps réel",
        "Gestion des utilisateurs"
      ],
      technologies: ["Chart.js", "Socket.io", "PDFKit", "Node-cron", "React"],
      screenshot: "📊",
      videoLink: "#",
      codeSnippet: `const getSalesStats = async () => {
  return await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$total" } } }
  ]);
};`,
      challenges: [
        "Traitement de grandes quantités de données",
        "Génération de rapports performante",
        "Interface admin intuitive"
      ],
      solutions: [
        "Agrégation MongoDB pour les stats",
        "Génération asynchrone des PDF",
        "Design system cohérent"
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

export default EcommerceBlocks;