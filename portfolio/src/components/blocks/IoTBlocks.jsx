// components/blocks/IoTBlocks.jsx - MIS À JOUR avec nouveaux snippets
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import des images depuis le dossier assets
import cheerlightsImg from '../../assets/cheerlights-mqtt.png';
import esp32camImg from '../../assets/esp32-web-server.png';
import mqttArchitectureImg from '../../assets/mqtt-architecture.png';
import envMonitoringImg from '../../assets/environment-monitoring.png';
import adafruitIoImg from '../../assets/adafruit-io-dashboard.png';
import bleControlImg from '../../assets/ble-led-control.png';

// Import des vidéos depuis le dossier assets/videos
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
        title: "Serveur Web Streaming Vidéo ESP32-CAM",
        subtitle: "ESP32-CAM + Streaming HTTP + Contrôle LEDs",
        description: "Serveur web embarqué sur ESP32-CAM avec streaming vidéo en direct et contrôle interactif de LEDs via interface web personnalisée. Solution complète de surveillance à distance avec contrôle en temps réel.",
        features: [
          "Streaming vidéo 640x480 à 15fps en direct",
          "Page web responsive avec contrôles interactifs",
          "Boutons ON/OFF pour LEDs avec états visuels",
          "Interface utilisateur intuitive mobile/desktop",
          "Serveur HTTP intégré avec API REST",
          "Point d'accès WiFi intégré"
        ],
        technologies: ["ESP32-CAM", "Module OV2640", "LED GPIO", "WiFi AP/STA", "HTTP Server", "JPEG Compression"],
        imageCaption: "ESP32-CAM streaming vidéo avec contrôle web",
        videoDescription: "Démonstration du streaming vidéo en direct et du contrôle des LEDs via l'interface web responsive.",
        codeSnippet: `// ESP32-CAM - Serveur Web avec Streaming
#include "esp_camera.h"
#include <WiFi.h>
#include "esp_timer.h"
#include "img_converters.h"
#include "Arduino.h"
#include "fb_gfx.h"
#include "soc/soc.h" 
#include "soc/rtc_cntl_reg.h" 
#include "esp_http_server.h"

const char* ssid = "SSID";
const char* password = "PASSWORD";

#define PART_BOUNDARY "123456789000000000000987654321"

#define CAMERA_MODEL_AI_THINKER

#if defined(CAMERA_MODEL_AI_THINKER)
  #define PWDN_GPIO_NUM     32
  #define RESET_GPIO_NUM    33
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

#else
  #error "Camera model not selected"
#endif

#define LED_PIN    14

static const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* _STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char* _STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

httpd_handle_t camera_httpd = NULL;
httpd_handle_t stream_httpd = NULL;

static const char PROGMEM INDEX_HTML[] = R"rawliteral(
<html>
  <head>
    <title>ESP32-CAM Robot</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body { font-family: Arial; text-align: center; margin:0px auto; padding-top: 30px;}
      table { margin-left: auto; margin-right: auto; }
      td { padding: 8 px; }
      .button {
        background-color: #2f4468;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 18px;
        margin: 6px 3px;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
      img {  width: auto ;
        max-width: 100% ;
        height: auto ; 
        transform: rotate(180deg);
      }
    </style>
  </head>
  <body>
    <h1>ESP32 CAMERA</h1>
    <img src="" id="photo" >
    <table>
      <tr><td align="center"><button class="button" onmousedown="toggleCheckbox('on');" ontouchstart="toggleCheckbox('on');onmouseup="toggleCheckbox('on');" ontouchend="toggleCheckbox('on');">ON</button></td>
      <td align="center"><button class="button" onmousedown="toggleCheckbox('off');" ontouchstart="toggleCheckbox('off');onmouseup="toggleCheckbox('off');" ontouchend="toggleCheckbox('off');">OFF</button></td></tr>
    </table>
   <script>
   function toggleCheckbox(x) {
     var xhr = new XMLHttpRequest();
     xhr.open("GET", "/action?go=" + x, true);
     xhr.send();
   }
   window.onload = document.getElementById("photo").src = window.location.href.slice(0, -1) + ":81/stream";
  </script>
  </body>
</html>
)rawliteral";

static esp_err_t index_handler(httpd_req_t *req){
  httpd_resp_set_type(req, "text/html");
  return httpd_resp_send(req, (const char *)INDEX_HTML, strlen(INDEX_HTML));
}

static esp_err_t stream_handler(httpd_req_t *req){
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len = 0;
  uint8_t * _jpg_buf = NULL;
  char * part_buf[64];

  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
  if(res != ESP_OK){
    return res;
  }

  while(true){
    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      res = ESP_FAIL;
    } else {
      if(fb->width > 400){
        if(fb->format != PIXFORMAT_JPEG){
          bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);
          esp_camera_fb_return(fb);
          fb = NULL;
          if(!jpeg_converted){
            Serial.println("JPEG compression failed");
            res = ESP_FAIL;
          }
        } else {
          _jpg_buf_len = fb->len;
          _jpg_buf = fb->buf;
        }
      }
    }
    if(res == ESP_OK){
      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
    }
    if(res == ESP_OK){
      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
    }
    if(res == ESP_OK){
      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));
    }
    if(fb){
      esp_camera_fb_return(fb);
      fb = NULL;
      _jpg_buf = NULL;
    } else if(_jpg_buf){
      free(_jpg_buf);
      _jpg_buf = NULL;
    }
    if(res != ESP_OK){
      break;
    }
  }
  return res;
}

static esp_err_t cmd_handler(httpd_req_t *req){
  char*  buf;
  size_t buf_len;
  char variable[32] = {0,};
  
  buf_len = httpd_req_get_url_query_len(req) + 1;
  if (buf_len > 1) {
    buf = (char*)malloc(buf_len);
    if(!buf){
      httpd_resp_send_500(req);
      return ESP_FAIL;
    }
    if (httpd_req_get_url_query_str(req, buf, buf_len) == ESP_OK) {
      if (httpd_query_key_value(buf, "go", variable, sizeof(variable)) == ESP_OK) {
      } else {
        free(buf);
        httpd_resp_send_404(req);
        return ESP_FAIL;
      }
    } else {
      free(buf);
      httpd_resp_send_404(req);
      return ESP_FAIL;
    }
    free(buf);
  } else {
    httpd_resp_send_404(req);
    return ESP_FAIL;
  }

  sensor_t * s = esp_camera_sensor_get();
  int res = 0;
  
  if(!strcmp(variable, "on")) {
    Serial.println("ON");
    digitalWrite(LED_PIN, 1);
  }
  else if(!strcmp(variable, "off")) {
    Serial.println("OFF");
    digitalWrite(LED_PIN, 0);
  }
  else {
    res = -1;
  }

  if(res){
    return httpd_resp_send_500(req);
  }

  httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
  return httpd_resp_send(req, NULL, 0);
}

void startCameraServer(){
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();
  config.server_port = 80;
  httpd_uri_t index_uri = {
    .uri       = "/",
    .method    = HTTP_GET,
    .handler   = index_handler,
    .user_ctx  = NULL
  };

  httpd_uri_t cmd_uri = {
    .uri       = "/action",
    .method    = HTTP_GET,
    .handler   = cmd_handler,
    .user_ctx  = NULL
  };
  httpd_uri_t stream_uri = {
    .uri       = "/stream",
    .method    = HTTP_GET,
    .handler   = stream_handler,
    .user_ctx  = NULL
  };
  if (httpd_start(&camera_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(camera_httpd, &index_uri);
    httpd_register_uri_handler(camera_httpd, &cmd_uri);
  }
  config.server_port += 1;
  config.ctrl_port += 1;
  if (httpd_start(&stream_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &stream_uri);
  }
}

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector
  
  pinMode(LED_PIN, OUTPUT);
  
  Serial.begin(115200);
  Serial.setDebugOutput(false);
  
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
  
  if(psramFound()){
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  
  Serial.print("Camera Stream Ready! Go to: http://");
  Serial.println(WiFi.localIP());
  
  startCameraServer();
}

void loop() {
  // Main loop - server handles requests automatically
}`,
        challenges: [
          "Performance streaming vidéo stable",
          "Gestion mémoire avec compression JPEG",
          "Chauffage ESP32-CAM",
          "Interface web responsive"
        ],
        solutions: [
          "Buffer JPEG optimisé et compression adaptative",
          "Utilisation PSRAM pour buffers image",
          "Ventilation et throttling température",
          "CSS responsive design"
        ],
        imageExplanation: "L'ESP32-CAM intègre un module caméra OV2640 de 2MP et sert une interface web complète via HTTP. Le serveur web streaming utilise le format multipart/x-mixed-replace pour diffuser des images JPEG en continu avec rafraîchissement automatique."
      },
      3: {
        title: "Communication MQTT avec Capteurs Multiples",
        subtitle: "ESP32 + Broker HiveMQ + Thermistor + Bouton",
        description: "Architecture IoT MQTT complète pour communication bidirectionnelle entre ESP32 et broker cloud. Publication de données de capteur (température) et contrôle à distance de LED.",
        features: [
          "Publication données thermistor sur topic MQTT",
          "Contrôle LED à distance via messages MQTT",
          "Détection bouton pour déclenchement publication",
          "Abonnement aux topics de contrôle",
          "Reconnexion automatique au broker",
          "Support QoS MQTT"
        ],
        technologies: ["ESP32 DevKit", "Thermistor NTC 10K", "Broker HiveMQ", "PubSubClient", "WiFi Client", "GPIO Digital/Analog"],
        imageCaption: "Architecture MQTT avec capteur température et contrôle LED",
        videoDescription: "Démonstration de la communication MQTT bidirectionnelle avec publication température et contrôle LED.",
        codeSnippet: `// ESP32 - Client MQTT avec Thermistor et LED
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "SSID";
const char* password = "PASSWORD";

const char* mqtt_server = "broker.hivemq.com";
const char* unique_identifier = "sunfounder-client-sdgvsda";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
int value = 0;

const int ledPin = 4;
const int buttonPin = 14;

const int thermistorPin = 36; // Pin connected to the thermistor
const float referenceVoltage = 3.3;
const float referenceResistor = 10000; // Resistance value (10k)
const float beta = 3950; // Beta value (Typical Value)
const float nominalTemperature = 25; // Nominal temperature for temperature coefficient
const float nominalResistance = 10000; // Resistance at nominal temperature

void setup() {
  Serial.begin(115200);
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
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

  if (String(topic) == "SF/LED") {
    Serial.print("Changing state to ");
    if (messageTemp == "on") {
      Serial.println("on");
      digitalWrite(ledPin, HIGH);
    } else if (messageTemp == "off") {
      Serial.println("off");
      digitalWrite(ledPin, LOW);
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(unique_identifier)) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("SF/LED");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

float thermistor() {
  int adcValue = analogRead(thermistorPin); // Read ADC value
  float voltage = (adcValue * referenceVoltage) / 4095.0; // Calculate voltage
  float resistance = (voltage * referenceResistor) / (referenceVoltage - voltage); // Calculate thermistor resistance

  float tempK = 1 / (((log(resistance / nominalResistance)) / beta) + (1 / (nominalTemperature + 273.15)));
  
  float tempC = tempK - 273.15; // Get temperature in Celsius
  float tempF = 1.8 * tempC + 32.0; // Get temperature in Fahrenheit

  Serial.print("Temp: ");
  Serial.println(tempC);
  delay(200); //wait for 200 milliseconds
  return tempC;
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // if the button pressed, publish the temperature to topic "SF/TEMP"
  if (digitalRead(buttonPin)) {
    long now = millis();
    if (now - lastMsg > 5000) {
      lastMsg = now;
      char tempString[8];
      dtostrf(thermistor(), 1, 2, tempString);
      client.publish("SF/TEMP", tempString);
    }
  }
}`,
        challenges: [
          "Précision mesure température avec thermistor",
          "Déconnexions MQTT fréquentes",
          "Gestion bouton avec anti-rebond",
          "Formatage données pour publication"
        ],
        solutions: [
          "Calibration thermistor et équation Steinhart-Hart",
          "Reconnexion automatique avec backoff",
          "Filtrage logiciel pour anti-rebond",
          "Conversion float vers string optimisée"
        ],
        imageExplanation: "Ce système utilise le broker MQTT public HiveMQ pour la communication IoT. L'ESP32 mesure la température via un thermistor NTC 10K et publie les données sur le topic 'SF/TEMP' lorsqu'un bouton est pressé. Il s'abonne également au topic 'SF/LED' pour recevoir des commandes de contrôle à distance de la LED."
      },
      4: {
        title: "Station de Surveillance Environnementale Blynk",
        subtitle: "ESP32 + DHT11 + Ultrason + Buzzer + Dashboard Blynk",
        description: "Station IoT complète de surveillance environnementale avec capteurs DHT11 (température/humidité), capteur ultrasonique HC-SR04 (distance), et buzzer d'alerte. Interface de contrôle via dashboard Blynk avec seuils configurables.",
        features: [
          "Mesure température/humidité DHT11 précise",
          "Détection distance avec capteur ultrasonique HC-SR04",
          "Alertes sonores via buzzer avec seuils configurables",
          "Dashboard Blynk temps réel avec visualisation données",
          "Seuils d'alerte personnalisables (température, humidité, distance)",
          "Mode Away avec LED indicateur"
        ],
        technologies: ["ESP32 DevKit", "DHT11 Sensor", "HC-SR04 Ultrasonic", "Buzzer Piezo", "Blynk IoT Platform", "WiFi Client"],
        imageCaption: "Station IoT surveillance environnementale avec dashboard Blynk",
        videoDescription: "Démonstration complète du monitoring environnemental avec alertes et dashboard Blynk interactif.",
        codeSnippet: `// ESP32 - Station Surveillance Environnementale Blynk
#define BLYNK_TEMPLATE_ID "TMPL5X9OsFEyv"
#define BLYNK_TEMPLATE_NAME "Station de surveillance"
#define BLYNK_AUTH_TOKEN "qbhhfBqOT654NbxYzizlzkKH8eizqWbx"

#include "DHT.h"
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

// Pins capteurs et buzzer
#define DHTPIN 13
#define DHTTYPE DHT11
#define TRIGPIN 12
#define ECHOPIN 14
#define BUZZPIN 15

// Seuils par défaut
#define MAX_TEMP 30.0
#define MIN_HUMIDITE 40.0
#define SEUIL_DISTANCE 20.0

// WiFi credentials
char *ssid = "Livebox-7990";
char *pass = "EwQdyDAEPwxPJw4E9p";

// Variables globales
float temperature;
float humidite;
float distanceObstacle;

BlynkTimer timer;
DHT dht(DHTPIN, DHTTYPE);

void wifi_setup() {
  Serial.println();
  Serial.print("Connect to ");
  Serial.println(ssid);

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void readDHT() {
  temperature = dht.readTemperature();
  humidite = dht.readHumidity();
}

bool valeursvalides() {
  if (isnan(temperature) || isnan(humidite)) {
    Serial.println("Failed to read from DHT sensor!");
    return false;
  }
  return true;
}

void mesureDistance() {
  digitalWrite(TRIGPIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGPIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGPIN, LOW);

  unsigned long microsecond = pulseIn(ECHOPIN, HIGH);
  distanceObstacle = microsecond / 29.0 / 2.0;

  Serial.print("Distance: ");
  Serial.print(distanceObstacle);
  Serial.println(" cm");

  delay(200);
}

bool obstacleDetecte(float seuil) {
  return distanceObstacle < seuil;
}

void alerter() {
  tone(BUZZPIN, 1000);
}

void eteindreAlerte() {
  noTone(BUZZPIN);
}

void verifierSeuils(float maxTemp, float minHumidite, float seuilDistance) {
  bool dangerTemp = temperature > maxTemp;
  bool dangerHum = humidite < minHumidite;
  bool dangerDist = distanceObstacle < seuilDistance;

  if (dangerTemp || dangerHum || dangerDist) {
    alerter();
  } else {
    eteindreAlerte();
  }
}

void envoyerEtat() {
  // V1 : température
  Blynk.virtualWrite(V1, temperature);
  // V2 : humidité
  Blynk.virtualWrite(V2, humidite);
  // V3 : distance
  Blynk.virtualWrite(V3, distanceObstacle);
  // V0 : AwayMode (LED)
  bool danger = (temperature > MAX_TEMP || humidite < MIN_HUMIDITE || distanceObstacle < SEUIL_DISTANCE);
  Blynk.virtualWrite(V0, danger ? 255 : 0);
}

void setup() {
  Serial.begin(115200);

  // Initialisation Blynk
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);

  // Timer pour envoyer les données toutes les 2s
  timer.setInterval(2000L, envoyerEtat);

  // Capteurs
  dht.begin();
  pinMode(TRIGPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);
  pinMode(BUZZPIN, OUTPUT);

  Serial.println("Station ready");
}

void loop() {
  Blynk.run();
  timer.run();

  // Lecture capteurs
  readDHT();
  if (valeursvalides()) {
    mesureDistance();
    verifierSeuils(MAX_TEMP, MIN_HUMIDITE, SEUIL_DISTANCE);
  }
}`,
        challenges: [
          "Synchronisation lecture multi-capteurs",
          "Latence connexion Blynk",
          "Gestion alertes fausses positives",
          "Calibration capteur ultrasonique"
        ],
        solutions: [
          "Timer non-bloquant pour lecture séquentielle",
          "Buffer local et envoi batch",
          "Hystérésis pour seuils d'alerte",
          "Filtrage médian des mesures distance"
        ],
        imageExplanation: "Cette station IoT utilise la plateforme Blynk pour créer un dashboard de monitoring environnemental. Les données des capteurs DHT11 (température/humidité) et HC-SR04 (distance) sont envoyées en temps réel via WiFi à l'application Blynk. Un buzzer est activé lorsque les seuils configurés sont dépassés, et une LED virtuelle dans le dashboard indique l'état d'alerte."
      },
      5: {
        title: "Dashboard Adafruit IO SSL/TLS",
        subtitle: "ESP32 + Adafruit IO + DHT11 + Contrôle LED SSL",
        description: "Intégration avancée avec plateforme Adafruit IO utilisant une connexion SSL/TLS sécurisée. Monitoring température/humidité avec DHT11 et contrôle LED à distance via feeds MQTT chiffrés.",
        features: [
          "Connexion SSL/TLS sécurisée à Adafruit IO",
          "Publication température/humidité DHT11 sur feeds",
          "Contrôle LED à distance via feed dédié",
          "Callback pour traitement commandes en temps réel",
          "Reconnexion automatique avec gestion erreurs",
          "Certificat root CA intégré pour sécurité"
        ],
        technologies: ["ESP32 DevKit", "DHT11 Sensor", "Adafruit IO Platform", "WiFiClientSecure", "Adafruit MQTT Library", "SSL/TLS Encryption"],
        imageCaption: "Dashboard Adafruit IO avec connexion SSL/TLS sécurisée",
        videoDescription: "Démonstration du monitoring sécurisé avec Adafruit IO et contrôle LED à distance.",
        codeSnippet: `// ESP32 - Adafruit IO SSL/TLS avec DHT11
#include <WiFi.h>
#include "WiFiClientSecure.h"
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define WLAN_SSID "SSID"
#define WLAN_PASS "PASSWORD"

#define AIO_SERVER "io.adafruit.com"
#define AIO_SERVERPORT 8883

// Utilisez des variables d'environnement pour ces valeurs
#define AIO_USERNAME "YOUR_ADAFRUIT_USERNAME"
#define AIO_KEY "YOUR_ADAFRUIT_IO_KEY"

WiFiClientSecure client;

Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// io.adafruit.com root CA
const char* adafruitio_root_ca = \
"-----BEGIN CERTIFICATE-----\n" \
"MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\n" \
"MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\n" \
"d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\n" \
"QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\n" \
"MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\n" \
"b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n" \
"9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\n" \
"CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\n" \
"nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n" \
"43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\n" \
"T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\n" \
"gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\n" \
"BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\n" \
"TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\n" \
"DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\n" \
"hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n" \
"06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\n" \
"PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\n" \
"YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\n" \
"CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\n" \
"-----END CERTIFICATE-----\n";

Adafruit_MQTT_Subscribe LED = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/LED");
Adafruit_MQTT_Publish humidity = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/humidity");
Adafruit_MQTT_Publish temperature = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temperature");

const int ledPin = 15;

#include "DHT.h"
#define DHTPIN 13      // Set the pin connected to the DHT11 data pin
#define DHTTYPE DHT11  // DHT 11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(10);

  Serial.println(F("Adafruit IO MQTTS (SSL/TLS) Example"));

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  delay(1000);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  delay(2000);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Set Adafruit IO's root CA
  client.setCACert(adafruitio_root_ca);

  // register callback for feed
  LED.setCallback(ledCallback);
  // Setup MQTT subscription for time feed.
  mqtt.subscribe(&LED);

  // initialize the LED pin as an output
  pinMode(ledPin, OUTPUT);

  // Initialize the dht11
  dht.begin();
}

void loop() {
  MQTT_connect();
  indicatorPublish();

  // wait 10 seconds for subscription messages
  mqtt.processPackets(5000);
}

void ledCallback(char* message, uint16_t len) {
  char messageBuffer[40];
  snprintf(messageBuffer, sizeof(messageBuffer), "LED status is :: %s, len :: %u", message, len);
  Serial.println(messageBuffer);
  if (strcmp(message, "ON") == 0) {
    Serial.println("Turning ON LED");
    digitalWrite(ledPin, HIGH);
  } else {
    Serial.println("Turning OFF LED");
    digitalWrite(ledPin, LOW);
  }
}

void indicatorPublish() {
  float humValue = dht.readHumidity();
  float tempValue = dht.readTemperature();

  if (isnan(humValue) || isnan(tempValue)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if (!temperature.publish(tempValue)) {
    Serial.println(F("Failed"));
  } else {
    Serial.print("Temperature: ");
    Serial.println(tempValue);
  }
  if (!humidity.publish(humValue)) {
    Serial.println(F("Failed"));
  } else {
    Serial.print("Humidity: ");
    Serial.println(humValue);
  }
}

void MQTT_connect() {
  int8_t ret;
  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }
  Serial.print("Connecting to MQTT... ");
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {  // connect will return 0 for connected
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying MQTT connection in 5 seconds...");
    mqtt.disconnect();
    delay(5000);  // wait 5 seconds
    retries--;
    if (retries == 0) {
      // basically die and wait for WDT to reset me
      while (1)
        ;
    }
  }
  Serial.println("MQTT Connected!");
}`,
        challenges: [
          "Gestion certificats SSL/TLS sur ESP32",
          "Limite mémoire pour connexion sécurisée",
          "Latence connexion SSL vs non-SSL",
          "Gestion erreurs connexion sécurisée"
        ],
        solutions: [
          "Certificat root CA intégré dans le code",
          "Optimisation buffers et mémoire SSL",
          "Timeout configurable et reconnexion",
          "Debug détaillé des erreurs SSL"
        ],
        imageExplanation: "Ce projet utilise une connexion SSL/TLS sécurisée pour communiquer avec la plateforme Adafruit IO. Le certificat root CA est intégré dans le code pour authentifier le serveur. Les données du capteur DHT11 sont publiées sur des feeds dédiés, et un feed de contrôle permet d'allumer/éteindre une LED à distance via des messages MQTT chiffrés."
      },
      6: {
        title: "Contrôle Bluetooth BLE LED RGB Avancé",
        subtitle: "ESP32 + BLE + Contrôle LED RGB + Notifications",
        description: "Système de contrôle LED RGB complet via Bluetooth Low Energy avec service GATT personnalisé. Support de commandes avancées (couleurs, modes) et notifications bidirectionnelles avec application mobile.",
        features: [
          "Service BLE GATT personnalisé avec UUIDs uniques",
          "Caractéristiques RX/TX pour communication bidirectionnelle",
          "Contrôle LED RGB avec PWM 8 bits",
          "Support 6 couleurs prédéfinies (red, green, blue, yellow, purple, off)",
          "Notifications BLE pour confirmation commandes",
          "Gestion connexions/déconnexions clients"
        ],
        technologies: ["ESP32 BLE", "LED RGB Common Anode", "PWM Hardware", "BLEDevice Library", "GATT Protocol", "BLE Server/Client"],
        imageCaption: "Contrôle LED RGB avancé via Bluetooth BLE avec ESP32",
        videoDescription: "Démonstration complète du contrôle des couleurs LED via Bluetooth BLE avec notifications.",
        codeSnippet: `// ESP32 - Contrôle Bluetooth BLE LED RGB
#include "BLEDevice.h"
#include "BLEServer.h"
#include "BLEUtils.h"
#include "BLE2902.h"

// Define RGB LED pins
const int redPin = 27;
const int greenPin = 26;
const int bluePin = 25;

// Define PWM frequency and resolution
const int freq = 5000;
const int resolution = 8;

// Define the Bluetooth device name
const char *bleName = "ESP32_Bluetooth";

// Define the received text and the time of the last message
String receivedText = "";
unsigned long lastMessageTime = 0;

// Define the UUIDs of the service and characteristics
#define SERVICE_UUID "8785d8b3-9d23-473b-aee5-3fabe2ba9583"
#define CHARACTERISTIC_UUID_RX "b2bcd13b-aab6-4660-92ae-40abf6941fce"
#define CHARACTERISTIC_UUID_TX "4219d86a-d701-4fd2-bd84-04db50f70fe2"

// Define the Bluetooth characteristic
BLECharacteristic *pCharacteristic;

void setup() {
  Serial.begin(115200); 
  setupBLE(); 

  ledcAttach(redPin, freq, resolution);
  ledcAttach(greenPin, freq, resolution);
  ledcAttach(bluePin, freq, resolution);
}

void loop() {
  // When the received text is not empty and the time since the last message is over 1 second
  // Send a notification and print the received text
  if (receivedText.length() > 0 && millis() - lastMessageTime > 1000) {
    Serial.print("Received message: ");
    Serial.println(receivedText);
    pCharacteristic->setValue(receivedText.c_str());
    pCharacteristic->notify();
    receivedText = "";
  }

  // Read data from the serial port and send it to BLE characteristic
  if (Serial.available() > 0) {
    String str = Serial.readStringUntil('\n');
    const char *newValue = str.c_str();
    pCharacteristic->setValue(newValue);
    pCharacteristic->notify();
  }
}

// Define the BLE server callbacks
class MyServerCallbacks : public BLEServerCallbacks {
  // Print the connection message when a client is connected
  void onConnect(BLEServer *pServer) {
    Serial.println("Connected");
  }
  // Print the disconnection message when a client is disconnected
  void onDisconnect(BLEServer *pServer) {
    Serial.println("Disconnected");
  }
};

// Define the BLE characteristic callbacks
class MyCharacteristicCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = std::string(pCharacteristic->getValue().c_str());
    if (value == "led_off") {
      setColor(0, 0, 0); // turn the RGB LED off
      Serial.println("RGB LED turned off");
    } else if (value == "red") {
      setColor(255, 0, 0); // Red
      Serial.println("red");
    }
    else if (value == "green") {
      setColor(0, 255, 0); // green
      Serial.println("green");
    }
    else if (value == "blue") {
      setColor(0, 0, 255); // blue
      Serial.println("blue");
    }
    else if (value == "yellow") {
      setColor(255, 150, 0); // yellow
      Serial.println("yellow");
    }
    else if (value == "purple") {
      setColor(80, 0, 80); // purple
      Serial.println("purple");
    }
  }
};

// Initialize the Bluetooth BLE
void setupBLE() {
  BLEDevice::init(bleName);                        // Initialize the BLE device
  BLEServer *pServer = BLEDevice::createServer();  // Create the BLE server
  // Print the error message if the BLE server creation fails
  if (pServer == nullptr) {
    Serial.println("Error creating BLE server");
    return;
  }
  pServer->setCallbacks(new MyServerCallbacks());  // Set the BLE server callbacks

  // Create the BLE service
  BLEService *pService = pServer->createService(SERVICE_UUID);
  // Print the error message if the BLE service creation fails
  if (pService == nullptr) {
    Serial.println("Error creating BLE service");
    return;
  }
  // Create the BLE characteristic for sending notifications
  pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_NOTIFY);
  pCharacteristic->addDescriptor(new BLE2902()); 
  // Create the BLE characteristic for receiving data
  BLECharacteristic *pCharacteristicRX = pService->createCharacteristic(CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE);
  pCharacteristicRX->setCallbacks(new MyCharacteristicCallbacks()); 
  pService->start();   
  pServer->getAdvertising()->start(); 
  Serial.println("Waiting for a client connection...");  
}

void setColor(int red, int green, int blue) {
  // For common-anode RGB LEDs, use 255 minus the color value
  ledcWrite(redPin, red);
  ledcWrite(greenPin, green);
  ledcWrite(bluePin, blue);
}`,
        challenges: [
          "Compatibilité appareils BLE divers",
          "Gestion mémoire caractéristiques BLE",
          "Latence commande → action LED",
          "Sécurité connexion BLE"
        ],
        solutions: [
          "Profils BLE standardisés (GATT)",
          "Optimisation buffers caractéristiques",
          "Callback direct pour traitement immédiat",
          "Pairing avec authentification"
        ],
        imageExplanation: "Ce système BLE crée un service GATT personnalisé avec deux caractéristiques : une pour recevoir des commandes (RX) et une pour envoyer des notifications (TX). Les commandes textuelles ('red', 'green', 'blue', 'yellow', 'purple', 'led_off') sont reçues via BLE et converties en valeurs PWM pour contrôler la LED RGB. Des notifications sont envoyées en retour pour confirmer l'exécution des commandes."
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