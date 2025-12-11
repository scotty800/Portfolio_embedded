// components/blocks/ArduinoBlocks.jsx - CORRIGÉ avec nouveaux snippets
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import des images depuis le dossier assets
import degradeCouleursImg from '../../assets/degrade_couleurs.png';
import microchip74HC595Img from '../../assets/microchip_74HC595.png';
import detecterMouvementsImg from '../../assets/detecter_mouvements.png';
import affichageCaracteresImg from '../../assets/affichage_caractères.png';
import lumiereCouranteImg from '../../assets/lumière_courante.png';
import moteurImg from '../../assets/moteur.png';

// Import des vidéos depuis le dossier assets/videos
import degradeCouleursVideo from '../../assets/videos/degrade-couleurs.mp4';
import microchip74HC595Video from '../../assets/videos/microchip-74hc595.mp4';
import detectionMouvementVideo from '../../assets/videos/detection-mouvement.mp4';
import affichageLCDVideo from '../../assets/videos/affichage-lcd.mp4';
import lumiereCouranteVideo from '../../assets/videos/lumiere-courante.mp4';
import controleMoteurVideo from '../../assets/videos/controle-moteur.mp4';

const ArduinoBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const { projectId: routeProjectId, blockId: routeBlockId } = useParams();
  const [imageError, setImageError] = useState(false);
  const [videoKey, setVideoKey] = useState(0); // Key pour forcer le re-render
  const videoRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
  };

  // Reset la vidéo quand le bloc change
  useEffect(() => {
    // Reset la key pour forcer le re-render de la vidéo
    setVideoKey(prev => prev + 1);
    
    // Arrêter et reset la vidéo si elle existe
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load(); // Force le rechargement
    }

    // Cleanup function pour s'assurer que la vidéo est arrêtée
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [blockId, projectId]); // Déclenché quand blockId ou projectId change

  // Tableau des images par bloc
  const blockImages = {
    1: degradeCouleursImg,
    2: microchip74HC595Img,
    3: detecterMouvementsImg,
    4: affichageCaracteresImg,
    5: lumiereCouranteImg,
    6: moteurImg
  };

  // Tableau des vidéos par bloc
  const blockVideos = {
    1: degradeCouleursVideo,
    2: microchip74HC595Video,
    3: detectionMouvementVideo,
    4: affichageLCDVideo,
    5: lumiereCouranteVideo,
    6: controleMoteurVideo
  };

  // Fonction pour obtenir les infos du bloc
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
        title: "Affichage Défilant 8 LEDs avec 74HC595",
        subtitle: "Registre à décalage pour contrôle multiple",
        description: "Contrôle de 8 LEDs avec un seul registre à décalage 74HC595. Création d'effets d'animation avec consommation minimale de GPIO ESP32.",
        features: [
          "Contrôle 8 LEDs avec 3 pins ESP32",
          "Effet défilant avec arc-en-ciel",
          "Séquence d'allumage programmable",
          "Optimisation mémoire avec registre",
          "Timing précis des animations",
          "Code réutilisable pour autres projets"
        ],
        technologies: ["74HC595", "LEDs 5mm", "Résistances 220Ω", "ESP32", "Oscilloscope", "Multimètre"],
        imageCaption: "Montage avec registre à décalage 74HC595 et 8 LEDs",
        videoDescription: "Démonstration de l'animation défilante des 8 LEDs avec différents motifs programmés.",
        codeSnippet: `// ESP32 - Contrôle 8 LEDs avec 74HC595
const int STcp = 27;
const int SHcp = 26; 
const int DS = 25; 

int datArray[] = {B00000000, B00000001, B00000011, B00000111, B00001111, B00011111, B00111111, B01111111, B11111111};

void setup() {
  pinMode(STcp, OUTPUT);
  pinMode(SHcp, OUTPUT);
  pinMode(DS, OUTPUT);
}

void loop() {
  for(int num = 0; num < 10; num++) {
    digitalWrite(STcp, LOW); 
    shiftOut(DS, SHcp, MSBFIRST, datArray[num]);
    digitalWrite(STcp, HIGH);
    delay(1000);
  }
}`,
        challenges: [
          "Timing précis des signaux de shift",
          "Synchronisation multiple registres",
          "Consommation courant 8 LEDs",
          "Interférences électromagnétiques"
        ],
        solutions: [
          "Utilisation de timers hardware",
          "Cascade de registres pour plus de LEDs",
          "Résistances de limitation adaptées",
          "Filtrage capacitif sur alimentation"
        ],
        imageExplanation: "Le microchip 74HC595 est un registre à décalage 8 bits qui permet de contrôler 8 sorties avec seulement 3 signaux de contrôle. Cette image montre son intégration dans un circuit pour animer 8 LEDs avec des motifs complexes."
      },
      3: {
        title: "Détection Mouvement avec Capteur PIR",
        subtitle: "ESP32 + HC-SR501 pour sécurité",
        description: "Système de détection de mouvement infrarouge avec capteur PIR HC-SR501. Activation automatique de LEDs avec délai réglable.",
        features: [
          "Détection mouvement jusqu'à 7m",
          "Réglage sensibilité et délai",
          "Sortie numérique pour contrôle",
          "Mode veille basse consommation",
          "Indication visuelle LED",
          "Intégration système domotique"
        ],
        technologies: ["HC-SR501 PIR", "LED témoin", "Relais 5V", "ESP32", "Module WiFi", "Alimentation 5V"],
        imageCaption: "Système de détection mouvement avec LED d'alerte",
        videoDescription: "Détection de mouvement en temps réel avec activation automatique de la LED et du relais.",
        codeSnippet: `// ESP32 - Détecteur mouvement PIR
const int pirPin = 14;
const int ledPin = 26; 
int pirState = 0;

void setup() {
  Serial.begin(115200);  
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  pirState = digitalRead(pirPin);
  Serial.println(pirState);
  delay(100);

  if (pirState == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
        challenges: [
          "Faux positifs avec animaux/chaleur",
          "Calibration longue du capteur",
          "Gestion délais d'extinction",
          "Interférences environnantes"
        ],
        solutions: [
          "Filtrage logiciel des signaux",
          "Séquence calibration optimisée",
          "Timer hardware pour délais précis",
          "Blindage et positionnement optimal"
        ],
        imageExplanation: "Le capteur PIR (Passive Infrared) détecte les mouvements par les variations de rayonnement infrarouge. Cette installation montre comment intégrer le HC-SR501 avec un ESP32 pour créer un système de sécurité ou d'automatisation."
      },
      4: {
        title: "Affichage LCD I2C 16x2 avec Messages",
        subtitle: "Interface utilisateur avec écran LCD",
        description: "Affichage de messages dynamiques sur écran LCD 1602 avec interface I2C. Compteur incrémental et messages de bienvenue personnalisés.",
        features: [
          "Module I2C LCD1602 (16x2 caractères)",
          "Messages défilants personnalisés",
          "Compteur automatique incrémental",
          "Interface I2C simplifiée (2 fils)",
          "Rétroéclairage ajustable",
          "Gestion mémoire écran"
        ],
        technologies: ["LCD1602 I2C", "Module I2C PCF8574", "ESP32", "Potentiomètre", "Alimentation 5V"],
        imageCaption: "Affichage de messages sur LCD avec interface I2C",
        videoDescription: "Affichage en direct du compteur et du message défilant sur l'écran LCD.",
        codeSnippet: `// ESP32 - Contrôle LCD I2C 16x2
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2); 

int count = 0;

void setup() {
  lcd.init();
  lcd.backlight(); 
  lcd.print("Hello, world!");
  delay(3000);
}

void loop() {
  lcd.clear(); 
  lcd.setCursor(0, 0); 
  lcd.print("COUNT: ");
  lcd.print(count);
  delay(1000);
  count++;
}`,
        challenges: [
          "Adresse I2C non détectée",
          "Communication I2C instable",
          "Gestion caractères spéciaux",
          "Rétroéclairage consommation"
        ],
        solutions: [
          "Scanner automatique d'adresses",
          "Pull-up resistors 4.7KΩ",
          "Table caractères personnalisée",
          "Contrôle PWM rétroéclairage"
        ],
        imageExplanation: "L'écran LCD 16x2 avec interface I2C permet d'afficher du texte sur 2 lignes de 16 caractères. L'interface I2C réduit le nombre de connexions nécessaires de 6 à seulement 2 fils (SDA et SCL)."
      },
      5: {
        title: "Animation Lumière Courante WS2812",
        subtitle: "Bande LED adressable avec détection",
        description: "Animation lumière courante sur bande LED WS2812 avec détection d'obstacles et changement direction automatique. Contrôle individuel de chaque LED.",
        features: [
          "Bande LED WS2812 (30 LEDs/m)",
          "Animation lumière courante fluide",
          "Détection obstacles ultrasonique",
          "Changement direction automatique",
          "Couleurs personnalisables RGB",
          "Synchronisation précise µs"
        ],
        technologies: ["WS2812B LED Strip", "HC-SR04 Ultrason", "ESP32", "Alimentation 5V 3A", "Condensateur 1000µF"],
        imageCaption: "Animation lumière courante sur bande LED 30 LEDs",
        videoDescription: "Démonstration de l'animation lumière courante avec changement de direction automatique lors de la détection d'obstacle.",
        codeSnippet: `// ESP32 - Animation WS2812 avec détection d'obstacles
#include <Adafruit_NeoPixel.h>

// Set the number of pixels for the running light
#define NUM_PIXELS 8

// Set the data pin for the RGB LED strip
#define DATA_PIN 14

// Initialize the RGB LED strip object
Adafruit_NeoPixel pixels(NUM_PIXELS, DATA_PIN, NEO_GRB + NEO_KHZ800);

// Initialize the avoid sensor
#define AVOID_PIN 25

void setup() {
  // Initialize the RGB LED strip
  pixels.begin();

  // Initialize the avoid sensor
  pinMode(AVOID_PIN, INPUT_PULLUP);

  // Set the initial LED color
  uint32_t color = pixels.Color(random(256), random(256), random(256));
  pixels.fill(color);
  pixels.show();
}

void loop() {
  // Read the input from the infrared sensor
  bool avoid_value = digitalRead(AVOID_PIN);

  // Generate a random color for the current pixel
  uint32_t color = pixels.Color(random(256), random(256), random(256));

  // If no obstacle is detected
  if (avoid_value) {
    for (int i = 0; i < NUM_PIXELS; i++) {
      // Turn on the current pixel with the random color
      pixels.setPixelColor(i, color);

      // Update the RGB LED strip display
      pixels.show();

      // Turn off the current pixel
      pixels.setPixelColor(i, 0);
      delay(100);
    }
  }
  // If detects an obstacle, change the direction of the LED strip
  else {
    for (int i = NUM_PIXELS - 1; i >= 0; i--) {
      pixels.setPixelColor(i, color);
      pixels.show();
      pixels.setPixelColor(i, 0);
      delay(100);
    }
  }
}`,
        challenges: [
          "Timing précis WS2812 (800kHz)",
          "Alimentation stable pour 30 LEDs",
          "Interférences signal données",
          "Consommation courant élevée"
        ],
        solutions: [
          "Néopixel library optimisée ESP32",
          "Alimentation externe 5V 3A",
          "Condensateur de découplage",
          "Gestion PWM pour luminosité"
        ],
        imageExplanation: "Les LEDs WS2812 sont adressables individuellement, permettant des animations complexes comme cette lumière courante. Chaque LED contient son propre contrôleur et peut être programmée indépendamment."
      },
      6: {
        title: "Contrôle Moteur DC avec L293D",
        subtitle: "Pilotage bidirectionnel avec PWM",
        description: "Contrôle de moteur DC avec driver L293D pour vitesse variable et changement direction. Protection contre surcharge et contrôle précis.",
        features: [
          "Circuit intégré L293D (600mA/channel)",
          "Contrôle bidirectionnel moteur",
          "Signal PWM pour vitesse variable",
          "Protection diodes flyback",
          "Interface ESP32 simple",
          "Applications robotiques"
        ],
        technologies: ["L293D Motor Driver", "Moteur DC 6-12V", "Diode 1N4007", "Condensateur 0.1µF", "ESP32", "Alimentation externe"],
        imageCaption: "Driver L293D contrôlant un moteur DC 12V",
        videoDescription: "Démonstration du contrôle de vitesse et de direction du moteur avec le potentiomètre.",
        codeSnippet: `// ESP32 - Contrôle moteur DC bidirectionnel
// Définir les pins du moteur
const int motor1A = 25;  // Pin 1 du moteur
const int motor2A = 26;  // Pin 2 du moteur

void setup() {
  pinMode(motor1A, OUTPUT);
  pinMode(motor2A, OUTPUT);  
}

void loop() {
  // Tourner dans un sens pendant 2 secondes
  digitalWrite(motor1A, HIGH);     
  digitalWrite(motor2A, LOW);   
  delay(2000); 

  // Tourner dans l'autre sens pendant 2 secondes
  digitalWrite(motor1A, LOW);     
  digitalWrite(motor2A, HIGH);    
  delay(2000); 

  // Arrêter le moteur pendant 3 secondes
  digitalWrite(motor1A, LOW);     
  digitalWrite(motor2A, LOW);    
  delay(3000);
}`,
        challenges: [
          "Chauffage L293D à haute charge",
          "Courant d'appel moteur démarrage",
          "Interférences EMI moteur",
          "Précision contrôle vitesse"
        ],
        solutions: [
          "Radiateur thermique ou ventilateur",
          "Soft-start avec PWM progressif",
          "Filtres RC et blindage",
          "Feedback encodeur pour contrôle précis"
        ],
        imageExplanation: "Le L293D est un driver moteur H-bridge qui permet de contrôler la direction et la vitesse d'un moteur DC. Il peut fournir jusqu'à 600mA par canal et supporte les tensions jusqu'à 36V."
      }
    };
    
    return blocksData[id] || blocksData[1];
  };

  const blockData = getBlockData(blockId);
  const currentImage = blockImages[blockId];
  const currentVideo = blockVideos[blockId];

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