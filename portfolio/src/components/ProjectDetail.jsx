// components/ProjectDetail.jsx - MODIFIÉ (projet 6 supprimé)
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const projectId = parseInt(id);

  // Correction : Navigation directe vers la liste des projets
  const handleBackToProjects = () => {
    navigate('/projects'); // Retour direct à la liste des projets
  };

  // DONNÉES POUR CHAQUE PROJET (projet 6 supprimé)

  // PROJET 1 - Arduino ESP32 (inchangé)
  const project1Blocks = [
    {
      id: 1,
      title: "Dégradé de Couleurs",
      description: "Contrôle d'une LED RGB avec transitions fluides et ajustement via potentiomètre",
      icon: "🌈",
      features: [
        "Contrôle LED RGB avec ESP32",
        "Potentiomètre pour ajustement de teinte",
        "Conversion HSV vers RGB",
        "Transitions fluides entre couleurs",
        "Interface utilisateur intuitive",
        "Code modulaire et réutilisable"
      ]
    },
    {
      id: 2,
      title: "Microchip - 74HC595",
      description: "Contrôle d'un affichage défilant de 8 LEDs avec registre à décalage",
      icon: "🔢",
      features: [
        "Puce 74HC595 pour contrôle multiple",
        "Affichage défilant sur 8 LEDs",
        "Effet arc-en-ciel scintillant",
        "Allumage séquentiel dynamique",
        "Optimisation de l'utilisation des GPIO",
        "Synchronisation précise des LEDs"
      ]
    },
    {
      id: 3,
      title: "Détecteur de Mouvements",
      description: "Détection de présence avec capteur PIR infrarouge et activation LED",
      icon: "👁️",
      features: [
        "Capteur PIR pour détection infrarouge",
        "Détection de mouvement humain/animal",
        "Activation automatique de LED",
        "Champ de vision réglable",
        "Réglage sensibilité et délai",
        "Sortie numérique pour contrôle"
      ]
    },
    {
      id: 4,
      title: "Affichage de Caractères",
      description: "Affichage de messages sur écran LCD I2C avec compteur dynamique",
      icon: "📟",
      features: [
        "Module I2C LCD1602",
        "Affichage de messages personnalisés",
        "Compteur automatique incrémental",
        "Interface I2C simplifiée",
        "Messages de bienvenue dynamiques",
        "Gestion de l'actualisation d'écran"
      ]
    },
    {
      id: 5,
      title: "Lumière Courante",
      description: "Animation de bande LED WS2812 avec détection d'obstacles et changement de direction",
      icon: "💫",
      features: [
        "Bande LED WS2812 programmable",
        "Animation lumière courante",
        "Détection d'obstacles",
        "Changement direction automatique",
        "Couleurs et motifs personnalisables",
        "Synchronisation précise des LEDs"
      ]
    },
    {
      id: 6,
      title: "Contrôle Moteur",
      description: "Pilotage de moteur avec circuit intégré L293D et contrôle PWM",
      icon: "⚙️",
      features: [
        "Circuit intégré L293D",
        "Contrôle bidirectionnel moteur",
        "Signal PWM pour vitesse variable",
        "Protection contre surcharge",
        "Commande numérique précise",
        "Applications robotiques"
      ]
    }
  ];

  // PROJET 2 - IoT ESP32 (inchangé)
  const project2Blocks = [
    {
      id: 1,
      title: "CheerLights",
      description: "Réseau mondial de lumières synchronisées via MQTT pour contrôle couleur à distance",
      icon: "🌍",
      features: [
        "Synchronisation mondiale des lumières",
        "Abonnement MQTT au sujet cheerlights",
        "Contrôle couleur à distance",
        "Bande LED WS2812 programmable",
        "Temps réel sans délai perceptible",
        "Communauté internationale connectée"
      ]
    },
    {
      id: 2,
      title: "Serveur Web Streaming Vidéo",
      description: "Serveur web personnalisé pour streaming vidéo avec contrôle interactif de LEDs",
      icon: "🎥",
      features: [
        "Création de page web personnalisée",
        "Streaming vidéo en direct",
        "Boutons interactifs ON/OFF",
        "Contrôle luminosité LED",
        "Interface utilisateur intuitive",
        "Connexion WiFi stable"
      ]
    },
    {
      id: 3,
      title: "Communication IoT avec MQTT",
      description: "Protocole MQTT pour échange de données IoT avec LED, bouton et thermistor",
      icon: "📡",
      features: [
        "Protocole MQTT publication/abonnement",
        "Communication WiFi avec broker",
        "Contrôle LED via sujets MQTT",
        "Publication données température",
        "Architecture client-serveur IoT",
        "Sécurité et qualité de service"
      ]
    },
    {
      id: 4,
      title: "Station Surveillance Connectée",
      description: "Système de monitoring environnemental avec capteurs DHT11 et ultrasonique",
      icon: "📊",
      features: [
        "Capteur température/humidité DHT11",
        "Capteur ultrasonique HC-SR04",
        "Connexion à plateformes cloud",
        "Indication visuelle/sonore",
        "Collecte données en temps réel",
        "Alertes configurables"
      ]
    },
    {
      id: 5,
      title: "Surveillance avec Adafruit IO",
      description: "Dashboard IoT pour monitoring température/humidité et contrôle à distance",
      icon: "☁️",
      features: [
        "Intégration plateforme Adafruit IO",
        "Visualisation données temps réel",
        "Contrôle LED depuis dashboard",
        "Graphiques et historiques",
        "Alertes et notifications",
        "Interface web responsive"
      ]
    },
    {
      id: 6,
      title: "Contrôle Bluetooth LED RGB",
      description: "Commande de LED RGB via Bluetooth avec application mobile LightBlue",
      icon: "📱",
      features: [
        "Communication Bluetooth BLE",
        "Application mobile LightBlue",
        "Commandes personnalisées couleurs",
        "Contrôle à distance sans fil",
        "Configuration facile",
        "Interface intuitive"
      ]
    }
  ];

  // PROJET 3 - FPGA Simulation (inchangé)
  const project3Blocks = [
    {
      id: 1,
      title: "FSM LED",
      description: "Machine à états finis contrôlant les modes d'une LED avec horloge et reset",
      icon: "🔛",
      features: [
        "Machine à états finis (S0, S1, S2)",
        "S0 : LED allumée constante",
        "S1 : LED éteinte",
        "S2 : LED clignotante",
        "Transition sur front d'horloge",
        "Reset asynchrone vers S0"
      ]
    },
    {
      id: 2,
      title: "Compteur 7 Segments",
      description: "Compteur 4 bits affiché simultanément sur LEDs et afficheur 7 segments",
      icon: "🔢",
      features: [
        "Compteur 4 bits (0-15)",
        "Affichage LEDs et 7 segments",
        "Bouton d'incrémentation",
        "Bouton reset synchrone",
        "Décodeur BCD vers 7 segments",
        "Synchronisation d'horloge"
      ]
    },
    {
      id: 3,
      title: "Mini Jeu",
      description: "Mini-jeu interactif avec machine à états, score et affichage multiple",
      icon: "🎮",
      features: [
        "Mode attente : LED clignotante",
        "Mode jeu : incrémentation score",
        "Reset score et état",
        "Affichage score sur LEDs",
        "Affichage score sur 7 segments",
        "Logique de jeu complète"
      ]
    },
    {
      id: 4,
      title: "Half Adder",
      description: "Demi-additionneur VHDL calculant somme et retenue de deux bits",
      icon: "➕",
      features: [
        "Porte XOR pour somme (S)",
        "Porte AND pour retenue (C)",
        "Entrées A et B (1 bit)",
        "Sorties S et C (1 bit)",
        "Table de vérité complète",
        "Circuit combinatoire pur"
      ]
    },
    {
      id: 5,
      title: "Porte AND",
      description: "Implémentation VHDL d'une porte logique ET avec deux entrées",
      icon: "🔷",
      features: [
        "Porte logique ET (AND)",
        "Sortie C = A AND B",
        "Entrées A et B (1 bit)",
        "Sortie C (1 bit)",
        "Table de vérité : 1 si A=1 et B=1",
        "Circuit combinatoire simple"
      ]
    },
    {
      id: 6,
      title: "Porte OR",
      description: "Implémentation VHDL d'une porte logique OU avec deux entrées",
      icon: "🔶",
      features: [
        "Porte logique OU (OR)",
        "Sortie C = A OR B",
        "Entrées A et B (1 bit)",
        "Sortie C (1 bit)",
        "Table de vérité : 1 si A=1 ou B=1",
        "Circuit combinatoire simple"
      ]
    }
  ];

  // PROJET 4 - FreeRTOS ESP32 (inchangé)
  const project4Blocks = [
    {
      id: 1,
      title: "Mutex & Sémaphores",
      description: "Gestion des priorités avec mutex et héritage de priorité pour éviter l'inversion",
      icon: "⚖️",
      features: [
        "xSemaphoreTake pour contrôle mutex",
        "Priority Inheritance automatique",
        "Évite l'inversion de priorité",
        "Synchronisation tâches critiques",
        "Comportement temps réel garanti",
        "Optimisation des performances"
      ]
    },
    {
      id: 2,
      title: "ISR → Sémaphore → Tâche",
      description: "Communication directe des interruptions vers tâches via sémaphores",
      icon: "⚡",
      features: [
        "Déclenchement interruptions GPIO/timer",
        "xSemaphoreGiveFromISR()",
        "Réveil instantané des tâches",
        "Mesure latence ISR→Tâche",
        "Optimisation temps réel",
        "Gestion priorité IRQ"
      ]
    },
    {
      id: 3,
      title: "Communication ISR → Tâches avec Queue",
      description: "Système de communication avancé pour drivers UART/I2C/SPI via queues",
      icon: "🔄",
      features: [
        "Drivers UART RX FIFO → ISR → Queue",
        "Drivers I2C interruptions STOP/START/ACK",
        "Drivers SPI DMA done interrupt",
        "Capteurs industriels avec DRDY",
        "Systèmes FreeRTOS professionnels",
        "Architecture scalable et robuste"
      ]
    },
    {
      id: 4,
      title: "Driver UART RX Professionnel",
      description: "Implémentation complète de driver UART RX avec FreeRTOS pour applications critiques",
      icon: "📡",
      features: [
        "ISR UART RX FIFO avancé",
        "Queue vers tâche de traitement",
        "Détection overflow et erreurs",
        "Analyse du jitter et latence",
        "Optimisation priorité IRQ",
        "Version professionnelle industrielle"
      ]
    }
  ];

  // PROJET 5 - Mini Racer (MODIFIÉ - 1 BLOC SEULEMENT)
  const project5Blocks = [
    {
      id: 1,
      title: "Création Complète du Jeu",
      description: "Développement d'un jeu de course multijoueur de A à Z avec Unity et C#",
      icon: "🏁",
      features: [
        "Architecture complète du jeu en C#/Unity",
        "Physique avancée des véhicules avec drift réaliste",
        "Système multijoueur pour 1 à 4 joueurs en réseau",
        "Modélisation 3D des circuits et véhicules",
        "Design des mécaniques de jeu et power-ups",
        "UI/UX immersive et design sonore complet"
      ]
    }
  ];

  // Sélectionner les blocs selon le projet
  const getProjectBlocks = (id) => {
    switch(id) {
      case 1: return project1Blocks;
      case 2: return project2Blocks;
      case 3: return project3Blocks;
      case 4: return project4Blocks;
      case 5: return project5Blocks;
      default: return project1Blocks;
    }
  };

  // Fonction pour obtenir le titre spécifique par projet
  const getBlocksTitle = (projectId) => {
    switch(projectId) {
      case 1:
        return "Modules de Développement Arduino ESP32";
      case 2:
        return "Systèmes IoT Connectés";
      case 3:
        return "Simulations et Conceptions VHDL";
      case 4:
        return "Architectures FreeRTOS Avancées";
      case 5:
        return "Développement du Jeu";
      default:
        return "Modules de Développement";
    }
  };

  // Fonction pour obtenir le sous-titre spécifique par projet
  const getBlocksSubtitle = (projectId) => {
    switch(projectId) {
      case 1:
        return "Découvrez chaque composant et ses fonctionnalités spécifiques";
      case 2:
        return "Explorez les différents systèmes IoT connectés";
      case 3:
        return "Analysez les simulations et conceptions VHDL détaillées";
      case 4:
        return "Comprenez les architectures FreeRTOS et leurs applications";
      case 5:
        return "Découvrez le processus complet de création de ce jeu de course";
      default:
        return "Découvrez les détails techniques de chaque composant";
    }
  };

  // Données principales des projets - PROJET 6 SUPPRIMÉ
  const projectDetails = {
    1: {
      title: "Projet Arduino ESP32",
      description: "Bienvenue dans ce projet excitant ! Dans ce projet, nous utiliserons la puce 74HC595 pour contrôler un affichage défilant de 8 LEDs. Imaginez déclencher ce projet et assister à un flux lumineux captivant, comme un arc-en-ciel scintillant sautant entre les 8 LEDs. Chaque LED s'allume une par une et s'éteint rapidement, tandis que la LED suivante continue de briller, créant un effet dynamique et magnifique.",
      technologies: ["Arduino IDE", "C/C++", "ESP32", "74HC595", "LEDs", "PWM", "GPIO", "Capteurs", "Affichage"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    2: {
      title: "Projet IoT ESP32",
      description: "CheerLights est un réseau mondial de lumières synchronisées qui peuvent être contrôlées par n'importe qui. Dans ce projet, nous utilisons également MQTT, mais au lieu de publier nos propres messages, nous nous abonnons au sujet « cheerlights ». Cela nous permet de recevoir les messages envoyés par d'autres au sujet « cheerlights » et d'utiliser ces informations pour changer la couleur de notre bande LED en conséquence.",
      technologies: ["Arduino IDE", "C/C++", "ESP32", "MQTT", "WiFi", "Bluetooth", "LED RGB", "Cloud IoT", "Web Server"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    3: {
      title: "Projet FPGA Simulation",
      description: "Ce module VHDL implémente une machine à états finis (S0, S1, S2) contrôlant une LED. S0 : LED allumée, S1 : LED éteinte, S2 : LED clignote. La FSM avance à chaque front d'horloge, avec un reset qui revient à S0.",
      technologies: ["VHDL", "Xilinx Vivado", "FPGA", "FSM", "7 Segments", "Portes Logiques", "Compteurs", "Circuits Numériques"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    4: {
      title: "Projet FreeRTOS ESP32",
      description: "FreeRTOS applique automatiquement Priority Inheritance. Si TaskCom1 (prio 2) détient le mutex, et TaskCom2 (prio 3) attend, TaskCom1 hérite temporairement de prio 3. Elle libère le mutex plus vite, garantissant l'absence d'inversion de priorité → conformité temps réel stricte.",
      technologies: ["FreeRTOS", "Arduino IDE", "C/C++", "ESP32", "Mutex", "Sémaphores", "Queues", "Priority Inheritance", "RTOS"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    },
    5: {
      title: "Projet Mini Racer",
      description: "Mini Racer est un jeu de course multijoueur développé de A à Z avec Unity en C#. Ce projet représente la création complète d'un jeu vidéo, depuis la conception initiale jusqu'au déploiement final. J'ai développé l'ensemble de l'architecture du jeu, implémenté la physique avancée des véhicules avec système de drift réaliste, créé le système multijoueur en réseau pour 1 à 4 joueurs, modélisé les circuits et véhicules en 3D, conçu les mécaniques de jeu et les power-ups, et développé l'interface utilisateur immersive avec design sonore complet. Ce projet démontre ma capacité à gérer un projet de jeu vidéo complet de manière autonome.",
      technologies: ["Unity", "C#", "3D Modeling", "Game Physics", "Multiplayer", "UI/UX Design", "Audio Design", "Version Control", "Project Management"],
      github: "#",
      demo: "#",
      status: "🚀 En production"
    }
    // Projet 6 supprimé
  };

  const project = projectDetails[projectId] || projectDetails[1];
  const projectBlocks = getProjectBlocks(projectId);
  const blocksTitle = getBlocksTitle(projectId);
  const blocksSubtitle = getBlocksSubtitle(projectId);

  return (
    <div className="project-detail">
      {/* Header avec bouton retour CORRIGÉ */}
      <div className="project-detail-header">
        <button className="back-btn" onClick={handleBackToProjects}>
          ← Retour aux projets
        </button>
        <div className="project-header-content">
          <h1 className="project-detail-title">{project.title}</h1>
          <span className="project-status">{project.status}</span>
        </div>
      </div>

      {/* Description principale */}
      <div className="project-detail-container">
        <div className="project-overview">
          <p className="project-full-description">
            {project.description}
          </p>
          
          <div className="project-technologies">
            <h3>Technologies utilisées :</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <span className="link-icon">📂</span> Code source GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo">
              <span className="link-icon">🚀</span> Voir la démo live
            </a>
          </div>
        </div>

        {/* Grille des blocs - ADAPTÉE POUR 1 BLOC SEULEMENT POUR LE PROJET 5 */}
        <div className="project-blocks-section">
          <h2 className="blocks-title">{blocksTitle}</h2>
          <p className="blocks-subtitle">{blocksSubtitle}</p>
          
          <div className="project-blocks-grid" style={projectId === 5 ? { gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' } : {}}>
            {projectBlocks.map(block => (
              <Link 
                to={`/project/${projectId}/block/${block.id}`}
                className="project-block clickable-block"
                key={block.id}
                style={projectId === 5 ? { maxWidth: '800px', margin: '0 auto' } : {}}
              >
                <div className="block-header">
                  <div className="block-icon">{block.icon}</div>
                  <h3 className="block-title">{block.title}</h3>
                </div>
                <p className="block-description">{block.description}</p>
                <ul className="block-features">
                  {block.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="block-click-hint">
                  <span className="click-icon">🔍</span> Cliquer pour voir les détails techniques complets
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section conclusion */}
        <div className="project-conclusion">
          <h3 className="conclusion-title">Conclusion</h3>
          <p className="conclusion-text">
            {projectId === 1 && "Ce projet démontre ma capacité à concevoir et développer des systèmes embarqués robustes avec ESP32, allant du contrôle basique des LEDs à des systèmes complexes avec capteurs et interfaces utilisateur."}
            {projectId === 2 && "Ce projet illustre mon expertise dans la création de systèmes IoT complets, intégrant capteurs, communications sans fil, cloud computing et interfaces utilisateur modernes."}
            {projectId === 3 && "Ce projet montre ma maîtrise du design numérique avec VHDL et FPGA, depuis les circuits combinatoires de base jusqu'aux machines à états finis complexes avec interfaces multiples."}
            {projectId === 4 && "Ce projet démontre mes compétences en programmation temps réel avec FreeRTOS, incluant la synchronisation de tâches, la gestion des interruptions et le développement de drivers professionnels."}
            {projectId === 5 && "Ce projet de jeu vidéo complet démontre ma polyvalence en développement logiciel, modélisation 3D, design d'interface et gestion de projet de A à Z."}
            Chaque aspect a été soigneusement pensé pour offrir la meilleure expérience utilisateur possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;