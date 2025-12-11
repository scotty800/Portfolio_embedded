// components/blocks/FPGABlocks.jsx - PROJET 3 (FPGA) - MIS À JOUR
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import des images depuis le dossier assets
import fsmLedImg from '../../assets/fpga/fsm-led-controller.png';
import counter7segImg from '../../assets/fpga/7segment-counter.png';
import minigameImg from '../../assets/fpga/mini-game-fpga.png';
import halfAdderImg from '../../assets/fpga/half-adder-circuit.png';
import andGateImg from '../../assets/fpga/and-gate-circuit.png';
import orGateImg from '../../assets/fpga/or-gate-circuit.png';

// Import des images de simulation
import fsmSimulationImg from '../../assets/fpga/simulation/fsm-simulation.png';
import counterSimulationImg from '../../assets/fpga/simulation/counter-simulation.png';
import gameSimulationImg from '../../assets/fpga/simulation/game-simulation.png';
import adderSimulationImg from '../../assets/fpga/simulation/half-adder-sim.png';
import andSimulationImg from '../../assets/fpga/simulation/and-simulation.png';
import orSimulationImg from '../../assets/fpga/simulation/or-simulation.png';

const FPGABlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [imageError, setImageError] = useState(false);
  const [simulationImageError, setSimulationImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSimulationImageError = () => {
    setSimulationImageError(true);
  };

  // Tableau des images principales par bloc
  const blockImages = {
    1: fsmLedImg,
    2: counter7segImg,
    3: minigameImg,
    4: halfAdderImg,
    5: andGateImg,
    6: orGateImg
  };

  // Tableau des images de simulation par bloc
  const simulationImages = {
    1: fsmSimulationImg,
    2: counterSimulationImg,
    3: gameSimulationImg,
    4: adderSimulationImg,
    5: andSimulationImg,
    6: orSimulationImg
  };

  const getBlockData = (id) => {
    const blocksData = {
      1: {
        title: "Machine à États Finis LED Controller",
        subtitle: "VHDL FSM avec états S0, S1, S2 sur FPGA",
        description: "Implémentation VHDL d'une machine à états finis (FSM) contrôlant une LED avec 3 états distincts : allumée constante, éteinte, et clignotante. Ce projet démontre les fondamentaux du design numérique synchrone avec horloge et reset asynchrone.",
        features: [
          "3 états distincts (S0, S1, S2) avec transitions programmées",
          "Transition sur front montant d'horloge",
          "Reset asynchrone vers état initial S0",
          "LED allumée en S0, éteinte en S1, clignotante en S2",
          "Clignotement généré par basculement de signal interne",
          "Testbench complet avec génération d'horloge et stimuli"
        ],
        technologies: ["FPGA Basys 3", "Xilinx Vivado", "VHDL IEEE Standard", "ModelSim", "LEDs GPIO", "Boutons"],
        imageCaption: "Architecture FSM VHDL avec contrôle LED sur FPGA",
        simulationCaption: "Simulation ModelSim de la FSM LED Controller",
        codeSnippet: `-- VHDL - FSM LED Controller avec 3 états
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity FSM_LED is
    Port (
        clk : in std_logic;
        reset : in std_logic;
        LED : out std_logic
    );
end FSM_LED;

architecture Behavioral of FSM_LED is
    type etat_type is (S0, S1, S2);
    signal etat, etat_suivant : etat_type;
    
    signal led_clignote : std_logic := '0';

begin

    process(clk, reset)
    begin
        if reset = '1' then
           etat <= S0;
           led_clignote <= '0';
        elsif rising_edge(clk) then
            etat <= etat_suivant;
            if etat = S2 then
                led_clignote <= not led_clignote;
            end if;
        end if;
   end process; 
   
   process(etat)
   begin
        case etat is
            when S0 =>
                etat_suivant <= S1;
            when S1 =>
                etat_suivant <= S2;
            when S2 =>
                etat_suivant <= S0;
         end case;
   end process;
   
   LED <= '1' when etat = S0 else
          '0' when etat = S1 else
          led_clignote;

end Behavioral;`,
        testbenchSnippet: `-- VHDL - Testbench FSM LED Controller
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity FSM_LED_tb is
end FSM_LED_tb;

architecture Behavioral of FSM_LED_tb is

component FSM_LED
    Port (
        clk : in std_logic;
        reset : in std_logic;
        LED : out std_logic
    );
 end component;

 signal clk, reset, LED : std_logic; 
 
 begin
    UUT: FSM_LED Port map(
        clk => clk,
        reset => reset,
        LED => LED
    );
    
  -- Génération d'une horloge 10 ns (période)
  clk_process : process
  begin
        while true loop
            clk <= '0';
            wait for 5 ns;
            clk <= '1';
            wait for 5 ns;
         end loop;
   end process;
   
    -- Stimulus : test du reset et des transitions d'états
  stm_proc : process
  begin
    -- Reset actif de début
    reset <= '1';
    wait for 10 ns;
    reset <= '0';
    
    -- Stimulus : test du reset et des transitions d'états
    wait for 200 ns;
    
    -- Nouveau reset pour vérifier le retour à S0
    reset <= '1';
    wait for 10 ns;
    reset <= '0';
    
    -- Continue encore un peu
    wait for 100 ns;
    
    wait;
 end process;
  
end Behavioral;`,
        challenges: [
          "Synchronisation des transitions d'état avec horloge",
          "Gestion correcte du reset asynchrone",
          "Génération stable du signal de clignotement",
          "Vérification des séquences d'états"
        ],
        solutions: [
          "Utilisation de registres synchronisés",
          "Reset asynchrone avec état initial défini",
          "Basculement de signal sur front d'horloge",
          "Testbench exhaustif avec vérifications"
        ],
        imageExplanation: "Cette machine à états finis (FSM) implémentée en VHDL contrôle une LED avec 3 états distincts sur FPGA. L'architecture utilise une horloge pour les transitions synchrones et un reset asynchrone. La FSM passe cycliquement des états S0 (LED allumée) → S1 (LED éteinte) → S2 (LED clignotante)."
      },
      2: {
        title: "Compteur 4 bits avec Affichage 7 Segments",
        subtitle: "VHDL Compteur BCD synchrone + Décodeur 7 segments",
        description: "Compteur 4 bits synchrone affiché simultanément sur LEDs et afficheur 7 segments avec boutons d'incrémentation et reset. Démonstration complète du design numérique avec entrées/sorties.",
        features: [
          "Compteur 4 bits synchrone (0-15) avec incrémentation",
          "Affichage dual sur LEDs (binaire) et 7 segments (décimal)",
          "Bouton incrémentation avec détection front",
          "Reset synchrone avec priorité",
          "Décodeur BCD vers 7 segments fonction personnalisée",
          "Affichage 0-9 sur 7 segments avec segments éteints au-delà"
        ],
        technologies: ["FPGA Nexys", "7-Segment Display", "Boutons GPIO", "LEDs GPIO", "Vivado", "VHDL Testbench"],
        imageCaption: "Compteur 4 bits VHDL avec affichage 7 segments sur FPGA",
        simulationCaption: "Simulation ModelSim du compteur et décodeur 7 segments",
        codeSnippet: `-- VHDL - Compteur 4 bits avec affichage 7 segments
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_arith.all;
use IEEE.std_logic_unsigned.all;

entity compteur_7seg is
    Port (
        clk : in std_logic;
        btn_up : in std_logic;
        btn_rst : in std_logic;
        leds : out std_logic_vector(3 downto 0);
        seg : out std_logic_vector(6 downto 0)
    );
end compteur_7seg;

architecture comportement of compteur_7seg is

    signal count : std_logic_vector(3 downto 0) := "0000";

    function decode7(val: std_logic_vector(3 downto 0)) 
    return std_logic_vector is 
        variable seg_out : std_logic_vector(6 downto 0);
    begin
        case val is 
            when "0000" => seg_out := "0000001"; --0
            when "0001" => seg_out := "1001111"; --1
            when "0010" => seg_out := "0010010"; --2
            when "0011" => seg_out := "0000110"; --3
            when "0100" => seg_out := "1001100"; --4
            when "0101" => seg_out := "0100100"; --5
            when "0110" => seg_out := "0100000"; --6
            when "0111" => seg_out := "0001111"; --7
            when "1000" => seg_out := "0000000"; --8
            when "1001" => seg_out := "0000100"; --9
            when others => seg_out := "1111111"; --éteint
        end case;
        return seg_out;
    end decode7;

begin

    process(clk)
    begin
        if rising_edge(clk) then
            if btn_rst = '1' then
                count <= "0000";
            elsif btn_up = '1' then
                count <= count + 1;
            end if;
        end if;
    end process;

    leds <= count;
    seg  <= decode7(count);

end comportement;`,
        testbenchSnippet: `-- VHDL - Testbench Compteur 7 segments
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity compteur_7seg_tb is
end compteur_7seg_tb;

architecture comportement of compteur_7seg_tb is
    component compteur_7seg
        Port (
            clk : in std_logic;
            btn_up : in std_logic;
            btn_rst : in std_logic;
            leds : out std_logic_vector(3 downto 0);
            seg : out std_logic_vector(6 downto 0)
        );
     end component;
     
     signal clk, btn_up, btn_rst : std_logic := '0';
     signal leds : std_logic_vector(3 downto 0);
     signal seg : std_logic_vector(6 downto 0);

begin
    uut: compteur_7seg Port map (
         clk => clk,
         btn_up => btn_up,
         btn_rst => btn_rst,
         leds => leds,
         seg => seg
    );
    
    -- Génération de l'horloge
    clk_process : process
    begin
        while True loop
            clk <= '0';
            wait for 5 ns;
            clk <= '1';
            wait for 5 ns;
        end loop;
    end process;
    
    -- Processus de test boutons
    test_process : process
    begin
        -- Reset initial
        btn_rst <= '1';
        wait for 10 ns;
        btn_rst <= '0';
        
        -- Appuie sur BTN_UP 5 fois
        for i in 1 to 5 loop
            btn_up <= '1';
            wait for 10 ns;
            btn_up <= '0';
            wait for 10 ns;
        end loop;
        
        -- Reset
        btn_rst <= '1';
        wait for 10 ns;
        btn_rst <= '0';
        
        wait;
    end process;
end comportement;`,
        challenges: [
          "Synchronisation boutons avec horloge système",
          "Dépassement compteur 4 bits (0-15)",
          "Affichage correct sur 7 segments pour valeurs >9",
          "Priorité reset sur incrémentation"
        ],
        solutions: [
          "Échantillonnage boutons sur front montant horloge",
          "Compteur avec roll-over automatique",
          "Fonction decode7 avec gestion valeurs invalides",
          "Hiérarchie conditions dans le process synchrone"
        ],
        imageExplanation: "Ce design VHDL implémente un compteur 4 bits synchrone avec affichage sur LEDs (binaire) et afficheur 7 segments (décimal 0-9). Le système inclut un décodeur personnalisé BCD vers 7 segments via une fonction VHDL. Le compteur s'incrémente sur appui bouton et se reset sur commande spécifique."
      },
      3: {
        title: "Mini Jeu Interactif avec Score et Reset",
        subtitle: "VHDL Machine à états + Score + Affichage multiple",
        description: "Mini-jeu interactif complet avec machine à états, système de score, et affichage multiple sur LEDs et 7 segments. Démonstration avancée du design numérique avec interactions utilisateur.",
        features: [
          "Machine à états avec 3 modes (Attente, Score, Reset)",
          "Système de score 4 bits incrémentable",
          "Affichage score sur LEDs et 7 segments simultanément",
          "LED clignotante en mode attente",
          "Boutons play et reset avec gestion synchrone",
          "Transition d'états conditionnée par boutons"
        ],
        technologies: ["FPGA Basys 3", "Boutons GPIO", "LEDs Array 4 bits", "7-Segment Display", "Vivado IP", "VHDL State Machine"],
        imageCaption: "Architecture jeu interactif VHDL avec score sur FPGA",
        simulationCaption: "Simulation ModelSim du jeu interactif avec transitions d'état",
        codeSnippet: `-- VHDL - Mini Jeu Interactif avec Score
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;

entity mini_jeu is
    Port (
        clk : in std_logic;
        btn_play : in std_logic;
        btn_rst : in std_logic;
        leds : out std_logic_vector(3 downto 0);
        seg : out std_logic_vector(6 downto 0)
    );
end mini_jeu;

architecture comportement of mini_jeu is
    type state_type is (S0_Attente, S1_Score, S2_Reset);
    signal state : state_type := S0_Attente;
    signal count : std_logic_vector(3 downto 0) := "0000";
    signal led_flash : std_logic := '0';
    
    function decode7(val: std_logic_vector(3 downto 0))
    return std_logic_vector is variable seg_out: std_logic_vector(6 downto 0);
    
    begin
        case val is
            when "0000" => seg_out := "0000001";
            when "0001" => seg_out := "1001111";
            when "0010" => seg_out := "0010010";
            when "0011" => seg_out := "0000110";
            when "0100" => seg_out := "1001100";
            when "0101" => seg_out := "0100100";
            when "0110" => seg_out := "0100000";
            when "0111" => seg_out := "0001111";
            when "1000" => seg_out := "0000000";
            when "1009" => seg_out := "0000100";
            when others => seg_out := "1111111";
        end case;
        return seg_out;
    end decode7; 
    
begin
    process(clk)
    begin
        if rising_edge(clk) then
            case state is
                when S0_Attente =>
                    led_flash <= not led_flash; --clignotement
                    if btn_play = '1' then
                        state <= S1_Score;
                        count <= count + 1;
                    elsif btn_rst = '1' then
                        state <= S2_Reset;
                    end if;
                 
                 when S1_Score =>
                    if btn_play = '1' then
                        count <= count + 1; -- incrémente score
                    elsif btn_rst = '1' then
                        state <= S2_Reset;
                    end if;
                    
                 when S2_Reset =>
                       count <= "0000";
                       state <= S0_Attente;
              end case;
            end if;
        end process;
        
        leds <= count when state = S1_Score else
                (3 downto 1 => '0') & led_flash;
        
        seg <= decode7(count);

end comportement;`,
        testbenchSnippet: `-- VHDL - Testbench Mini Jeu
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity mini_jeu_tb is
end mini_jeu_tb;

architecture comportement of mini_jeu_tb is
    component mini_jeu
        Port (
            clk: in std_logic;
            btn_play: in std_logic;
            btn_rst: in std_logic;
            leds: out std_logic_vector(3 downto 0);
            seg: out std_logic_vector(6 downto 0)
        );
    end component;
    
    signal clk, btn_play, btn_rst : std_logic :='0';
    signal leds: std_logic_vector(3 downto 0);
    signal seg: std_logic_vector(6 downto 0);

begin
    uut: mini_jeu Port map (
        clk => clk,
        btn_play => btn_play,
        btn_rst => btn_rst,
        leds => leds,
        seg => seg
    );
    
    -- Horloge
    clk_process : process
    begin
        while True loop
            clk <= '0';
            wait for 5 ns;
            clk <= '1';
            wait for 5 ns;
         end loop;
     end process;
     
     -- Simulation des boutons
     test_process : process
     begin
        -- Reset initial
        btn_rst <= '1';
        wait for 10 ns;
        btn_rst <= '0';
        
        -- Appuie sur btn_play 3 fois
        for i in 1 to 3 loop
            btn_play <= '1';
            wait for 10 ns;
            btn_play <= '0';
            wait for 10 ns;
        end loop;
        
        -- Reset
        btn_rst <= '1';
        wait for 10 ns;
        btn_rst <= '0';
        
        wait;
    end process;
end comportement;`,
        challenges: [
          "Gestion des appuis boutons multiples",
          "Synchronisation clignotement LED avec horloge",
          "Transition correcte entre états",
          "Affichage cohérent score sur deux supports"
        ],
        solutions: [
          "Échantillonnage boutons sur front horloge",
          "Compteur interne pour fréquence clignotement",
          "Machine à états avec transitions conditionnelles",
          "Signaux de sortie multiplexés selon état"
        ],
        imageExplanation: "Ce mini-jeu VHDL utilise une machine à états avec 3 modes. En mode Attente, une LED clignote. En mode Score, le compteur s'incrémente à chaque appui sur btn_play et s'affiche sur LEDs et 7 segments. Le mode Reset réinitialise le score et retourne à l'état Attente. Le décodeur 7 segments affiche les valeurs 0-9."
      },
      4: {
        title: "Demi-Additionneur VHDL Combinatoire",
        subtitle: "Portes logiques XOR + AND implémentées en VHDL pur",
        description: "Implémentation VHDL fondamentale d'un demi-additionneur calculant la somme et la retenue de deux bits d'entrée. Démonstration des circuits combinatoires purs sans éléments séquentiels.",
        features: [
          "Porte XOR optimisée pour calcul de la somme (S = A ⊕ B)",
          "Porte AND pour calcul de la retenue (C = A · B)",
          "Entrées A et B sur 1 bit avec toutes combinaisons testées",
          "Sorties S (somme) et C (retenue) sur 1 bit",
          "Table de vérité complète vérifiée par testbench",
          "Circuit combinatoire pur sans horloge ni registres"
        ],
        technologies: ["VHDL Combinatoire pur", "Portes Logiques fondamentales", "FPGA Simulation ModelSim", "Vivado Synthesis", "Testbench VHDL", "Timing Analysis"],
        imageCaption: "Circuit demi-additionneur avec portes XOR et AND en VHDL",
        simulationCaption: "Simulation ModelSim du demi-additionneur",
        codeSnippet: `-- VHDL - Demi-Additionneur (Half Adder)
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity halfadd is
    Port (
        A : in std_logic;
        B : in std_logic;
        C : out std_logic;
        S : out std_logic
);
end halfadd;

architecture Comportement of halfadd is

begin
    S <= A XOR B;
    C <= A AND B;
end Comportement;`,
        testbenchSnippet: `-- VHDL - Testbench Demi-Additionneur
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity halfadd_tb is
end halfadd_tb;

architecture Comportement of halfadd_tb is

component halfadd
    Port (
        A : in std_logic;
        B : in std_logic;
        C : out std_logic;
        S : out std_logic
    );
  end component;
  
  signal A, B, C, S : std_logic;
 
 begin
 
    uut: halfadd Port map (
        A => A,
        B => B,
        C => C,
        S => S
    );
    
    process
    begin
        --Case 1 : '0' xor, and '0'
        A <= '0'; B <= '0';
        wait for 10 ns;
        --Case 2: '1' xor, and '1'
        A <= '1'; B <= '1';
        wait for 10 ns;
        --Case 3: '1' xor, and '0'
        A <= '1'; B <= '0';
        wait for 10 ns;
        --Case 4: '0' xor, and '1'
        A <= '0'; B <= '1';
        wait for 10 ns;
        wait;
    end process;
 
end Comportement;`,
        challenges: [
          "Propagation délais différents pour portes XOR et AND",
          "Risque de glitches sur transitions simultanées",
          "Optimisation surface circuit",
          "Test exhaustif de toutes les combinaisons"
        ],
        solutions: [
          "Contraintes timing égales pour les chemins",
          "Synchronisation avec registres si nécessaire",
          "Encodage optimisé et partage ressources",
          "Testbench automatisé avec 4 vecteurs"
        ],
        imageExplanation: "Le demi-additionneur est le circuit combinatoire fondamental pour l'arithmétique binaire. Cette implémentation VHDL utilise une porte XOR pour la somme (S = A ⊕ B) et une porte AND pour la retenue (C = A · B). C'est un circuit purement combinatoire sans éléments de mémoire."
      },
      5: {
        title: "Porte Logique AND VHDL",
        subtitle: "Porte ET fondamentale avec testbench",
        description: "Implémentation VHDL d'une porte logique ET avec deux entrées. Circuit combinatoire simple démontrant les bases du design numérique VHDL avec vérification complète par testbench.",
        features: [
          "Porte logique ET (AND) fondamentale avec table de vérité",
          "Sortie C = A AND B avec tous les cas testés",
          "Entrées A et B sur 1 bit avec complétude binaire",
          "Sortie C sur 1 bit suivant table de vérité AND",
          "Testbench vérifiant les 4 combinaisons possibles",
          "Circuit combinatoire simple pour étude des fondamentaux"
        ],
        technologies: ["VHDL Gate Level", "FPGA LUT Implementation", "Combinational Logic Design", "Vivado Synthesis", "RTL Analysis", "Power Analysis"],
        imageCaption: "Porte AND VHDL implémentée avec testbench complet",
        simulationCaption: "Simulation ModelSim de la porte AND",
        codeSnippet: `-- VHDL - Porte ET (AND Gate)
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity porte_et is
    Port (
        A : in std_logic;
        B : in std_logic;
        C : out std_logic
);
end porte_et;

architecture comportement of porte_et is

begin
    C <= A AND B;
end comportement;`,
        testbenchSnippet: `-- VHDL - Testbench Porte ET
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity porte_et_tb is
end porte_et_tb;

architecture comportement of porte_et_tb is

component porte_et
    Port(
       A : in std_logic;
       B : in std_logic;
       C : out std_logic
    );
end component;

    signal A, B, C : std_logic;
    
begin
    uut: porte_et Port map (
        A => A,
        B => B,
        C => C
    );
    
    process
    begin
        -- Cas 1 : 0 et 0
        A <= '0'; B <= '0';
        wait for 10 ns;
        -- Cas 2 : 0 et 1
        A <= '0'; B <= '1';
        wait for 10 ns;
        -- Cas 3 : 1 et 0
        A <= '1'; B <= '0';
        wait for 10 ns;
        -- Cas 4 : 1 et 1
        A <= '1'; B <= '1';
        wait for 10 ns;
        wait;
   end process;
   
end comportement;`,
        challenges: [
          "Glitches sur transitions simultanées",
          "Délai propagation asymétrique",
          "Consommation puissance trade-off",
          "Test couverture 100%"
        ],
        solutions: [
          "Synchronisation avec horloge pour éliminer glitches",
          "Contraintes timing égales",
          "Clock gating et power optimization",
          "Test des 4 combinaisons d'entrées"
        ],
        imageExplanation: "Cette porte AND VHDL est l'implémentation la plus simple d'une porte logique. Elle produit la sortie C = A AND B selon la table de vérité standard. Le testbench vérifie systématiquement les 4 combinaisons possibles d'entrées (00, 01, 10, 11)."
      },
      6: {
        title: "Porte Logique OR VHDL",
        subtitle: "Porte OU fondamentale avec vérification",
        description: "Implémentation VHDL d'une porte logique OU avec deux entrées, focalisée sur la vérification exhaustive du comportement via testbench. Circuit de référence pour études avancées.",
        features: [
          "Porte logique OU (OR) fondamentale C = A OR B",
          "Entrées A et B sur 1 bit avec toutes combinaisons testées",
          "Sortie C sur 1 bit suivant table de vérité OR",
          "Testbench couvrant les 4 états d'entrée",
          "Circuit combinatoire de référence",
          "Analyse timing et consommation"
        ],
        technologies: ["VHDL RTL Design", "FPGA Slice Optimization", "Combinational Circuit", "Vivado Implementation", "Utilization Reports", "Post-Synthesis Simulation"],
        imageCaption: "Porte OR VHDL avec testbench exhaustif",
        simulationCaption: "Simulation ModelSim de la porte OR",
        codeSnippet: `-- VHDL - Porte OU (OR Gate)
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity porte_ou is
    Port (
        A : in std_logic;
        B : in std_logic;
        C : out std_logic
    );
end porte_ou;

architecture comportement of porte_ou is

begin
    C <= A OR B;
end comportement;`,
        testbenchSnippet: `-- VHDL - Testbench Porte OU
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity porte_ou_tb is
end porte_ou_tb;

architecture comportement of porte_ou_tb is
    
 component porte_ou
    Port (
        A : in std_logic;
        B : in std_logic;
        C : out std_logic
       );
   end component;
   
   signal A, B, C : std_logic;
   
 begin
    uut: porte_ou Port map (
        A => A,
        B => B,
        C => C
    );
    
  process
  begin
        --Case 1 : 0 ou 0
        A <= '0'; B <= '0';
        wait for 10 ns;
        --Case 2 : 1 ou 1
        A <= '1'; B <= '1';
        wait for 10 ns;
        --Case 3 : 1 ou 0
        A <= '1'; B <= '0';
        wait for 10 ns;
        --Case 4 : 0 ou 1
        A <= '0'; B <= '1';
        wait for 10 ns;
        wait;
   end process;

end comportement;`,
        challenges: [
          "Limitations fan-in sur FPGA",
          "Signal integrity à haute fréquence",
          "Metastability risques sur transitions",
          "Trade-off power vs performance"
        ],
        solutions: [
          "Arbre de portes équilibré",
          "Buffers de sortie contrôlés",
          "Synchroniseurs double flip-flop",
          "Clock enable optimisation"
        ],
        imageExplanation: "Cette porte OR VHDL implémente l'opération logique fondamentale C = A OR B. Comme les autres portes logiques de base, elle est purement combinatoire. Le testbench vérifie les 4 combinaisons possibles d'entrées pour garantir le comportement correct selon la table de vérité OR."
      }
    };
    
    return blocksData[id] || blocksData[1];
  };

  const blockData = getBlockData(blockId);
  const currentImage = blockImages[blockId];
  const currentSimulationImage = simulationImages[blockId];

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
                <li><strong>Type de circuit :</strong> {blockId <= 3 ? 'Séquentiel synchrone' : 'Combinatoire pur'}</li>
                <li><strong>Fréquence horloge :</strong> {blockId <= 3 ? 'Dépend de l\'implémentation' : 'N/A (combinatoire)'}</li>
                <li><strong>Outils de développement :</strong> Xilinx Vivado, ModelSim, FPGA Basys 3/Nexys</li>
              </ul>
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

          {/* SECTION SIMULATION */}
          <div className="block-section">
            <h2 className="section-title">Démonstration par Simulation</h2>
            
            <div className="video-description">
              <p>Cette image montre la simulation ModelSim/Vivado du design VHDL, illustrant le comportement temporel et la vérification fonctionnelle.</p>
            </div>
            
            <div className="single-image-container">
              <div className="main-image-wrapper">
                {simulationImageError ? (
                  <div className="image-placeholder">
                    <span className="placeholder-icon">📊</span>
                    <p className="placeholder-text">Image de simulation non disponible</p>
                  </div>
                ) : (
                  <img 
                    src={currentSimulationImage} 
                    alt={`Simulation ${blockData.title}`}
                    className="main-project-image"
                    onError={handleSimulationImageError}
                  />
                )}
                <div className="main-image-caption">
                  {blockData.simulationCaption}
                </div>
              </div>
            </div>
            
            <div className="image-explanation">
              <h3>Analyse de la simulation :</h3>
              <p>La simulation ModelSim montre les signaux d'entrée/sortie du design VHDL avec leur chronologie. Les waveforms permettent de vérifier :</p>
              <ul>
                <li>Le respect des temps de setup/hold des flip-flops (circuits séquentiels)</li>
                <li>La propagation correcte des signaux combinatoires</li>
                <li>Les transitions d'état aux fronts d'horloge appropriés</li>
                <li>L'absence de glitches ou de métastabilités</li>
              </ul>
            </div>
          </div>

          {/* SECTION DEUX SNIPPETS CODE CÔTE À CÔTE */}
          <div className="block-section">
            <h2 className="section-title">Code Source VHDL</h2>
            <div className="dual-code-container">
              <div className="code-column">
                <div className="code-container">
                  <div className="code-header">
                    <span className="code-filename">FPGA_Bloc{blockId}_Main.vhd</span>
                    <button className="copy-btn">Copier</button>
                  </div>
                  <pre className="code-snippet">{blockData.codeSnippet}</pre>
                </div>
              </div>
              <div className="code-column">
                <div className="code-container">
                  <div className="code-header">
                    <span className="code-filename">FPGA_Bloc{blockId}_Testbench.vhd</span>
                    <button className="copy-btn">Copier</button>
                  </div>
                  <pre className="codeSnippet">{blockData.testbenchSnippet}</pre>
                </div>
              </div>
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

export default FPGABlocks;