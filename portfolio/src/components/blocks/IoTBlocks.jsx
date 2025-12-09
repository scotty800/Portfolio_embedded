// components/blocks/IoTBlocks.jsx - NOUVEAU FICHIER pour projet IoT
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const IoTBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const blocksData = {
    1: {
      title: "Réseau CheerLights Mondial MQTT",
      subtitle: "ESP32 + WS2812 + Synchronisation mondiale",
      description: "Système IoT connecté au réseau CheerLights via MQTT. Synchronisation des couleurs LED en temps réel avec des milliers d'utilisateurs à travers le monde.",
      features: [
        "Abonnement MQTT au sujet 'cheerlights'",
        "Bande LED WS2812 programmable",
        "Synchronisation mondiale temps réel",
        "Changement couleur à distance",
        "Interface web de contrôle",
        "Communauté internationale connectée"
      ],
      technologies: ["ESP32 DevKit", "WS2812 LED Strip", "WiFi Module", "Alimentation 5V 3A", "Broker MQTT Cloud", "Router WiFi"],
      image: {
        src: "/assets/projects/iot/cheerlights-mqtt.jpg",
        alt: "Système CheerLights ESP32 avec LEDs synchronisées",
        caption: "Installation CheerLights avec ESP32 et bande LED WS2812"
      },
      videoLink: "#",
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
        "Keep-alive MQTT et watchdog",
        "NTP pour synchronisation horaire",
        "Reconnexion automatique robuste",
        "Mode veille et réveil WiFi"
      ]
    },
    2: {
      title: "Serveur Web Streaming Vidéo ESP32",
      subtitle: "ESP32-CAM + Streaming HTTP + Contrôle LEDs",
      description: "Serveur web embarqué sur ESP32 avec streaming vidéo en direct et contrôle interactif de LEDs via interface web personnalisée.",
      features: [
        "Streaming vidéo 640x480 à 15fps",
        "Page web responsive avec contrôles",
        "Boutons ON/OFF pour LEDs",
        "Slider contrôle luminosité",
        "Interface utilisateur intuitive",
        "Connexion WiFi point d'accès"
      ],
      technologies: ["ESP32-CAM", "LEDs GPIO", "Module OV2640", "Carte SD", "Antenne WiFi", "Alimentation 5V"],
      image: {
        src: "/assets/projects/iot/esp32-web-server.jpg",
        alt: "ESP32-CAM avec serveur web streaming",
        caption: "ESP32-CAM streaming vidéo avec contrôle web"
      },
      videoLink: "#",
      codeSnippet: `// ESP32-CAM - Serveur Web avec Streaming
#include "esp_camera.h"
#include <WiFi.h>
#include <WebServer.h>

// Configuration camera
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

const char* ssid = "ESP32-CAM";
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
  html += "<style>body { font-family: Arial; text-align: center; margin-top: 50px; }";
  html += "button { padding: 12px 24px; font-size: 16px; margin: 10px; }";
  html += ".slider { width: 80%; margin: 20px; }</style></head>";
  html += "<body><h1>ESP32-CAM Control Panel</h1>";
  html += "<img src='/stream' style='width:640px;max-width:100%;'><br>";
  html += "<button onclick='toggleLED()'>LED " + String(ledState ? "OFF" : "ON") + "</button><br>";
  html += "<input type='range' min='0' max='255' value='" + String(ledBrightness) + "' class='slider' id='brightness'>";
  html += "<script>";
  html += "function toggleLED() { fetch('/led/toggle'); location.reload(); }";
  html += "document.getElementById('brightness').onchange = function() {";
  html += "fetch('/led/brightness?value=' + this.value); }";
  html += "</script></body></html>";
  
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
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "image/jpeg", (const char*)fb->buf, fb->len);
  esp_camera_fb_return(fb);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  
  // Setup WiFi Access Point
  WiFi.softAP(ssid, password);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  
  setupCamera();
  
  // Server routes
  server.on("/", handleRoot);
  server.on("/stream", handleStream);
  server.on("/led/toggle", []() {
    ledState = !ledState;
    digitalWrite(ledPin, ledState ? HIGH : LOW);
    server.send(200, "text/plain", "OK");
  });
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}`,
      challenges: [
        "Performance streaming vidéo stable",
        "Connexions simultanées multiples",
        "Chauffage ESP32-CAM longue durée",
        "Interface web responsive mobile"
      ],
      solutions: [
        "Buffer JPEG et compression optimale",
        "Gestion connexions avec timeout",
        "Ventilation active et throttling",
        "CSS responsive et progressive enhancement"
      ]
    },
    3: {
      title: "Communication IoT MQTT Avancée",
      subtitle: "ESP32 + Broker Mosquitto + Multi-capteurs",
      description: "Architecture IoT complète avec protocole MQTT pour échange de données entre capteurs, contrôleurs et dashboards en temps réel.",
      features: [
        "Publication/abonnement MQTT topics",
        "Données capteurs température/lumière",
        "Contrôle LEDs à distance",
        "QoS niveau 1 et 2 supportés",
        "Sécurité TLS optionnelle",
        "Architecture scalable cloud"
      ],
      technologies: ["ESP32 DevKit", "DHT22 Capteur", "Photorésistance", "Broker Mosquitto", "Node-RED", "Database InfluxDB"],
      image: {
        src: "/assets/projects/iot/mqtt-architecture.jpg",
        alt: "Architecture MQTT IoT multi-capteurs",
        caption: "Système IoT avec MQTT et multiple capteurs"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Client MQTT Multi-sensors
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#define LDRPIN 34

const char* ssid = "YourSSID";
const char* password = "YourPassword";
const char* mqtt_server = "192.168.1.100";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE 50
char msg[MSG_BUFFER_SIZE];

void setup_wifi() {
  delay(10);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  
  if (String(topic) == "home/led/control") {
    int ledState = message.toInt();
    digitalWrite(2, ledState);
  }
}

void reconnect() {
  while (!client.connected()) {
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      client.subscribe("home/led/control");
    } else {
      delay(5000);
    }
  }
}

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  dht.begin();
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  unsigned long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;
    
    // Read sensors
    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    int light = analogRead(LDRPIN);
    
    // Publish to MQTT
    snprintf(msg, MSG_BUFFER_SIZE, "%.2f", temp);
    client.publish("home/sensor/temperature", msg);
    
    snprintf(msg, MSG_BUFFER_SIZE, "%.2f", hum);
    client.publish("home/sensor/humidity", msg);
    
    snprintf(msg, MSG_BUFFER_SIZE, "%d", light);
    client.publish("home/sensor/light", msg);
  }
}`,
      challenges: [
        "Latence réseau variable",
        "Perte de paquets MQTT",
        "Synchronisation multi-capteurs",
        "Sécurité données IoT"
      ],
      solutions: [
        "QoS MQTT avec retransmission",
        "Buffer local et reconnect",
        "Timestamp horodatage messages",
        "Chiffrement TLS MQTT"
      ]
    },
    4: {
      title: "Station Surveillance Environnementale",
      subtitle: "ESP32 + DHT11 + HC-SR04 + Cloud IoT",
      description: "Station de monitoring environnemental avec capteurs température/humidité, distance ultrasonique et transmission données vers plateformes cloud.",
      features: [
        "Capteur DHT11 température/humidité",
        "Capteur HC-SR04 distance",
        "Connexion WiFi/GPRS optionnelle",
        "Dashboard cloud temps réel",
        "Alertes SMS/Email configurable",
        "Stockage données historique"
      ],
      technologies: ["ESP32", "DHT11 Sensor", "HC-SR04 Ultrasonic", "SIM800L GSM", "ThingSpeak", "Blynk IoT"],
      image: {
        src: "/assets/projects/iot/environment-monitoring.jpg",
        alt: "Station surveillance environnementale ESP32",
        caption: "Station IoT avec capteurs DHT11 et HC-SR04"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Station Surveillance Environnement
#include <WiFi.h>
#include <DHT.h>
#include <ThingSpeak.h>

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define TRIG_PIN 5
#define ECHO_PIN 18

const char* ssid = "YourSSID";
const char* password = "YourPassword";

unsigned long myChannelNumber = 1234567;
const char * myWriteAPIKey = "YOUR_API_KEY";

WiFiClient client;

void setup() {
  Serial.begin(115200);
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  
  ThingSpeak.begin(client);
}

float readDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2;
}

void loop() {
  // Read DHT11
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Read ultrasonic distance
  float distance = readDistance();
  
  // Send to ThingSpeak
  ThingSpeak.setField(1, temperature);
  ThingSpeak.setField(2, humidity);
  ThingSpeak.setField(3, distance);
  
  int httpCode = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  
  if(httpCode == 200) {
    Serial.println("Data sent successfully");
  } else {
    Serial.println("Problem sending data");
  }
  
  // Check alerts
  if(temperature > 30) {
    Serial.println("ALERT: High temperature!");
  }
  
  if(distance < 10) {
    Serial.println("ALERT: Object too close!");
  }
  
  delay(30000); // Send every 30 seconds
}`,
      challenges: [
        "Précision capteurs environnementaux",
        "Stabilité connexion longue durée",
        "Consommation énergie batterie",
        "Calibration multi-capteurs"
      ],
      solutions: [
        "Filtrage Kalman données capteurs",
        "Mode deep sleep entre mesures",
        "Alimentation solaire + batterie",
        "Procédure calibration automatique"
      ]
    },
    5: {
      title: "Dashboard Adafruit IO Monitoring",
      subtitle: "ESP32 + Adafruit IO + Visualisation Cloud",
      description: "Intégration complète avec plateforme Adafruit IO pour monitoring température/humidité en temps réel et contrôle à distance via dashboard web.",
      features: [
        "Feed Adafruit IO température/humidité",
        "Dashboard web avec graphiques",
        "Contrôle LED à distance",
        "Notifications push Adafruit",
        "Historique données 30 jours",
        "API REST complète"
      ],
      technologies: ["ESP32", "Adafruit IO", "MQTT Library", "DHT22 Sensor", "LEDs GPIO", "WiFi Manager"],
      image: {
        src: "/assets/projects/iot/adafruit-io-dashboard.jpg",
        alt: "Dashboard Adafruit IO avec ESP32",
        caption: "Visualisation données sur dashboard Adafruit IO"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Adafruit IO Integration
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <DHT.h>
#include <WiFi.h>

#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#define LED_PIN 2

// WiFi credentials
#define WLAN_SSID       "YourSSID"
#define WLAN_PASS       "YourPassword"

// Adafruit IO configuration
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "your_username"
#define AIO_KEY         "your_aio_key"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Feeds
Adafruit_MQTT_Publish temperatureFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temperature");
Adafruit_MQTT_Publish humidityFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/humidity");
Adafruit_MQTT_Subscribe ledFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/led");

void MQTT_connect();

void setup() {
  Serial.begin(115200);
  delay(10);
  
  pinMode(LED_PIN, OUTPUT);
  dht.begin();
  
  // Connect to WiFi
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  
  mqtt.subscribe(&ledFeed);
}

void loop() {
  MQTT_connect();
  
  // Read and publish sensor data
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  if (!isnan(temperature)) {
    temperatureFeed.publish(temperature);
  }
  
  if (!isnan(humidity)) {
    humidityFeed.publish(humidity);
  }
  
  // Check for LED control messages
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(5000))) {
    if (subscription == &ledFeed) {
      String message = (char *)ledFeed.lastread;
      if (message == "ON") {
        digitalWrite(LED_PIN, HIGH);
      } else if (message == "OFF") {
        digitalWrite(LED_PIN, LOW);
      }
    }
  }
  
  delay(10000); // Send every 10 seconds
}

void MQTT_connect() {
  int8_t ret;
  
  if (mqtt.connected()) {
    return;
  }
  
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    mqtt.disconnect();
    delay(5000);
    retries--;
    if (retries == 0) {
      while (1);
    }
  }
}`,
      challenges: [
        "Latence Adafruit IO cloud",
        "Limite quota messages gratuits",
        "Gestion authentification AIO key",
        "Synchronisation feed/dashboard"
      ],
      solutions: [
        "Buffer local et batch sending",
        "Optimisation fréquence envoi",
        "Rotation clés API sécurisée",
        "Webhooks pour synchronisation"
      ]
    },
    6: {
      title: "Contrôle Bluetooth BLE LED RGB",
      subtitle: "ESP32 + BLE + App LightBlue",
      description: "Système de contrôle LED RGB via Bluetooth Low Energy avec application mobile LightBlue. Commandes personnalisées et configuration facile.",
      features: [
        "Bluetooth BLE 4.2/5.0 support",
        "Application mobile LightBlue",
        "Commandes couleurs personnalisées",
        "Contrôle à distance sans fil",
        "Interface simple intuitive",
        "Connexion multi-appareils"
      ],
      technologies: ["ESP32 BLE", "LED RGB Common Cathode", "App LightBlue", "Smartphone Android/iOS", "Résistances 220Ω", "Breadboard"],
      image: {
        src: "/assets/projects/iot/ble-led-control.jpg",
        alt: "Contrôle LED RGB via Bluetooth BLE",
        caption: "ESP32 avec contrôle BLE via application LightBlue"
      },
      videoLink: "#",
      codeSnippet: `// ESP32 - Bluetooth BLE LED Control
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

// LED Pins
#define RED_PIN 25
#define GREEN_PIN 26
#define BLUE_PIN 27

class MyCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();
    
    if (value.length() > 0) {
      Serial.print("Received value: ");
      for (int i = 0; i < value.length(); i++) {
        Serial.print(value[i]);
      }
      Serial.println();
      
      // Parse color command: "R:G:B"
      if (value.find(":") != std::string::npos) {
        int firstColon = value.find(":");
        int lastColon = value.find(":", firstColon + 1);
        
        if (firstColon != std::string::npos && lastColon != std::string::npos) {
          int r = atoi(value.substr(0, firstColon).c_str());
          int g = atoi(value.substr(firstColon + 1, lastColon - firstColon - 1).c_str());
          int b = atoi(value.substr(lastColon + 1).c_str());
          
          analogWrite(RED_PIN, r);
          analogWrite(GREEN_PIN, g);
          analogWrite(BLUE_PIN, b);
          
          Serial.printf("Set LED to R:%d G:%d B:%d\n", r, g, b);
        }
      }
    }
  }
};

void setup() {
  Serial.begin(115200);
  
  // Setup LED PWM
  ledcSetup(0, 5000, 8);
  ledcSetup(1, 5000, 8);
  ledcSetup(2, 5000, 8);
  
  ledcAttachPin(RED_PIN, 0);
  ledcAttachPin(GREEN_PIN, 1);
  ledcAttachPin(BLUE_PIN, 2);
  
  // Initialize BLE
  BLEDevice::init("ESP32 LED Controller");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE
  );
  
  pCharacteristic->setCallbacks(new MyCallbacks());
  pCharacteristic->setValue("Hello World");
  pService->start();
  
  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  
  Serial.println("BLE LED Controller Ready!");
}

void loop() {
  delay(2000);
}`,
      challenges: [
        "Portée Bluetooth limitée",
        "Compatibilité appareils divers",
        "Sécurité connexion BLE",
        "Gestion connexions multiples"
      ],
      solutions: [
        "Amplificateur signal BLE optionnel",
        "Profils BLE standardisés",
        "Pairing sécurisé avec clé",
        "Gestion file d'attente connexions"
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