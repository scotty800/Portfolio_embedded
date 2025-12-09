// components/blocks/FPGABlocks.jsx - NOUVEAU FICHIER pour projet FPGA
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FPGABlocks = ({ projectId, blockId, nextBlock, prevBlock }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const blocksData = {
    1: {
      title: "Machine à États Finis LED Controller",
      subtitle: "VHDL FSM avec états S0, S1, S2 sur FPGA",
      description: "Implémentation VHDL d'une machine à états finis contrôlant une LED avec 3 états : allumée constante, éteinte, et clignotante.",
      features: [
        "3 états distincts (S0, S1, S2)",
        "Transition sur front d'horloge",
        "Reset asynchrone vers état initial",
        "Sortie LED contrôlée par état",
        "Simulation complète ModelSim",
        "Synthese sur FPGA Xilinx"
      ],
      technologies: ["FPGA Basys 3", "Xilinx Vivado", "VHDL", "ModelSim", "LED GPIO", "Horloge 100MHz"],
      mainImage: {
        src: "/assets/projects/fpga/fsm-led-controller.jpg",
        alt: "Machine à états FSM LED sur FPGA",
        caption: "Architecture FSM VHDL avec contrôle LED"
      },
      additionalImages: [
        { src: "/assets/projects/fpga/fsm-state-diagram.jpg", alt: "Diagramme états FSM" },
        { src: "/assets/projects/fpga/fsm-simulation.jpg", alt: "Simulation ModelSim FSM" },
        { src: "/assets/projects/fpga/fpga-board-led.jpg", alt: "FPGA avec LED contrôlée" },
        { src: "/assets/projects/fpga/vivado-fsm-design.jpg", alt: "Design Vivado FSM" },
        { src: "/assets/projects/fpga/fsm-timing.jpg", alt: "Analyse timing FSM" },
        { src: "/assets/projects/fpga/fsm-resources.jpg", alt: "Utilisation ressources FPGA" }
      ],
      videoLink: "#",
      codeSnippet1: `-- VHDL - FSM LED Controller
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity fsm_led_controller is
    Port (
        clk     : in  STD_LOGIC;
        reset   : in  STD_LOGIC;
        led_out : out STD_LOGIC
    );
end fsm_led_controller;

architecture Behavioral of fsm_led_controller is
    type state_type is (S0, S1, S2);
    signal current_state, next_state : state_type;
    signal counter : integer range 0 to 50000000 := 0;
    signal blink_signal : STD_LOGIC := '0';
begin
    -- Process séquentiel pour changement d'état
    process(clk, reset)
    begin
        if reset = '1' then
            current_state <= S0;
        elsif rising_edge(clk) then
            current_state <= next_state;
        end if;
    end process;
    
    -- Process combinatoire pour logique état suivant
    process(current_state)
    begin
        case current_state is
            when S0 => next_state <= S1;
            when S1 => next_state <= S2;
            when S2 => next_state <= S0;
            when others => next_state <= S0;
        end case;
    end process;
    
    -- Process pour compteur clignotement
    process(clk)
    begin
        if rising_edge(clk) then
            if counter = 50000000 then
                counter <= 0;
                blink_signal <= not blink_signal;
            else
                counter <= counter + 1;
            end if;
        end if;
    end process;
    
    -- Logique de sortie LED
    with current_state select
        led_out <= '1' when S0,
                   '0' when S1,
                   blink_signal when S2,
                   '0' when others;
end Behavioral;`,
      codeSnippet2: `-- VHDL - Testbench FSM LED Controller
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity tb_fsm_led_controller is
end tb_fsm_led_controller;

architecture Behavioral of tb_fsm_led_controller is
    component fsm_led_controller
        Port (
            clk     : in  STD_LOGIC;
            reset   : in  STD_LOGIC;
            led_out : out STD_LOGIC
        );
    end component;
    
    signal clk_tb     : STD_LOGIC := '0';
    signal reset_tb   : STD_LOGIC := '0';
    signal led_out_tb : STD_LOGIC;
    
    constant clk_period : time := 10 ns;
begin
    UUT: fsm_led_controller
        port map (
            clk     => clk_tb,
            reset   => reset_tb,
            led_out => led_out_tb
        );
    
    -- Génération horloge
    clk_process: process
    begin
        clk_tb <= '0';
        wait for clk_period/2;
        clk_tb <= '1';
        wait for clk_period/2;
    end process;
    
    -- Stimuli
    stim_proc: process
    begin
        -- Reset initial
        reset_tb <= '1';
        wait for 20 ns;
        reset_tb <= '0';
        wait for 100 ns;
        
        -- Attendre transitions d'état
        wait for 200 ns;
        
        -- Test reset pendant fonctionnement
        reset_tb <= '1';
        wait for 20 ns;
        reset_tb <= '0';
        
        wait;
    end process;
end Behavioral;`,
      challenges: [
        "Synchronisation états avec horloge",
        "Gestion reset asynchrone",
        "Timing des transitions d'état",
        "Optimisation ressources FPGA"
      ],
      solutions: [
        "Machine Mealy/Moore optimisée",
        "Reset synchronisé double flip-flop",
        "Contraintes timing XDC précises",
        "Encodage binaire des états"
      ]
    },
    2: {
      title: "Compteur 4 bits avec Affichage 7 Segments",
      subtitle: "VHDL Compteur BCD + Décodeur 7 segments",
      description: "Compteur 4 bits synchrone affiché simultanément sur LEDs et afficheur 7 segments avec boutons d'incrémentation et reset.",
      features: [
        "Compteur 4 bits (0-15)",
        "Affichage dual LEDs + 7 segments",
        "Bouton incrémentation front montant",
        "Reset synchrone",
        "Décodeur BCD vers 7 segments",
        "Synchronisation horloge 100MHz"
      ],
      technologies: ["FPGA Nexys A7", "7-Segment Display", "Boutons GPIO", "LEDs GPIO", "Vivado", "VHDL Testbench"],
      mainImage: {
        src: "/assets/projects/fpga/7segment-counter.jpg",
        alt: "Compteur 4 bits avec affichage 7 segments",
        caption: "Compteur VHDL avec sortie 7 segments et LEDs"
      },
      additionalImages: [
        { src: "/assets/projects/fpga/bcd-decoder.jpg", alt: "Décodeur BCD 7 segments" },
        { src: "/assets/projects/fpga/counter-simulation.jpg", alt: "Simulation compteur" },
        { src: "/assets/projects/fpga/7segment-pinout.jpg", alt: "Pinout 7 segments" },
        { src: "/assets/projects/fpga/counter-timing.jpg", alt: "Timing compteur" },
        { src: "/assets/projects/fpga/nexys-counter.jpg", alt: "FPGA Nexys avec compteur" },
        { src: "/assets/projects/fpga/debounce-circuit.jpg", alt: "Circuit anti-rebond" }
      ],
      videoLink: "#",
      codeSnippet1: `-- VHDL - Compteur 4 bits avec 7 segments
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity counter_7seg is
    Port (
        clk      : in  STD_LOGIC;
        reset    : in  STD_LOGIC;
        inc_btn  : in  STD_LOGIC;
        leds_out : out STD_LOGIC_VECTOR(3 downto 0);
        seg_out  : out STD_LOGIC_VECTOR(6 downto 0);
        anode_out: out STD_LOGIC_VECTOR(3 downto 0)
    );
end counter_7seg;

architecture Behavioral of counter_7seg is
    signal counter     : unsigned(3 downto 0) := "0000";
    signal btn_debounced : STD_LOGIC := '0';
    signal btn_prev    : STD_LOGIC := '0';
    signal counter_en  : STD_LOGIC := '0';
begin
    -- Process anti-rebond bouton
    process(clk)
        variable debounce_counter : integer := 0;
    begin
        if rising_edge(clk) then
            if inc_btn = '1' and btn_prev = '0' then
                if debounce_counter = 1000000 then
                    btn_debounced <= '1';
                    debounce_counter := 0;
                else
                    debounce_counter := debounce_counter + 1;
                end if;
            else
                btn_debounced <= '0';
                debounce_counter := 0;
            end if;
            btn_prev <= inc_btn;
        end if;
    end process;
    
    -- Process compteur principal
    process(clk, reset)
    begin
        if reset = '1' then
            counter <= "0000";
        elsif rising_edge(clk) then
            if btn_debounced = '1' then
                if counter = "1111" then
                    counter <= "0000";
                else
                    counter <= counter + 1;
                end if;
            end if;
        end if;
    end process;
    
    -- Sortie LEDs (affichage binaire)
    leds_out <= STD_LOGIC_VECTOR(counter);
    
    -- Décodeur BCD vers 7 segments (anode commune)
    process(counter)
    begin
        case counter is
            when "0000" => seg_out <= "0000001"; -- 0
            when "0001" => seg_out <= "1001111"; -- 1
            when "0010" => seg_out <= "0010010"; -- 2
            when "0011" => seg_out <= "0000110"; -- 3
            when "0100" => seg_out <= "1001100"; -- 4
            when "0101" => seg_out <= "0100100"; -- 5
            when "0110" => seg_out <= "0100000"; -- 6
            when "0111" => seg_out <= "0001111"; -- 7
            when "1000" => seg_out <= "0000000"; -- 8
            when "1001" => seg_out <= "0000100"; -- 9
            when "1010" => seg_out <= "0001000"; -- A
            when "1011" => seg_out <= "1100000"; -- B
            when "1100" => seg_out <= "0110001"; -- C
            when "1101" => seg_out <= "1000010"; -- D
            when "1110" => seg_out <= "0110000"; -- E
            when "1111" => seg_out <= "0111000"; -- F
            when others => seg_out <= "1111111"; -- Off
        end case;
    end process;
    
    -- Activation anode (un seul digit pour simplifier)
    anode_out <= "1110"; -- Activer seulement premier digit
end Behavioral;`,
      codeSnippet2: `-- VHDL - Testbench Compteur 7 segments
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity tb_counter_7seg is
end tb_counter_7seg;

architecture Behavioral of tb_counter_7seg is
    component counter_7seg
        Port (
            clk      : in  STD_LOGIC;
            reset    : in  STD_LOGIC;
            inc_btn  : in  STD_LOGIC;
            leds_out : out STD_LOGIC_VECTOR(3 downto 0);
            seg_out  : out STD_LOGIC_VECTOR(6 downto 0);
            anode_out: out STD_LOGIC_VECTOR(3 downto 0)
        );
    end component;
    
    signal clk_tb      : STD_LOGIC := '0';
    signal reset_tb    : STD_LOGIC := '0';
    signal inc_btn_tb  : STD_LOGIC := '0';
    signal leds_out_tb : STD_LOGIC_VECTOR(3 downto 0);
    signal seg_out_tb  : STD_LOGIC_VECTOR(6 downto 0);
    signal anode_out_tb: STD_LOGIC_VECTOR(3 downto 0);
    
    constant clk_period : time := 10 ns;
begin
    UUT: counter_7seg
        port map (
            clk      => clk_tb,
            reset    => reset_tb,
            inc_btn  => inc_btn_tb,
            leds_out => leds_out_tb,
            seg_out  => seg_out_tb,
            anode_out=> anode_out_tb
        );
    
    -- Horloge 100MHz
    clk_process: process
    begin
        clk_tb <= '0';
        wait for clk_period/2;
        clk_tb <= '1';
        wait for clk_period/2;
    end process;
    
    -- Stimuli
    stim_proc: process
    begin
        -- Reset initial
        reset_tb <= '1';
        wait for 20 ns;
        reset_tb <= '0';
        wait for 100 ns;
        
        -- Simuler appuis bouton
        for i in 0 to 20 loop
            inc_btn_tb <= '1';
            wait for 100 ns;
            inc_btn_tb <= '0';
            wait for 900 ns;
        end loop;
        
        -- Test reset pendant comptage
        reset_tb <= '1';
        wait for 20 ns;
        reset_tb <= '0';
        
        wait;
    end process;
end Behavioral;`,
      challenges: [
        "Anti-rebond boutons mécaniques",
        "Multiplexage afficheurs 7 segments",
        "Timing affichage sans scintillement",
        "Synchronisation signaux asynchrones"
      ],
      solutions: [
        "Algorithme debounce digital",
        "Refresh 1kHz avec compteur",
        "PWM pour luminosité constante",
        "Double synchronisation flip-flop"
      ]
    },
    3: {
      title: "Mini Jeu Interactif avec Score",
      subtitle: "VHDL Machine à états + Score + Affichage",
      description: "Mini-jeu interactif avec machine à états, système de score et affichage multiple sur LEDs et 7 segments.",
      features: [
        "Mode attente LED clignotante",
        "Mode jeu incrémentation score",
        "Reset score et état",
        "Affichage score sur LEDs",
        "Affichage score sur 7 segments",
        "Logique jeu complète VHDL"
      ],
      technologies: ["FPGA Basys 3", "Boutons GPIO", "LEDs Array", "7-Segment Display", "Vivado IP", "VHDL Packages"],
      mainImage: {
        src: "/assets/projects/fpga/mini-game-fpga.jpg",
        alt: "Mini jeu interactif sur FPGA",
        caption: "Architecture jeu VHDL avec score et affichage"
      },
      additionalImages: [
        { src: "/assets/projects/fpga/game-state-machine.jpg", alt: "Machine états jeu" },
        { src: "/assets/projects/fpga/score-display.jpg", alt: "Affichage score" },
        { src: "/assets/projects/fpga/game-simulation.jpg", alt: "Simulation jeu" },
        { src: "/assets/projects/fpga/game-timing.jpg", alt: "Timing jeu" },
        { src: "/assets/projects/fpga/fpga-game-setup.jpg", alt: "Setup jeu FPGA" },
        { src: "/assets/projects/fpga/game-resources.jpg", alt: "Ressources jeu" }
      ],
      videoLink: "#",
      codeSnippet1: `-- VHDL - Mini Jeu avec Score
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity mini_game is
    Port (
        clk         : in  STD_LOGIC;
        reset       : in  STD_LOGIC;
        start_btn   : in  STD_LOGIC;
        action_btn  : in  STD_LOGIC;
        leds_out    : out STD_LOGIC_VECTOR(7 downto 0);
        seg_out     : out STD_LOGIC_VECTOR(6 downto 0);
        anode_out   : out STD_LOGIC_VECTOR(3 downto 0)
    );
end mini_game;

architecture Behavioral of mini_game is
    type game_state is (IDLE, PLAYING, GAME_OVER);
    signal current_state, next_state : game_state;
    
    signal score         : unsigned(7 downto 0) := (others => '0');
    signal timer_counter : integer range 0 to 100000000 := 0;
    signal game_timer    : integer range 0 to 30 := 0;
    signal blink_counter : integer range 0 to 50000000 := 0;
    signal blink_led     : STD_LOGIC := '0';
    
    signal start_debounced, action_debounced : STD_LOGIC := '0';
begin
    -- Débounceurs boutons
    debounce_start: entity work.debounce
        port map (clk => clk, button => start_btn, result => start_debounced);
    
    debounce_action: entity work.debounce
        port map (clk => clk, button => action_btn, result => action_debounced);
    
    -- Machine à états principale
    state_machine: process(clk, reset)
    begin
        if reset = '1' then
            current_state <= IDLE;
            score <= (others => '0');
            game_timer <= 0;
        elsif rising_edge(clk) then
            current_state <= next_state;
            
            -- Logique par état
            case current_state is
                when IDLE =>
                    if start_debounced = '1' then
                        next_state <= PLAYING;
                        score <= (others => '0');
                        game_timer <= 30; -- 30 secondes
                    end if;
                    
                when PLAYING =>
                    if game_timer = 0 then
                        next_state <= GAME_OVER;
                    elsif action_debounced = '1' then
                        score <= score + 1;
                    end if;
                    
                    -- Décrémenter timer jeu
                    if timer_counter = 100000000 then
                        timer_counter <= 0;
                        game_timer <= game_timer - 1;
                    else
                        timer_counter <= timer_counter + 1;
                    end if;
                    
                when GAME_OVER =>
                    if start_debounced = '1' then
                        next_state <= IDLE;
                    end if;
            end case;
        end if;
    end process;
    
    -- LED clignotante mode IDLE
    process(clk)
    begin
        if rising_edge(clk) then
            if blink_counter = 50000000 then
                blink_counter <= 0;
                blink_led <= not blink_led;
            else
                blink_counter <= blink_counter + 1;
            end if;
        end if;
    end process;
    
    -- Sorties en fonction de l'état
    process(current_state, score, blink_led)
    begin
        case current_state is
            when IDLE =>
                leds_out <= (others => blink_led);
                
            when PLAYING =>
                leds_out <= STD_LOGIC_VECTOR(score);
                
            when GAME_OVER =>
                leds_out <= "10101010"; -- Pattern fixe
        end case;
    end process;
    
    -- Décodeur score pour 7 segments
    seg7_display: entity work.seg7_decoder
        port map (
            value => score(3 downto 0),
            segments => seg_out
        );
    
    -- Anodes (afficher 2 digits)
    anode_out <= "0011" when current_state = PLAYING else "1110";
end Behavioral;`,
      codeSnippet2: `-- VHDL - Débounceur pour boutons
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity debounce is
    Port (
        clk    : in  STD_LOGIC;
        button : in  STD_LOGIC;
        result : out STD_LOGIC
    );
end debounce;

architecture Behavioral of debounce is
    signal ff1, ff2, ff3 : STD_LOGIC := '0';
    signal counter : integer range 0 to 100000 := 0;
begin
    process(clk)
    begin
        if rising_edge(clk) then
            ff1 <= button;
            ff2 <= ff1;
            ff3 <= ff2;
            
            if ff3 = '1' then
                if counter = 100000 then
                    result <= '1';
                else
                    counter <= counter + 1;
                end if;
            else
                counter <= 0;
                result <= '0';
            end if;
        end if;
    end process;
end Behavioral;

-- VHDL - Décodeur 7 segments
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity seg7_decoder is
    Port (
        value    : in  STD_LOGIC_VECTOR(3 downto 0);
        segments : out STD_LOGIC_VECTOR(6 downto 0)
    );
end seg7_decoder;

architecture Behavioral of seg7_decoder is
begin
    with value select
        segments <= "0000001" when "0000", -- 0
                    "1001111" when "0001", -- 1
                    "0010010" when "0010", -- 2
                    "0000110" when "0011", -- 3
                    "1001100" when "0100", -- 4
                    "0100100" when "0101", -- 5
                    "0100000" when "0110", -- 6
                    "0001111" when "0111", -- 7
                    "0000000" when "1000", -- 8
                    "0000100" when "1001", -- 9
                    "0001000" when "1010", -- A
                    "1100000" when "1011", -- B
                    "0110001" when "1100", -- C
                    "1000010" when "1101", -- D
                    "0110000" when "1110", -- E
                    "0111000" when "1111", -- F
                    "1111111" when others; -- Off
end Behavioral;`,
      challenges: [
        "Synchronisation multiple boutons",
        "Gestion timing jeu précis",
        "Affichage score temps réel",
        "Transition fluide entre états"
      ],
      solutions: [
        "FSM hiérarchique avec sous-états",
        "Timers hardware dédiés",
        "Buffer double pour affichage",
        "Signaux de contrôle états"
      ]
    },
    4: {
      title: "Demi-Additionneur VHDL Combinatoire",
      subtitle: "Portes logiques XOR + AND en VHDL",
      description: "Implémentation VHDL d'un demi-additionneur calculant la somme et la retenue de deux bits d'entrée.",
      features: [
        "Porte XOR pour somme (S)",
        "Porte AND pour retenue (C)",
        "Entrées A et B (1 bit)",
        "Sorties S et C (1 bit)",
        "Table de vérité complète",
        "Circuit combinatoire pur"
      ],
      technologies: ["VHDL Combinatoire", "Portes Logiques", "FPGA Simulation", "ModelSim", "Vivado", "Testbench VHDL"],
      mainImage: {
        src: "/assets/projects/fpga/half-adder-circuit.jpg",
        alt: "Circuit demi-additionneur VHDL",
        caption: "Schéma demi-additionneur avec portes XOR et AND"
      },
      additionalImages: [
        { src: "/assets/projects/fpga/truth-table.jpg", alt: "Table vérité additionneur" },
        { src: "/assets/projects/fpga/gate-level.jpg", alt: "Niveau portes logiques" },
        { src: "/assets/projects/fpga/half-adder-sim.jpg", alt: "Simulation additionneur" },
        { src: "/assets/projects/fpga/timing-analysis.jpg", alt: "Analyse timing" },
        { src: "/assets/projects/fpga/schematic-view.jpg", alt: "Vue schématique" },
        { src: "/assets/projects/fpga/waveform-view.jpg", alt: "Vue waveform" }
      ],
      videoLink: "#",
      codeSnippet1: `-- VHDL - Demi-Additionneur (Half Adder)
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity half_adder is
    Port (
        A : in  STD_LOGIC;  -- Premier bit d'entrée
        B : in  STD_LOGIC;  -- Deuxième bit d'entrée
        S : out STD_LOGIC;  -- Sortie somme
        C : out STD_LOGIC   -- Sortie retenue
    );
end half_adder;

-- Architecture avec opérateurs logiques
architecture Behavioral of half_adder is
begin
    -- Somme = A XOR B
    S <= A xor B;
    
    -- Retenue = A AND B
    C <= A and B;
end Behavioral;

-- Architecture alternative avec process
architecture Behavioral2 of half_adder is
begin
    process(A, B)
    begin
        -- Table de vérité complète
        if A = '0' and B = '0' then
            S <= '0';
            C <= '0';
        elsif A = '0' and B = '1' then
            S <= '1';
            C <= '0';
        elsif A = '1' and B = '0' then
            S <= '1';
            C <= '0';
        else -- A = '1' and B = '1'
            S <= '0';
            C <= '1';
        end if;
    end process;
end Behavioral2;

-- Architecture avec when/else
architecture Behavioral3 of half_adder is
begin
    S <= '1' when (A = '0' and B = '1') or (A = '1' and B = '0') else '0';
    C <= '1' when (A = '1' and B = '1') else '0';
end Behavioral3;`,
      codeSnippet2: `-- VHDL - Testbench Demi-Additionneur Complet
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity tb_half_adder is
end tb_half_adder;

architecture Behavioral of tb_half_adder is
    component half_adder
        Port (
            A : in  STD_LOGIC;
            B : in  STD_LOGIC;
            S : out STD_LOGIC;
            C : out STD_LOGIC
        );
    end component;
    
    signal A_tb, B_tb : STD_LOGIC := '0';
    signal S_tb, C_tb : STD_LOGIC;
    
    -- Constantes pour délais
    constant period : time := 10 ns;
begin
    -- Instanciation UUT
    UUT: half_adder
        port map (
            A => A_tb,
            B => B_tb,
            S => S_tb,
            C => C_tb
        );
    
    -- Processus de test
    stim_proc: process
    begin
        -- Test case 1: 0 + 0
        A_tb <= '0';
        B_tb <= '0';
        wait for period;
        assert (S_tb = '0' and C_tb = '0')
            report "Test 0+0 failed" severity error;
        
        -- Test case 2: 0 + 1
        A_tb <= '0';
        B_tb <= '1';
        wait for period;
        assert (S_tb = '1' and C_tb = '0')
            report "Test 0+1 failed" severity error;
        
        -- Test case 3: 1 + 0
        A_tb <= '1';
        B_tb <= '0';
        wait for period;
        assert (S_tb = '1' and C_tb = '0')
            report "Test 1+0 failed" severity error;
        
        -- Test case 4: 1 + 1
        A_tb <= '1';
        B_tb <= '1';
        wait for period;
        assert (S_tb = '0' and C_tb = '1')
            report "Test 1+1 failed" severity error;
        
        -- Test supplémentaire: toutes transitions
        for i in 0 to 3 loop
            A_tb <= '0';
            B_tb <= '0';
            wait for period/4;
            A_tb <= '1';
            wait for period/4;
            B_tb <= '1';
            wait for period/4;
            A_tb <= '0';
            wait for period/4;
        end loop;
        
        -- Fin de simulation
        report "All tests passed successfully!";
        wait;
    end process;
    
    -- Processus de monitoring
    monitor_proc: process
    begin
        wait on A_tb, B_tb;
        wait for 1 ns; -- Attendre propagation
        
        report "Inputs: A=" & STD_LOGIC'image(A_tb) & 
               ", B=" & STD_LOGIC'image(B_tb) &
               " -> Outputs: S=" & STD_LOGIC'image(S_tb) &
               ", C=" & STD_LOGIC'image(C_tb);
    end process;
end Behavioral;

-- VHDL - Additionneur Complet (Full Adder)
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity full_adder is
    Port (
        A    : in  STD_LOGIC;
        B    : in  STD_LOGIC;
        Cin  : in  STD_LOGIC;
        Sum  : out STD_LOGIC;
        Cout : out STD_LOGIC
    );
end full_adder;

architecture Behavioral of full_adder is
    signal S1, C1, C2 : STD_LOGIC;
begin
    -- Utilisation de deux demi-additionneurs
    HA1: entity work.half_adder
        port map (A => A, B => B, S => S1, C => C1);
    
    HA2: entity work.half_adder
        port map (A => S1, B => Cin, S => Sum, C => C2);
    
    -- OR pour la retenue finale
    Cout <= C1 or C2;
end Behavioral;`,
      challenges: [
        "Propagation délais portes logiques",
        "Optimisation surface circuit",
        "Test exhaustif toutes combinaisons",
        "Intégration dans design plus grand"
      ],
      solutions: [
        "Contraintes timing XDC",
        "Look Ahead Carry pour performance",
        "Testbench automatisé assertions",
        "Hiérarchie modularité VHDL"
      ]
    },
    5: {
      title: "Porte Logique AND VHDL",
      subtitle: "Implémentation porte ET avec deux entrées",
      description: "Circuit VHDL simple implémentant une porte logique ET avec deux entrées et une sortie.",
      features: [
        "Porte logique ET (AND)",
        "Sortie C = A AND B",
        "Entrées A et B (1 bit)",
        "Sortie C (1 bit)",
        "Table de vérité : 1 si A=1 et B=1",
        "Circuit combinatoire simple"
      ],
      technologies: ["VHDL Gate Level", "FPGA LUT", "Combinational Logic", "Vivado Synthesis", "RTL Analysis", "Power Analysis"],
      mainImage: {
        src: "/assets/projects/fpga/and-gate-circuit.jpg",
        alt: "Porte AND VHDL implementation",
        caption: "Implémentation porte AND en VHDL et FPGA"
      },
      additionalImages: [
        { src: "/assets/projects/fpga/and-truth-table.jpg", alt: "Table vérité AND" },
        { src: "/assets/projects/fpga/lut-implementation.jpg", alt: "Implementation LUT" },
        { src: "/assets/projects/fpga/and-simulation.jpg", alt: "Simulation AND" },
        { src: "/assets/projects/fpga/gate-schematic.jpg", alt: "Schéma porte" },
        { src: "/assets/projects/fpga/timing-gate.jpg", alt: "Timing porte" },
        { src: "/assets/projects/fpga/power-gate.jpg", alt: "Consommation porte" }
      ],
      videoLink: "#",
      codeSnippet1: `-- VHDL - Porte AND Multiple Implémentations
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity and_gate is
    Port (
        A : in  STD_LOGIC;
        B : in  STD_LOGIC;
        C : out STD_LOGIC
    );
end and_gate;

-- Architecture 1: Opérateur AND direct
architecture Behavioral1 of and_gate is
begin
    C <= A and B;
end Behavioral1;

-- Architecture 2: Process avec table de vérité
architecture Behavioral2 of and_gate is
begin
    process(A, B)
    begin
        if A = '1' and B = '1' then
            C <= '1';
        else
            C <= '0';
        end if;
    end process;
end Behavioral2;

-- Architecture 3: When/else
architecture Behavioral3 of and_gate is
begin
    C <= '1' when (A = '1' and B = '1') else '0';
end Behavioral3;

-- Architecture 4: Case statement
architecture Behavioral4 of and_gate is
    signal inputs : STD_LOGIC_VECTOR(1 downto 0);
begin
    inputs <= A & B;
    
    process(inputs)
    begin
        case inputs is
            when "11" => C <= '1';
            when others => C <= '0';
        end case;
    end process;
end Behavioral4;

-- Architecture 5: Look-Up Table (LUT)
architecture Behavioral5 of and_gate is
    type lut_type is array(0 to 3) of STD_LOGIC;
    constant and_lut : lut_type := (
        0 => '0',  -- "00"
        1 => '0',  -- "01"
        2 => '0',  -- "10"
        3 => '1'   -- "11"
    );
begin
    process(A, B)
        variable index : integer;
    begin
        index := 0;
        if A = '1' then index := index + 2; end if;
        if B = '1' then index := index + 1; end if;
        
        C <= and_lut(index);
    end process;
end Behavioral5;`,
      codeSnippet2: `-- VHDL - Testbench Porte AND Exhaustif
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity tb_and_gate is
end tb_and_gate;

architecture Behavioral of tb_and_gate is
    component and_gate
        Port (
            A : in  STD_LOGIC;
            B : in  STD_LOGIC;
            C : out STD_LOGIC
        );
    end component;
    
    signal A_tb, B_tb, C_tb : STD_LOGIC;
    
    constant period : time := 10 ns;
begin
    UUT: and_gate
        port map (
            A => A_tb,
            B => B_tb,
            C => C_tb
        );
    
    -- Processus de test exhaustif
    stim_proc: process
        type test_vector is record
            A, B, expected : STD_LOGIC;
        end record;
        
        type test_array is array (natural range <>) of test_vector;
        
        constant tests : test_array := (
            ('0', '0', '0'),
            ('0', '1', '0'),
            ('1', '0', '0'),
            ('1', '1', '1')
        );
    begin
        report "Starting AND gate exhaustive test...";
        
        for i in tests'range loop
            A_tb <= tests(i).A;
            B_tb <= tests(i).B;
            wait for period;
            
            assert C_tb = tests(i).expected
                report "Test " & integer'image(i) & " failed: " &
                       "A=" & STD_LOGIC'image(A_tb) & 
                       ", B=" & STD_LOGIC'image(B_tb) &
                       ", got C=" & STD_LOGIC'image(C_tb) &
                       ", expected " & STD_LOGIC'image(tests(i).expected)
                severity error;
            
            report "Test " & integer'image(i) & " passed";
        end loop;
        
        -- Tests dynamiques supplémentaires
        report "Starting dynamic timing tests...";
        
        -- Test glitch detection
        A_tb <= '0';
        B_tb <= '0';
        wait for period/2;
        
        -- Transition rapide
        for i in 1 to 10 loop
            A_tb <= not A_tb;
            wait for 1 ns;
            B_tb <= not B_tb;
            wait for 1 ns;
        end loop;
        
        -- Test propagation delay
        A_tb <= '0';
        B_tb <= '0';
        wait for period;
        A_tb <= '1';
        B_tb <= '1';
        wait for period;
        
        report "All AND gate tests completed successfully!";
        wait;
    end process;
    
    -- Processus de monitoring temps réel
    monitor_proc: process
    begin
        wait on A_tb, B_tb;
        wait for 0 ns; -- Cycle delta immédiat
        
        report Time'image(now) & 
               ": AND(" & STD_LOGIC'image(A_tb) & 
               ", " & STD_LOGIC'image(B_tb) & 
               ") = " & STD_LOGIC'image(C_tb);
    end process;
    
    -- Vérificateur automatique
    checker_proc: process(A_tb, B_tb)
        variable expected_result : STD_LOGIC;
    begin
        expected_result := A_tb and B_tb;
        
        -- Vérification asynchrone (attention aux glitches)
        wait for 100 ps; -- Attendre propagation
        
        if C_tb /= expected_result then
            report "Mismatch detected at time " & Time'image(now) &
                   ": Expected " & STD_LOGIC'image(expected_result) &
                   ", got " & STD_LOGIC'image(C_tb)
            severity warning;
        end if;
    end process;
end Behavioral;

-- VHDL - Porte AND à N entrées
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity and_n is
    Generic (
        N : integer := 4  -- Nombre d'entrées
    );
    Port (
        inputs : in  STD_LOGIC_VECTOR(N-1 downto 0);
        output : out STD_LOGIC
    );
end and_n;

architecture Behavioral of and_n is
begin
    process(inputs)
        variable temp : STD_LOGIC := '1';
    begin
        temp := '1';
        for i in 0 to N-1 loop
            temp := temp and inputs(i);
        end loop;
        output <= temp;
    end process;
end Behavioral;`,
      challenges: [
        "Glitches sur transitions simultanées",
        "Délai propagation asymétrique",
        "Consommation puissance statique",
        "Test couverture 100%"
      ],
      solutions: [
        "Synchronisation horloge",
        "Contraintes timing égales",
        "Clock gating optimisation",
        "Test aléatoire constrained-random"
      ]
    },
    6: {
      title: "Porte Logique OR VHDL",
      subtitle: "Implémentation porte OU avec deux entrées",
      description: "Circuit VHDL implémentant une porte logique OU avec deux entrées et une sortie suivant la table de vérité OU.",
      features: [
        "Porte logique OU (OR)",
        "Sortie C = A OR B",
        "Entrées A et B (1 bit)",
        "Sortie C (1 bit)",
        "Table de vérité : 1 si A=1 ou B=1",
        "Circuit combinatoire simple"
      ],
      technologies: ["VHDL RTL", "FPGA Slice", "Combinational Design", "Vivado Implementation", "Utilization Report", "Post-Synthesis Simulation"],
      mainImage: {
        src: "/assets/projects/fpga/or-gate-circuit.jpg",
        alt: "Porte OR VHDL implementation",
        caption: "Implémentation porte OR en VHDL et FPGA"
      },
      additionalImages: [
        { src: "/assets/projects/fpga/or-truth-table.jpg", alt: "Table vérité OR" },
        { src: "/assets/projects/fpga/or-lut.jpg", alt: "LUT OR gate" },
        { src: "/assets/projects/fpga/or-simulation.jpg", alt: "Simulation OR" },
        { src: "/assets/projects/fpga/fpga-slice.jpg", alt: "Slice FPGA" },
        { src: "/assets/projects/fpga/or-timing.jpg", alt: "Timing OR" },
        { src: "/assets/projects/fpga/or-utilization.jpg", alt: "Utilisation ressources" }
      ],
      videoLink: "#",
      codeSnippet1: `-- VHDL - Porte OR Multiple Architectures
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity or_gate is
    Port (
        A : in  STD_LOGIC;
        B : in  STD_LOGIC;
        C : out STD_LOGIC
    );
end or_gate;

-- Architecture 1: Opérateur OR direct
architecture Behavioral1 of or_gate is
begin
    C <= A or B;
end Behavioral1;

-- Architecture 2: Process avec if/else
architecture Behavioral2 of or_gate is
begin
    process(A, B)
    begin
        if A = '1' or B = '1' then
            C <= '1';
        else
            C <= '0';
        end if;
    end process;
end Behavioral2;

-- Architecture 3: With/select
architecture Behavioral3 of or_gate is
    signal inputs : STD_LOGIC_VECTOR(1 downto 0);
begin
    inputs <= A & B;
    
    with inputs select
        C <= '0' when "00",
             '1' when "01",
             '1' when "10",
             '1' when "11",
             '0' when others;
end Behavioral3;

-- Architecture 4: Look-Up Table optimisée
architecture Behavioral4 of or_gate is
    type lut_type is array(0 to 3) of STD_LOGIC;
    constant or_lut : lut_type := (
        0 => '0',  -- "00"
        1 => '1',  -- "01"
        2 => '1',  -- "10"
        3 => '1'   -- "11"
    );
    
    function to_index(a, b: STD_LOGIC) return integer is
        variable idx : integer := 0;
    begin
        if a = '1' then idx := idx + 2; end if;
        if b = '1' then idx := idx + 1; end if;
        return idx;
    end function;
begin
    C <= or_lut(to_index(A, B));
end Behavioral4;

-- Architecture 5: NAND-NAND implementation (De Morgan)
architecture Behavioral5 of or_gate is
    signal nand1, nand2 : STD_LOGIC;
begin
    nand1 <= A nand A;  -- NOT A
    nand2 <= B nand B;  -- NOT B
    C <= (nand1 nand nand2);  -- NAND(NOT A, NOT B) = A OR B
end Behavioral5;`,
      codeSnippet2: `-- VHDL - Testbench Porte OR Avancé
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity tb_or_gate is
end tb_or_gate;

architecture Behavioral of tb_or_gate is
    component or_gate
        Port (
            A : in  STD_LOGIC;
            B : in  STD_LOGIC;
            C : out STD_LOGIC
        );
    end component;
    
    signal A_tb, B_tb, C_tb : STD_LOGIC;
    
    constant CLK_PERIOD : time := 10 ns;
    signal test_clk : STD_LOGIC := '0';
begin
    UUT: or_gate
        port map (
            A => A_tb,
            B => B_tb,
            C => C_tb
        );
    
    -- Horloge de test
    test_clk <= not test_clk after CLK_PERIOD/2;
    
    -- Processus de test principal
    main_test: process
        type test_record is record
            a_val, b_val : STD_LOGIC;
            delay_time   : time;
        end record;
        
        type test_sequence is array (natural range <>) of test_record;
        
        constant test_seq : test_sequence := (
            ('0', '0', 20 ns),
            ('0', '1', 15 ns),
            ('1', '0', 25 ns),
            ('1', '1', 10 ns),
            ('0', '0', 5 ns),
            ('1', '1', 30 ns),
            ('0', '1', 20 ns),
            ('1', '0', 15 ns)
        );
    begin
        report "Starting comprehensive OR gate test sequence...";
        
        for i in test_seq'range loop
            A_tb <= test_seq(i).a_val;
            B_tb <= test_seq(i).b_val;
            wait for test_seq(i).delay_time;
            
            -- Vérification résultat
            assert C_tb = (test_seq(i).a_val or test_seq(i).b_val)
                report "Test " & integer'image(i) & " failed at " & Time'image(now) &
                       ": A=" & STD_LOGIC'image(A_tb) & 
                       ", B=" & STD_LOGIC'image(B_tb) &
                       ", C=" & STD_LOGIC'image(C_tb) &
                       ", expected " & STD_LOGIC'image(test_seq(i).a_val or test_seq(i).b_val)
                severity error;
        end loop;
        
        -- Test aléatoire
        report "Starting random stimulus test...";
        
        for i in 1 to 50 loop
            A_tb <= '0' when (i mod 3 = 0) else '1';
            B_tb <= '0' when (i mod 4 = 0) else '1';
            wait for CLK_PERIOD;
            
            if (i mod 10 = 0) then
                report "Random test " & integer'image(i) & 
                       ": A=" & STD_LOGIC'image(A_tb) &
                       ", B=" & STD_LOGIC'image(B_tb) &
                       ", C=" & STD_LOGIC'image(C_tb);
            end if;
        end loop;
        
        -- Test de performance (timing)
        report "Starting timing performance test...";
        
        A_tb <= '0';
        B_tb <= '0';
        wait for 1 ns;
        
        -- Transition rapide
        for i in 1 to 100 loop
            A_tb <= not A_tb;
            B_tb <= STD_LOGIC(to_unsigned(i mod 2, 1)(0));
            wait for 100 ps;
        end loop;
        
        report "All OR gate tests completed successfully!";
        wait;
    end process;
    
    -- Processus de coverage monitoring
    coverage_monitor: process
        type coverage_matrix is array (0 to 1, 0 to 1) of boolean;
        variable coverage : coverage_matrix := (others => (others => false));
        variable total_coverage : integer := 0;
    begin
        wait on A_tb, B_tb;
        wait for 1 ns; -- Attendre mise à jour sortie
        
        -- Mettre à jour coverage
        coverage(to_integer(unsigned'('0' & A_tb)), 
                to_integer(unsigned'('0' & B_tb))) := true;
        
        -- Calculer coverage
        total_coverage := 0;
        for i in 0 to 1 loop
            for j in 0 to 1 loop
                if coverage(i, j) then
                    total_coverage := total_coverage + 1;
                end if;
            end loop;
        end loop;
        
        -- Reporter coverage périodiquement
        if total_coverage = 4 then
            report "100% input coverage achieved!";
        elsif total_coverage mod 1 = 0 then
            report "Coverage: " & integer'image(total_coverage * 25) & "%";
        end if;
    end process;
    
    -- Processus de vérification continue
    continuous_check: process
    begin
        wait on C_tb;
        
        -- Vérifier que la sortie correspond à OR logique
        wait for 100 ps; -- Marge pour propagation
        
        if C_tb /= (A_tb or B_tb) then
            report "Continuous check failed at " & Time'image(now) &
                   ": A=" & STD_LOGIC'image(A_tb) &
                   ", B=" & STD_LOGIC'image(B_tb) &
                   ", C=" & STD_LOGIC'image(C_tb) &
                   ", expected " & STD_LOGIC'image(A_tb or B_tb)
            severity warning;
        end if;
    end process;
end Behavioral;

-- VHDL - Porte OR à N entrées avec générique
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity or_n is
    Generic (
        N : integer := 8
    );
    Port (
        inputs : in  STD_LOGIC_VECTOR(N-1 downto 0);
        output : out STD_LOGIC
    );
end or_n;

architecture Behavioral of or_n is
begin
    process(inputs)
        variable temp : STD_LOGIC := '0';
    begin
        temp := '0';
        for i in 0 to N-1 loop
            temp := temp or inputs(i);
            exit when temp = '1'; -- Optimization
        end loop;
        output <= temp;
    end process;
end Behavioral;`,
      challenges: [
        "Fan-in limitations FPGA",
        "Signal integrity haute fréquence",
        "Metastability sur transitions",
        "Power vs performance trade-off"
      ],
      solutions: [
        "Arbre de portes équilibré",
        "Buffers de sortie contrôlés",
        "Synchroniseurs double flip-flop",
        "Clock enable optimisation"
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
                    src={blockData.mainImage.src} 
                    alt={blockData.mainImage.alt}
                    className="main-project-image"
                    onError={handleImageError}
                  />
                )}
                <div className="main-image-caption">
                  {blockData.mainImage.caption}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6 IMAGES ADDITIONNELLES */}
          <div className="block-section">
            <h2 className="section-title">Galerie du Projet</h2>
            <div className="additional-images-grid">
              {blockData.additionalImages.map((img, index) => (
                <div key={index} className="additional-image-item">
                  <div className="additional-image-wrapper">
                    {imageError ? (
                      <div className="placeholder-content">
                        <span className="placeholder-icon">🖼️</span>
                        <p>Image {index + 1}</p>
                      </div>
                    ) : (
                      <img 
                        src={img.src} 
                        alt={img.alt}
                        className="additional-image"
                        onError={handleImageError}
                      />
                    )}
                  </div>
                  <p className="additional-image-caption">{img.alt}</p>
                </div>
              ))}
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
                      <p>Aperçu du projet FPGA</p>
                    </div>
                  ) : (
                    <img 
                      src={blockData.mainImage.src} 
                      alt="Prévisualisation du projet"
                      className="preview-image"
                      onError={handleImageError}
                    />
                  )}
                </div>
                <p className="screenshot-caption">{blockData.mainImage.caption}</p>
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
                  <pre className="code-snippet">{blockData.codeSnippet1}</pre>
                </div>
              </div>
              <div className="code-column">
                <div className="code-container">
                  <div className="code-header">
                    <span className="code-filename">FPGA_Bloc{blockId}_Testbench.vhd</span>
                    <button className="copy-btn">Copier</button>
                  </div>
                  <pre className="code-snippet">{blockData.codeSnippet2}</pre>
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