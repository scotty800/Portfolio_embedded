// components/blocks/ArtisticPortfolioBlocks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ArtisticPortfolioBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const blocksData = {
    1: {
      title: "Galerie 3D - Portfolio Artistique",
      subtitle: "Visualisation 3D immersive avec Three.js",
      description: "Galerie d'art virtuelle en 3D permettant aux artistes de présenter leurs œuvres dans un environnement immersif avec navigation fluide et interactions riches.",
      features: [
        "Modèles 3D interactifs des œuvres",
        "Rotation 360° et zoom HD",
        "Éclairage dynamique et ombres",
        "Navigation virtuelle dans la galerie",
        "Support VR/AR optionnel"
      ],
      technologies: ["Three.js", "React Three Fiber", "WebGL", "Blender", "GLTF"],
      screenshot: "🎭",
      videoLink: "#",
      codeSnippet: `// Scène 3D avec Three.js
const ArtGallery3D = () => {
  const { scene, camera } = useThree();
  return <Canvas><Artwork3D model="/models/sculpture.gltf" /></Canvas>;
};`,
      challenges: [
        "Performance des rendus 3D complexes",
        "Chargement optimisé des modèles lourds",
        "Compatibilité cross-browser WebGL",
        "Expérience utilisateur fluide"
      ],
      solutions: [
        "Level of detail (LOD) et frustum culling",
        "Compression GLTF et lazy loading",
        "Fallbacks et détection de capacités",
        "Optimisation des animations et interactions"
      ]
    },
    2: {
      title: "Upload Multimédia - Portfolio Artistique",
      subtitle: "Téléchargement optimisé pour artistes",
      description: "Système d'upload avancé spécialement conçu pour les artistes, supportant les formats haute résolution, la compression intelligente et l'organisation en collections.",
      features: [
        "Images HD et vidéos 4K",
        "Audio haute qualité",
        "Compression intelligente sans perte",
        "Organisation par collections et tags",
        "Prévisualisation instantanée"
      ],
      technologies: ["Cloudinary", "FFmpeg", "React", "Node.js", "AWS S3"],
      screenshot: "📤",
      videoLink: "#",
      codeSnippet: `// Upload avec compression
const uploadArtwork = async (file) => {
  const compressed = await compressImage(file);
  return cloudinary.upload(compressed);
};`,
      challenges: [
        "Gestion des fichiers volumineux",
        "Maintenance de la qualité originale",
        "Conversion des formats propriétaires",
        "Stockage économique"
      ],
      solutions: [
        "Upload progressif et résumable",
        "Compression adaptative par device",
        "Support des formats professionnels",
        "CDN avec cache intelligent"
      ]
    },
    3: {
      title: "Système Commentaires - Portfolio Artistique",
      subtitle: "Interactions sociales modérées pour artistes",
      description: "Système de commentaires avancé avec modération, threads de discussion et interactions sociales permettant aux visiteurs d'échanger avec l'artiste.",
      features: [
        "Commentaires threadés et réponses",
        "Système de modération manuelle/auto",
        "Notifications des réponses",
        "Signalement de contenu inapproprié",
        "Badges et réputation"
      ],
      technologies: ["React", "GraphQL", "MongoDB", "Socket.io", "Moderation API"],
      screenshot: "💬",
      videoLink: "#",
      codeSnippet: `// Ajout de commentaire
const addComment = async (artworkId, comment) => {
  return Comment.create({ artworkId, ...comment });
};`,
      challenges: [
        "Gestion du spam et trolls",
        "Performance avec de nombreux commentaires",
        "Modération en temps réel",
        "Expérience conversationnelle"
      ],
      solutions: [
        "Filtres IA et listes noires",
        "Pagination infinie et cache",
        "Interface modérateur temps réel",
        "Notifications push et email"
      ]
    },
    4: {
      title: "Filtres & Recherche - Portfolio Artistique",
      subtitle: "Recherche avancée dans les œuvres d'art",
      description: "Moteur de recherche puissant avec filtres multiples, reconnaissance visuelle et suggestions intelligentes pour explorer les collections artistiques.",
      features: [
        "Recherche par tags et métadonnées",
        "Filtres multiples combinables",
        "Reconnaissance visuelle IA",
        "Suggestions personnalisées",
        "Recherche sémantique"
      ],
      technologies: ["Elasticsearch", "TensorFlow.js", "React", "Node.js", "Redis"],
      screenshot: "🔍",
      videoLink: "#",
      codeSnippet: `// Recherche avec Elasticsearch
const searchArtworks = (query) => {
  return elasticsearch.search({
    index: 'artworks',
    query: { match: { tags: query } }
  });
};`,
      challenges: [
        "Indexation des métadonnées complexes",
        "Performance de la recherche visuelle",
        "Précision des suggestions",
        "Interface de filtrage intuitive"
      ],
      solutions: [
        "Mapping Elasticsearch optimisé",
        "Modèles ML pré-entraînés",
        "Analyse du comportement utilisateur",
        "Filtres facettes et drill-down"
      ]
    },
    5: {
      title: "Portfolio Personnalisable - Portfolio Artistique",
      subtitle: "Thèmes et layouts pour artistes",
      description: "Système de personnalisation avancé permettant aux artistes de créer leur portfolio unique avec thèmes, layouts et domaines personnalisés.",
      features: [
        "Thèmes personnalisables (couleurs, polices)",
        "Layouts flexibles et responsive",
        "Domaines personnels personnalisés",
        "SEO optimisé pour artistes",
        "Analytics intégrés"
      ],
      technologies: ["React", "CSS-in-JS", "Next.js", "Vercel", "Google Analytics"],
      screenshot: "🎨",
      videoLink: "#",
      codeSnippet: `// Application du thème
const applyTheme = (theme) => {
  document.documentElement.style.setProperty('--primary', theme.primary);
};`,
      challenges: [
        "Personnalisation profonde sans code",
        "Responsive design complexe",
        "Performance des thèmes dynamiques",
        "SEO pour chaque portfolio"
      ],
      solutions: [
        "Éditeur visuel WYSIWYG",
        "CSS Grid et conteneurs fluides",
        "CSS variables et compilation JIT",
        "Génération de sitemap dynamique"
      ]
    },
    6: {
      title: "E-commerce Intégré - Portfolio Artistique",
      subtitle: "Vente d'œuvres et produits dérivés",
      description: "Boutique en ligne intégrée permettant aux artistes de vendre leurs œuvres originales, impressions limitées et produits dérivés directement depuis leur portfolio.",
      features: [
        "Boutique en ligne complète",
        "Paiements sécurisés multi-devises",
        "Gestion des stocks et éditions",
        "Livraisons suivies internationales",
        "Gestion des commandes et factures"
      ],
      technologies: ["Stripe", "React", "Node.js", "MongoDB", "Shipping APIs"],
      screenshot: "🛍️",
      videoLink: "#",
      codeSnippet: `// Paiement Stripe
const processPayment = async (order) => {
  return stripe.paymentIntents.create({
    amount: order.total,
    currency: 'eur'
  });
};`,
      challenges: [
        "Intégration transparente au portfolio",
        "Gestion des stocks pour œuvres uniques",
        "Logistique internationale",
        "Conformité légale et taxes"
      ],
      solutions: [
        "Design system unifié",
        "Système d'éditions et disponibilité",
        "Partnerships avec transporteurs",
        "Calcul automatique des taxes"
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

export default ArtisticPortfolioBlocks;