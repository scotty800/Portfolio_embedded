// components/blocks/IoTBlocks.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import des images depuis le dossier assets
import cheerlightsImg from '../../assets/cheerlights-mqtt.png';
import esp32camImg from '../../assets/esp32-web-server.png';
import mqttArchitectureImg from '../../assets/mqtt-architecture.png';
import envMonitoringImg from '../../assets/environment-monitoring.png';
import adafruitIoImg from '../../assets/adafruit-io-dashboard.png';
import bleControlImg from '../../assets/ble-led-control.png';

// Configuration Cloudinary
const CLOUDINARY_CLOUD_NAME = 'dfwwlbhuw';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

// VIDÉOS SUR CLOUDINARY - URLs corrigées
const videos = {
  1: `${CLOUDINARY_BASE_URL}/v1765551965/cheerlights-mqtt_rozkql`,
  2: `${CLOUDINARY_BASE_URL}/v1765551966/esp32-web-server_exvug3`,
  3: `${CLOUDINARY_BASE_URL}/v1765551966/mqtt-advanced.mp4_lrew1f`, // CORRIGÉ
  4: `${CLOUDINARY_BASE_URL}/v1765551963/environment-monitoring_qd2suv`,
  5: `${CLOUDINARY_BASE_URL}/v1765551961/adafruit-io_sckscm`,
  6: `${CLOUDINARY_BASE_URL}/v1765551961/ble-control_gqccm8`
};

const IoTBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
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
      2: {
        title: "Serveur Web ESP32 avec Contrôle à Distance",
        subtitle: "ESP32 Web Server + AP Mode + Interface Web",
        description: "Serveur web hébergé directement sur ESP32 permettant le contrôle à distance de périphériques via une interface web responsive. Le ESP32 crée son propre point d'accès WiFi.",
        features: [
          "Serveur web embarqué sur ESP32",
          "Mode point d'accès WiFi intégré",
          "Interface web responsive HTML/CSS",
          "Contrôle GPIO via requêtes HTTP",
          "État en temps réel des périphériques",
          "Configuration sans Internet requis"
        ],
        technologies: ["ESP32 DevKit", "WiFi Module", "LEDs de contrôle", "HTML/CSS/JS", "Web Server Library", "Access Point Mode"],
        imageCaption: "Interface web de contrôle ESP32 avec état des périphériques",
        videoDescription: "Démonstration du contrôle à distance via interface web sur ESP32.",
        codeSnippet: `// ESP32 - Serveur Web avec AP
#include <WiFi.h>
#include <WebServer.h>

// Configuration AP
const char* ssid = "ESP32_Web_Server";
const char* password = "12345678";

WebServer server(80);

// Broches LED
const int led1 = 2;
const int led2 = 4;

String HTML = "<!DOCTYPE html>\
<html>\
<head>\
<meta name='viewport' content='width=device-width, initial-scale=1.0'>\
<style>\
body {font-family: Arial; background: #f0f0f0; margin: 0; padding: 20px;}\
.container {max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;}\
h1 {color: #333;}\
.btn {padding: 10px 20px; margin: 5px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;}\
.btn-on {background: #4CAF50; color: white;}\
.btn-off {background: #f44336; color: white;}\
.status {padding: 10px; margin: 10px 0; border-radius: 5px;}\
.on {background: #d4edda; color: #155724;}\
.off {background: #f8d7da; color: #721c24;}\
</style>\
</head>\
<body>\
<div class='container'>\
<h1>🏠 ESP32 Web Server</h1>\
<div class='status' id='status1'>LED 1: OFF</div>\
<button class='btn btn-on' onclick='controlLed(1,1)'>LED 1 ON</button>\
<button class='btn btn-off' onclick='controlLed(1,0)'>LED 1 OFF</button>\
<div class='status' id='status2'>LED 2: OFF</div>\
<button class='btn btn-on' onclick='controlLed(2,1)'>LED 2 ON</button>\
<button class='btn btn-off' onclick='controlLed(2,0)'>LED 2 OFF</button>\
</div>\
<script>\
function controlLed(ledNum, state) {\
fetch('/control?led=' + ledNum + '&state=' + state)\
.then(response => response.text())\
.then(data => {\
document.getElementById('status' + ledNum).innerHTML = 'LED ' + ledNum + ': ' + (state ? 'ON' : 'OFF');\
document.getElementById('status' + ledNum).className = 'status ' + (state ? 'on' : 'off');\
});\
}\
</script>\
</body>\
</html>";

void setup() {
  Serial.begin(115200);
  
  // Configuration broches LED
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);
  
  // Création point d'accès
  WiFi.softAP(ssid, password);
  
  Serial.println("Point d'accès créé");
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
  
  // Routes serveur web
  server.on("/", handleRoot);
  server.on("/control", handleControl);
  
  server.begin();
  Serial.println("Serveur web démarré!");
}

void loop() {
  server.handleClient();
}

void handleRoot() {
  server.send(200, "text/html", HTML);
}

void handleControl() {
  String ledParam = server.arg("led");
  String stateParam = server.arg("state");
  
  if (ledParam == "1") {
    digitalWrite(led1, stateParam == "1" ? HIGH : LOW);
  } else if (ledParam == "2") {
    digitalWrite(led2, stateParam == "1" ? HIGH : LOW);
  }
  
  server.send(200, "text/plain", "OK");
}`,
        challenges: [
          "Limitations mémoire ESP32",
          "Gestion connexions simultanées",
          "Interface web responsive",
          "Sécurité point d'accès"
        ],
        solutions: [
          "Optimisation HTML/CSS minimal",
          "Timeout connexions inactives",
          "Design mobile-first",
          "Mot de passe fort et filtrage"
        ],
        imageExplanation: "L'ESP32 fonctionne comme un point d'accès WiFi indépendant. Les clients se connectent directement à l'ESP32 et accèdent à une interface web qui contrôle les GPIO en temps réel via requêtes AJAX."
      },
      3: {
        title: "Architecture MQTT Avancée avec ESP32",
        subtitle: "MQTT Pub/Sub + Multi-sujets + QoS",
        description: "Implémentation avancée du protocole MQTT avec qualité de service (QoS), rétention de messages, last will testament, et gestion multi-sujets pour applications IoT complexes.",
        features: [
          "Qualité de Service (QoS 0,1,2)",
          "Messages rétention sur broker",
          "Last Will Testament (LWT)",
          "Système de keep-alive",
          "Gestion multi-sujets hiérarchiques",
          "Reconnexion automatique robuste"
        ],
        technologies: ["ESP32 DevKit", "Broker MQTT (Mosquitto)", "Client PubSub", "WiFi Manager", "TLS/SSL Support", "JSON Payloads"],
        imageCaption: "Architecture MQTT avancée avec gestion de qualité de service",
        videoDescription: "Démonstration des fonctionnalités MQTT avancées avec différentes qualités de service.",
        codeSnippet: `// ESP32 - MQTT Avancé
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* ssid = "SSID";
const char* password = "PASSWORD";

const char* mqtt_server = "broker.emqx.io";
const int mqtt_port = 1883;
const char* mqtt_user = "user";
const char* mqtt_password = "pass";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastReconnectAttempt = 0;
const unsigned long reconnectInterval = 5000;

// Configuration Last Will Testament
const char* lwt_topic = "esp32/status";
const char* lwt_message = "offline";

void setup() {
  Serial.begin(115200);
  setup_wifi();
  
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqtt_callback);
  
  // Configuration LWT
  String willTopic = String(mqtt_user) + "/" + lwt_topic;
  client.setKeepAlive(60);
}

void setup_wifi() {
  delay(10);
  Serial.println("Connexion WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connecté");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void mqtt_callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message reçu [");
  Serial.print(topic);
  Serial.print("]: ");
  
  // Conversion payload en string
  char message[length + 1];
  memcpy(message, payload, length);
  message[length] = '\\0';
  
  Serial.println(message);
  
  // Traitement JSON
  if (strstr(topic, "sensor/data")) {
    handleSensorData(message);
  } else if (strstr(topic, "control")) {
    handleControlCommand(message);
  }
}

void handleSensorData(char* jsonData) {
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, jsonData);
  
  if (!error) {
    float temperature = doc["temp"];
    float humidity = doc["hum"];
    int timestamp = doc["ts"];
    
    Serial.print("Température: ");
    Serial.print(temperature);
    Serial.print("°C, Humidité: ");
    Serial.print(humidity);
    Serial.print("%, Time: ");
    Serial.println(timestamp);
  }
}

boolean reconnect() {
  Serial.println("Tentative reconnexion MQTT...");
  
  // Création ID client unique
  String clientId = "ESP32Client-" + String(random(0xffff), HEX);
  
  // Connexion avec LWT
  if (client.connect(clientId.c_str(), mqtt_user, mqtt_password, 
                     lwt_topic, 1, true, lwt_message)) {
    Serial.println("Connecté à MQTT!");
    
    // Publication message connexion
    client.publish(lwt_topic, "online", true);
    
    // Souscription aux topics
    client.subscribe("sensor/#", 1);  // QoS 1
    client.subscribe("control/#", 2); // QoS 2
    
    return true;
  }
  
  Serial.print("Échec connexion, rc=");
  Serial.print(client.state());
  return false;
}

void loop() {
  if (!client.connected()) {
    unsigned long now = millis();
    if (now - lastReconnectAttempt > reconnectInterval) {
      lastReconnectAttempt = now;
      if (reconnect()) {
        lastReconnectAttempt = 0;
      }
    }
  } else {
    client.loop();
    
    // Publication périodique
    static unsigned long lastPublish = 0;
    if (millis() - lastPublish > 10000) {
      publishSensorData();
      lastPublish = millis();
    }
  }
}

void publishSensorData() {
  StaticJsonDocument<200> doc;
  doc["device"] = "esp32_01";
  doc["temp"] = random(200, 250) / 10.0;
  doc["hum"] = random(300, 700) / 10.0;
  doc["ts"] = millis() / 1000;
  
  char jsonBuffer[200];
  serializeJson(doc, jsonBuffer);
  
  // Publication avec QoS 1
  client.publish("sensor/data", jsonBuffer, true);
}`,
        challenges: [
          "Gestion QoS différents niveaux",
          "Sérialisation/désérialisation JSON",
          "Reconnexion réseau robuste",
          "Mémoire pour payloads JSON"
        ],
        solutions: [
          "Gestion acknowledgement MQTT",
          "ArduinoJson library optimisée",
          "Backoff exponentiel reconnexion",
          "Pool mémoire statique"
        ],
        imageExplanation: "Architecture MQTT avancée montrant la communication entre multiple clients ESP32 et un broker central avec différentes qualités de service, messages rétention et système LWT pour monitoring."
      },
      4: {
        title: "Station Météo IoT avec Surveillance Environnementale",
        subtitle: "ESP32 + Capteurs DHT22/BMP280 + Cloud Dashboard",
        description: "Système complet de surveillance environnementale mesurant température, humidité, pression atmosphérique et qualité d'air avec transmission des données vers un dashboard cloud.",
        features: [
          "Mesure température/humidité DHT22",
          "Pression atmosphérique BMP280",
          "Qualité air avec capteur MQ135",
          "Transmission cloud Blynk/ThingsBoard",
          "Dashboard temps réel",
          "Alertes seuils dépassés",
          "Historique données",
          "Batterie/solaire optionnel"
        ],
        technologies: ["ESP32 DevKit", "DHT22", "BMP280", "MQ135", "WiFi/GSM", "Blynk/ThingsBoard", "Cloud Storage", "RTC Module"],
        imageCaption: "Station météo IoT avec multiples capteurs environnementaux",
        videoDescription: "Démonstration de la collecte et transmission des données environnementales vers dashboard cloud.",
        codeSnippet: `// ESP32 - Station Météo IoT
#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#include <BlynkSimpleEsp32.h>

// Configuration Blynk
#define BLYNK_TEMPLATE_ID "TMPLxxxxxx"
#define BLYNK_TEMPLATE_NAME "Weather Station"
#define BLYNK_AUTH_TOKEN "your-auth-token"

// Broches capteurs
#define DHTPIN 4
#define DHTTYPE DHT22
#define MQ135_PIN 34

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP280 bmp;

// Variables capteurs
float temperature, humidity, pressure, altitude, airQuality;
unsigned long lastRead = 0;
const unsigned long readInterval = 10000; // 10 secondes

void setup() {
  Serial.begin(115200);
  Serial.println("Initialisation Station Météo IoT...");
  
  // Initialisation DHT22
  dht.begin();
  
  // Initialisation BMP280
  if (!bmp.begin(0x76)) {
    Serial.println("BMP280 non détecté!");
    while (1);
  }
  
  // Configuration BMP280
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                  Adafruit_BMP280::SAMPLING_X2,
                  Adafruit_BMP280::SAMPLING_X16,
                  Adafruit_BMP280::FILTER_X16,
                  Adafruit_BMP280::STANDBY_MS_500);
  
  // Connexion WiFi et Blynk
  WiFi.begin("SSID", "PASSWORD");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connecté!");
  
  Blynk.begin(BLYNK_AUTH_TOKEN, "SSID", "PASSWORD");
  
  Serial.println("Station Météo prête!");
}

void loop() {
  Blynk.run();
  
  if (millis() - lastRead >= readInterval) {
    readSensors();
    sendToCloud();
    displaySerial();
    lastRead = millis();
  }
}

void readSensors() {
  // Lecture DHT22
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  
  // Lecture BMP280
  pressure = bmp.readPressure() / 100.0F; // Convert Pa to hPa
  altitude = bmp.readAltitude(1013.25); // Sea level pressure
  
  // Lecture MQ135 (qualité air)
  int mqValue = analogRead(MQ135_PIN);
  airQuality = map(mqValue, 0, 4095, 0, 100);
  
  // Vérification erreurs
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Erreur lecture DHT22!");
    temperature = 0;
    humidity = 0;
  }
}

void sendToCloud() {
  // Envoi Blynk
  Blynk.virtualWrite(V0, temperature);
  Blynk.virtualWrite(V1, humidity);
  Blynk.virtualWrite(V2, pressure);
  Blynk.virtualWrite(V3, altitude);
  Blynk.virtualWrite(V4, airQuality);
  
  // Vérification alertes
  checkAlerts();
}

void checkAlerts() {
  if (temperature > 30) {
    Blynk.notify("⚠️ Alerte: Température élevée: " + String(temperature) + "°C");
  }
  
  if (humidity > 80) {
    Blynk.notify("💧 Alerte: Humidité élevée: " + String(humidity) + "%");
  }
  
  if (airQuality > 70) {
    Blynk.notify("🌫️ Alerte: Mauvaise qualité d'air: " + String(airQuality) + "%");
  }
}

void displaySerial() {
  Serial.println("=== Données Capteurs ===");
  Serial.print("Température: ");
  Serial.print(temperature);
  Serial.println(" °C");
  
  Serial.print("Humidité: ");
  Serial.print(humidity);
  Serial.println(" %");
  
  Serial.print("Pression: ");
  Serial.print(pressure);
  Serial.println(" hPa");
  
  Serial.print("Altitude: ");
  Serial.print(altitude);
  Serial.println(" m");
  
  Serial.print("Qualité Air: ");
  Serial.print(airQuality);
  Serial.println(" %");
  Serial.println("======================");
}`,
        challenges: [
          "Calibration capteurs précis",
          "Consommation énergie optimale",
          "Transmission données fiable",
          "Gestion erreurs capteurs"
        ],
        solutions: [
          "Calibration en environnement contrôlé",
          "Deep sleep entre lectures",
          "Retry mécanisme transmission",
          "Filtrage valeurs aberrantes"
        ],
        imageExplanation: "Station météo IoT complète avec multiple capteurs mesurant différents paramètres environnementaux. Les données sont agrégées et transmises vers un dashboard cloud pour visualisation et analyse."
      },
      5: {
        title: "Dashboard Adafruit IO avec Visualisation Temps Réel",
        subtitle: "ESP32 + Adafruit IO + Feeds + Dashboards",
        description: "Intégration avec la plateforme Adafruit IO pour créer des dashboards temps réel avec graphiques, jauges, et contrôles pour applications IoT.",
        features: [
          "Connexion sécurisée Adafruit IO",
          "Création feeds personnalisés",
          "Dashboard avec graphiques temps réel",
          "Widgets interactifs (boutons, curseurs)",
          "Historique données illimité",
          "Triggers et notifications",
          "Intégration IFTTT/Maker",
          "API REST complète"
        ],
        technologies: ["ESP32 DevKit", "Adafruit IO Platform", "MQTT/HTTP", "WiFi Secure", "JSON API", "OAuth2 Authentication", "WebSocket"],
        imageCaption: "Dashboard Adafruit IO avec visualisation données temps réel",
        videoDescription: "Démonstration du dashboard Adafruit IO avec contrôle et monitoring temps réel.",
        codeSnippet: `// ESP32 - Adafruit IO Integration
#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>

// Configuration WiFi
#define WLAN_SSID       "SSID"
#define WLAN_PASS       "PASSWORD"

// Configuration Adafruit IO
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "your_username"
#define AIO_KEY         "your_aio_key"

// Configuration DHT
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Feeds Adafruit IO
Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temperature");
Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/humidity");
Adafruit_MQTT_Publish statusFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/status");

Adafruit_MQTT_Subscribe ledFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/led");

// Variables
unsigned long previousMillis = 0;
const long interval = 10000; // 10 secondes
bool ledState = false;

void setup() {
  Serial.begin(115200);
  delay(10);
  
  Serial.println("Adafruit IO ESP32 Client");
  
  // Connexion WiFi
  Serial.print("Connexion WiFi ");
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connecté!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
  
  // Initialisation DHT
  dht.begin();
  
  // Configuration LED
  pinMode(2, OUTPUT);
  digitalWrite(2, LOW);
  
  // Souscription feed LED
  mqtt.subscribe(&ledFeed);
  
  // Connexion MQTT
  connect();
  
  // Message initial status
  statusFeed.publish("System Online");
}

void loop() {
  // Maintenance connexion MQTT
  if (!mqtt.connected()) {
    connect();
  }
  mqtt.processPackets(10000);
  
  // Vérification messages entrants
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(100))) {
    if (subscription == &ledFeed) {
      Serial.print("LED Feed: ");
      Serial.println((char *)ledFeed.lastread);
      
      // Conversion message en état LED
      String message = String((char *)ledFeed.lastread);
      if (message == "ON") {
        ledState = true;
        digitalWrite(2, HIGH);
      } else if (message == "OFF") {
        ledState = false;
        digitalWrite(2, LOW);
      }
    }
  }
  
  // Publication périodique données capteurs
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    
    publishSensorData();
    
    // Publication état LED
    String ledStatus = ledState ? "ON" : "OFF";
    statusFeed.publish(("LED: " + ledStatus).c_str());
  }
}

void connect() {
  Serial.print("Connexion MQTT...");
  int8_t ret;
  
  while ((ret = mqtt.connect()) != 0) {
    Console.log(mqtt.connectErrorString(ret));
    Console.log("Nouvelle tentative dans 5 secondes...");
    mqtt.disconnect();
    delay(5000);
  }
  
  Console.log("MQTT connecté!");
}

void publishSensorData() {
  // Lecture capteurs
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  
  if (isnan(t) || isnan(h)) {
    Console.log("Erreur lecture DHT!");
    return;
  }
  
  Console.log("Température: ");
  Console.log(t);
  Console.log(" °C, Humidité: ");
  Console.log(h);
  Console.log(" %");
  
  // Publication sur Adafruit IO
  if (!temperatureFeed.publish(t)) {
    Console.log("Erreur publication température!");
  }
  
  if (!humidityFeed.publish(h)) {
    Console.log("Erreur publication humidité!");
  }
  
  Console.log("Données publiées sur Adafruit IO!");
}`,
        challenges: [
          "Limites quota Adafruit IO free",
          "Latence connexion cloud",
          "Sécurité credentials",
          "Gestion déconnexions"
        ],
        solutions: [
          "Optimisation fréquence publication",
          "Buffer local données",
          "Chiffrement credentials",
          "Reconnexion automatique"
        ],
        imageExplanation: "Dashboard Adafruit IO montrant l'intégration complète avec ESP32. Données temps réel visualisées via différents widgets avec historique et capacité de contrôle à distance."
      },
      6: {
        title: "Contrôle LED via Bluetooth BLE (Bluetooth Low Energy)",
        subtitle: "ESP32 BLE Server + Smartphone App + Contrôle Sans Fil",
        description: "Système de contrôle sans fil via Bluetooth BLE avec connexion basse consommation. Application smartphone permettant le contrôle de périphériques ESP32 via interface BLE personnalisée.",
        features: [
          "Bluetooth BLE 4.2/5.0",
          "Consommation ultra-basse",
          "Serveur BLE avec services personnalisés",
          "Caractéristiques read/write/notify",
          "Application smartphone dédiée",
          "Connexion rapide pairing",
          "Communication bidirectionnelle",
          "Multiples périphériques"
        ],
        technologies: ["ESP32 DevKit", "Bluetooth BLE", "BLE Library", "Android/iOS App", "UUID Services", "GATT Protocol", "Low Power Mode"],
        imageCaption: "Contrôle LED via Bluetooth BLE depuis application smartphone",
        videoDescription: "Démonstration du contrôle sans fil BLE entre smartphone et ESP32.",
        codeSnippet: `// ESP32 - Serveur BLE LED Control
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>

// UUIDs BLE personnalisés
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

// Broche LED
#define LED_PIN 2

// Variables BLE
BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
bool oldDeviceConnected = false;

// Callbacks connexion BLE
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("Device connected");
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("Device disconnected");
    }
};

// Callbacks caractéristique BLE
class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      
      if (value.length() > 0) {
        Serial.print("Valeur reçue: ");
        for (int i = 0; i < value.length(); i++) {
          Serial.print(value[i]);
        }
        Serial.println();
        
        // Traitement commande LED
        if (value == "ON") {
          digitalWrite(LED_PIN, HIGH);
          Serial.println("LED ON");
          pCharacteristic->setValue("LED is ON");
        } else if (value == "OFF") {
          digitalWrite(LED_PIN, LOW);
          Serial.println("LED OFF");
          pCharacteristic->setValue("LED is OFF");
        } else if (value == "TOGGLE") {
          digitalWrite(LED_PIN, !digitalRead(LED_PIN));
          String state = digitalRead(LED_PIN) ? "ON" : "OFF";
          Serial.println("LED TOGGLE: " + state);
          pCharacteristic->setValue(("LED is " + state).c_str());
        } else if (value == "STATUS") {
          String state = digitalRead(LED_PIN) ? "ON" : "OFF";
          pCharacteristic->setValue(("LED is " + state).c_str());
        } else {
          pCharacteristic->setValue("Unknown command");
        }
        
        pCharacteristic->notify();
      }
    }
};

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 BLE LED Control");
  
  // Configuration LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Initialisation BLE
  BLEDevice::init("ESP32_LED_Controller");
  
  // Création serveur BLE
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  
  // Création service BLE
  BLEService *pService = pServer->createService(SERVICE_UUID);
  
  // Création caractéristique BLE
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_WRITE |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  
  // Descripteur pour notifications
  pCharacteristic->addDescriptor(new BLE2902());
  
  // Configuration callbacks
  pCharacteristic->setCallbacks(new MyCallbacks());
  
  // Valeur initiale
  pCharacteristic->setValue("ESP32 BLE Ready");
  
  // Démarrage service
  pService->start();
  
  // Configuration advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // helps with iPhone connections
  pAdvertising->setMinPreferred(0x12);
  
  // Démarrage advertising
  BLEDevice::startAdvertising();
  Serial.println("BLE Server démarré! Nom: ESP32_LED_Controller");
  Serial.println("Connectez-vous avec votre smartphone BLE");
}

void loop() {
  // Gestion reconnexion
  if (!deviceConnected && oldDeviceConnected) {
    delay(500); // give the bluetooth stack the chance to get things ready
    BLEDevice::startAdvertising();
    Serial.println("Start advertising");
    oldDeviceConnected = deviceConnected;
  }
  
  // Changement état connexion
  if (deviceConnected && !oldDeviceConnected) {
    oldDeviceConnected = deviceConnected;
  }
  
  // Envoi périodique données (exemple)
  static unsigned long lastSend = 0;
  if (deviceConnected && millis() - lastSend > 5000) {
    String message = "Uptime: " + String(millis() / 1000) + "s";
    pCharacteristic->setValue(message.c_str());
    pCharacteristic->notify();
    Serial.println("Notification sent: " + message);
    lastSend = millis();
  }
  
  delay(1000);
}`,
        challenges: [
          "Compatibilité multi-plateformes",
          "Portée limitée BLE",
          "Interférences radio",
          "Gestion énergie optimale"
        ],
        solutions: [
          "Profils GATT standardisés",
          "Antenne ESP32 optimisée",
          "Filtrage canaux BLE",
          "Deep sleep entre connexions"
        ],
        imageExplanation: "Système de contrôle BLE montrant la communication entre une application smartphone et l'ESP32 via protocole GATT. Interface permettant contrôle LED et réception notifications."
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

          {/* SECTION VIDÉO AVEC CLOUDINARY */}
          <div className="block-section">
            <h2 className="section-title">Démonstration Vidéo</h2>
            
            <div className="video-description">
              <p>{blockData.videoDescription}</p>
              <p className="cloudinary-note">
                <small>Vidéo hébergée sur Cloudinary pour une lecture optimale</small>
              </p>
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
                <span className="code-filename">IoT_Bloc{blockId}.ino</span>
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

export default IoTBlocks;