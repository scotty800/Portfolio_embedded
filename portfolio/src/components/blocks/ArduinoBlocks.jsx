// components/blocks/ArduinoBlocks.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import des images depuis le dossier assets
import degradeCouleursImg from '../../assets/degrade_couleurs.png';
import microchip74HC595Img from '../../assets/microchip_74HC595.png';
import detecterMouvementsImg from '../../assets/detecter_mouvements.png';
import affichageCaracteresImg from '../../assets/affichage_caractères.png';
import lumiereCouranteImg from '../../assets/lumière_courante.png';
import moteurImg from '../../assets/moteur.png';

// Configuration Cloudinary
const CLOUDINARY_CLOUD_NAME = 'dfwwlbhuw';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

// VIDÉOS SUR CLOUDINARY - URLs corrigées
const videos = {
  1: `${CLOUDINARY_BASE_URL}/v1765551961/degrade-couleurs_xcs0m5`,
  2: `${CLOUDINARY_BASE_URL}/v1765551964/microchip-74hc595_n3ejif`,
  3: `${CLOUDINARY_BASE_URL}/v1765551963/detection-mouvement_gpc5gq`,
  4: `${CLOUDINARY_BASE_URL}/v1765551963/affichage-lcd_qybdrw`,
  5: `${CLOUDINARY_BASE_URL}/v1765551964/lumiere-courante_zo5kts`,
  6: `${CLOUDINARY_BASE_URL}/v1765551961/controle-moteur_ad6qi3`
};

const ArduinoBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const { projectId: routeProjectId, blockId: routeBlockId } = useParams();
  const [imageError, setImageError] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleVideoError = () => {
    console.error('Erreur vidéo:', videoRef.current?.error);
    setVideoError(true);
    setIsVideoLoading(false);
  };

  const handleVideoLoadStart = () => {
    setIsVideoLoading(true);
    setVideoError(false);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoading(false);
  };

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  // Reset la vidéo quand le bloc change
  useEffect(() => {
    setVideoKey(prev => prev + 1);
    setIsVideoLoading(true);
    setVideoError(false);
    
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
      2: {
        title: "Contrôle de 8 LEDs avec Registre à Décalage 74HC595",
        subtitle: "ESP32 + 74HC595 + 8 LEDs",
        description: "Système de contrôle de 8 LEDs avec un seul registre à décalage 74HC595. Cette technique permet de contrôler de nombreux périphériques avec seulement 3 broches du microcontrôleur.",
        features: [
          "Contrôle 8 LEDs avec 3 broches seulement",
          "Registre à décalage série-parallèle",
          "Animation séquentielle programmable",
          "Économie de broches GPIO",
          "Interface SPI logicielle",
          "Extensible en cascade"
        ],
        technologies: ["ESP32 DevKit", "74HC595", "LEDs 5mm", "Résistances 220Ω", "Breadboard", "Câbles jumper"],
        imageCaption: "Contrôle de 8 LEDs via le registre à décalage 74HC595",
        videoDescription: "Démonstration du contrôle séquentiel des 8 LEDs via le registre 74HC595.",
        codeSnippet: `// ESP32 - Contrôle 74HC595
#define DATA_PIN 13   // DS
#define LATCH_PIN 12  // STCP
#define CLOCK_PIN 14  // SHCP

void setup() {
  pinMode(DATA_PIN, OUTPUT);
  pinMode(LATCH_PIN, OUTPUT);
  pinMode(CLOCK_PIN, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  // Animation Knight Rider
  knightRider();
}

void knightRider() {
  // De gauche à droite
  for(int i = 0; i < 8; i++) {
    writeToShiftRegister(1 << i);
    delay(100);
  }
  
  // De droite à gauche
  for(int i = 6; i > 0; i--) {
    writeToShiftRegister(1 << i);
    delay(100);
  }
}

void writeToShiftRegister(byte data) {
  digitalWrite(LATCH_PIN, LOW);
  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, data);
  digitalWrite(LATCH_PIN, HIGH);
}`,
        challenges: [
          "Synchronisation des signaux de timing",
          "Gestion des délais de propagation",
          "Optimisation du débit série",
          "Cascade de plusieurs registres"
        ],
        solutions: [
          "Timing précis selon datasheet",
          "Délais de stabilisation",
          "Optimisation de shiftOut",
          "Bufferisation des données"
        ],
        imageExplanation: "Le 74HC595 est un registre à décalage 8 bits avec sorties parallèles. L'ESP32 envoie les données sériement (bit par bit) qui sont converties en sorties parallèles pour contrôler les 8 LEDs indépendamment."
      },
      3: {
        title: "Détection de Mouvement avec Capteur PIR",
        subtitle: "ESP32 + Capteur PIR HC-SR501 + LED",
        description: "Système de détection de mouvement infrarouge passif avec réaction en temps réel. Le capteur PIR détecte les changements de radiation infrarouge pour identifier les mouvements.",
        features: [
          "Détection de mouvement jusqu'à 7m",
          "Réglage sensibilité et délai",
          "Sortie numérique HIGH/LOW",
          "Mode de déclenchement réglable",
          "Faible consommation",
          "Détection humaine/animals"
        ],
        technologies: ["ESP32 DevKit", "Capteur PIR HC-SR501", "LED 5mm", "Résistance 220Ω", "Breadboard", "Câbles jumper"],
        imageCaption: "Système de détection de mouvement avec capteur PIR HC-SR501",
        videoDescription: "Démonstration de la détection de mouvement avec activation d'une LED en réponse.",
        codeSnippet: `// ESP32 - Détection mouvement PIR
#define PIR_PIN 27
#define LED_PIN 26

bool motionDetected = false;
unsigned long lastMotionTime = 0;
const unsigned long motionTimeout = 5000; // 5 secondes

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  
  // Attente calibration capteur PIR (30-60 secondes)
  Serial.println("Calibration du capteur PIR...");
  for(int i = 30; i > 0; i--) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\nCalibration terminée!");
}

void loop() {
  int pirValue = digitalRead(PIR_PIN);
  
  if(pirValue == HIGH) {
    if(!motionDetected) {
      motionDetected = true;
      lastMotionTime = millis();
      Serial.println("Mouvement détecté!");
    }
    digitalWrite(LED_PIN, HIGH);
  } else {
    if(motionDetected && (millis() - lastMotionTime > motionTimeout)) {
      motionDetected = false;
      Serial.println("Aucun mouvement détecté depuis 5 secondes");
    }
    digitalWrite(LED_PIN, LOW);
  }
  
  delay(100); // Petite pause pour éviter les rebonds
}`,
        challenges: [
          "Calibration initiale du capteur",
          "Évitement des faux positifs",
          "Ajustement sensibilité",
          "Gestion temps de délai"
        ],
        solutions: [
          "Période de calibration 60 secondes",
          "Filtrage logiciel des signaux",
          "Potentiomètre de réglage",
          "Compteur de temps personnalisé"
        ],
        imageExplanation: "Le capteur PIR HC-SR501 détecte les changements de radiation infrarouge dans son champ de vision. Quand une personne/animal traverse cette zone, le capteur envoie un signal HIGH à l'ESP32 qui allume la LED en réponse."
      },
      4: {
        title: "Affichage LCD 16x2 avec Interface I2C",
        subtitle: "ESP32 + LCD 16x2 + Module I2C",
        description: "Affichage de texte sur écran LCD 16x2 via interface I2C. Réduction du nombre de connexions nécessaires de 16 à seulement 4 fils.",
        features: [
          "Affichage 16 caractères x 2 lignes",
          "Interface I2C (seulement 4 fils)",
          "Contraste réglable via potentiomètre",
          "Caractères personnalisables",
          "Faible consommation",
          "Communication série simplifiée"
        ],
        technologies: ["ESP32 DevKit", "LCD 16x2 avec I2C", "Potentiomètre 10K", "Breadboard", "Câbles jumper", "Module I2C PCF8574"],
        imageCaption: "Affichage de texte sur LCD 16x2 via interface I2C",
        videoDescription: "Démonstration de l'affichage de texte dynamique sur écran LCD avec contrôle via I2C.",
        codeSnippet: `// ESP32 - LCD 16x2 I2C
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Déclaration LCD (adresse I2C, colonnes, lignes)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(115200);
  
  // Initialisation LCD
  lcd.init();
  lcd.backlight();
  
  // Message d'accueil
  lcd.setCursor(0, 0);
  lcd.print("ESP32 + LCD I2C");
  lcd.setCursor(0, 1);
  lcd.print("Projet Arduino");
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Affichage heure/message alterné
  static int counter = 0;
  
  lcd.setCursor(0, 0);
  lcd.print("Counter: ");
  lcd.print(counter);
  
  lcd.setCursor(0, 1);
  lcd.print("Time: ");
  lcd.print(millis() / 1000);
  lcd.print(" sec");
  
  counter++;
  delay(1000);
  
  // Effacement périodique
  if(counter % 10 == 0) {
    lcd.clear();
  }
}`,
        challenges: [
          "Détection adresse I2C correcte",
          "Problèmes de contraste",
          "Initialisation du module I2C",
          "Communication I2C instable"
        ],
        solutions: [
          "Scanner I2C pour trouver adresse",
          "Réglage potentiomètre de contraste",
          "Reset séquence d'initialisation",
          "Pull-up resistors sur SDA/SCL"
        ],
        imageExplanation: "Le module I2C PCF8574 convertit l'interface parallèle du LCD en interface série I2C. Cela réduit le nombre de connexions nécessaires de 16 à seulement 4 (VCC, GND, SDA, SCL)."
      },
      5: {
        title: "Animation Lumière Courante (Cylon) avec LEDs",
        subtitle: "ESP32 + 8 LEDs + Effet Cylon",
        description: "Animation lumière courante style Cylon (Battlestar Galactica) avec effet de balayage fluide. Contrôle PWM pour variation d'intensité progressive.",
        features: [
          "Animation Cylon fluide",
          "Effet de rebond réaliste",
          "Contrôle PWM pour douceur",
          "Vitesse réglable",
          "8 LEDs indépendantes",
          "Patterns personnalisables"
        ],
        technologies: ["ESP32 DevKit", "8 LEDs 5mm", "Résistances 220Ω", "Breadboard", "Câbles jumper", "Sorties PWM"],
        imageCaption: "Animation lumière courante style Cylon avec 8 LEDs",
        videoDescription: "Démonstration de l'effet Cylon avec balayage fluide et rebond des LEDs.",
        codeSnippet: `// ESP32 - Animation Cylon
#define NUM_LEDS 8

// Tableau des broches LEDs
int ledPins[NUM_LEDS] = {13, 12, 14, 27, 26, 25, 33, 32};

int ledDirection = 1;  // 1 = vers la droite, -1 = vers la gauche
int currentLed = 0;
int intensity = 0;
int intensityDirection = 5;

void setup() {
  Serial.begin(115200);
  
  // Configuration toutes les broches LED en sortie
  for(int i = 0; i < NUM_LEDS; i++) {
    pinMode(ledPins[i], OUTPUT);
    ledcSetup(i, 5000, 8);  // 5kHz, 8-bit resolution
    ledcAttach(ledPins[i], i);
  }
}

void loop() {
  // Éteindre toutes les LEDs
  for(int i = 0; i < NUM_LEDS; i++) {
    ledcWrite(i, 0);
  }
  
  // Animation PWM progressive
  for(int i = 0; i <= 255; i += intensityDirection) {
    ledcWrite(currentLed, i);
    delay(2);
  }
  
  for(int i = 255; i >= 0; i -= intensityDirection) {
    ledcWrite(currentLed, i);
    delay(2);
  }
  
  // Déplacement vers LED suivante
  currentLed += ledDirection;
  
  // Inversion direction aux extrémités
  if(currentLed >= NUM_LEDS - 1 || currentLed <= 0) {
    ledDirection = -ledDirection;
  }
}`,
        challenges: [
          "Transition PWM fluide",
          "Synchronisation multiple LEDs",
          "Évitement scintillement",
          "Gestion timing précis"
        ],
        solutions: [
          "Interpolation linéaire intensité",
          "Timer hardware PWM",
          "Fréquence PWM élevée",
          "Gestion microsecondes"
        ],
        imageExplanation: "L'animation Cylon utilise le contrôle PWM pour créer un effet de déplacement fluide. Chaque LED s'allume progressivement jusqu'au maximum puis s'éteint progressivement, créant l'illusion d'un œil qui se déplace."
      },
      6: {
        title: "Contrôle Moteur CC avec Pont en H L298N",
        subtitle: "ESP32 + L298N + Moteur CC",
        description: "Contrôle de vitesse et direction d'un moteur à courant continu avec driver L298N. Utilisation de signaux PWM pour la vitesse et signaux digitaux pour la direction.",
        features: [
          "Contrôle vitesse variable PWM",
          "Changement direction moteur",
          "Protection contre court-circuit",
          "Pilotage 2 moteurs indépendants",
          "Alimentation séparée moteur",
          "Diodes de roue libre intégrées"
        ],
        technologies: ["ESP32 DevKit", "Driver L298N", "Moteur CC 3-12V", "Alimentation externe 12V", "Breadboard", "Câbles jumper"],
        imageCaption: "Contrôle de moteur CC avec driver L298N",
        videoDescription: "Démonstration du contrôle vitesse et direction d'un moteur CC via le driver L298N.",
        codeSnippet: `// ESP32 - Contrôle moteur L298N
// Broches pour le moteur A
#define ENA_PIN 13   // PWM vitesse
#define IN1_PIN 12   // Direction 1
#define IN2_PIN 14   // Direction 2

int motorSpeed = 0;
int speedDirection = 5;
bool motorForward = true;

void setup() {
  Serial.begin(115200);
  
  // Configuration broches moteur
  pinMode(ENA_PIN, OUTPUT);
  pinMode(IN1_PIN, OUTPUT);
  pinMode(IN2_PIN, OUTPUT);
  
  // Configuration PWM
  ledcSetup(0, 5000, 8);  // Canal 0, 5kHz, 8-bit
  ledcAttach(ENA_PIN, 0);
  
  // Direction initiale avant
  setMotorDirection(true);
}

void loop() {
  // Augmentation progressive vitesse
  for(motorSpeed = 0; motorSpeed <= 255; motorSpeed += speedDirection) {
    ledcWrite(0, motorSpeed);
    delay(50);
  }
  
  // Maintien vitesse max
  delay(1000);
  
  // Diminution progressive vitesse
  for(motorSpeed = 255; motorSpeed >= 0; motorSpeed -= speedDirection) {
    ledcWrite(0, motorSpeed);
    delay(50);
  }
  
  // Changement direction
  motorForward = !motorForward;
  setMotorDirection(motorForward);
  delay(500);
}

void setMotorDirection(bool forward) {
  if(forward) {
    digitalWrite(IN1_PIN, HIGH);
    digitalWrite(IN2_PIN, LOW);
    Serial.println("Direction: Avant");
  } else {
    digitalWrite(IN1_PIN, LOW);
    digitalWrite(IN2_PIN, HIGH);
    Serial.println("Direction: Arrière");
  }
}`,
        challenges: [
          "Back-EMF du moteur",
          "Bruit électrique",
          "Chauffage driver L298N",
          "Isolation alimentation"
        ],
        solutions: [
          "Diodes de roue libre",
          "Condensateurs de découplage",
          "Dissipation thermique",
          "Alimentations séparées"
        ],
        imageExplanation: "Le driver L298N permet de contrôler des moteurs CC avec l'ESP32. Les signaux PWM contrôlent la vitesse, tandis que les signaux IN1/IN2 contrôlent la direction. Une alimentation séparée est nécessaire pour le moteur pour éviter la surcharge de l'ESP32."
      }
    };
    
    return blocksData[id] || blocksData[1];
  };

  const blockData = getBlockData(blockId);
  const currentImage = blockImages[blockId];
  const currentVideo = videos[blockId];

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(blockData.codeSnippet)
      .then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
          btn.textContent = 'Copié!';
          setTimeout(() => {
            btn.textContent = 'Copier';
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Erreur copie:', err);
      });
  };

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
                    loading="lazy"
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

          {/* SECTION VIDÉO AVEC CLOUDINARY */}
          <div className="block-section">
            <h2 className="section-title">Démonstration Vidéo</h2>
            
            <div className="video-description">
              <p>{blockData.videoDescription}</p>
            </div>
            
            <div className="video-container-fixed">
              <div className="video-wrapper">
                {isVideoLoading && (
                  <div className="video-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement de la vidéo...</p>
                  </div>
                )}
                
                {videoError && (
                  <div className="video-error">
                    <span className="error-icon">❌</span>
                    <p>Erreur de chargement de la vidéo</p>
                    <button 
                      onClick={() => {
                        setVideoError(false);
                        setIsVideoLoading(true);
                        setVideoKey(prev => prev + 1);
                      }}
                      className="retry-btn"
                    >
                      Réessayer
                    </button>
                  </div>
                )}
                
                <video
                  key={`video-${projectId}-${blockId}-${videoKey}`}
                  ref={videoRef}
                  className="responsive-video"
                  controls
                  poster={currentImage}
                  preload="metadata"
                  onLoadStart={handleVideoLoadStart}
                  onLoadedData={handleVideoLoaded}
                  onCanPlay={handleVideoCanPlay}
                  onError={handleVideoError}
                  crossOrigin="anonymous"
                >
                  <source src={`${currentVideo}.mp4`} type="video/mp4" />
                  <source src={`${currentVideo}.webm`} type="video/webm" />
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
                <button className="copy-btn" onClick={copyCodeToClipboard}>Copier</button>
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