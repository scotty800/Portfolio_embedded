// components/blocks/ArduinoBlocks.jsx - VIDÉOS DANS PUBLIC
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import des images depuis le dossier assets
import degradeCouleursImg from '../../assets/degrade_couleurs.png';
import microchip74HC595Img from '../../assets/microchip_74HC595.png';
import detecterMouvementsImg from '../../assets/detecter_mouvements.png';
import affichageCaracteresImg from '../../assets/affichage_caractères.png';
import lumiereCouranteImg from '../../assets/lumière_courante.png';
import moteurImg from '../../assets/moteur.png';

// VIDÉOS DÉPLACÉES DANS PUBLIC
const videos = {
  1: '/videos/degrade-couleurs.mp4',
  2: '/videos/microchip-74hc595.mp4',
  3: '/videos/detection-mouvement.mp4',
  4: '/videos/affichage-lcd.mp4',
  5: '/videos/lumiere-courante.mp4',
  6: '/videos/controle-moteur.mp4'
};

const ArduinoBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const { projectId: routeProjectId, blockId: routeBlockId } = useParams();
  const [imageError, setImageError] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
  };

  // Reset la vidéo quand le bloc change
  useEffect(() => {
    setVideoKey(prev => prev + 1);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [blockId, projectId]);

  // Tableau des images par bloc
  const blockImages = {
    1: degradeCouleursImg,
    2: microchip74HC595Img,
    3: detecterMouvementsImg,
    4: affichageCaracteresImg,
    5: lumiereCouranteImg,
    6: moteurImg
  };

  const getBlockData = (id) => {
    const blocksData = {
      1: {
        title: "Contrôle LED RGB avec Dégradé de Couleurs",
        subtitle: "ESP32 + Potentiomètre + LED RGB",
        description: "Système de contrôle LED RGB avec transitions fluides. Utilisation d'un potentiomètre pour ajuster la teinte en temps réel via conversion HSV vers RGB. Ce projet démontre comment créer des dégradés de couleurs fluides avec une LED RGB contrôlée par ESP32.",
        features: [
          "LED RGB contrôlée par ESP32 via PWM",
          "Potentiomètre analogique pour réglage teinte",
          "Algorithme HSV→RGB pour transitions fluides",
          "Gradation progressive sans saccades",
          "Code modulaire en C++ avec calibration",
          "Interface utilisateur simple et intuitive"
        ],
        technologies: ["ESP32 DevKit", "LED RGB Common Anode", "Potentiomètre 10K", "Résistances 220Ω", "Breadboard", "Câbles jumper"],
        imageCaption: "Dégradé fluide de couleurs sur LED RGB contrôlée par ESP32 avec potentiomètre",
        videoDescription: "Vidéo démontrant le contrôle en temps réel de la LED RGB avec transition fluide des couleurs via le potentiomètre.",
        codeSnippet: `// ESP32 - Contrôle LED RGB avec potentiomètre
const int redPin = 27;
const int greenPin = 26;
const int bluePin = 25;

const int freq = 5000;
const int resolution = 8;

#define KNOB_PIN 14

void setup() {
  Serial.begin(115200);
  ledcAttach(redPin, freq, resolution);
  ledcAttach(greenPin, freq, resolution);
  ledcAttach(bluePin, freq, resolution);
}

void loop() {
  int knobValue = analogRead(KNOB_PIN);
  Serial.println(knobValue);
  float hueValue = (float)knobValue / 4095.0;

  int hue = (int)(hueValue * 360);

  int red, green, blue;
  HUEtoRGB(hue, &red, &green, &blue);

  setColor(red, green, blue);
}

void setColor(int red, int green, int blue) {
  ledcWrite(redPin, red);
  ledcWrite(greenPin, green);
  ledcWrite(bluePin, blue);
}

// Convert a HUE value to RGB values
void HUEtoRGB(int hue, int* red, int* green, int* blue) {
  float h = (float)hue / 60.0;
  float c = 1.0;
  float x = c * (1.0 - fabs(fmod(h, 2.0) - 1.0));
  float r, g, b;
  if (h < 1.0) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 2.0) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 3.0) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 4.0) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 5.0) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }
  float m = 1.0 - c;
  *red = (int)((r + m) * 255);
  *green = (int)((g + m) * 255);
  *blue = (int)((b + m) * 255);
}`,
        challenges: [
          "Calibration précise du potentiomètre",
          "Synchronisation PWM sur 3 canaux",
          "Conversion HSV → RGB optimisée",
          "Stabilité des couleurs sous différentes luminosités"
        ],
        solutions: [
          "Mapping non-linéaire pour perception humaine",
          "Timer hardware pour PWM stable",
          "Lookup table pour conversion rapide",
          "Ajustement gamma pour correction visuelle"
        ],
        imageExplanation: "Cette image montre le résultat du contrôle PWM avancé sur une LED RGB. L'ESP32 génère des signaux PWM sur 3 canaux (Rouge, Vert, Bleu) avec une résolution 8 bits (256 niveaux par couleur). Le potentiomètre ajuste la teinte (hue) dans l'espace colorimétrique HSV, qui est convertie en valeurs RGB pour créer ce dégradé continu."
      },
      // ... [Les autres blocs restent identiques, seul le code est réduit pour la lisibilité]
    };
    
    return blocksData[id] || blocksData[1];
  };

  const blockData = getBlockData(blockId);
  const currentImage = blockImages[blockId];
  const currentVideo = videos[blockId];

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
            <h2 className="section-title">Visualisation du Projet</h2>
            <div className="single-image-container">
              <div className="main-image-wrapper">
                {imageError ? (
                  <div className="image-placeholder">
                    <span className="placeholder-icon">📸</span>
                    <p className="placeholder-text">Image non disponible</p>
                  </div>
                ) : (
                  <img 
                    src={currentImage} 
                    alt={blockData.title}
                    className="main-project-image"
                    onError={handleImageError}
                  />
                )}
                <div className="main-image-caption">
                  {blockData.imageCaption}
                </div>
              </div>
            </div>
            
            {/* Explication technique de l'image */}
            <div className="image-explanation">
              <h3>Explication technique :</h3>
              <p>{blockData.imageExplanation}</p>
              <ul>
                <li><strong>Composants principaux :</strong> {blockData.technologies.slice(0, 3).join(', ')}</li>
                <li><strong>Protocole de communication :</strong> Dépend du bloc (I2C, PWM, GPIO, etc.)</li>
                <li><strong>Tension d'alimentation :</strong> 5V pour la plupart des composants</li>
                <li><strong>Programmation :</strong> Arduino IDE avec bibliothèques spécifiques</li>
              </ul>
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Composants utilisés</h2>
            <div className="tech-tags">
              {blockData.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* SECTION VIDÉO AVEC CONTAINER FIXE */}
          <div className="block-section">
            <h2 className="section-title">Démonstration Vidéo</h2>
            
            <div className="video-description">
              <p>{blockData.videoDescription}</p>
            </div>
            
            <div className="video-container-fixed">
              <div className="video-wrapper">
                <video
                  key={`video-${projectId}-${blockId}-${videoKey}`}
                  ref={videoRef}
                  className="responsive-video"
                  controls
                  poster={currentImage}
                  preload="metadata"
                >
                  <source src={currentVideo} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Extrait de code</h2>
            <div className="code-container">
              <div className="code-header">
                <span className="code-filename">Arduino_Bloc{blockId}.ino</span>
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

export default ArduinoBlocks;