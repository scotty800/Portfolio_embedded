// components/blocks/ArduinoBlocks.jsx - CORRIGÉ (tous les blocs séparés)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ArduinoBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const blocksData = {
    1: {
      title: "Contrôle LED RGB avec Dégradé de Couleurs",
      subtitle: "ESP32 + Potentiomètre + LED RGB",
      description: "Système de contrôle LED RGB avec transitions fluides. Utilisation d'un potentiomètre pour ajuster la teinte en temps réel via conversion HSV vers RGB.",
      features: [
        "LED RGB contrôlée par ESP32",
        "Potentiomètre analogique pour réglage",
        "Algorithme HSV→RGB pour transitions fluides",
        "Code modulaire en C++",
        "Interface utilisateur simple",
        "Documentation technique complète"
      ],
      technologies: ["ESP32 DevKit", "LED RGB Common Anode", "Potentiomètre 10K", "Résistances 220Ω", "Breadboard", "Câbles jumper"],
      image: {
        src: "/assets/projects/arduino/led-rgb-project.jpg",
        alt: "Circuit LED RGB ESP32 avec contrôle potentiomètre",
        caption: "Circuit complet avec ESP32, LED RGB et potentiomètre"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Contrôle LED RGB avec potentiomètre
#include <Arduino.h>

const int potPin = 34; // GPIO34 pour potentiomètre
const int redPin = 25; // GPIO25 LED Rouge
const int greenPin = 26; // GPIO26 LED Verte
const int bluePin = 27; // GPIO27 LED Bleue

void setup() {
  Serial.begin(115200);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(potPin, INPUT);
}

void hsvToRgb(float h, float s, float v, int& r, int& g, int& b) {
  int i = floor(h * 6);
  float f = h * 6 - i;
  float p = v * (1 - s);
  float q = v * (1 - f * s);
  float t = v * (1 - (1 - f) * s);
  
  switch(i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
}

void loop() {
  int potValue = analogRead(potPin);
  float hue = map(potValue, 0, 4095, 0, 100) / 100.0;
  
  int r, g, b;
  hsvToRgb(hue, 1.0, 255, r, g, b);
  
  analogWrite(redPin, r);
  analogWrite(greenPin, g);
  analogWrite(bluePin, b);
  
  delay(50);
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
      ]
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
      image: {
        src: "/assets/projects/arduino/74hc595-leds.jpg",
        alt: "Circuit 8 LEDs contrôlées par 74HC595",
        caption: "Montage avec registre à décalage 74HC595 et 8 LEDs"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Contrôle 8 LEDs avec 74HC595
#include <Arduino.h>

// Pins 74HC595
const int dataPin = 16;   // DS (pin 14)
const int latchPin = 17;  // ST_CP (pin 12)
const int clockPin = 18;  // SH_CP (pin 11)

void setup() {
  pinMode(dataPin, OUTPUT);
  pinMode(latchPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
}

void shiftOut(byte data) {
  digitalWrite(latchPin, LOW);
  for (int i = 7; i >= 0; i--) {
    digitalWrite(clockPin, LOW);
    digitalWrite(dataPin, (data >> i) & 0x01);
    digitalWrite(clockPin, HIGH);
  }
  digitalWrite(latchPin, HIGH);
}

// Effets LED
const byte patterns[] = {
  0b00000001, 0b00000010, 0b00000100, 0b00001000,
  0b00010000, 0b00100000, 0b01000000, 0b10000000
};

void loop() {
  // Effet défilant
  for (int i = 0; i < 8; i++) {
    shiftOut(patterns[i]);
    delay(200);
  }
  
  // Effet arc-en-ciel
  for (int i = 0; i < 8; i++) {
    shiftOut(0xFF); // Toutes allumées
    delay(100);
    shiftOut(0x00); // Toutes éteintes
    delay(100);
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
      ]
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
      image: {
        src: "/assets/projects/arduino/pir-sensor.jpg",
        alt: "Capteur PIR HC-SR501 avec ESP32",
        caption: "Système de détection mouvement avec LED d'alerte"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Détecteur mouvement PIR
#include <Arduino.h>

const int pirPin = 4;     // GPIO4 pour capteur PIR
const int ledPin = 2;     // GPIO2 LED intégrée ESP32
const int relayPin = 23;  // GPIO23 pour relais

bool motionDetected = false;
unsigned long lastMotionTime = 0;
const unsigned long timeout = 10000; // 10 secondes

void setup() {
  Serial.begin(115200);
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(relayPin, OUTPUT);
  
  // Attente calibration capteur PIR (30-60s)
  Serial.println("Calibration capteur PIR...");
  for(int i = 0; i < 30; i++) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("Prêt!");
}

void loop() {
  int pirState = digitalRead(pirPin);
  
  if(pirState == HIGH) {
    if(!motionDetected) {
      Serial.println("Mouvement détecté!");
      motionDetected = true;
      lastMotionTime = millis();
    }
    digitalWrite(ledPin, HIGH);
    digitalWrite(relayPin, HIGH);
  } else {
    if(motionDetected && (millis() - lastMotionTime > timeout)) {
      Serial.println("Plus de mouvement");
      motionDetected = false;
    }
    digitalWrite(ledPin, LOW);
    digitalWrite(relayPin, LOW);
  }
  
  delay(100);
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
      ]
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
      image: {
        src: "/assets/projects/arduino/lcd-i2c.jpg",
        alt: "Écran LCD I2C 16x2 avec ESP32",
        caption: "Affichage de messages sur LCD avec interface I2C"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Contrôle LCD I2C 16x2
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Adresse I2C LCD (généralement 0x27 ou 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

int counter = 0;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA=GPIO21, SCL=GPIO22
  
  lcd.init();
  lcd.backlight();
  
  // Message initial
  lcd.setCursor(0, 0);
  lcd.print("Projet Arduino");
  lcd.setCursor(0, 1);
  lcd.print("ESP32 + LCD");
  delay(2000);
  lcd.clear();
}

void loop() {
  // Ligne 1: Message fixe
  lcd.setCursor(0, 0);
  lcd.print("Compteur: ");
  lcd.print(counter);
  
  // Ligne 2: Message défilant
  String message = "ESP32 LCD I2C Fonctionnel ";
  static int pos = 0;
  
  if(pos < message.length() - 16) {
    lcd.setCursor(0, 1);
    lcd.print(message.substring(pos, pos + 16));
    pos++;
  } else {
    pos = 0;
  }
  
  // Incrément compteur
  counter++;
  if(counter > 9999) counter = 0;
  
  delay(500);
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
      ]
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
      image: {
        src: "/assets/projects/arduino/ws2812-animation.jpg",
        alt: "Bande LED WS2812 avec animation",
        caption: "Animation lumière courante sur bande LED 30 LEDs"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Animation WS2812 avec ultrason
#include <Adafruit_NeoPixel.h>

#define LED_PIN 15
#define LED_COUNT 30
#define TRIG_PIN 5
#define ECHO_PIN 18

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

int currentLed = 0;
int direction = 1; // 1 = forward, -1 = backward
unsigned long lastChange = 0;
const int animationSpeed = 50; // ms

void setup() {
  Serial.begin(115200);
  strip.begin();
  strip.show(); // Initialiser toutes LEDs éteintes
  strip.setBrightness(50); // 20% luminosité
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

long getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2; // cm
}

void loop() {
  // Détection obstacle
  long distance = getDistance();
  if(distance < 20 && distance > 0) { // Obstacle < 20cm
    direction *= -1; // Changer direction
    Serial.println("Direction changée!");
  }
  
  // Effacer LED précédente
  if(currentLed >= 0 && currentLed < LED_COUNT) {
    strip.setPixelColor(currentLed, 0, 0, 0);
  }
  
  // Déplacer position
  currentLed += direction;
  if(currentLed >= LED_COUNT) currentLed = 0;
  if(currentLed < 0) currentLed = LED_COUNT - 1;
  
  // Allumer LED courante (couleur arc-en-ciel)
  int hue = (currentLed * 256 / LED_COUNT) % 256;
  uint32_t color = strip.ColorHSV(hue * 256, 255, 128);
  strip.setPixelColor(currentLed, color);
  
  strip.show();
  delay(animationSpeed);
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
      ]
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
      image: {
        src: "/assets/projects/arduino/l293d-motor.jpg",
        alt: "Contrôle moteur avec L293D",
        caption: "Driver L293D contrôlant un moteur DC 12V"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Contrôle moteur L293D
#include <Arduino.h>

// Pins L293D
const int enA = 13;  // Enable A (PWM)
const int in1 = 12;  // Input 1
const int in2 = 14;  // Input 2

// Potentiomètre vitesse
const int speedPin = 34;

void setup() {
  Serial.begin(115200);
  
  pinMode(enA, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(speedPin, INPUT);
  
  // Configuration PWM
  ledcSetup(0, 5000, 8); // Channel 0, 5kHz, 8-bit
  ledcAttachPin(enA, 0);
  
  Serial.println("Contrôle moteur L293D prêt");
}

void setMotorSpeed(int speed) {
  speed = constrain(speed, -255, 255);
  
  if(speed > 0) {
    // Sens avant
    digitalWrite(in1, HIGH);
    digitalWrite(in2, LOW);
    ledcWrite(0, speed);
  } else if(speed < 0) {
    // Sens arrière
    digitalWrite(in1, LOW);
    digitalWrite(in2, HIGH);
    ledcWrite(0, -speed);
  } else {
    // Arrêt
    digitalWrite(in1, LOW);
    digitalWrite(in2, LOW);
    ledcWrite(0, 0);
  }
}

void loop() {
  // Lire vitesse potentiomètre (-255 à 255)
  int potValue = analogRead(speedPin);
  int speed = map(potValue, 0, 4095, -255, 255);
  
  // Appliquer vitesse moteur
  setMotorSpeed(speed);
  
  // Affichage debug
  static int lastSpeed = 0;
  if(abs(speed - lastSpeed) > 10) {
    Serial.print("Vitesse moteur: ");
    Serial.println(speed);
    lastSpeed = speed;
  }
  
  delay(100);
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

          {/* SECTION IMAGE UNIQUE */}
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
                    src={blockData.image.src} 
                    alt={blockData.image.alt}
                    className="main-project-image"
                    onError={handleImageError}
                  />
                )}
                <div className="main-image-caption">
                  {blockData.image.caption}
                </div>
              </div>
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

          <div className="block-section">
            <h2 className="section-title">Démonstration</h2>
            <div className="media-container">
              <div className="screenshot-preview">
                <div className="screenshot-placeholder">
                  {imageError ? (
                    <div className="placeholder-content">
                      <span className="placeholder-icon-large">🎥</span>
                      <p>Aperçu du projet</p>
                    </div>
                  ) : (
                    <img 
                      src={blockData.image.src} 
                      alt="Prévisualisation du projet"
                      className="preview-image"
                      onError={handleImageError}
                    />
                  )}
                </div>
                <p className="screenshot-caption">{blockData.image.caption}</p>
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