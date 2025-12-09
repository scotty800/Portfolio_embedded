// components/blocks/FreeRTOSBlocks.jsx - NOUVEAU FICHIER pour projet FreeRTOS
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FreeRTOSBlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const blocksData = {
    1: {
      title: "Mutex et Héritage de Priorité FreeRTOS",
      subtitle: "Éviter l'inversion de priorité avec mutex",
      description: "Implémentation FreeRTOS de mutex avec héritage de priorité automatique pour prévenir l'inversion de priorité dans les systèmes temps réel critiques.",
      features: [
        "Création mutex avec xSemaphoreCreateMutex()",
        "Héritage automatique de priorité",
        "Évite l'inversion de priorité",
        "Synchronisation tâches critiques",
        "Temps de blocage contrôlé",
        "Priorité dynamique ajustable"
      ],
      technologies: ["ESP32 DevKit", "FreeRTOS Kernel", "Semaphore", "Task Scheduler", "Priority Table", "Watchdog Timer"],
      image: {
        src: "/assets/projects/freertos/mutex-priority-inheritance.jpg",
        alt: "Mutex FreeRTOS avec héritage de priorité",
        caption: "Architecture mutex avec héritage de priorité sur ESP32"
      },
      videoLink: "#",
      codeSnippet: `// FreeRTOS - Mutex avec héritage de priorité
#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>

// Handle mutex
SemaphoreHandle_t xMutex;

// Tâche basse priorité
void TaskLowPriority(void *pvParameters) {
  const char *pcTaskName = "TaskLowPriority";
  
  for(;;) {
    Serial.print(pcTaskName);
    Serial.println(" essaie de prendre le mutex...");
    
    // Prendre le mutex
    if(xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE) {
      Serial.print(pcTaskName);
      Serial.println(" a pris le mutex");
      
      // Section critique
      for(int i = 0; i < 5; i++) {
        Serial.print(pcTaskName);
        Serial.print(" travaille dans section critique ");
        Serial.println(i);
        vTaskDelay(pdMS_TO_TICKS(1000));
      }
      
      // Libérer le mutex
      xSemaphoreGive(xMutex);
      Serial.print(pcTaskName);
      Serial.println(" a libéré le mutex");
    }
    
    vTaskDelay(pdMS_TO_TICKS(2000));
  }
}

// Tâche haute priorité
void TaskHighPriority(void *pvParameters) {
  const char *pcTaskName = "TaskHighPriority";
  
  vTaskDelay(pdMS_TO_TICKS(100)); // Délai initial
  
  for(;;) {
    Serial.print(pcTaskName);
    Serial.println(" essaie de prendre le mutex...");
    
    // Essaie de prendre le mutex (sera bloqué)
    if(xSemaphoreTake(xMutex, pdMS_TO_TICKS(1000)) == pdTRUE) {
      Serial.print(pcTaskName);
      Serial.println(" a pris le mutex");
      
      // Section critique courte
      Serial.print(pcTaskName);
      Serial.println(" dans section critique");
      vTaskDelay(pdMS_TO_TICKS(100));
      
      // Libérer
      xSemaphoreGive(xMutex);
      Serial.print(pcTaskName);
      Serial.println(" a libéré le mutex");
    } else {
      Serial.print(pcTaskName);
      Serial.println(" timeout sur mutex!");
    }
    
    vTaskDelay(pdMS_TO_TICKS(500));
  }
}

// Tâche moyenne priorité
void TaskMediumPriority(void *pvParameters) {
  const char *pcTaskName = "TaskMediumPriority";
  
  for(;;) {
    Serial.print(pcTaskName);
    Serial.println(" s'exécute (pas besoin de mutex)");
    vTaskDelay(pdMS_TO_TICKS(300));
  }
}

void setup() {
  Serial.begin(115200);
  vTaskDelay(pdMS_TO_TICKS(1000));
  
  // Créer mutex avec héritage de priorité
  xMutex = xSemaphoreCreateMutex();
  
  if(xMutex != NULL) {
    // Créer les tâches avec différentes priorités
    xTaskCreatePinnedToCore(
      TaskLowPriority,    // Fonction tâche
      "TaskLow",          // Nom tâche
      2048,               // Stack size
      NULL,               // Paramètres
      1,                  // Priorité BASSE
      NULL,               // Task handle
      0                   // Core
    );
    
    xTaskCreatePinnedToCore(
      TaskMediumPriority, // Fonction tâche
      "TaskMedium",       // Nom tâche
      2048,               // Stack size
      NULL,               // Paramètres
      2,                  // Priorité MOYENNE
      NULL,               // Task handle
      0                   // Core
    );
    
    xTaskCreatePinnedToCore(
      TaskHighPriority,   // Fonction tâche
      "TaskHigh",         // Nom tâche
      2048,               // Stack size
      NULL,               // Paramètres
      3,                  // Priorité HAUTE
      NULL,               // Task handle
      0                   // Core
    );
    
    Serial.println("Tâches FreeRTOS démarrées avec mutex");
  } else {
    Serial.println("Erreur création mutex!");
  }
}

void loop() {
  // Loop vide - FreeRTOS gère les tâches
  vTaskDelay(pdMS_TO_TICKS(1000));
}`,
      challenges: [
        "Détection deadlocks mutex",
        "Optimisation temps blocage",
        "Gestion priorité dynamique",
        "Debugging inversion priorité"
      ],
      solutions: [
        "Timeout configurable sur mutex",
        "Héritage priorité automatique",
        "Monitoring tâches FreeRTOS",
        "Trace FreeRTOS avec printf"
      ]
    },
    2: {
      title: "Communication ISR → Tâche via Sémaphore",
      subtitle: "Interruptions GPIO vers tâches FreeRTOS",
      description: "Système de communication directe des interruptions matérielles vers tâches FreeRTOS via sémaphores binaires et files d'attente.",
      features: [
        "Déclenchement interruptions GPIO",
        "xSemaphoreGiveFromISR()",
        "Réveil instantané tâches",
        "Mesure latence ISR→Tâche",
        "Gestion priorité IRQ",
        "Buffer données ISR"
      ],
      technologies: ["ESP32 GPIO", "FreeRTOS Semaphore", "Interrupt Controller", "Timer Hardware", "Queue Handler", "Task Notify"],
      image: {
        src: "/assets/projects/freertos/isr-to-task-semaphore.jpg",
        alt: "Communication ISR vers tâche via sémaphore",
        caption: "Architecture interruption vers tâche FreeRTOS"
      },
      videoLink: "#",
      codeSnippet: `// FreeRTOS - ISR vers Tâche via Sémaphore
#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/semphr.h>
#include <freertos/queue.h>

// Handles
SemaphoreHandle_t xBinarySemaphore;
QueueHandle_t xQueue;
TaskHandle_t xTaskHandle;

// Variables globales
volatile uint32_t isrCounter = 0;
volatile uint32_t taskCounter = 0;

// Fonction d'interruption GPIO
void IRAM_ATTR gpio_isr_handler(void* arg) {
  BaseType_t xHigherPriorityTaskWoken = pdFALSE;
  uint32_t isrTime = micros();
  
  // Incrémenter compteur ISR
  isrCounter++;
  
  // Données à envoyer
  struct IsrData {
    uint32_t counter;
    uint32_t timestamp;
    uint32_t gpio_state;
  } isrData = {isrCounter, isrTime, digitalRead(4)};
  
  // Option 1: Donner sémaphore depuis ISR
  xSemaphoreGiveFromISR(xBinarySemaphore, &xHigherPriorityTaskWoken);
  
  // Option 2: Envoyer données dans queue depuis ISR
  xQueueSendFromISR(xQueue, &isrData, &xHigherPriorityTaskWoken);
  
  // Si une tâche de priorité plus haute a été réveillée
  if(xHigherPriorityTaskWoken == pdTRUE) {
    portYIELD_FROM_ISR();
  }
}

// Tâche réveillée par ISR
void TaskFromISR(void *pvParameters) {
  struct IsrData receivedData;
  uint32_t lastIsrCounter = 0;
  uint32_t maxLatency = 0;
  uint32_t minLatency = UINT32_MAX;
  uint32_t totalLatency = 0;
  uint32_t measurementCount = 0;
  
  Serial.println("Tâche ISR démarrée - En attente de sémaphore...");
  
  for(;;) {
    // Attendre sémaphore (bloquant)
    if(xSemaphoreTake(xBinarySemaphore, portMAX_DELAY) == pdTRUE) {
      taskCounter++;
      
      // Récupérer données de la queue
      if(xQueueReceive(xQueue, &receivedData, 0) == pdTRUE) {
        // Calculer latence
        uint32_t currentTime = micros();
        uint32_t latency = currentTime - receivedData.timestamp;
        
        // Statistiques latence
        if(latency > maxLatency) maxLatency = latency;
        if(latency < minLatency) minLatency = latency;
        totalLatency += latency;
        measurementCount++;
        
        // Afficher informations périodiquement
        if(taskCounter % 10 == 0) {
          Serial.println("\n=== Statistiques ISR → Tâche ===");
          Serial.print("Compteur ISR: ");
          Serial.println(isrCounter);
          Serial.print("Compteur Tâche: ");
          Serial.println(taskCounter);
          Serial.print("Latence moyenne: ");
          Serial.print(totalLatency / measurementCount);
          Serial.println(" µs");
          Serial.print("Latence max: ");
          Serial.print(maxLatency);
          Serial.println(" µs");
          Serial.print("Latence min: ");
          Serial.print(minLatency);
          Serial.println(" µs");
          Serial.print("Données reçues: Counter=");
          Serial.print(receivedData.counter);
          Serial.print(", Timestamp=");
          Serial.print(receivedData.timestamp);
          Serial.print(", GPIO=");
          Serial.println(receivedData.gpio_state);
          Serial.println("============================\n");
        }
        
        // Traitement des données
        if(receivedData.counter % 20 == 0) {
          // Action spéciale toutes les 20 interruptions
          digitalWrite(2, !digitalRead(2)); // Toggle LED
        }
      }
    }
  }
}

// Tâche génératrice d'interruptions (simulation)
void TaskGenerateInterrupt(void *pvParameters) {
  const int interruptPin = 4;
  bool pinState = HIGH;
  
  pinMode(interruptPin, OUTPUT);
  
  Serial.println("Tâche génératrice d'interruptions démarrée");
  
  for(;;) {
    // Générer interruption artificielle
    pinState = !pinState;
    digitalWrite(interruptPin, pinState);
    
    // Simuler événement externe
    vTaskDelay(pdMS_TO_TICKS(random(50, 500)));
  }
}

void setup() {
  Serial.begin(115200);
  vTaskDelay(pdMS_TO_TICKS(2000));
  
  // Configuration GPIO pour interruptions
  const int interruptPin = 4;
  pinMode(interruptPin, INPUT_PULLUP);
  pinMode(2, OUTPUT); // LED intégrée
  
  // Créer sémaphore binaire
  xBinarySemaphore = xSemaphoreCreateBinary();
  
  // Créer queue pour données ISR
  xQueue = xQueueCreate(10, sizeof(struct IsrData));
  
  if(xBinarySemaphore != NULL && xQueue != NULL) {
    // Créer tâche pour ISR
    xTaskCreatePinnedToCore(
      TaskFromISR,
      "TaskFromISR",
      4096,
      NULL,
      3, // Haute priorité
      &xTaskHandle,
      0
    );
    
    // Créer tâche génératrice d'interruptions
    xTaskCreatePinnedToCore(
      TaskGenerateInterrupt,
      "GenInterrupt",
      2048,
      NULL,
      1, // Basse priorité
      NULL,
      1
    );
    
    // Attacher interruption GPIO
    attachInterruptArg(
      digitalPinToInterrupt(interruptPin),
      gpio_isr_handler,
      NULL,
      CHANGE
    );
    
    Serial.println("Système ISR→Tâche FreeRTOS démarré");
    Serial.println("En attente d'interruptions...");
  } else {
    Serial.println("Erreur création ressources FreeRTOS!");
  }
}

void loop() {
  // Monitoring périodique
  static uint32_t lastPrint = 0;
  uint32_t now = millis();
  
  if(now - lastPrint > 5000) {
    lastPrint = now;
    
    Serial.print("État système - ISR: ");
    Serial.print(isrCounter);
    Serial.print(", Tâche: ");
    Serial.print(taskCounter);
    Serial.print(", Queue items: ");
    Serial.println(uxQueueMessagesWaiting(xQueue));
  }
  
  vTaskDelay(pdMS_TO_TICKS(1000));
}`,
      challenges: [
        "Latence ISR→Tâche minimale",
        "Gestion queue pleine en ISR",
        "Priorité ISR vs tâches",
        "Buffer overflow données"
      ],
      solutions: [
        "xSemaphoreGiveFromISR() optimisé",
        "Queue overwrite si pleine",
        "Configuration NVIC priorité",
        "Buffer circulaire ring buffer"
      ]
    },
    3: {
      title: "Communication ISR → Tâches avec Queue",
      subtitle: "Drivers UART/I2C/SPI avec files d'attente",
      description: "Système de communication avancé pour drivers périphériques (UART, I2C, SPI) utilisant files d'attente FreeRTOS pour transfert de données.",
      features: [
        "Driver UART RX FIFO → ISR → Queue",
        "Driver I2C interruptions STOP/START/ACK",
        "Driver SPI DMA done interrupt",
        "Capteurs industriels DRDY",
        "Architecture scalable",
        "Synchronisation multi-périphériques"
      ],
      technologies: ["ESP32 UART", "I2C Sensors", "SPI Devices", "DMA Controller", "FreeRTOS Queue", "Buffer Manager"],
      image: {
        src: "/assets/projects/freertos/isr-queue-communication.jpg",
        alt: "Communication ISR vers tâches avec queue",
        caption: "Architecture drivers avec files d'attente FreeRTOS"
      },
      videoLink: "#",
      codeSnippet: `// FreeRTOS - Driver UART avec Queue
#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/queue.h>
#include <driver/uart.h>

// Configuration UART
#define UART_NUM UART_NUM_1
#define BUF_SIZE 1024
#define RD_BUF_SIZE 256
#define QUEUE_SIZE 20

// Handles FreeRTOS
QueueHandle_t xUartQueue;
TaskHandle_t xUartTaskHandle;

// Structure données UART
typedef struct {
  uint8_t data[RD_BUF_SIZE];
  size_t length;
  uint32_t timestamp;
} uart_event_t;

// Tâche de traitement UART
void uart_task(void *pvParameters) {
  uart_event_t rx_event;
  
  Serial.println("Tâche UART démarrée");
  
  for(;;) {
    // Attendre données de la queue
    if(xQueueReceive(xUartQueue, &rx_event, portMAX_DELAY) == pdTRUE) {
      // Traiter données reçues
      Serial.print("UART RX - ");
      Serial.print(rx_event.length);
      Serial.print(" bytes à ");
      Serial.print(rx_event.timestamp);
      Serial.print(": ");
      
      // Afficher données (ASCII)
      for(int i = 0; i < rx_event.length; i++) {
        if(rx_event.data[i] >= 32 && rx_event.data[i] <= 126) {
          Serial.print((char)rx_event.data[i]);
        } else {
          Serial.print(" [0x");
          Serial.print(rx_event.data[i], HEX);
          Serial.print("] ");
        }
      }
      Serial.println();
      
      // Écho des données (si mode echo activé)
      static bool echo_enabled = true;
      if(echo_enabled && rx_event.length > 0) {
        uart_write_bytes(UART_NUM, (const char*)rx_event.data, rx_event.length);
        uart_write_bytes(UART_NUM, "\r\n", 2);
      }
      
      // Traitement commandes spéciales
      if(rx_event.length >= 2 && 
         rx_event.data[0] == 'A' && rx_event.data[1] == 'T') {
        Serial.println("Commande AT détectée!");
        
        // Réponse AT standard
        const char* at_response = "OK\r\n";
        uart_write_bytes(UART_NUM, at_response, strlen(at_response));
      }
    }
  }
}

// Fonction d'initialisation UART
void uart_init() {
  // Configuration UART
  uart_config_t uart_config = {
    .baud_rate = 115200,
    .data_bits = UART_DATA_8_BITS,
    .parity = UART_PARITY_DISABLE,
    .stop_bits = UART_STOP_BITS_1,
    .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
    .rx_flow_ctrl_thresh = 122,
    .source_clk = UART_SCLK_APB
  };
  
  // Installer driver UART
  ESP_ERROR_CHECK(uart_driver_install(
    UART_NUM, 
    BUF_SIZE, 
    BUF_SIZE, 
    QUEUE_SIZE, 
    &xUartQueue, 
    0
  ));
  ESP_ERROR_CHECK(uart_param_config(UART_NUM, &uart_config));
  
  // Configuration pins UART1 (GPIO9 = RX, GPIO10 = TX)
  ESP_ERROR_CHECK(uart_set_pin(
    UART_NUM, 
    10,  // TX
    9,   // RX
    UART_PIN_NO_CHANGE, 
    UART_PIN_NO_CHANGE
  ));
  
  Serial.println("UART initialisé avec file d'attente FreeRTOS");
}

// Tâche génératrice de données de test
void uart_test_generator(void *pvParameters) {
  const char* test_messages[] = {
    "Hello FreeRTOS UART!",
    "Test message 123",
    "AT Command Test",
    "Data packet #",
    "ESP32 UART avec Queue"
  };
  
  int msg_count = sizeof(test_messages) / sizeof(test_messages[0]);
  int counter = 0;
  
  Serial.println("Générateur de test UART démarré");
  
  for(;;) {
    // Envoyer message de test
    char buffer[64];
    snprintf(buffer, sizeof(buffer), "%s %d\r\n", 
             test_messages[counter % msg_count], 
             counter);
    
    uart_write_bytes(UART_NUM, buffer, strlen(buffer));
    
    counter++;
    vTaskDelay(pdMS_TO_TICKS(2000));
  }
}

void setup() {
  Serial.begin(115200);
  vTaskDelay(pdMS_TO_TICKS(2000));
  
  Serial.println("\n=== Démonstration FreeRTOS UART Queue ===");
  
  // Initialiser UART
  uart_init();
  
  // Créer tâche de traitement UART
  xTaskCreatePinnedToCore(
    uart_task,
    "UART Task",
    4096,
    NULL,
    2, // Priorité
    &xUartTaskHandle,
    0  // Core 0
  );
  
  // Créer tâche génératrice de test
  xTaskCreatePinnedToCore(
    uart_test_generator,
    "UART Test Gen",
    2048,
    NULL,
    1, // Priorité plus basse
    NULL,
    1  // Core 1
  );
  
  Serial.println("Système UART FreeRTOS démarré");
  Serial.println("Envoi de messages de test toutes les 2 secondes");
  Serial.println("Envoyez des données via UART1 (GPIO9 RX) pour test");
}

void loop() {
  // Surveillance système
  static uint32_t last_stats = 0;
  uint32_t now = millis();
  
  if(now - last_stats > 10000) {
    last_stats = now;
    
    // Statistiques file d'attente
    UBaseType_t uxMessagesWaiting = uxQueueMessagesWaiting(xUartQueue);
    UBaseType_t uxSpacesAvailable = uxQueueSpacesAvailable(xUartQueue);
    
    Serial.println("\n=== Statistiques UART Queue ===");
    Serial.print("Messages en attente: ");
    Serial.println(uxMessagesWaiting);
    Serial.print("Espaces disponibles: ");
    Serial.println(uxSpacesAvailable);
    Serial.print("Taille queue: ");
    Serial.println(QUEUE_SIZE);
    Serial.println("==============================\n");
  }
  
  vTaskDelay(pdMS_TO_TICKS(1000));
}`,
      challenges: [
        "Gestion buffer UART overflow",
        "Synchronisation multi-queues",
        "Performance haute fréquence",
        "Gestion erreurs hardware"
      ],
      solutions: [
        "Watermark interrupts UART",
        "Mutex pour accès partagé",
        "DMA pour transfert bloc",
        "Handlers erreurs ISR"
      ]
    },
    4: {
      title: "Driver UART RX Professionnel FreeRTOS",
      subtitle: "Driver UART complet avec FIFO et gestion erreurs",
      description: "Implémentation complète de driver UART RX professionnel avec FreeRTOS pour applications critiques. Gestion FIFO, erreurs et performances.",
      features: [
        "ISR UART RX FIFO avancé",
        "Queue vers tâche de traitement",
        "Détection overflow et erreurs",
        "Analyse jitter et latence",
        "Optimisation priorité IRQ",
        "Version industrielle robuste"
      ],
      technologies: ["UART FIFO 128 bytes", "FreeRTOS Stream Buffer", "Error Detection", "Jitter Measurement", "Professional Debug", "Industrial Protocol"],
      image: {
        src: "/assets/projects/freertos/pro-uart-driver.jpg",
        alt: "Driver UART professionnel FreeRTOS",
        caption: "Architecture driver UART industriel avec FreeRTOS"
      },
      videoLink: "#",
      codeSnippet: `// FreeRTOS - Driver UART Professionnel
#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/queue.h>
#include <freertos/stream_buffer.h>
#include <driver/uart.h>

// Configuration UART professionnelle
#define PROF_UART_NUM        UART_NUM_2
#define PROF_RX_BUFFER_SIZE  2048
#define PROF_TX_BUFFER_SIZE  1024
#define PROF_RX_QUEUE_SIZE   50
#define PROF_STREAM_BUF_SIZE 4096
#define PROF_WATERMARK       128

// Handles professionnels
QueueHandle_t xProfUartQueue;
StreamBufferHandle_t xProfStreamBuffer;
TaskHandle_t xProfParserTask;
TaskHandle_t xProfMonitorTask;

// Structure données professionnelle
typedef struct {
  uint8_t *data;
  size_t length;
  uint32_t timestamp;
  uint32_t errors;
  float jitter;
} prof_uart_packet_t;

// Statistiques professionnelles
typedef struct {
  uint32_t total_packets;
  uint32_t total_bytes;
  uint32_t error_count;
  uint32_t overflow_count;
  uint32_t framing_error;
  uint32_t parity_error;
  uint64_t total_latency;
  uint32_t min_latency;
  uint32_t max_latency;
  uint32_t last_update;
} uart_stats_t;

volatile uart_stats_t prof_stats = {0};

// ISR UART personnalisée
static void IRAM_ATTR uart_isr_handler(void *arg) {
  uint32_t intr_status = uart_get_intr_status(PROF_UART_NUM);
  uint8_t rx_data[PROF_WATERMARK];
  size_t rx_length = 0;
  
  // FIFO full ou timeout
  if(intr_status & (UART_FIFO_OVF_INT_ST | UART_RXFIFO_TOUT_INT_ST)) {
    rx_length = uart_read_bytes(PROF_UART_NUM, rx_data, PROF_WATERMARK, 0);
    
    if(rx_length > 0) {
      // Envoyer à stream buffer depuis ISR
      BaseType_t xHigherPriorityTaskWoken = pdFALSE;
      size_t bytes_sent = xStreamBufferSendFromISR(
        xProfStreamBuffer,
        rx_data,
        rx_length,
        &xHigherPriorityTaskWoken
      );
      
      if(bytes_sent != rx_length) {
        prof_stats.overflow_count++;
      }
      
      prof_stats.total_bytes += rx_length;
      
      // Notifier tâche parser
      if(xHigherPriorityTaskWoken == pdTRUE) {
        portYIELD_FROM_ISR();
      }
    }
  }
  
  // Gestion erreurs
  if(intr_status & UART_FRM_ERR_INT_ST) {
    prof_stats.framing_error++;
    uart_flush(PROF_UART_NUM);
  }
  
  if(intr_status & UART_PARITY_ERR_INT_ST) {
    prof_stats.parity_error++;
    uart_flush(PROF_UART_NUM);
  }
  
  // Clear interrupts
  uart_clear_intr_status(PROF_UART_NUM, intr_status);
}

// Tâche parser professionnelle
void prof_parser_task(void *pvParameters) {
  uint8_t rx_buffer[256];
  size_t bytes_received;
  uint32_t last_packet_time = 0;
  
  Serial.println("Parser UART professionnel démarré");
  
  for(;;) {
    // Recevoir données du stream buffer
    bytes_received = xStreamBufferReceive(
      xProfStreamBuffer,
      rx_buffer,
      sizeof(rx_buffer),
      portMAX_DELAY
    );
    
    if(bytes_received > 0) {
      prof_stats.total_packets++;
      
      // Calculer jitter
      uint32_t current_time = micros();
      if(last_packet_time > 0) {
        uint32_t packet_interval = current_time - last_packet_time;
        
        // Mettre à jour statistiques latence
        prof_stats.total_latency += packet_interval;
        if(packet_interval < prof_stats.min_latency || prof_stats.min_latency == 0) {
          prof_stats.min_latency = packet_interval;
        }
        if(packet_interval > prof_stats.max_latency) {
          prof_stats.max_latency = packet_interval;
        }
      }
      last_packet_time = current_time;
      
      // Créer packet professionnel
      prof_uart_packet_t *packet = (prof_uart_packet_t*)pvPortMalloc(
        sizeof(prof_uart_packet_t) + bytes_received
      );
      
      if(packet != NULL) {
        packet->data = (uint8_t*)(packet + 1);
        memcpy(packet->data, rx_buffer, bytes_received);
        packet->length = bytes_received;
        packet->timestamp = current_time;
        packet->errors = prof_stats.error_count;
        packet->jitter = 0.0; // Calculé plus tard
        
        // Envoyer à queue pour traitement
        if(xQueueSend(xProfUartQueue, &packet, 0) != pdTRUE) {
          vPortFree(packet);
          prof_stats.error_count++;
        }
      }
    }
    
    // Gestion mémoire périodique
    static uint32_t last_cleanup = 0;
    if(millis() - last_cleanup > 60000) {
      last_cleanup = millis();
      Serial.println("Cleanup mémoire parser");
    }
  }
}

// Tâche traitement packets
void prof_process_task(void *pvParameters) {
  prof_uart_packet_t *packet;
  
  Serial.println("Traitement packets UART démarré");
  
  for(;;) {
    // Recevoir packet de la queue
    if(xQueueReceive(xProfUartQueue, &packet, portMAX_DELAY) == pdTRUE) {
      // Traitement packet
      // Ici: analyse protocol, validation, etc.
      
      // Exemple: détection packet spécial
      if(packet->length >= 4 && 
         packet->data[0] == 0xAA && 
         packet->data[1] == 0x55) {
        Serial.println("Packet spécial détecté!");
      }
      
      // Libérer mémoire packet
      vPortFree(packet);
    }
  }
}

// Tâche monitoring professionnel
void prof_monitor_task(void *pvParameters) {
  Serial.println("Monitoring UART professionnel démarré");
  
  for(;;) {
    vTaskDelay(pdMS_TO_TICKS(5000));
    
    // Afficher statistiques
    Serial.println("\n=== STATISTIQUES UART PROFESSIONNEL ===");
    Serial.print("Packets reçus: ");
    Serial.println(prof_stats.total_packets);
    Serial.print("Bytes totaux: ");
    Serial.println(prof_stats.total_bytes);
    Serial.print("Erreurs framing: ");
    Serial.println(prof_stats.framing_error);
    Serial.print("Erreurs parité: ");
    Serial.println(prof_stats.parity_error);
    Serial.print("Overflows: ");
    Serial.println(prof_stats.overflow_count);
    
    if(prof_stats.total_packets > 0) {
      Serial.print("Latence moyenne: ");
      Serial.print(prof_stats.total_latency / prof_stats.total_packets);
      Serial.println(" µs");
      Serial.print("Latence min: ");
      Serial.print(prof_stats.min_latency);
      Serial.println(" µs");
      Serial.print("Latence max: ");
      Serial.print(prof_stats.max_latency);
      Serial.println(" µs");
    }
    
    // Statistiques FreeRTOS
    Serial.print("Queue items: ");
    Serial.println(uxQueueMessagesWaiting(xProfUartQueue));
    Serial.print("Stream buffer free: ");
    Serial.println(xStreamBufferSpacesAvailable(xProfStreamBuffer));
    Serial.println("====================================\n");
  }
}

void setup() {
  Serial.begin(115200);
  vTaskDelay(pdMS_TO_TICKS(3000));
  
  Serial.println("\n=== DRIVER UART FREE RTOS PROFESSIONNEL ===");
  
  // Initialisation UART2 (GPIO16 = RX, GPIO17 = TX)
  uart_config_t uart_config = {
    .baud_rate = 921600, // Haut débit
    .data_bits = UART_DATA_8_BITS,
    .parity = UART_PARITY_DISABLE,
    .stop_bits = UART_STOP_BITS_1,
    .flow_ctrl = UART_HW_FLOWCTRL_CTS_RTS,
    .rx_flow_ctrl_thresh = 122,
    .source_clk = UART_SCLK_APB
  };
  
  // Installer driver avec ISR personnalisée
  uart_driver_install(
    PROF_UART_NUM, 
    PROF_RX_BUFFER_SIZE, 
    PROF_TX_BUFFER_SIZE, 
    PROF_RX_QUEUE_SIZE, 
    &xProfUartQueue, 
    ESP_INTR_FLAG_IRAM
  );
  
  uart_param_config(PROF_UART_NUM, &uart_config);
  uart_set_pin(PROF_UART_NUM, 17, 16, 18, 19); // RTS/CTS activés
  
  // Configurer watermark
  uart_set_rx_full_threshold(PROF_UART_NUM, PROF_WATERMARK);
  uart_set_rx_timeout(PROF_UART_NUM, 10); // 10 symbol times
  
  // Créer stream buffer
  xProfStreamBuffer = xStreamBufferCreate(
    PROF_STREAM_BUF_SIZE,
    1 // Trigger level (1 byte)
  );
  
  // Créer queue pour packets
  xProfUartQueue = xQueueCreate(20, sizeof(prof_uart_packet_t*));
  
  // Attacher ISR personnalisée
  uart_isr_free(PROF_UART_NUM);
  uart_isr_register(PROF_UART_NUM, uart_isr_handler, NULL, 
                    ESP_INTR_FLAG_IRAM, NULL);
  
  uart_enable_rx_intr(PROF_UART_NUM);
  
  // Créer tâches professionnelles
  xTaskCreatePinnedToCore(prof_parser_task, "Prof Parser", 4096, NULL, 3, NULL, 0);
  xTaskCreatePinnedToCore(prof_process_task, "Prof Process", 4096, NULL, 2, NULL, 0);
  xTaskCreatePinnedToCore(prof_monitor_task, "Prof Monitor", 4096, NULL, 1, NULL, 1);
  
  Serial.println("Driver UART professionnel FreeRTOS démarré");
  Serial.println("Configuration: 921600 baud, RTS/CTS, Watermark 128");
  Serial.println("Monitoring actif toutes les 5 secondes");
}

void loop() {
  // Tâche principale (peut être utilisée pour autre chose)
  static uint32_t loop_counter = 0;
  
  if(loop_counter % 20 == 0) {
    // Envoyer données de test périodiquement
    const char* test_data = "UART_PRO_TEST\r\n";
    uart_write_bytes(PROF_UART_NUM, test_data, strlen(test_data));
  }
  
  loop_counter++;
  vTaskDelay(pdMS_TO_TICKS(1000));
}`,
      challenges: [
        "Optimisation mémoire ISR",
        "Gestion priorité tâches critiques",
        "Détection erreurs temps réel",
        "Performance débit maximum"
      ],
      solutions: [
        "Allocation mémoire statique ISR",
        "Priorité tâches configurable",
        "CRC et checksum hardware",
        "Benchmark et profiling FreeRTOS"
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
                      <p>Aperçu du projet FreeRTOS</p>
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

          {/* SECTION UN SEUL SNIPPET CODE */}
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