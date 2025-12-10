// components/blocks/IoTBlocks.jsx - VERSION COMPLÈTE REFACTORISÉE FINALISÉE
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import des images depuis le dossier assets (à créer)
import cheerlightsImg from '../../assets/cheerlights-mqtt.png';
import esp32camImg from '../../assets/esp32-web-server.png';
import mqttArchitectureImg from '../../assets/mqtt-architecture.png';
import envMonitoringImg from '../../assets/environment-monitoring.png';
import adafruitIoImg from '../../assets/adafruit-io-dashboard.png';
import bleControlImg from '../../assets/ble-led-control.png';

// Import des vidéos depuis le dossier assets/videos (à créer)
import cheerlightsVideo from '../../assets/videos/cheerlights-mqtt.mp4';
import esp32camVideo from '../../assets/videos/esp32-web-server.mp4';
import mqttVideo from '../../assets/videos/mqtt-advanced.mp4';
import envMonitoringVideo from '../../assets/videos/environment-monitoring.mp4';
import adafruitIoVideo from '../../assets/videos/adafruit-io.mp4';
import bleControlVideo from '../../assets/videos/ble-control.mp4';

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

  // Tableau des vidéos par bloc
  const blockVideos = {
    1: cheerlightsVideo,
    2: esp32camVideo,
    3: mqttVideo,
    4: envMonitoringVideo,
    5: adafruitIoVideo,
    6: bleControlVideo
  };

  const getBlockData = (id) => {
    const blocksData = {
      1: {
        title: "Réseau CheerLights Mondial MQTT",
        subtitle: "ESP32 + WS2812 + Synchronisation mondiale",
        description: "Système IoT connecté au réseau CheerLights via MQTT. Synchronisation des couleurs LED en temps réel avec des milliers d'utilisateurs à travers le monde. Ce projet démontre l'intégration IoT avec des services cloud globaux.",
        features: [
          "Abonnement MQTT au sujet 'cheerlights'",
          "Bande LED WS2812 programmable (30 LEDs)",
          "Synchronisation mondiale en temps réel",
          "Changement couleur à distance via Twitter",
          "Interface web de contrôle personnalisée",
          "Communauté internationale connectée"
        ],
        technologies: ["ESP32 DevKit", "WS2812 LED Strip", "WiFi Module", "Alimentation 5V 3A", "Broker MQTT Cloud", "Router WiFi"],
        imageCaption: "Installation CheerLights avec ESP32 et bande LED WS2812",
        videoDescription: "Démonstration de la synchronisation mondiale des couleurs via le réseau CheerLights MQTT.",
        codeSnippet: `// ESP32 - Client MQTT CheerLights
#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>

// WiFi credentials
const char* ssid = "YourSSID";
const char* password = "YourPassword";

// MQTT broker
const char* mqtt_server = "mqtt.cheerlights.com";
const int mqtt_port = 1883;
const char* topic = "cheerlights";

// LED Strip
#define LED_PIN 15
#define LED_COUNT 30
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

uint32_t getColorFromName(String colorName) {
  if(colorName == "red") return strip.Color(255, 0, 0);
  if(colorName == "green") return strip.Color(0, 255, 0);
  if(colorName == "blue") return strip.Color(0, 0, 255);
  if(colorName == "white") return strip.Color(255, 255, 255);
  if(colorName == "warmwhite") return strip.Color(255, 200, 150);
  if(colorName == "purple") return strip.Color(128, 0, 128);
  if(colorName == "magenta") return strip.Color(255, 0, 255);
  if(colorName == "yellow") return strip.Color(255, 255, 0);
  if(colorName == "orange") return strip.Color(255, 165, 0);
  if(colorName == "pink") return strip.Color(255, 192, 203);
  if(colorName == "cyan") return strip.Color(0, 255, 255);
  return strip.Color(255, 255, 255); // Default white
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received on topic: ");
  Serial.println(topic);
  
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  
  Serial.print("Color: ");
  Serial.println(message);
  
  // Convert color name to RGB
  uint32_t color = getColorFromName(message);
  for(int i = 0; i < LED_COUNT; i++) {
    strip.setPixelColor(i, color);
  }
  strip.show();
}

void setup() {
  Serial.begin(115200);
  strip.begin();
  strip.show();
  strip.setBrightness(50);
  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
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
          "Consommation énergétique 24/7"
        ],
        solutions: [
          "Keep-alive MQTT et watchdog timer",
          "NTP pour synchronisation horaire précise",
          "Reconnexion automatique robuste avec backoff",
          "Mode veille profonde et réveil WiFi programmé"
        ],
        imageExplanation: "Ce système IoT utilise le protocole MQTT pour se connecter au réseau mondial CheerLights. L'ESP32 s'abonne au topic 'cheerlights' et met à jour les LEDs WS2812 en fonction des couleurs publiées par la communauté mondiale via Twitter et autres plateformes."
      },
      2: {
        title: "Serveur Web Streaming Vidéo ESP32",
        subtitle: "ESP32-CAM + Streaming HTTP + Contrôle LEDs",
        description: "Serveur web embarqué sur ESP32 avec streaming vidéo en direct et contrôle interactif de LEDs via interface web personnalisée. Solution complète de surveillance à distance avec contrôle en temps réel.",
        features: [
          "Streaming vidéo 640x480 à 15fps en direct",
          "Page web responsive avec contrôles interactifs",
          "Boutons ON/OFF pour LEDs avec états visuels",
          "Slider contrôle luminosité en temps réel",
          "Interface utilisateur intuitive mobile/desktop",
          "Point d'accès WiFi intégré ou connexion réseau"
        ],
        technologies: ["ESP32-CAM", "LEDs GPIO", "Module OV2640", "Carte SD", "Antenne WiFi", "Alimentation 5V"],
        imageCaption: "ESP32-CAM streaming vidéo avec contrôle web",
        videoDescription: "Démonstration du streaming vidéo en direct et du contrôle des LEDs via l'interface web responsive.",
        codeSnippet: `// ESP32-CAM - Serveur Web avec Streaming
#include "esp_camera.h"
#include <WiFi.h>
#include <WebServer.h>

// Configuration camera ESP32-CAM
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// LED Control
const int ledPin = 4;
int ledBrightness = 128;
bool ledState = false;

WebServer server(80);

// Configuration WiFi - Mode Access Point
const char* ssid = "ESP32-CAM-Server";
const char* password = "12345678";

void setupCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_VGA;
  config.jpeg_quality = 12;
  config.fb_count = 2;
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
}

void handleRoot() {
  String html = "<!DOCTYPE html><html>";
  html += "<head><meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<title>ESP32-CAM Control Panel</title>";
  html += "<style>";
  html += "body { font-family: 'Segoe UI', Arial, sans-serif; text-align: center; margin: 0; padding: 20px; background: #f0f0f0; }";
  html += ".container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }";
  html += "h1 { color: #2c3e50; margin-bottom: 30px; }";
  html += "#videoStream { width: 100%; max-width: 640px; border-radius: 10px; border: 3px solid #3498db; margin: 20px auto; display: block; }";
  html += ".controls { margin: 30px 0; }";
  html += ".btn { background: #3498db; color: white; border: none; padding: 15px 30px; font-size: 18px; border-radius: 8px; cursor: pointer; margin: 10px; transition: all 0.3s; }";
  html += ".btn:hover { background: #2980b9; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }";
  html += ".btn.off { background: #e74c3c; }";
  html += ".btn.on { background: #2ecc71; }";
  html += ".slider-container { margin: 25px 0; }";
  html += ".slider { width: 80%; height: 25px; background: #ddd; outline: none; opacity: 0.7; transition: opacity .2s; }";
  html += ".slider:hover { opacity: 1; }";
  html += ".status { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 16px; }";
  html += "</style></head>";
  html += "<body>";
  html += "<div class='container'>";
  html += "<h1>ESP32-CAM Control Panel</h1>";
  html += "<img id='videoStream' src='/stream' alt='Live Stream'>";
  html += "<div class='controls'>";
  html += "<button class='btn " + String(ledState ? "on" : "off") + "' onclick='toggleLED()'>LED " + String(ledState ? "ON" : "OFF") + "</button>";
  html += "</div>";
  html += "<div class='slider-container'>";
  html += "<p>Brightness Control: <span id='brightnessValue'>" + String(ledBrightness) + "</span></p>";
  html += "<input type='range' min='0' max='255' value='" + String(ledBrightness) + "' class='slider' id='brightnessSlider'>";
  html += "</div>";
  html += "<div class='status' id='status'>Ready</div>";
  html += "</div>";
  html += "<script>";
  html += "const videoStream = document.getElementById('videoStream');";
  html += "const statusDiv = document.getElementById('status');";
  html += "const brightnessSlider = document.getElementById('brightnessSlider');";
  html += "const brightnessValue = document.getElementById('brightnessValue');";
  html += "";
  html += "// Auto-refresh stream every 100ms";
  html += "setInterval(() => {";
  html += "  const d = new Date();";
  html += "  videoStream.src = '/stream?t=' + d.getTime();";
  html += "}, 100);";
  html += "";
  html += "function toggleLED() {";
  html += "  fetch('/led/toggle')";
  html += "    .then(response => response.text())";
  html += "    .then(data => {";
  html += "      statusDiv.textContent = 'LED toggled successfully';";
  html += "      setTimeout(() => location.reload(), 500);";
  html += "    })";
  html += "    .catch(error => statusDiv.textContent = 'Error: ' + error);";
  html += "}";
  html += "";
  html += "brightnessSlider.oninput = function() {";
  html += "  brightnessValue.textContent = this.value;";
  html += "  fetch('/led/brightness?value=' + this.value)";
  html += "    .then(response => response.text())";
  html += "    .then(data => statusDiv.textContent = 'Brightness set to: ' + this.value)";
  html += "    .catch(error => statusDiv.textContent = 'Error: ' + error);";
  html += "};";
  html += "</script>";
  html += "</body></html>";
  
  server.send(200, "text/html", html);
}

void handleStream() {
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    server.send(500, "text/plain", "Camera capture failed");
    return;
  }
  
  server.sendHeader("Content-Type", "image/jpeg");
  server.sendHeader("Content-Length", String(fb->len));
  server.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  server.sendHeader("Pragma", "no-cache");
  server.sendHeader("Expires", "0");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  
  server.send(200, "image/jpeg", (const char*)fb->buf, fb->len);
  esp_camera_fb_return(fb);
}

void handleLEDToggle() {
  ledState = !ledState;
  digitalWrite(ledPin, ledState ? HIGH : LOW);
  server.send(200, "text/plain", ledState ? "ON" : "OFF");
}

void handleLEDBrightness() {
  if (server.hasArg("value")) {
    ledBrightness = server.arg("value").toInt();
    ledBrightness = constrain(ledBrightness, 0, 255);
    analogWrite(ledPin, ledBrightness);
    server.send(200, "text/plain", "Brightness: " + String(ledBrightness));
  } else {
    server.send(400, "text/plain", "Missing value parameter");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  pinMode(ledPin, OUTPUT);
  analogWrite(ledPin, ledBrightness);
  
  // Setup WiFi Access Point
  WiFi.softAP(ssid, password);
  IPAddress IP = WiFi.softAPIP();
  Serial.println("\n=== ESP32-CAM Server ===");
  Serial.print("AP SSID: ");
  Serial.println(ssid);
  Serial.print("AP Password: ");
  Serial.println(password);
  Serial.print("AP IP address: ");
  Serial.println(IP);
  Serial.println("Connect to this WiFi network and go to:");
  Serial.print("http://");
  Serial.println(IP);
  Serial.println("========================\n");
  
  // Initialize camera
  setupCamera();
  
  // Configure server routes
  server.on("/", handleRoot);
  server.on("/stream", handleStream);
  server.on("/led/toggle", handleLEDToggle);
  server.on("/led/brightness", handleLEDBrightness);
  
  // Start server
  server.begin();
  Serial.println("HTTP server started successfully!");
}

void loop() {
  server.handleClient();
}`,
        challenges: [
          "Performance streaming vidéo stable à 15fps",
          "Gestion des connexions simultanées multiples",
          "Chauffage ESP32-CAM en fonctionnement longue durée",
          "Interface web responsive sur tous les appareils"
        ],
        solutions: [
          "Buffer JPEG optimisé et compression adaptative qualité",
          "Gestion des connexions avec timeout et limite max",
          "Ventilation active et throttling température dynamique",
          "CSS responsive design et progressive enhancement"
        ],
        imageExplanation: "L'ESP32-CAM intègre un module caméra OV2640 de 2MP et sert une interface web complète via son propre point d'accès WiFi. Les utilisateurs peuvent visualiser le streaming vidéo en direct (rafraîchi automatiquement) et contrôler les LEDs connectées via des boutons interactifs et un slider de luminosité."
      },
      3: {
        title: "Communication IoT MQTT Avancée",
        subtitle: "ESP32 + Broker Mosquitto + Multi-capteurs",
        description: "Architecture IoT complète avec protocole MQTT pour échange de données entre capteurs, contrôleurs et dashboards en temps réel. Solution scalable pour applications domotiques avec support QoS et sécurité TLS.",
        features: [
          "Publication/abonnement MQTT sur topics hiérarchiques",
          "Données multi-capteurs (température, humidité, lumière, mouvement)",
          "Contrôle LEDs à distance avec rétroaction d'état",
          "QoS niveau 1 et 2 supportés pour fiabilité garantie",
          "Sécurité TLS optionnelle pour données sensibles",
          "Architecture scalable cloud/edge computing avec Node-RED"
        ],
        technologies: ["ESP32 DevKit", "DHT22 Capteur", "Photorésistance", "Broker Mosquitto", "Node-RED", "Database InfluxDB", "Grafana Dashboard"],
        imageCaption: "Architecture MQTT IoT avec multi-capteurs ESP32 et dashboard",
        videoDescription: "Démonstration complète de la communication MQTT entre plusieurs capteurs ESP32 et le dashboard Node-RED de contrôle en temps réel.",
        codeSnippet: `// ESP32 - Client MQTT Multi-sensors avec WiFi Manager
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <WiFiManager.h>

#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#define LDRPIN 34
#define LED_PIN 2
#define PIR_PIN 35

// MQTT Configuration
const char* mqtt_server = "192.168.1.100"; // Adresse broker Mosquitto
const int mqtt_port = 1883;
const char* mqtt_user = "esp32";
const char* mqtt_password = "secure_password";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastSensorRead = 0;
unsigned long lastReconnectAttempt = 0;
const unsigned long SENSOR_INTERVAL = 5000; // 5 secondes
const unsigned long RECONNECT_INTERVAL = 5000; // 5 secondes

// Buffer pour messages MQTT
char msgBuffer[100];
bool pirState = false;
bool lastPirState = false;

// Topics MQTT
const char* topicTemp = "home/livingroom/sensor/temperature";
const char* topicHum = "home/livingroom/sensor/humidity";
const char* topicLight = "home/livingroom/sensor/light";
const char* topicMotion = "home/livingroom/sensor/motion";
const char* topicLED = "home/livingroom/actuator/led";
const char* topicStatus = "home/livingroom/device/status";

void setup_wifi() {
  WiFiManager wm;
  
  // Configuration WiFi Manager
  bool res = wm.autoConnect("ESP32-MQTT-Config", "config123");
  
  if(!res) {
    Serial.println("Failed to connect or setup WiFi");
    ESP.restart();
  } else {
    Serial.println("WiFi connected successfully!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("]: ");
  
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);
  
  // Traitement des messages reçus
  if (String(topic) == topicLED) {
    int ledValue = message.toInt();
    digitalWrite(LED_PIN, ledValue > 0 ? HIGH : LOW);
    
    // Publier confirmation
    snprintf(msgBuffer, sizeof(msgBuffer), "{\"led\": %d, \"timestamp\": %lu}", 
             ledValue, millis());
    client.publish("home/livingroom/actuator/led/status", msgBuffer);
  }
}

void reconnect() {
  unsigned long now = millis();
  
  // Limiter les tentatives de reconnexion
  if (now - lastReconnectAttempt < RECONNECT_INTERVAL) {
    return;
  }
  
  lastReconnectAttempt = now;
  
  Serial.print("Attempting MQTT connection...");
  
  // Générer un client ID unique
  String clientId = "ESP32Client-";
  clientId += String(random(0xffff), HEX);
  
  // Tentative de connexion
  if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
    Serial.println("connected");
    
    // S'abonner aux topics
    client.subscribe(topicLED);
    client.subscribe("home/livingroom/actuator/#");
    
    // Publier message de connexion
    snprintf(msgBuffer, sizeof(msgBuffer), 
             "{\"device\": \"ESP32-MQTT\", \"status\": \"connected\", \"ip\": \"%s\"}", 
             WiFi.localIP().toString().c_str());
    client.publish(topicStatus, msgBuffer);
    
  } else {
    Serial.print("failed, rc=");
    Serial.print(client.state());
    Serial.println(" try again in 5 seconds");
  }
}

void setup() {
  Serial.begin(115200);
  
  // Initialisation GPIO
  pinMode(LED_PIN, OUTPUT);
  pinMode(PIR_PIN, INPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Initialisation capteurs
  dht.begin();
  
  // Connexion WiFi
  setup_wifi();
  
  // Configuration MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  client.setBufferSize(1024); // Buffer augmenté pour messages JSON
  
  // Délai initial pour stabilité
  delay(2000);
  
  Serial.println("\n=== ESP32 MQTT Multi-Sensor Client ===");
  Serial.println("System initialized and ready");
}

void readAndPublishSensors() {
  unsigned long now = millis();
  
  if (now - lastSensorRead >= SENSOR_INTERVAL) {
    lastSensorRead = now;
    
    // Lecture capteurs
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    int lightLevel = analogRead(LDRPIN);
    pirState = digitalRead(PIR_PIN);
    
    // Préparation message JSON
    snprintf(msgBuffer, sizeof(msgBuffer),
             "{\"temp\": %.2f, \"hum\": %.2f, \"light\": %d, \"motion\": %d, \"timestamp\": %lu}",
             temperature, humidity, lightLevel, pirState ? 1 : 0, now);
    
    // Publication des données
    if (!isnan(temperature)) {
      client.publish(topicTemp, String(temperature).c_str(), true);
    }
    
    if (!isnan(humidity)) {
      client.publish(topicHum, String(humidity).c_str(), true);
    }
    
    client.publish(topicLight, String(lightLevel).c_str());
    client.publish("home/livingroom/sensor/all", msgBuffer);
    
    // Détection changement état PIR
    if (pirState != lastPirState) {
      lastPirState = pirState;
      client.publish(topicMotion, pirState ? "1" : "0", true);
      
      if (pirState) {
        Serial.println("Motion detected!");
      }
    }
    
    // Debug serial
    Serial.printf("Sensors: Temp=%.2fC, Hum=%.2f%%, Light=%d, Motion=%d\n",
                  temperature, humidity, lightLevel, pirState);
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  
  client.loop();
  readAndPublishSensors();
  
  // Petit délai pour éviter surcharge CPU
  delay(10);
}`,
        challenges: [
          "Latence réseau variable en environnement domestique complexe",
          "Perte de paquets MQTT sur connexions WiFi instables",
          "Synchronisation multi-capteurs avec timestamp précis et cohérent",
          "Sécurité des données IoT sur réseau local avec authentification"
        ],
        solutions: [
          "QoS MQTT niveau 1 ou 2 avec retransmission et keep-alive optimisé",
          "Buffer local circulaire et reconnexion automatique avec backoff exponentiel",
          "Timestamp horodatage messages avec synchronisation NTP et RTC hardware",
          "Chiffrement TLS MQTT et authentification client avec certificats X.509"
        ],
        imageExplanation: "Cette architecture utilise un broker MQTT local (Mosquitto) comme hub central de communication. Les ESP32 publient les données des capteurs (DHT22, photorésistance, PIR) sur des topics hiérarchiques spécifiques, tandis que Node-RED s'abonne à ces topics pour créer des automatisations et dashboards temps réel. Les données peuvent être stockées dans InfluxDB et visualisées avec Grafana."
      },
      4: {
        title: "Station Surveillance Environnementale",
        subtitle: "ESP32 + DHT11 + HC-SR04 + Cloud IoT",
        description: "Station de monitoring environnemental complète avec capteurs température/humidité, distance ultrasonique et transmission données vers plateformes cloud. Solution idéale pour applications agricoles, industrielles ou domotiques avec alertes automatisées.",
        features: [
          "Capteur DHT11 précision température/humidité avec calibration",
          "Capteur HC-SR04 distance ultrasonique avec filtre logiciel",
          "Connexion WiFi/GPRS optionnelle via module SIM800L pour zones rurales",
          "Dashboard cloud temps réel ThingSpeak avec graphiques interactifs",
          "Alertes SMS/Email configurables par seuils via IFTTT webhooks",
          "Stockage données historique 30+ jours avec export CSV/JSON"
        ],
        technologies: ["ESP32 DevKit", "DHT11 Sensor", "HC-SR04 Ultrasonic", "SIM800L GSM Module", "ThingSpeak API", "Blynk IoT", "IFTTT Webhooks"],
        imageCaption: "Station IoT de surveillance environnementale ESP32 avec transmission cloud",
        videoDescription: "Démonstration complète du monitoring environnemental en temps réel avec alertes SMS et dashboard cloud interactif.",
        codeSnippet: `// ESP32 - Station Surveillance Environnement Avancée
#include <WiFi.h>
#include <DHT.h>
#include <ThingSpeak.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <ArduinoJson.h>

// Définition des capteurs
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define TRIG_PIN 5
#define ECHO_PIN 18

// Configuration WiFi
const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";

// Configuration ThingSpeak
unsigned long myChannelNumber = 1234567; // Remplacez par votre numéro de channel
const char* myWriteAPIKey = "YOUR_WRITE_API_KEY";
const char* myReadAPIKey = "YOUR_READ_API_KEY";

// Seuils d'alerte
const float TEMP_HIGH_ALERT = 30.0; // °C
const float TEMP_LOW_ALERT = 5.0;   // °C
const float HUM_HIGH_ALERT = 80.0;  // %
const float HUM_LOW_ALERT = 20.0;   // %
const float DIST_CLOSE_ALERT = 10.0; // cm

WiFiClient client;

// Variables pour filtrage des mesures
float tempHistory[5] = {0};
float humHistory[5] = {0};
float distHistory[5] = {0};
int historyIndex = 0;

// Variables d'état
bool alertActive = false;
unsigned long lastAlertTime = 0;
const unsigned long ALERT_COOLDOWN = 300000; // 5 minutes entre alertes

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n=== ESP32 Environmental Monitoring Station ===");
  
  // Initialisation GPIO
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  digitalWrite(TRIG_PIN, LOW);
  
  // Initialisation capteurs
  dht.begin();
  
  // Connexion WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected successfully!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi connection failed! Continuing in offline mode...");
  }
  
  // Initialisation ThingSpeak
  ThingSpeak.begin(client);
  
  // Initialisation historique
  for (int i = 0; i < 5; i++) {
    tempHistory[i] = readFilteredTemperature();
    humHistory[i] = readFilteredHumidity();
    distHistory[i] = readFilteredDistance();
    delay(100);
  }
  
  Serial.println("System initialized and ready");
  Serial.println("===============================\n");
}

float readFilteredTemperature() {
  float temp = dht.readTemperature();
  
  if (isnan(temp)) {
    Serial.println("Failed to read temperature from DHT sensor!");
    return tempHistory[historyIndex]; // Retourne dernière valeur valide
  }
  
  // Filtre moyenne mobile
  tempHistory[historyIndex] = temp;
  float sum = 0;
  int validCount = 0;
  
  for (int i = 0; i < 5; i++) {
    if (!isnan(tempHistory[i])) {
      sum += tempHistory[i];
      validCount++;
    }
  }
  
  return validCount > 0 ? sum / validCount : temp;
}

float readFilteredHumidity() {
  float hum = dht.readHumidity();
  
  if (isnan(hum)) {
    Serial.println("Failed to read humidity from DHT sensor!");
    return humHistory[historyIndex];
  }
  
  humHistory[historyIndex] = hum;
  float sum = 0;
  int validCount = 0;
  
  for (int i = 0; i < 5; i++) {
    if (!isnan(humHistory[i])) {
      sum += humHistory[i];
      validCount++;
    }
  }
  
  return validCount > 0 ? sum / validCount : hum;
}

float readFilteredDistance() {
  // Mesure distance ultrasonique
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // Timeout 30ms
  
  if (duration == 0) {
    Serial.println("Ultrasonic sensor timeout!");
    return distHistory[historyIndex];
  }
  
  float distance = duration * 0.034 / 2; // Convertir en cm
  
  // Filtre des valeurs aberrantes
  if (distance > 400 || distance < 2) {
    Serial.println("Ultrasonic reading out of range!");
    return distHistory[historyIndex];
  }
  
  distHistory[historyIndex] = distance;
  
  // Tri et médiane sur les 3 dernières valeurs
  float sorted[3];
  int startIdx = (historyIndex - 2 + 5) % 5;
  
  for (int i = 0; i < 3; i++) {
    sorted[i] = distHistory[(startIdx + i) % 5];
  }
  
  // Tri à bulles simple
  for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2 - i; j++) {
      if (sorted[j] > sorted[j + 1]) {
        float temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
      }
    }
  }
  
  return sorted[1]; // Médiane
}

void checkAlerts(float temperature, float humidity, float distance) {
  unsigned long now = millis();
  
  // Vérifier si cooldown actif
  if (alertActive && (now - lastAlertTime < ALERT_COOLDOWN)) {
    return;
  }
  
  bool newAlert = false;
  String alertMessage = "";
  
  if (temperature > TEMP_HIGH_ALERT) {
    alertMessage += "High temperature: " + String(temperature, 1) + "°C. ";
    newAlert = true;
  } else if (temperature < TEMP_LOW_ALERT) {
    alertMessage += "Low temperature: " + String(temperature, 1) + "°C. ";
    newAlert = true;
  }
  
  if (humidity > HUM_HIGH_ALERT) {
    alertMessage += "High humidity: " + String(humidity, 1) + "%. ";
    newAlert = true;
  } else if (humidity < HUM_LOW_ALERT) {
    alertMessage += "Low humidity: " + String(humidity, 1) + "%. ";
    newAlert = true;
  }
  
  if (distance < DIST_CLOSE_ALERT) {
    alertMessage += "Object too close: " + String(distance, 1) + "cm. ";
    newAlert = true;
  }
  
  if (newAlert) {
    alertActive = true;
    lastAlertTime = now;
    
    Serial.println("ALERT: " + alertMessage);
    
    // Ici vous pouvez ajouter:
    // - Envoi SMS via SIM800L
    // - Notification IFTTT
    // - Email via SMTP
    // - Notification push
  } else if (alertActive && (now - lastAlertTime >= ALERT_COOLDOWN)) {
    alertActive = false;
    Serial.println("Alert condition cleared.");
  }
}

void sendToThingSpeak(float temperature, float humidity, float distance) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected, skipping ThingSpeak update");
    return;
  }
  
  ThingSpeak.setField(1, temperature);
  ThingSpeak.setField(2, humidity);
  ThingSpeak.setField(3, distance);
  ThingSpeak.setField(4, alertActive ? 1 : 0);
  
  int httpCode = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  
  if (httpCode == 200) {
    Serial.println("Data sent successfully to ThingSpeak");
  } else {
    Serial.print("Failed to send data to ThingSpeak. HTTP code: ");
    Serial.println(httpCode);
  }
}

void loop() {
  // Mise à jour index historique
  historyIndex = (historyIndex + 1) % 5;
  
  // Lecture des capteurs avec filtrage
  float temperature = readFilteredTemperature();
  float humidity = readFilteredHumidity();
  float distance = readFilteredDistance();
  
  // Affichage des valeurs
  Serial.println("\n=== Environmental Readings ===");
  Serial.printf("Temperature: %.1f °C\n", temperature);
  Serial.printf("Humidity: %.1f %%\n", humidity);
  Serial.printf("Distance: %.1f cm\n", distance);
  Serial.printf("Alert Status: %s\n", alertActive ? "ACTIVE" : "INACTIVE");
  Serial.println("============================\n");
  
  // Vérification des alertes
  checkAlerts(temperature, humidity, distance);
  
  // Envoi à ThingSpeak
  sendToThingSpeak(temperature, humidity, distance);
  
  // Attente entre les mesures (30 secondes)
  delay(30000);
}`,
        challenges: [
          "Précision des capteurs environnementaux bas coût (DHT11 ±2°C)",
          "Stabilité connexion longue durée en extérieur avec conditions variables",
          "Consommation énergie batterie pour applications autonomes solaires",
          "Calibration multi-capteurs et compensation température/humidité"
        ],
        solutions: [
          "Filtrage Kalman des données capteurs et calibration en usine",
          "Mode deep sleep entre mesures et wake-up timer RTC ultra-basse consommation",
          "Alimentation solaire + batterie LiPo 18650 avec gestion charge MPPT",
          "Procédure calibration automatique via interface web et stockage EEPROM"
        ],
        imageExplanation: "Cette station IoT environnementale combine des capteurs DHT11 (température/humidité) et HC-SR04 (distance) avec un ESP32. Les données filtrées et stabilisées sont transmises à la plateforme cloud ThingSpeak pour visualisation en temps réel. Le système inclut un module GSM SIM800L optionnel pour les zones sans WiFi, et des alertes SMS/Email via IFTTT lorsque les seuils sont dépassés."
      },
      5: {
        title: "Dashboard Adafruit IO Monitoring",
        subtitle: "ESP32 + Adafruit IO + Visualisation Cloud",
        description: "Intégration complète avec plateforme Adafruit IO pour monitoring température/humidité en temps réel et contrôle à distance via dashboard web. Solution professionnelle pour projets IoT avec historique, graphiques et notifications.",
        features: [
          "Feeds Adafruit IO pour température/humidité temps réel avec rétention",
          "Dashboard web avec graphiques historiques interactifs et export",
          "Contrôle LED à distance avec rétroaction d'état et scheduling",
          "Notifications push Adafruit IO pour alertes configurables",
          "Historique données 30 jours avec export CSV/JSON automatique",
          "API REST complète pour intégration tierce et webhooks"
        ],
        technologies: ["ESP32 DevKit", "Adafruit IO Platform", "Adafruit MQTT Library", "DHT22 Sensor", "LEDs GPIO", "WiFi Manager", "ArduinoJson"],
        imageCaption: "Dashboard Adafruit IO avec visualisation temps réel et historique",
        videoDescription: "Démonstration complète du dashboard Adafruit IO avec contrôle à distance des LEDs et visualisation des données historiques.",
        codeSnippet: `// ESP32 - Adafruit IO Integration Avancée
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <DHT.h>
#include <WiFi.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>

// Configuration capteur DHT22
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Configuration LED
#define LED_PIN 2

// Configuration Adafruit IO
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "your_adafruit_username"  // Remplacez par votre username
#define AIO_KEY         "your_adafruit_key"       // Remplacez par votre AIO Key

// Création des feeds
#define TEMPERATURE_FEED AIO_USERNAME "/feeds/temperature"
#define HUMIDITY_FEED    AIO_USERNAME "/feeds/humidity"
#define LED_FEED         AIO_USERNAME "/feeds/led-control"
#define STATUS_FEED      AIO_USERNAME "/feeds/device-status"

// Variables globales
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Déclaration des feeds
Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, TEMPERATURE_FEED);
Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, HUMIDITY_FEED);
Adafruit_MQTT_Publish statusFeed = Adafruit_MQTT_Publish(&mqtt, STATUS_FEED);
Adafruit_MQTT_Subscribe ledFeed = Adafruit_MQTT_Subscribe(&mqtt, LED_FEED);

// Variables d'état
unsigned long lastPublishTime = 0;
const unsigned long PUBLISH_INTERVAL = 15000; // 15 secondes
bool ledState = false;
float lastTemperature = 0;
float lastHumidity = 0;

// Structure pour stockage configuration
struct DeviceConfig {
  char deviceName[32];
  float tempOffset;
  float humOffset;
  unsigned long updateInterval;
  bool enableLED;
};

DeviceConfig config = {
  .deviceName = "ESP32-Environment",
  .tempOffset = 0.0,
  .humOffset = 0.0,
  .updateInterval = 15000,
  .enableLED = true
};

void setup_wifi() {
  WiFiManager wm;
  
  // Configuration personnalisée WiFi Manager
  WiFiManagerParameter custom_device_name("name", "Device Name", config.deviceName, 32);
  WiFiManagerParameter custom_temp_offset("temp", "Temperature Offset", "0.0", 8);
  WiFiManagerParameter custom_hum_offset("hum", "Humidity Offset", "0.0", 8);
  
  wm.addParameter(&custom_device_name);
  wm.addParameter(&custom_temp_offset);
  wm.addParameter(&custom_hum_offset);
  
  // Tentative de connexion avec configuration existante
  bool res = wm.autoConnect("ESP32-AdafruitIO-Setup", "setup123");
  
  if (!res) {
    Serial.println("Failed to connect or setup WiFi");
    delay(3000);
    ESP.restart();
  } else {
    // Récupération des paramètres personnalisés
    strncpy(config.deviceName, custom_device_name.getValue(), sizeof(config.deviceName));
    config.tempOffset = atof(custom_temp_offset.getValue());
    config.humOffset = atof(custom_hum_offset.getValue());
    
    Serial.println("\nWiFi connected successfully!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Device Name: ");
    Serial.println(config.deviceName);
  }
}

void MQTT_connect() {
  int8_t ret;
  
  if (mqtt.connected()) {
    return;
  }
  
  Serial.print("Connecting to Adafruit IO...");
  
  uint8_t retries = 5;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying Adafruit IO connection in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
    retries--;
    
    if (retries == 0) {
      Serial.println("Adafruit IO connection failed permanently");
      while (1);
    }
  }
  
  Serial.println("Adafruit IO connected!");
  
  // S'abonner au feed LED
  mqtt.subscribe(&ledFeed);
  
  // Publier message de connexion
  String statusMsg = "{\"device\":\"" + String(config.deviceName) + 
                     "\",\"status\":\"connected\",\"ip\":\"" + 
                     WiFi.localIP().toString() + "\",\"version\":\"1.0\"}";
  statusFeed.publish(statusMsg.c_str());
}

void ledFeedCallback(char *data, uint16_t len) {
  String message = String(data);
  message.trim();
  
  Serial.print("LED control received: ");
  Serial.println(message);
  
  DynamicJsonDocument doc(256);
  DeserializationError error = deserializeJson(doc, message);
  
  if (error) {
    Serial.print("JSON parsing failed: ");
    Serial.println(error.c_str());
    return;
  }
  
  // Traitement des commandes LED
  if (doc.containsKey("state")) {
    ledState = doc["state"].as<String>() == "ON";
    digitalWrite(LED_PIN, ledState ? HIGH : LOW);
    
    // Rétroaction
    String feedback = "{\"led\":\"" + String(ledState ? "ON" : "OFF") + 
                      "\",\"timestamp\":" + String(millis()) + "}";
    statusFeed.publish(feedback.c_str());
    
    Serial.print("LED set to: ");
    Serial.println(ledState ? "ON" : "OFF");
  }
  
  if (doc.containsKey("blink")) {
    int count = doc["blink"];
    Serial.print("Blinking LED ");
    Serial.print(count);
    Serial.println(" times");
    
    for (int i = 0; i < count; i++) {
      digitalWrite(LED_PIN, HIGH);
      delay(200);
      digitalWrite(LED_PIN, LOW);
      delay(200);
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  Serial.println("\n=== ESP32 Adafruit IO Integration ===");
  
  // Initialisation GPIO
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Initialisation capteur
  dht.begin();
  
  // Connexion WiFi avec WiFiManager
  setup_wifi();
  
  // Configuration callback MQTT
  mqtt.subscribe(&ledFeed);
  
  Serial.println("System initialized. Connecting to Adafruit IO...");
  Serial.println("==============================================\n");
}

void publishSensorData() {
  unsigned long now = millis();
  
  if (now - lastPublishTime >= config.updateInterval) {
    lastPublishTime = now;
    
    // Lecture capteurs avec offset de calibration
    float temperature = dht.readTemperature() + config.tempOffset;
    float humidity = dht.readHumidity() + config.humOffset;
    
    if (!isnan(temperature) && !isnan(humidity)) {
      // Publication température
      if (temperatureFeed.publish(temperature)) {
        Serial.print("Temperature published: ");
        Serial.print(temperature);
        Serial.println(" °C");
        lastTemperature = temperature;
      } else {
        Serial.println("Temperature publish failed!");
      }
      
      // Publication humidité
      if (humidityFeed.publish(humidity)) {
        Serial.print("Humidity published: ");
        Serial.print(humidity);
        Serial.println(" %");
        lastHumidity = humidity;
      } else {
        Serial.println("Humidity publish failed!");
      }
      
      // Publication données groupées (optionnel)
      String jsonData = "{\"temp\":" + String(temperature, 1) + 
                       ",\"hum\":" + String(humidity, 1) + 
                       ",\"led\":" + String(ledState ? 1 : 0) + 
                       ",\"ts\":" + String(now) + "}";
      statusFeed.publish(jsonData.c_str());
      
    } else {
      Serial.println("Failed to read from DHT sensor!");
      
      // Publication erreur
      String errorMsg = "{\"error\":\"sensor_read_failed\",\"timestamp\":" + String(now) + "}";
      statusFeed.publish(errorMsg.c_str());
    }
  }
}

void checkIncomingMessages() {
  Adafruit_MQTT_Subscribe *subscription;
  
  while ((subscription = mqtt.readSubscription(1000))) {
    if (subscription == &ledFeed) {
      ledFeedCallback((char *)ledFeed.lastread, ledFeed.lastreadlen);
    }
  }
}

void loop() {
  // Maintenir connexion MQTT
  MQTT_connect();
  
  // Vérifier messages entrants
  checkIncomingMessages();
  
  // Publier données capteurs
  publishSensorData();
  
  // Petit délai pour éviter surcharge
  delay(100);
}`,
        challenges: [
          "Latence Adafruit IO cloud pour applications temps réel critiques",
          "Limite quota messages gratuits (30 données/minute sur free plan)",
          "Gestion authentification AIO key sécurisée et rotation automatique",
          "Synchronisation feed/dashboard en cas de déconnexion prolongée"
        ],
        solutions: [
          "Buffer local FIFO et batch sending avec compression pour optimiser messages",
          "Optimisation fréquence envoi selon besoins réels et agrégation données",
          "Rotation clés API sécurisée via OAuth2 et stockage chiffré SPIFFS",
          "Webhooks pour synchronisation bidirectionnelle et backup local sur SD card"
        ],
        imageExplanation: "Adafruit IO est une plateforme cloud professionnelle dédiée aux projets IoT. L'ESP32 publie les données calibrées des capteurs DHT22 sur des feeds spécifiques avec timestamps. Le dashboard web Adafruit IO permet de visualiser les données en temps réel via des graphiques interactifs, de contrôler les LEDs à distance avec rétroaction, et de configurer des alertes push notifications. Les données historiques sont accessibles via API REST pour intégration dans d'autres applications."
      },
      6: {
        title: "Contrôle Bluetooth BLE LED RGB",
        subtitle: "ESP32 + BLE + App LightBlue + Contrôle Avancé",
        description: "Système de contrôle LED RGB complet via Bluetooth Low Energy avec application mobile LightBlue. Support de commandes avancées (RGB, HSV, effets, séquences) et configuration via interface BLE personnalisée.",
        features: [
          "Bluetooth BLE 4.2/5.0 support haute efficacité énergétique",
          "Application mobile LightBlue compatible iOS/Android/Windows",
          "Commandes couleurs RGB/HSV/Hex avec conversion en temps réel",
          "Contrôle à distance sans fil portée jusqu'à 100m en ligne droite",
          "Interface BLE personnalisée avec caractéristiques multiples",
          "Effets préprogrammés (fade, rainbow, strobe, breathe) et séquences"
        ],
        technologies: ["ESP32 BLE", "LED RGB Common Cathode/Anode", "App LightBlue", "Smartphones iOS/Android", "Résistances 220Ω", "Mosfet/Transistor pour haute puissance"],
        imageCaption: "Contrôle LED RGB avancé via Bluetooth BLE avec ESP32",
        videoDescription: "Démonstration complète du contrôle des couleurs LED via l'application LightBlue avec effets et séquences programmables.",
        codeSnippet: `// ESP32 - Bluetooth BLE LED RGB Controller Avancé
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>
#include <Adafruit_NeoPixel.h>

// Configuration LED RGB/NeoPixel
#define LED_TYPE_NEOPIXEL  // Décommenter pour NeoPixel
//#define LED_TYPE_RGB     // Décommenter pour LED RGB standard

#ifdef LED_TYPE_NEOPIXEL
  #define LED_PIN 15
  #define LED_COUNT 16
  Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
#else
  #define RED_PIN 25
  #define GREEN_PIN 26
  #define BLUE_PIN 27
#endif

// UUIDs BLE personnalisés
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define COLOR_CHAR_UUID     "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define EFFECT_CHAR_UUID    "cba1d466-344c-4be3-ab3f-189f80d751e1"
#define BRIGHTNESS_CHAR_UUID "f27b53ad-c63d-49a0-8c0f-9f1e5a8f1b9a"
#define STATUS_CHAR_UUID    "d61f4f27-3c4d-4b9b-8c3a-6f8e9c7d5a4b"

// Variables globales
BLECharacteristic *pColorCharacteristic;
BLECharacteristic *pEffectCharacteristic;
BLECharacteristic *pBrightnessCharacteristic;
BLECharacteristic *pStatusCharacteristic;

uint8_t currentRed = 255;
uint8_t currentGreen = 255;
uint8_t currentBlue = 255;
uint8_t currentBrightness = 100; // 0-100%
String currentEffect = "solid";
bool deviceConnected = false;
bool oldDeviceConnected = false;

// Classes de callback BLE
class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("Device connected");
    updateStatus("connected");
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("Device disconnected");
    updateStatus("disconnected");
  }
};

class ColorCharacteristicCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();
    
    if (value.length() > 0) {
      Serial.print("Color command received: ");
      for (int i = 0; i < value.length(); i++) {
        Serial.print(value[i]);
      }
      Serial.println();
      
      // Formats supportés:
      // 1. "R:G:B" (ex: "255:100:50")
      // 2. "#RRGGBB" (ex: "#FF6432")
      // 3. "color_name" (ex: "red", "blue", "green")
      
      String command = String(value.c_str());
      command.trim();
      
      if (command.indexOf(':') != -1) {
        // Format R:G:B
        parseRGBCommand(command);
      } else if (command.startsWith("#")) {
        // Format Hex
        parseHexCommand(command);
      } else {
        // Nom de couleur
        parseColorName(command);
      }
    }
  }
};

class EffectCharacteristicCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();
    
    if (value.length() > 0) {
      String effect = String(value.c_str());
      effect.trim();
      effect.toLowerCase();
      
      Serial.print("Effect command received: ");
      Serial.println(effect);
      
      currentEffect = effect;
      applyEffect(effect);
    }
  }
};

class BrightnessCharacteristicCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();
    
    if (value.length() > 0) {
      int brightness = atoi(value.c_str());
      brightness = constrain(brightness, 0, 100);
      
      Serial.print("Brightness command received: ");
      Serial.println(brightness);
      
      currentBrightness = brightness;
      setBrightness(brightness);
    }
  }
};

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n=== ESP32 BLE LED RGB Controller ===");
  
  #ifdef LED_TYPE_NEOPIXEL
    strip.begin();
    strip.show();
    strip.setBrightness(100);
    Serial.println("Using NeoPixel LED strip");
  #else
    pinMode(RED_PIN, OUTPUT);
    pinMode(GREEN_PIN, OUTPUT);
    pinMode(BLUE_PIN, OUTPUT);
    Serial.println("Using standard RGB LED");
  #endif
  
  // Initialisation BLE
  BLEDevice::init("ESP32-LED-Controller");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  
  // Création du service BLE
  BLEService *pService = pServer->createService(SERVICE_UUID);
  
  // Caractéristique Couleur
  pColorCharacteristic = pService->createCharacteristic(
    COLOR_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE |
    BLECharacteristic::PROPERTY_NOTIFY
  );
  pColorCharacteristic->setCallbacks(new ColorCharacteristicCallbacks());
  pColorCharacteristic->setValue("255:255:255");
  pColorCharacteristic->addDescriptor(new BLE2902());
  
  // Caractéristique Effets
  pEffectCharacteristic = pService->createCharacteristic(
    EFFECT_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE |
    BLECharacteristic::PROPERTY_NOTIFY
  );
  pEffectCharacteristic->setCallbacks(new EffectCharacteristicCallbacks());
  pEffectCharacteristic->setValue("solid");
  pEffectCharacteristic->addDescriptor(new BLE2902());
  
  // Caractéristique Luminosité
  pBrightnessCharacteristic = pService->createCharacteristic(
    BRIGHTNESS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE |
    BLECharacteristic::PROPERTY_NOTIFY
  );
  pBrightnessCharacteristic->setCallbacks(new BrightnessCharacteristicCallbacks());
  pBrightnessCharacteristic->setValue("100");
  pBrightnessCharacteristic->addDescriptor(new BLE2902());
  
  // Caractéristique Status
  pStatusCharacteristic = pService->createCharacteristic(
    STATUS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_NOTIFY
  );
  pStatusCharacteristic->setValue("ready");
  pStatusCharacteristic->addDescriptor(new BLE2902());
  
  // Démarrage du service
  pService->start();
  
  // Configuration advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  
  // Démarrer advertising
  BLEDevice::startAdvertising();
  
  Serial.println("BLE Service started successfully!");
  Serial.println("Device name: ESP32-LED-Controller");
  Serial.println("Connect with LightBlue or similar BLE app");
  Serial.println("=========================================\n");
  
  // Allumer LED en blanc par défaut
  setRGBColor(255, 255, 255);
}

void parseRGBCommand(String command) {
  int firstColon = command.indexOf(':');
  int secondColon = command.indexOf(':', firstColon + 1);
  
  if (firstColon != -1 && secondColon != -1) {
    int r = command.substring(0, firstColon).toInt();
    int g = command.substring(firstColon + 1, secondColon).toInt();
    int b = command.substring(secondColon + 1).toInt();
    
    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);
    
    currentRed = r;
    currentGreen = g;
    currentBlue = b;
    
    setRGBColor(r, g, b);
    
    // Mettre à jour la caractéristique
    String colorStr = String(r) + ":" + String(g) + ":" + String(b);
    pColorCharacteristic->setValue(colorStr.c_str());
    pColorCharacteristic->notify();
    
    Serial.printf("Set RGB color to: R=%d, G=%d, B=%d\n", r, g, b);
  }
}

void parseHexCommand(String command) {
  if (command.length() == 7) { // Format: #RRGGBB
    long number = strtol(command.substring(1).c_str(), NULL, 16);
    
    int r = number >> 16;
    int g = number >> 8 & 0xFF;
    int b = number & 0xFF;
    
    currentRed = r;
    currentGreen = g;
    currentBlue = b;
    
    setRGBColor(r, g, b);
    
    // Mettre à jour la caractéristique
    String colorStr = String(r) + ":" + String(g) + ":" + String(b);
    pColorCharacteristic->setValue(colorStr.c_str());
    pColorCharacteristic->notify();
    
    Serial.printf("Set Hex color #%s to: R=%d, G=%d, B=%d\n", 
                  command.substring(1).c_str(), r, g, b);
  }
}

void parseColorName(String colorName) {
  colorName.toLowerCase();
  
  if (colorName == "red") {
    setRGBColor(255, 0, 0);
  } else if (colorName == "green") {
    setRGBColor(0, 255, 0);
  } else if (colorName == "blue") {
    setRGBColor(0, 0, 255);
  } else if (colorName == "white") {
    setRGBColor(255, 255, 255);
  } else if (colorName == "warmwhite") {
    setRGBColor(255, 200, 150);
  } else if (colorName == "purple") {
    setRGBColor(128, 0, 128);
  } else if (colorName == "magenta") {
    setRGBColor(255, 0, 255);
  } else if (colorName == "yellow") {
    setRGBColor(255, 255, 0);
  } else if (colorName == "orange") {
    setRGBColor(255, 165, 0);
  } else if (colorName == "pink") {
    setRGBColor(255, 192, 203);
  } else if (colorName == "cyan") {
    setRGBColor(0, 255, 255);
  } else if (colorName == "off" || colorName == "black") {
    setRGBColor(0, 0, 0);
  } else {
    Serial.println("Unknown color name, using white");
    setRGBColor(255, 255, 255);
  }
}

void setRGBColor(uint8_t r, uint8_t g, uint8_t b) {
  #ifdef LED_TYPE_NEOPIXEL
    // Ajuster selon la luminosité
    float brightness = currentBrightness / 100.0;
    r = r * brightness;
    g = g * brightness;
    b = b * brightness;
    
    for(int i = 0; i < LED_COUNT; i++) {
      strip.setPixelColor(i, strip.Color(r, g, b));
    }
    strip.show();
  #else
    // Pour LED RGB standard avec PWM
    float brightness = currentBrightness / 100.0;
    ledcWrite(0, r * brightness);
    ledcWrite(1, g * brightness);
    ledcWrite(2, b * brightness);
  #endif
}

void setBrightness(uint8_t brightness) {
  currentBrightness = brightness;
  
  #ifdef LED_TYPE_NEOPIXEL
    strip.setBrightness(map(brightness, 0, 100, 0, 255));
    strip.show();
  #endif
  
  // Mettre à jour l'affichage avec la nouvelle luminosité
  setRGBColor(currentRed, currentGreen, currentBlue);
}

void applyEffect(String effect) {
  if (effect == "rainbow") {
    startRainbowEffect();
  } else if (effect == "fade") {
    startFadeEffect();
  } else if (effect == "strobe") {
    startStrobeEffect();
  } else if (effect == "breathe") {
    startBreatheEffect();
  } else if (effect == "solid") {
    // Effet solide (défaut)
    setRGBColor(currentRed, currentGreen, currentBlue);
  }
  
  // Mettre à jour la caractéristique
  pEffectCharacteristic->setValue(effect.c_str());
  pEffectCharacteristic->notify();
}

void startRainbowEffect() {
  // Implémentation simplifiée
  Serial.println("Starting rainbow effect");
  // Note: Pour une implémentation complète, utiliser un timer
}

void startFadeEffect() {
  Serial.println("Starting fade effect");
  // Implémentation à compléter
}

void startStrobeEffect() {
  Serial.println("Starting strobe effect");
  // Implémentation à compléter
}

void startBreatheEffect() {
  Serial.println("Starting breathe effect");
  // Implémentation à compléter
}

void updateStatus(String status) {
  pStatusCharacteristic->setValue(status.c_str());
  pStatusCharacteristic->notify();
}

void loop() {
  // Gestion reconnexion BLE
  if (!deviceConnected && oldDeviceConnected) {
    delay(500);
    BLEDevice::startAdvertising();
    Serial.println("Start advertising");
    oldDeviceConnected = deviceConnected;
  }
  
  if (deviceConnected && !oldDeviceConnected) {
    oldDeviceConnected = deviceConnected;
  }
  
  // Exécution des effets en cours
  if (deviceConnected && currentEffect != "solid") {
    // Ici, gérer l'exécution des effets
    // (nécessite une implémentation avec millis() pour non-bloquant)
  }
  
  delay(100);
}`,
        challenges: [
          "Portée Bluetooth limitée en environnement obstructif (murs, interférences)",
          "Compatibilité appareils divers (iOS/Android versions, fabricants)",
          "Sécurité connexion BLE contre accès non autorisés et spoofing",
          "Gestion connexions multiples, reconnexions et conflits de commandes"
        ],
        solutions: [
          "Amplificateur signal BLE externe optionnel pour longue portée (+20dBm)",
          "Profils BLE standardisés (GATT) et tests multi-plateformes exhaustifs",
          "Pairing sécurisé avec Just Works, Passkey Entry et LE Secure Connections",
          "Gestion file d'attente commandes, timeouts et priorisation connexions"
        ],
        imageExplanation: "Ce projet utilise le Bluetooth Low Energy (BLE) intégré à l'ESP32 pour créer un service GATT personnalisé avec 4 caractéristiques : Couleur (RGB/Hex/noms), Effets (rainbow, fade, strobe, breathe), Luminosité et Status. L'application LightBlue (gratuite sur iOS/Android) permet d'envoyer des commandes via une interface simple sans nécessiter d'application dédiée. Le système supporte aussi bien les LEDs RGB simples que les bandes NeoPixel adressables."
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
                <li><strong>Protocole de communication :</strong> {blockId === 6 ? 'Bluetooth BLE 4.2/5.0' : blockId === 3 || blockId === 1 ? 'MQTT sur TCP/IP' : blockId === 2 ? 'HTTP/WebSocket' : 'WiFi/GSM'}</li>
                <li><strong>Tension d'alimentation :</strong> 5V/3A pour la plupart des configurations</li>
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