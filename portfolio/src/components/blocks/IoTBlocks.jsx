// components/blocks/IoTBlocks.jsx - VIDÉOS DANS PUBLIC
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import des images depuis le dossier assets
import cheerlightsImg from '../../assets/cheerlights-mqtt.png';
import esp32camImg from '../../assets/esp32-web-server.png';
import mqttArchitectureImg from '../../assets/mqtt-architecture.png';
import envMonitoringImg from '../../assets/environment-monitoring.png';
import adafruitIoImg from '../../assets/adafruit-io-dashboard.png';
import bleControlImg from '../../assets/ble-led-control.png';

// VIDÉOS DÉPLACÉES DANS PUBLIC
const videos = {
  1: '/videos/cheerlights-mqtt.mp4',
  2: '/videos/esp32-web-server.mp4',
  3: '/videos/mqtt-advanced.mp4',
  4: '/videos/environment-monitoring.mp4',
  5: '/videos/adafruit-io.mp4',
  6: '/videos/ble-control.mp4'
};

const IoTBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
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
    1: cheerlightsImg,
    2: esp32camImg,
    3: mqttArchitectureImg,
    4: envMonitoringImg,
    5: adafruitIoImg,
    6: bleControlImg
  };

  const getBlockData = (id) => {
    const blocksData = {
      1: {
        title: "Réseau CheerLights Mondial MQTT",
        subtitle: "ESP32 + WS2812 + Synchronisation mondiale",
        description: "Système IoT connecté au réseau CheerLights via MQTT. Synchronisation des couleurs LED en temps réel avec des milliers d'utilisateurs à travers le monde. Ce projet démontre l'intégration IoT avec des services cloud globaux.",
        features: [
          "Abonnement MQTT au sujet 'cheerlights'",
          "Bande LED WS2812 programmable (8 LEDs)",
          "Synchronisation mondiale en temps réel",
          "Changement couleur à distance via Twitter",
          "Support de 12 couleurs prédéfinies",
          "Communauté internationale connectée"
        ],
        technologies: ["ESP32 DevKit", "WS2812 LED Strip", "WiFi Module", "Broker MQTT Cloud", "Adafruit NeoPixel", "PubSubClient Library"],
        imageCaption: "Installation CheerLights avec ESP32 et bande LED NeoPixel",
        videoDescription: "Démonstration de la synchronisation mondiale des couleurs via le réseau CheerLights MQTT.",
        codeSnippet: `// ESP32 - Client MQTT CheerLights
#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>

const char* ssid = "SSID";
const char* password = "PASSWORD";

const char* mqtt_server = "mqtt.cheerlights.com";
const char* unique_identifier = "sunfounder-client-sdgvsasdda";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
int value = 0;

String colorName[] = {"red", "pink", "green", "blue", "cyan", "white", 
                     "warmwhite", "oldlace", "purple", "magenta", "yellow", "orange"};

int colorRGB[][3] = { 255,   0,   0,  // "red"
                      255, 192, 203,  // "pink"
                        0, 255,   0,  // "green"
                        0,   0, 255,  // "blue"
                        0, 255, 255,  // "cyan"
                      255, 255, 255,  // "white"
                      255, 223, 223,  // "warmwhite"
                      255, 223, 223,  // "oldlace"
                      128,   0, 128,  // "purple"
                      255,   0, 255,  // "magenta"
                      255, 255,   0,  // "yellow"
                      255, 165,   0}; // "orange"

#define LED_PIN 13
#define NUM_LEDS 8

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(115200);
  setup_wifi();
  
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  pixels.begin();
  pixels.show(); 
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;

  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  if (String(topic) == "cheerlights") {
    Serial.print("Changing color to ");
    Serial.println(messageTemp);
    setColor(messageTemp);
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(unique_identifier)) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("cheerlights");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setColor(String color) {
  for (int colorIndex = 0; colorIndex < 12; colorIndex++) {
    if (color == colorName[colorIndex]) {
      for (int pixel = 0; pixel < NUM_LEDS; pixel++) {
        pixels.setPixelColor(pixel, pixels.Color(colorRGB[colorIndex][0], 
                                                 colorRGB[colorIndex][1], 
                                                 colorRGB[colorIndex][2]));
      }
      pixels.show();
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}`,
        challenges: [
          "Stabilité connexion MQTT longue durée",
          "Synchronisation précise mondiale",
          "Gestion reconnexion WiFi/MQTT",
          "Mappage des couleurs depuis noms vers RGB"
        ],
        solutions: [
          "Keep-alive MQTT et watchdog timer",
          "NTP pour synchronisation horaire",
          "Reconnexion automatique robuste",
          "Table de lookup pour conversion couleurs"
        ],
        imageExplanation: "Ce système IoT utilise le protocole MQTT pour se connecter au réseau mondial CheerLights. L'ESP32 s'abonne au topic 'cheerlights' et met à jour les LEDs NeoPixel en fonction des couleurs publiées par la communauté mondiale via Twitter et autres plateformes."
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
                <li><strong>Protocole de communication :</strong> {blockId === 6 ? 'Bluetooth BLE 4.2/5.0' : blockId <= 3 || blockId === 5 ? 'MQTT sur TCP/IP' : blockId === 4 ? 'Blynk HTTP/WebSocket' : 'WiFi'}</li>
                <li><strong>Sécurité :</strong> {blockId === 5 ? 'SSL/TLS avec certificat CA' : blockId === 6 ? 'BLE avec UUIDs uniques' : 'Authentification basique'}</li>
                <li><strong>Programmation :</strong> Arduino IDE avec bibliothèques spécifiques IoT</li>
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
                <span className="code-filename">IoT_Bloc{blockId}.ino</span>
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

export default IoTBlocks;