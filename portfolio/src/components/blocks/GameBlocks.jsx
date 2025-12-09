// components/blocks/GameBlocks.jsx - SECTION VIDÉO SIMPLIFIÉE
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GameBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [imageError, setImageError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const blocksData = {
    1: {
      title: "Développement Complet du Jeu Mini Racer",
      subtitle: "Jeu de course multijoueur Unity 3D de A à Z",
      description: "Mini Racer est un jeu de course multijoueur développé entièrement avec Unity en C#. Ce projet inclut la modélisation 3D, la physique des véhicules, le système multijoueur en réseau, l'interface utilisateur et le design sonore.",
      features: [
        "Architecture complète du jeu en C#/Unity",
        "Physique avancée des véhicules avec drift réaliste",
        "Système multijoueur pour 1 à 4 joueurs en réseau",
        "Modélisation 3D des circuits et véhicules",
        "Design des mécaniques de jeu et power-ups",
        "UI/UX immersive et design sonore complet",
        "Système de progression et classements",
        "Optimisation performances pour différentes plateformes"
      ],
      technologies: ["Unity Engine 2021", "C# Scripting", "Blender 3D", "Photon PUN", "ProBuilder", "Visual Studio", "Git Version Control", "FMOD Audio"],
      mainImage: {
        src: "/assets/projects/game/mini-racer-main.jpg",
        alt: "Mini Racer - Jeu de course multijoueur Unity",
        caption: "Écran titre du jeu Mini Racer avec sélection de véhicules"
      },
      additionalImages: [
        { src: "/assets/projects/game/gameplay-1.jpg", alt: "Gameplay course avec effets visuels" },
        { src: "/assets/projects/game/vehicle-design.jpg", alt: "Design 3D des véhicules" },
        { src: "/assets/projects/game/track-design.jpg", alt: "Modélisation des circuits" },
        { src: "/assets/projects/game/multiplayer-lobby.jpg", alt: "Interface multijoueur" },
        { src: "/assets/projects/game/ui-design.jpg", alt: "Design interface utilisateur" },
        { src: "/assets/projects/game/physics-simulation.jpg", alt: "Simulation physique véhicules" },
        { src: "/assets/projects/game/audio-design.jpg", alt: "Design sonore et musique" },
        { src: "/assets/projects/game/optimization-tools.jpg", alt: "Outils d'optimisation" }
      ],
      videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Lien exemple
      challenges: [
        "Synchronisation parfaite multijoueur en réseau",
        "Physique réaliste des véhicules et drift",
        "Optimisation performances sur différentes configurations",
        "Création assets 3D de qualité professionnelle",
        "Gestion mémoire avec nombreux assets",
        "Compatibilité multi-plateformes"
      ],
      solutions: [
        "Photon PUN avec prédiction côté client",
        "Wheel colliders Unity ajustés avec scripts personnalisés",
        "Occlusion culling et LOD systems",
        "Pipeline Blender → Unity optimisé",
        "Asset bundles et streaming dynamique",
        "Build settings multi-plateformes"
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
            <h2 className="section-title">Description du Projet</h2>
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

          {/* SECTION IMAGE PRINCIPALE */}
          <div className="block-section">
            <h2 className="section-title">Aperçu du Jeu</h2>
            <div className="single-image-container">
              <div className="main-image-wrapper">
                {imageError ? (
                  <div className="image-placeholder">
                    <span className="placeholder-icon">🎮</span>
                    <p className="placeholder-text">Image non disponible</p>
                  </div>
                ) : (
                  <img 
                    src={blockData.mainImage.src} 
                    alt={blockData.mainImage.alt}
                    className="main-project-image"
                    onError={handleImageError}
                  />
                )}
                <div className="main-image-caption">
                  {blockData.mainImage.caption}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 8 IMAGES ADDITIONNELLES */}
          <div className="block-section">
            <h2 className="section-title">Galerie du Développement</h2>
            <p className="section-subtitle">Découvrez les différentes étapes de création du jeu</p>
            
            <div className="game-images-grid">
              {blockData.additionalImages.map((img, index) => (
                <div key={index} className="game-image-item">
                  <div className="game-image-wrapper">
                    {imageError ? (
                      <div className="placeholder-content">
                        <span className="placeholder-icon">🖼️</span>
                        <p>Aspect {index + 1}</p>
                      </div>
                    ) : (
                      <img 
                        src={img.src} 
                        alt={img.alt}
                        className="game-additional-image"
                        onError={handleImageError}
                      />
                    )}
                  </div>
                  <div className="game-image-info">
                    <h4 className="game-image-title">
                      {index === 0 && "Gameplay Dynamique"}
                      {index === 1 && "Design Véhicules"}
                      {index === 2 && "Création Circuits"}
                      {index === 3 && "Multijoueur"}
                      {index === 4 && "Interface UI/UX"}
                      {index === 5 && "Physique Avancée"}
                      {index === 6 && "Audio Immersif"}
                      {index === 7 && "Optimisation"}
                    </h4>
                    <p className="game-image-caption">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Outils et Technologies</h2>
            <div className="tech-tags">
              {blockData.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* SECTION VIDÉO SIMPLIFIÉE */}
          <div className="block-section">
            <h2 className="section-title">Démonstration Vidéo</h2>
            <div className="simple-video-container">
              {showVideo ? (
                <div className="video-player">
                  <iframe
                    src={blockData.videoLink}
                    title="Mini Racer Gameplay Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                  <button onClick={toggleVideo} className="close-video-btn">
                    ✕ Fermer la vidéo
                  </button>
                </div>
              ) : (
                <div className="video-thumbnail-container" onClick={toggleVideo}>
                  <div className="video-thumbnail-wrapper">
                    {imageError ? (
                      <div className="video-placeholder">
                        <span className="play-icon-large">▶</span>
                        <p>Cliquer pour voir la vidéo</p>
                      </div>
                    ) : (
                      <img 
                        src={blockData.mainImage.src} 
                        alt="Miniature vidéo"
                        className="video-thumbnail-image"
                        onError={handleImageError}
                      />
                    )}
                    <div className="video-play-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                  <p className="video-instruction">Cliquez pour voir la démo gameplay</p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION SANS CODE SNIPPET */}
          <div className="block-section">
            <h2 className="section-title">Processus de Développement</h2>
            <div className="development-process">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Conception & Design</h3>
                  <p>Création du concept du jeu, design des mécaniques, storyboarding et prototype papier des interfaces.</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Modélisation 3D</h3>
                  <p>Création des assets 3D dans Blender : véhicules, circuits, décors, avec optimisation pour le jeu.</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Programmation Gameplay</h3>
                  <p>Développement en C# des systèmes de jeu : physique, contrôles, IA, multijoueur et progression.</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>UI/UX & Audio</h3>
                  <p>Design de l'interface utilisateur, menus, HUD et création de l'audio (musique, effets sonores).</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Test & Optimisation</h3>
                  <p>Tests approfondis, optimisation des performances, correction de bugs et préparation release.</p>
                </div>
              </div>
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

export default GameBlocks;