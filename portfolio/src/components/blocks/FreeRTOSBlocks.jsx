// components/blocks/FreeRTOSBlocks.jsx - PROJET 4 (FreeRTOS)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import des images de démonstration SEULEMENT
import mutexDemoImg from '../../assets/freertos/demo/mutex-demo.png';
import isrSemaphoreDemoImg from '../../assets/freertos/demo/isr-semaphore-demo.png';
import isrQueueDemoImg from '../../assets/freertos/demo/isr-queue-demo.png';
import proUartDemoImg from '../../assets/freertos/demo/pro-uart-demo.png';

const FreeRTOSBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [demoImageError, setDemoImageError] = useState(false);

  const handleDemoImageError = () => {
    setDemoImageError(true);
  };

  // Tableau des images de démonstration par bloc
  const demoImages = {
    1: mutexDemoImg,
    2: isrSemaphoreDemoImg,
    3: isrQueueDemoImg,
    4: proUartDemoImg
  };

  const getBlockData = (id) => {
    const blocksData = {
      1: {
        title: "Mutex et Synchronisation FreeRTOS",
        subtitle: "Gestion d'accès UART partagé avec mutex",
        description: "Implémentation simple et efficace d'un mutex FreeRTOS pour synchroniser l'accès à une ressource partagée (UART) entre plusieurs tâches.",
        features: [
          "Synchronisation UART partagé",
          "Protection de section critique",
          "Deux tâches avec priorités différentes",
          "Accès séquentiel sécurisé",
          "Gestion des délais d'attente",
          "Simplicité d'implémentation"
        ],
        technologies: ["ESP32", "FreeRTOS Mutex", "Serial Communication", "Task Scheduler", "Priority Management"],
        detailedExplanation: "",
        demoCaption: "Démonstration de synchronisation UART avec mutex",
        codeSnippet: `// Bloc 1: Synchronisation UART avec Mutex
#include <Arduino.h>

SemaphoreHandle_t uartMutex;

void TaskCom1(void *pvParameters) {
  while(1) {
    if (xSemaphoreTake(uartMutex, portMAX_DELAY)) {
      Serial.println("TaskCom1 writing...");
      delay(100); // Simule un accès long
      xSemaphoreGive(uartMutex);
    }
    vTaskDelay(200 / portTICK_PERIOD_MS);
  }
}

void TaskCom2(void *pvParameters) {
  while(1) {
    if (xSemaphoreTake(uartMutex, portMAX_DELAY)) {
      Serial.println("TaskCom2 writing...");
      delay(50); // Accès plus court
      xSemaphoreGive(uartMutex);
    }
    vTaskDelay(150 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Créer le mutex
  uartMutex = xSemaphoreCreateMutex();

  // Créer les tâches sur le même cœur
  xTaskCreatePinnedToCore(TaskCom1, "COM1", 4096, NULL, 2, NULL, 1);
  xTaskCreatePinnedToCore(TaskCom2, "COM2", 4096, NULL, 3, NULL, 1);
}

void loop() {
  // Laisser FreeRTOS gérer les tâches
  vTaskDelay(1000 / portTICK_PERIOD_MS);
}`,
        challenges: [
          "Éviter les conflits d'accès UART",
          "Gérer les priorités différentes",
          "Prévenir les deadlocks",
          "Optimiser les temps d'attente"
        ],
        solutions: [
          "Mutex pour sérialiser les accès",
          "Priorité configurable par tâche",
          "Timeout sur prise de mutex",
          "Délais adaptés aux besoins"
        ]
      },
      2: {
        title: "Communication ISR → Tâche via Sémaphore",
        subtitle: "Interruption bouton vers tâche FreeRTOS",
        description: "Système simple de communication d'une interruption matérielle (bouton) vers une tâche FreeRTOS via un sémaphore binaire.",
        features: [
          "Interruption GPIO sur front descendant",
          "Sémaphore binaire ISR→Tâche",
          "Tâche LED clignotante",
          "Réveil tâche par interruption",
          "Gestion priorité tâches",
          "Débogage série intégré"
        ],
        technologies: ["ESP32 GPIO", "FreeRTOS Binary Semaphore", "Hardware Interrupt", "LED Control", "Task Notification"],
        detailedExplanation: "",
        demoCaption: "Communication bouton→tâche via sémaphore",
        codeSnippet: `// Bloc 2: ISR → Tâche avec Sémaphore Binaire
#include <Arduino.h>

SemaphoreHandle_t buttonSemaphore;

#define BUTTON_PIN 18
#define LED_PIN 26

void IRAM_ATTR buttonISR() {
  BaseType_t xHigherPriorityTaskWoken = pdFALSE;

  // Donner le sémaphore depuis l'ISR
  xSemaphoreGiveFromISR(buttonSemaphore, &xHigherPriorityTaskWoken);

  // Forcer le changement de contexte si nécessaire
  portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}

void ButtonTask(void *pvParameters) {
  while(1) {
    if(xSemaphoreTake(buttonSemaphore, portMAX_DELAY)) {
      Serial.println("Bouton détecté → tâche réveillée !");

      // Traitement long simulé
      for (int i = 0; i < 5; i++) {
        Serial.println("ButtonTask en cours...");
        vTaskDelay(200 / portTICK_PERIOD_MS);
      }
      Serial.println("ButtonTask terminé, LEDTask reprend.");
    }
  }
}

void LedTask(void *pvParameters) {
  while(1) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("LED → ON !");
    vTaskDelay(1000 / portTICK_PERIOD_MS);

    digitalWrite(LED_PIN, LOW);
    Serial.println("LED → OFF !");
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Créer sémaphore binaire
  buttonSemaphore = xSemaphoreCreateBinary();

  // Configuration GPIO
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);

  // Attacher interruption
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonISR, FALLING);

  // Créer les tâches
  xTaskCreatePinnedToCore(ButtonTask, "ButtonTask", 4096, NULL, 3, NULL, 1);
  xTaskCreatePinnedToCore(LedTask, "LedTask", 2048, NULL, 2, NULL, 1);

  Serial.println("Système prêt - Appuyez sur le bouton !");
}

void loop() {
  vTaskDelay(1000 / portTICK_PERIOD_MS);
}`,
        challenges: [
          "Latence ISR→Tâche minimale",
          "Éviter les rebonds de bouton",
          "Gestion priorité ISR",
          "Synchronisation tâches"
        ],
        solutions: [
          "xSemaphoreGiveFromISR() optimisé",
          "Filtrage logiciel ou hardware",
          "Priorité NVIC configurable",
          "Sémaphore binaire efficace"
        ]
      },
      3: {
        title: "Communication Timer → Tâche avec Queue",
        subtitle: "Timer logiciel FreeRTOS vers file d'attente",
        description: "Système de génération périodique de données capteur via timer logiciel FreeRTOS et transmission vers tâche via file d'attente.",
        features: [
          "Timer logiciel FreeRTOS périodique",
          "File d'attente pour données structurées",
          "Génération données aléatoires",
          "Timestamp sur chaque mesure",
          "Communication inter-tâches",
          "Monitoring série en temps réel"
        ],
        technologies: ["FreeRTOS Software Timer", "Queue Management", "Sensor Simulation", "Data Structuring", "Task Communication"],
        detailedExplanation: "",
        demoCaption: "Timer → Queue → Tâche avec données structurées",
        codeSnippet: `// Bloc 3: Timer → Queue → Tâche
#include <Arduino.h>

// Structure de données pour le capteur
typedef struct {
  int value;
  uint32_t timestamp;
} SensorData;

QueueHandle_t sensorQueue;

// Tâche de traitement des données
void SensorTask(void *pvParameters) {
  SensorData received;

  while (1) {
    if (xQueueReceive(sensorQueue, &received, portMAX_DELAY)) {
      Serial.print("Capteur → valeur = ");
      Serial.print(received.value);
      Serial.print(" / timestamp = ");
      Serial.println(received.timestamp);
    }
  }
}

// Callback du timer FreeRTOS
void SensorTimerCallback(TimerHandle_t xTimer) {
  SensorData d;
  d.value = random(20, 30); // Valeur aléatoire 20-30
  d.timestamp = millis();

  BaseType_t xHigherPriorityTaskWoken = pdFALSE;
  xQueueSendFromISR(sensorQueue, &d, &xHigherPriorityTaskWoken);
  portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}

void setup() {
  Serial.begin(115200);
  delay(500);

  // Initialiser l'aléatoire
  randomSeed(analogRead(0));
  
  // Créer la file d'attente (10 éléments max)
  sensorQueue = xQueueCreate(10, sizeof(SensorData));

  // Créer la tâche de traitement
  xTaskCreatePinnedToCore(
    SensorTask,
    "SensorTask",
    4096,
    NULL,
    3, // Haute priorité
    NULL,
    0
  );

  // Créer un timer logiciel FreeRTOS (500 ms, auto-reload)
  TimerHandle_t timer = xTimerCreate(
    "SensorTimer",
    pdMS_TO_TICKS(500),  // 500 ms
    pdTRUE,              // auto-reload
    NULL,
    SensorTimerCallback
  );

  // Démarrer le timer
  xTimerStart(timer, 0);

  Serial.println("System ready !");
}

void loop() {
  vTaskDelay(1000 / portTICK_PERIOD_MS);
}`,
        challenges: [
          "Synchronisation timer précise",
          "Gestion queue pleine",
          "Structuration données efficace",
          "Performance file d'attente"
        ],
        solutions: [
          "Timer FreeRTOS millisecondes précises",
          "Queue avec timeout et overwrite",
          "Structure légère optimisée",
          "Priorité tâche adaptée"
        ]
      },
      4: {
        title: "Simulation Driver UART RX avec FIFO",
        subtitle: "FIFO hardware simulé avec gestion overflow",
        description: "Simulation complète d'un driver UART RX avec FIFO hardware, gestion d'overflow, calcul de jitter et transmission via file d'attente FreeRTOS.",
        features: [
          "FIFO circulaire 32 bytes",
          "Détection overflow hardware",
          "Calcul jitter entre paquets",
          "Simulation réception UART",
          "Monitoring temps réel",
          "Gestion erreurs robuste"
        ],
        technologies: ["UART FIFO Simulation", "Circular Buffer", "Jitter Calculation", "Queue FreeRTOS", "Error Handling", "System Monitoring"],
        detailedExplanation: "",
        demoCaption: "Simulation FIFO UART avec gestion overflow",
        codeSnippet: `// Bloc 4: Simulation Driver UART avec FIFO
#include <Arduino.h>

#define RX_FIFO_SIZE 32

// Structure message UART
typedef struct {
  uint8_t data;
  uint32_t timestamp;
  bool overflow;
} UARTMessage;

QueueHandle_t uartQueue;

// FIFO circulaire (simulation hardware)
uint8_t rxFIFO[RX_FIFO_SIZE];
volatile uint8_t fifoHead = 0;
volatile uint8_t fifoTail = 0;
volatile bool fifoOverflow = false;

// Simulation ISR UART
void UARTSimISR() {
  uint8_t nextHead = (fifoHead + 1) % RX_FIFO_SIZE;

  // Vérifier overflow
  if (nextHead == fifoTail) {
    fifoOverflow = true;
    return;
  }

  // Simuler réception byte (A-Z)
  uint8_t byteReceived = random(65, 91);
  rxFIFO[fifoHead] = byteReceived;
  fifoHead = nextHead;

  // Préparer message pour la queue
  UARTMessage msg;
  msg.data = byteReceived;
  msg.timestamp = millis();
  msg.overflow = fifoOverflow;

  // Envoyer depuis ISR simulée
  BaseType_t xHigherPriorityTaskWoken = pdFALSE;
  xQueueSendFromISR(uartQueue, &msg, &xHigherPriorityTaskWoken);
  portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}

// Tâche traitement UART
void UARTTask(void* pvParameters) {
  UARTMessage msg;
  static uint32_t lastTs = 0;

  while (1) {
    if (xQueueReceive(uartQueue, &msg, portMAX_DELAY)) {
      // Calculer jitter
      uint32_t jitter = (lastTs == 0) ? 0 : msg.timestamp - lastTs;
      lastTs = msg.timestamp;

      // Afficher informations
      Serial.print("UART RX: ");
      Serial.print((char)msg.data);
      Serial.print(" | ts: ");
      Serial.print(msg.timestamp);
      Serial.print(" | jitter: ");
      Serial.print(jitter);
      if (msg.overflow) Serial.print(" | OVERFLOW");
      Serial.println();
    }
  }
}

// Tâche simulation UART (50ms entre bytes)
void UARTSimTask(void* pvParameters) {
  vTaskDelay(pdMS_TO_TICKS(100));
  while (1) {
    UARTSimISR();
    vTaskDelay(pdMS_TO_TICKS(50));
  }
}

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("UART simulation started!");

  // Créer file d'attente (64 messages max)
  uartQueue = xQueueCreate(64, sizeof(UARTMessage));

  // Créer les tâches
  xTaskCreatePinnedToCore(UARTSimTask, "UARTSimTask", 2048, NULL, 3, NULL, 0);
  xTaskCreatePinnedToCore(UARTTask, "UARTTask", 4096, NULL, 2, NULL, 0);
}

void loop() {
  // Monitoring périodique
  static uint32_t lastPrint = 0;
  if (millis() - lastPrint > 5000) {
    lastPrint = millis();
    Serial.print("Queue items: ");
    Serial.println(uxQueueMessagesWaiting(uartQueue));
  }
  vTaskDelay(1000 / portTICK_PERIOD_MS);
}`,
        challenges: [
          "Gestion FIFO overflow",
          "Calcul jitter précis",
          "Simulation réaliste UART",
          "Performance file d'attente"
        ],
        solutions: [
          "FIFO circulaire avec drapeau overflow",
          "Timestamp millis() pour jitter",
          "Génération bytes A-Z aléatoires",
          "Queue taille adaptée au débit"
        ]
      }
    };
    
    return blocksData[id] || blocksData[1];
  };

  const blockData = getBlockData(blockId);
  const currentDemoImage = demoImages[blockId];

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
            <h2 className="section-title">Explication Détaillée du Système</h2>
            <div className="detailed-explanation">
              <div className="explanation-placeholder">
                <p className="placeholder-text">
                  Ce système FreeRTOS illustre les concepts fondamentaux de la programmation temps réel sur ESP32 :
                </p>
                <ul className="placeholder-list">
                  <li><strong>Bloc 1 :</strong> Synchronisation avec mutex pour protéger l'accès à l'UART partagé</li>
                  <li><strong>Bloc 2 :</strong> Communication ISR→Tâche via sémaphore binaire</li>
                  <li><strong>Bloc 3 :</strong> Communication périodique Timer→Queue→Tâche avec données structurées</li>
                  <li><strong>Bloc 4 :</strong> Simulation complète d'un driver UART avec FIFO hardware et gestion d'erreurs</li>
                </ul>
                <p className="placeholder-text">
                  Chaque bloc est autonome et peut être testé séparément sur une carte ESP32.
                </p>
              </div>
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Technologies utilisées</h2>
            <div className="tech-tags">
              {blockData.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Démonstration</h2>
            
            <div className="video-description">
              <p>Cette image illustre le fonctionnement du système FreeRTOS et son architecture.</p>
            </div>
            
            <div className="single-image-container">
              <div className="main-image-wrapper">
                {demoImageError ? (
                  <div className="image-placeholder">
                    <span className="placeholder-icon">📊</span>
                    <p className="placeholder-text">Image de démonstration non disponible</p>
                  </div>
                ) : (
                  <img 
                    src={currentDemoImage} 
                    alt={`Démonstration ${blockData.title}`}
                    className="main-project-image"
                    onError={handleDemoImageError}
                  />
                )}
                <div className="main-image-caption">
                  {blockData.demoCaption}
                </div>
              </div>
            </div>
            
            <div className="image-explanation">
              <h3>Description de la démonstration :</h3>
              <p>Cette image montre l'architecture du système FreeRTOS implémenté, incluant :</p>
              <ul>
                <li>L'organisation des tâches et leurs priorités</li>
                <li>Les mécanismes de communication inter-tâches</li>
                <li>La gestion des interruptions matérielles</li>
                <li>Les files d'attente et sémaphores utilisés</li>
              </ul>
            </div>
          </div>

          <div className="block-section">
            <h2 className="section-title">Code Source FreeRTOS</h2>
            <div className="code-container">
              <div className="code-header">
                <span className="code-filename">FreeRTOS_Bloc{blockId}.cpp</span>
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

export default FreeRTOSBlocks;