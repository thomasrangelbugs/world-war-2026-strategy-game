(() => {
  "use strict";

  const SAVE_KEY = "ww2026_eternum_save_v1";
  const GAME_VERSION = 1;
  const TICK_MS = 1000;
  const MAX_LOG_ENTRIES = 220;
  const MAX_OFFLINE_SECONDS = 60 * 60 * 24 * 14;
  const COMPACT_TEXT_UI = true;
  const MOBILE_UI_BREAKPOINT = 760;

  const RESOURCE_LABELS = {
    wood: "Madeira",
    steel: "Aço",
    oil: "Petróleo",
    food: "Comida",
    science: "Ciência",
    credits: "Créditos",
    alloys: "Ligas"
  };

  const COUNTRY_DATA = [
    { id: "brazil", name: "Brasil", lat: -14.2, lon: -51.9, baseDefense: 85, yields: { wood: 26, food: 22, credits: 12 } },
    { id: "usa", name: "Estados Unidos", lat: 39.8, lon: -98.6, baseDefense: 118, yields: { steel: 22, oil: 18, credits: 20 } },
    { id: "canada", name: "Canadá", lat: 56.1, lon: -106.3, baseDefense: 95, yields: { wood: 24, alloys: 2, credits: 12 } },
    { id: "mexico", name: "México", lat: 23.6, lon: -102.5, baseDefense: 80, yields: { oil: 15, food: 14, credits: 10 } },
    { id: "argentina", name: "Argentina", lat: -38.4, lon: -63.6, baseDefense: 82, yields: { food: 20, steel: 10, credits: 10 } },
    { id: "colombia", name: "Colômbia", lat: 4.6, lon: -74.1, baseDefense: 75, yields: { food: 16, wood: 12, credits: 9 } },
    { id: "uk", name: "Reino Unido", lat: 55.3, lon: -3.4, baseDefense: 106, yields: { science: 11, credits: 18, steel: 8 } },
    { id: "france", name: "França", lat: 46.2, lon: 2.2, baseDefense: 101, yields: { science: 10, food: 9, credits: 16 } },
    { id: "germany", name: "Alemanha", lat: 51.1, lon: 10.4, baseDefense: 108, yields: { steel: 22, science: 10, credits: 16 } },
    { id: "spain", name: "Espanha", lat: 40.5, lon: -3.7, baseDefense: 87, yields: { food: 14, credits: 12, oil: 4 } },
    { id: "italy", name: "Itália", lat: 41.9, lon: 12.6, baseDefense: 90, yields: { food: 12, science: 8, credits: 12 } },
    { id: "poland", name: "Polônia", lat: 52.2, lon: 19.1, baseDefense: 88, yields: { steel: 12, food: 8, credits: 9 } },
    { id: "ukraine", name: "Ucrânia", lat: 48.4, lon: 31.1, baseDefense: 92, yields: { food: 18, steel: 11, credits: 8 } },
    { id: "russia", name: "Rússia", lat: 61.5, lon: 105.3, baseDefense: 130, yields: { oil: 24, wood: 18, steel: 18 } },
    { id: "turkey", name: "Turquia", lat: 39.0, lon: 35.2, baseDefense: 90, yields: { oil: 9, steel: 9, food: 9 } },
    { id: "saudi", name: "Arábia Saudita", lat: 24.7, lon: 46.7, baseDefense: 96, yields: { oil: 28, credits: 12 } },
    { id: "iran", name: "Irã", lat: 32.4, lon: 53.7, baseDefense: 98, yields: { oil: 18, steel: 10, credits: 8 } },
    { id: "egypt", name: "Egito", lat: 26.8, lon: 30.8, baseDefense: 82, yields: { food: 10, credits: 9, oil: 6 } },
    { id: "nigeria", name: "Nigéria", lat: 9.1, lon: 8.7, baseDefense: 78, yields: { oil: 12, food: 14, wood: 10 } },
    { id: "south_africa", name: "África do Sul", lat: -30.6, lon: 22.9, baseDefense: 84, yields: { steel: 14, credits: 9, food: 10 } },
    { id: "india", name: "Índia", lat: 22.6, lon: 79.0, baseDefense: 114, yields: { food: 22, science: 10, credits: 14 } },
    { id: "china", name: "China", lat: 35.9, lon: 104.2, baseDefense: 126, yields: { steel: 26, credits: 18, science: 8 } },
    { id: "pakistan", name: "Paquistão", lat: 30.4, lon: 69.3, baseDefense: 82, yields: { food: 11, oil: 8, credits: 8 } },
    { id: "thailand", name: "Tailândia", lat: 15.9, lon: 100.9, baseDefense: 74, yields: { food: 12, wood: 9, credits: 8 } },
    { id: "vietnam", name: "Vietnã", lat: 14.1, lon: 108.3, baseDefense: 77, yields: { food: 12, wood: 11, credits: 7 } },
    { id: "indonesia", name: "Indonésia", lat: -2.2, lon: 117.5, baseDefense: 86, yields: { oil: 10, food: 13, wood: 12 } },
    { id: "japan", name: "Japão", lat: 36.2, lon: 138.3, baseDefense: 108, yields: { science: 13, credits: 14, steel: 9 } },
    { id: "south_korea", name: "Coreia do Sul", lat: 35.9, lon: 127.7, baseDefense: 95, yields: { science: 11, steel: 8, credits: 10 } },
    { id: "australia", name: "Austrália", lat: -25.2, lon: 133.8, baseDefense: 93, yields: { alloys: 2, food: 11, credits: 11 } },
    { id: "new_zealand", name: "Nova Zelândia", lat: -40.9, lon: 174.9, baseDefense: 70, yields: { food: 10, science: 4, credits: 7 } }
  ];

  const COLLECTION_ACTIONS = [
    {
      id: "timber_sweep",
      name: "Varredura de Madeira",
      desc: "Equipe de coleta rápida em biomas próximos.",
      duration: 5 * 60,
      cost: { credits: 20 },
      reward: { wood: 150, food: 22 }
    },
    {
      id: "supply_convoy",
      name: "Comboio Logístico",
      desc: "Rota militar com extração e distribuição de suprimentos.",
      duration: 30 * 60,
      cost: { credits: 95, oil: 25 },
      reward: { wood: 260, steel: 200, food: 180, credits: 130 }
    },
    {
      id: "deep_drill",
      name: "Perfuração Profunda",
      desc: "Operação de longa escala para reservas estratégicas.",
      duration: 10 * 60 * 60,
      cost: { credits: 460, steel: 140, oil: 140 },
      reward: { wood: 1100, steel: 950, oil: 560, science: 120, alloys: 60 }
    }
  ];

  const BUILDING_DEFS = {
    sawmill: {
      name: "Complexo Florestal",
      desc: "Aumenta geração passiva de madeira.",
      baseCost: { wood: 180, steel: 80, credits: 110 },
      baseDuration: 12 * 60
    },
    mine: {
      name: "Fundição Nacional",
      desc: "Aumenta produção de aço.",
      baseCost: { wood: 100, steel: 140, credits: 130 },
      baseDuration: 14 * 60
    },
    refinery: {
      name: "Refinaria Tática",
      desc: "Eleva a extração de petróleo.",
      baseCost: { steel: 180, credits: 170, food: 80 },
      baseDuration: 18 * 60
    },
    farm: {
      name: "Rede Agro-Militar",
      desc: "Melhora suprimento de alimento.",
      baseCost: { wood: 140, steel: 90, credits: 120 },
      baseDuration: 10 * 60
    },
    lab: {
      name: "Laboratório Bélico",
      desc: "Aumenta ciência por hora.",
      baseCost: { steel: 130, science: 60, credits: 170 },
      baseDuration: 22 * 60
    },
    command: {
      name: "Centro de Comando",
      desc: "Melhora eficiência geral de operações.",
      baseCost: { steel: 220, oil: 120, credits: 260 },
      baseDuration: 26 * 60
    }
  };

  const TRAINING_DEFS = {
    infantry: {
      name: "Infantaria",
      desc: "Unidade base para avanço e defesa.",
      batch: 55,
      duration: 10 * 60,
      cost: { food: 65, credits: 60 }
    },
    armor: {
      name: "Blindados",
      desc: "Alto impacto em linhas de frente.",
      batch: 12,
      duration: 45 * 60,
      cost: { steel: 120, oil: 85, credits: 130 }
    },
    air: {
      name: "Aeronaves",
      desc: "Domínio aéreo e ataque de precisão.",
      batch: 4,
      duration: 2 * 60 * 60,
      cost: { steel: 160, oil: 160, credits: 220 }
    },
    drone: {
      name: "Drones de Combate",
      desc: "Reconhecimento e ataque cirúrgico.",
      batch: 14,
      duration: 35 * 60,
      cost: { steel: 80, science: 42, credits: 115 }
    },
    naval: {
      name: "Frota Naval",
      desc: "Controle oceânico e projeção global.",
      batch: 6,
      duration: 75 * 60,
      cost: { steel: 210, oil: 130, credits: 190 }
    }
  };

  const TECH_DEFS = {
    ballistics: {
      name: "Balística Avançada",
      desc: "+8% poder de ataque por nível.",
      maxLevel: 12,
      baseCost: { science: 95, steel: 80, credits: 150 },
      baseDuration: 50 * 60
    },
    logistics: {
      name: "Logística Integrada",
      desc: "+6% geração de recursos por nível.",
      maxLevel: 12,
      baseCost: { science: 80, food: 95, credits: 140 },
      baseDuration: 60 * 60
    },
    cyber: {
      name: "Guerra Cibernética",
      desc: "Reduz defesa inimiga em invasões e espionagem.",
      maxLevel: 10,
      baseCost: { science: 120, credits: 180, steel: 90 },
      baseDuration: 75 * 60
    },
    antiAlien: {
      name: "Arsenal Anti-Alien",
      desc: "+10% dano contra aliens por nível.",
      maxLevel: 10,
      baseCost: { science: 140, alloys: 16, credits: 220 },
      baseDuration: 95 * 60
    },
    stability: {
      name: "Governança de Crise",
      desc: "Diminui risco de resistência e instabilidade.",
      maxLevel: 8,
      baseCost: { science: 100, food: 90, credits: 180 },
      baseDuration: 70 * 60
    }
  };

  const STATUS_LABELS = {
    player: "Seu domínio",
    neutral: "Neutro",
    alien: "Alien",
    resistance: "Resistência"
  };

  const OWNER_COLORS = {
    player: "#6df3b4",
    neutral: "#9ab0c8",
    alien: "#ff8a59",
    resistance: "#ffd84c"
  };

  const GLOBE_ROUTE_STYLE = {
    invasion: { line: "rgba(255, 128, 98, 0.54)", head: "rgba(255, 162, 138, 0.96)" },
    counterAlien: { line: "rgba(88, 215, 255, 0.56)", head: "rgba(160, 233, 255, 0.98)" },
    nuclearStrike: { line: "rgba(255, 84, 66, 0.62)", head: "rgba(255, 166, 141, 1)" },
    bioStrike: { line: "rgba(157, 228, 124, 0.56)", head: "rgba(207, 255, 180, 0.98)" },
    spy: { line: "rgba(255, 214, 111, 0.5)", head: "rgba(255, 230, 166, 0.96)" },
    diplomacy: { line: "rgba(109, 243, 180, 0.52)", head: "rgba(178, 255, 221, 0.98)" },
    pacify: { line: "rgba(111, 245, 201, 0.5)", head: "rgba(178, 255, 234, 0.96)" },
    defendRetaliation: { line: "rgba(102, 181, 255, 0.5)", head: "rgba(188, 223, 255, 0.96)" },
    retaliationConventional: { line: "rgba(255, 164, 103, 0.52)", head: "rgba(255, 210, 169, 0.96)" },
    retaliationNuclear: { line: "rgba(255, 93, 82, 0.64)", head: "rgba(255, 179, 165, 0.98)" },
    retaliationBiological: { line: "rgba(163, 236, 132, 0.58)", head: "rgba(220, 255, 194, 0.98)" },
    front_neutral: { line: "rgba(169, 190, 214, 0.36)", head: "rgba(219, 231, 244, 0.76)" },
    front_resistance: { line: "rgba(255, 214, 111, 0.38)", head: "rgba(255, 231, 156, 0.82)" },
    front_alien: { line: "rgba(255, 138, 89, 0.4)", head: "rgba(255, 178, 147, 0.85)" },
    default: { line: "rgba(164, 194, 230, 0.42)", head: "rgba(220, 236, 255, 0.94)" }
  };

  const GLOBE_IMPACT_STYLE = {
    conquest: [109, 243, 180],
    defeat: [255, 111, 102],
    diplomacy: [88, 215, 255],
    diplomacyFail: [255, 178, 120],
    spy: [255, 214, 111],
    support: [111, 245, 201],
    alien: [255, 138, 89],
    liberation: [120, 241, 214]
  };

  const LAND_POLYGONS = [
    [
      [-168, 72], [-150, 70], [-140, 62], [-133, 56], [-128, 51], [-124, 48], [-124, 42], [-121, 37],
      [-117, 33], [-111, 29], [-106, 24], [-99, 20], [-93, 18], [-86, 20], [-82, 24], [-79, 28],
      [-76, 32], [-73, 40], [-67, 45], [-60, 51], [-60, 57], [-66, 62], [-75, 66], [-90, 70],
      [-112, 72], [-135, 72], [-155, 71]
    ],
    [[-97, 24], [-92, 20], [-88, 18], [-86, 16], [-84, 10], [-79, 9], [-77, 8], [-81, 22], [-90, 22]],
    [[-73, 60], [-64, 69], [-55, 76], [-44, 81], [-31, 80], [-22, 75], [-20, 69], [-29, 62], [-43, 59], [-58, 58]],
    [[-81, 12], [-75, 8], [-72, 0], [-70, -8], [-67, -14], [-64, -20], [-60, -28], [-58, -35], [-60, -45], [-67, -54], [-74, -54], [-79, -47], [-81, -36], [-79, -22], [-77, -12], [-79, -2]],
    [[-11, 36], [-6, 43], [2, 45], [8, 48], [15, 55], [22, 60], [33, 69], [42, 71], [45, 64], [36, 58], [30, 54], [24, 48], [18, 44], [10, 40], [2, 38], [-6, 36]],
    [[-11, 50], [-8, 55], [-4, 58], [1, 58], [2, 53], [-2, 50], [-6, 50]],
    [[26, 35], [35, 42], [45, 47], [55, 52], [65, 57], [78, 62], [95, 66], [115, 67], [135, 63], [150, 58], [162, 52], [168, 46], [170, 38], [162, 31], [150, 24], [138, 18], [126, 15], [117, 18], [110, 24], [100, 26], [92, 22], [82, 19], [72, 20], [62, 25], [50, 30], [40, 34], [32, 34]],
    [[35, 33], [43, 34], [50, 30], [56, 26], [57, 20], [53, 16], [46, 15], [42, 18], [39, 24]],
    [[67, 24], [73, 28], [80, 28], [86, 24], [88, 20], [84, 15], [79, 8], [74, 7], [71, 11], [69, 18]],
    [[94, 23], [103, 20], [108, 14], [111, 8], [109, 2], [104, 0], [100, 3], [97, 8], [94, 14]],
    [[95, 5], [103, 1], [111, -3], [118, -6], [125, -4], [131, -2], [136, -5], [139, -8], [133, -10], [123, -9], [113, -8], [104, -6], [98, -2]],
    [[130, 31], [135, 34], [141, 40], [145, 45], [142, 41], [138, 36], [133, 33]],
    [[-18, 35], [-5, 36], [8, 36], [18, 34], [28, 31], [36, 25], [43, 13], [45, 2], [42, -10], [36, -21], [28, -30], [19, -34], [10, -35], [2, -32], [-5, -24], [-9, -12], [-13, -2], [-16, 10], [-17, 22]],
    [[44, -13], [49, -15], [50, -21], [47, -26], [44, -23], [43, -17]],
    [[112, -10], [116, -18], [121, -25], [129, -33], [139, -37], [149, -35], [154, -28], [153, -20], [146, -14], [137, -12], [128, -13], [120, -15]],
    [[166, -34], [173, -35], [177, -40], [175, -45], [168, -46], [165, -41]],
    [[-180, -68], [-140, -69], [-100, -70], [-60, -71], [-20, -72], [20, -72], [60, -71], [100, -70], [140, -69], [180, -68], [180, -90], [-180, -90]]
  ];

  let state = loadState() || createInitialState();
  const els = {};

  const globe = {
    canvas: null,
    ctx: null,
    rotation: 0.6,
    tilt: -0.22,
    drag: false,
    dragDistance: 0,
    lastDragDistance: 0,
    lastX: 0,
    velocity: 0.0012,
    markerPositions: [],
    stars: [],
    landPoints: [],
    impactPulses: [],
    ambientFronts: []
  };

  let lastAutoSave = Date.now();

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    wireEvents();
    ensureStateShape();
    applyUiModes();
    initializeGlobe();

    if (!state.started) {
      showStartModal();
    }

    tick();
    renderAll();
    setInterval(tick, TICK_MS);
    requestAnimationFrame(animateGlobe);
  }

  function cacheElements() {
    const ids = [
      "dominationValue",
      "instabilityValue",
      "alienStatus",
      "gameTimeValue",
      "res-wood",
      "res-steel",
      "res-oil",
      "res-food",
      "res-science",
      "res-credits",
      "res-alloys",
      "selectedCountryCard",
      "collectionActions",
      "infrastructureActions",
      "warActions",
      "armyStats",
      "trainingActions",
      "doctrineActions",
      "researchActions",
      "worldOverview",
      "countryList",
      "queueList",
      "logList",
      "quickQueueCount",
      "quickQueueList",
      "tutorialGuide",
      "visualPresetBtn",
      "easyModeBtn",
      "helpBtn",
      "saveBtn",
      "exportBtn",
      "importBtn",
      "resetBtn",
      "importFileInput",
      "startModal",
      "startCountryList",
      "toastHost",
      "tabs"
    ];

    ids.forEach((id) => {
      els[id] = document.getElementById(id);
    });

    els.tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
    els.tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
  }

  function wireEvents() {
    els.tabs.addEventListener("click", (event) => {
      const btn = event.target.closest(".tab-btn");
      if (!btn) {
        return;
      }
      state.ui.activeTab = btn.dataset.tab;
      renderTabs();
      saveState();
    });

    els.collectionActions.addEventListener("click", (event) => {
      const btn = resolveActionButton(event, "data-collect-id");
      if (!btn) {
        return;
      }
      startCollection(btn.dataset.collectId);
    });

    els.infrastructureActions.addEventListener("click", (event) => {
      const btn = resolveActionButton(event, "data-upgrade");
      if (!btn) {
        return;
      }
      startBuildingUpgrade(btn.dataset.upgrade);
    });

    els.warActions.addEventListener("click", (event) => {
      const btn = resolveActionButton(event, "data-war-action");
      if (!btn) {
        return;
      }
      const action = btn.dataset.warAction;
      const targetId = state.selectedCountry;
      if (!targetId) {
        return;
      }

      if (action === "invade") {
        startInvasion(targetId);
      } else if (action === "spy") {
        startSpyMission(targetId);
      } else if (action === "diplomacy") {
        startDiplomacyMission(targetId);
      } else if (action === "pacify") {
        startPacifyMission(targetId);
      } else if (action === "counter_alien") {
        startCounterAlienStrike(targetId);
      } else if (action === "nuclear") {
        startNuclearStrike(targetId);
      } else if (action === "biological") {
        startBiologicalStrike(targetId);
      } else if (action === "defend_retaliation") {
        startRetaliationDefense(btn.dataset.retaliationId, targetId);
      }
    });

    els.warActions.addEventListener("change", (event) => {
      const sourceSelect = event.target.closest("select[data-attack-source]");
      if (!sourceSelect) {
        return;
      }
      setAttackSourceCountry(sourceSelect.value);
    });

    els.warActions.addEventListener("toggle", (event) => {
      const advanced = event.target.closest("details.advanced-actions");
      if (!advanced) {
        return;
      }
      state.ui.warAdvancedOpen = advanced.open;
      saveState();
    }, true);

    els.trainingActions.addEventListener("click", (event) => {
      const btn = resolveActionButton(event, "data-train");
      if (!btn) {
        return;
      }
      startTraining(btn.dataset.train);
    });

    els.doctrineActions.addEventListener("click", (event) => {
      const btn = resolveActionButton(event, "data-doctrine");
      if (!btn) {
        return;
      }
      if (btn.dataset.doctrine === "fortify") {
        startFortifyMission();
      } else if (btn.dataset.doctrine === "rapid_mobilization") {
        startRapidMobilization();
      }
    });

    els.researchActions.addEventListener("click", (event) => {
      const btn = resolveActionButton(event, "data-tech");
      if (!btn) {
        return;
      }
      startResearch(btn.dataset.tech);
    });

    els.countryList.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-country-id]");
      if (!btn) {
        return;
      }
      setSelectedCountry(btn.dataset.countryId);
    });

    els.queueList.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-cancel-action]");
      if (!btn) {
        return;
      }
      cancelAction(btn.dataset.cancelAction);
    });

    els.tutorialGuide.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-open-tab]");
      if (!btn) {
        return;
      }
      state.ui.activeTab = btn.dataset.openTab;
      renderAll();
      saveState();
    });

    els.visualPresetBtn.addEventListener("click", () => {
      state.ui.visualPreset = state.ui.visualPreset === "ultra_clean" ? "default" : "ultra_clean";
      showToast(state.ui.visualPreset === "ultra_clean" ? "Visual limpo ativado." : "Visual vivo ativado.", "info");
      applyUiModes();
      renderAll();
      saveState();
    });

    els.easyModeBtn.addEventListener("click", () => {
      state.ui.easyMode = !state.ui.easyMode;
      showToast(state.ui.easyMode ? "Modo facil ligado." : "Modo facil desligado.", "info");
      applyUiModes();
      renderAll();
      saveState();
    });

    els.helpBtn.addEventListener("click", () => {
      state.ui.activeTab = "tutorial";
      renderAll();
      saveState();
    });

    els.saveBtn.addEventListener("click", () => {
      saveState();
      pushLog("Save manual registrado.", "system");
      renderAll();
    });

    els.exportBtn.addEventListener("click", exportSave);
    els.importBtn.addEventListener("click", () => els.importFileInput.click());

    els.importFileInput.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) {
        return;
      }
      importSaveFromFile(file);
      event.target.value = "";
    });

    els.resetBtn.addEventListener("click", () => {
      if (!window.confirm("Isso vai apagar o progresso local. Confirmar novo mundo?")) {
        return;
      }
      localStorage.removeItem(SAVE_KEY);
      state = createInitialState();
      renderAll();
      showStartModal();
      pushLog("Campanha reiniciada.", "system");
    });

    window.addEventListener("resize", resizeGlobeCanvas);
  }

  function resolveActionButton(event, dataAttr) {
    const directBtn = event.target.closest(`button[${dataAttr}]`);
    if (directBtn) {
      if (!directBtn.disabled) {
        return directBtn;
      }
      const directCard = directBtn.closest(".action-card");
      const directHint = directCard && directCard.querySelector(".disabled-hint");
      if (directHint && directHint.textContent) {
        showToast(directHint.textContent, "warn");
      }
      return null;
    }

    const card = event.target.closest(".action-card");
    if (!card) {
      return null;
    }

    const fallbackBtn = card.querySelector(`button[${dataAttr}]`);
    if (!fallbackBtn || fallbackBtn.disabled) {
      const hint = card.querySelector(".disabled-hint");
      if (hint && hint.textContent) {
        showToast(hint.textContent, "warn");
      }
      return null;
    }

    return fallbackBtn;
  }

  function createInitialState() {
    const countries = {};
    COUNTRY_DATA.forEach((c) => {
      countries[c.id] = {
        ...c,
        owner: "neutral",
        unrest: 0,
        spyDebuffUntil: 0,
        fortifiedUntil: 0
      };
    });

    return {
      version: GAME_VERSION,
      started: false,
      playerCountry: null,
      selectedCountry: COUNTRY_DATA[0].id,
      resources: {
        wood: 520,
        steel: 360,
        oil: 200,
        food: 700,
        science: 90,
        credits: 620,
        alloys: 8
      },
      buildings: {
        sawmill: 1,
        mine: 1,
        refinery: 1,
        farm: 1,
        lab: 1,
        command: 1
      },
      troops: {
        infantry: 220,
        armor: 34,
        air: 12,
        drone: 30,
        naval: 14
      },
      tech: {
        ballistics: 0,
        logistics: 0,
        cyber: 0,
        antiAlien: 0,
        stability: 0
      },
      countries,
      actionQueue: [],
      world: {
        instability: 0,
        fortifyUntil: 0,
        mobilizationUntil: 0,
        aliensActive: false,
        alienWave: 0,
        nextAlienAt: null,
        alienTerritories: [],
        resistanceActive: false,
        nextResistanceAt: null,
        nextSkirmishAt: null,
        retaliations: []
      },
      stats: {
        warsWon: 0,
        warsLost: 0,
        peacefulAnnex: 0,
        wavesSurvived: 0
      },
      log: [],
      ui: {
        activeTab: "actions",
        visualPreset: "default",
        easyMode: false,
        attackSourceCountry: null,
        warAdvancedOpen: false
      },
      clockStartedAt: Date.now(),
      lastTick: Date.now()
    };
  }

  function ensureStateShape() {
    if (!state || typeof state !== "object") {
      state = createInitialState();
      return;
    }

    if (!state.version || state.version !== GAME_VERSION) {
      state.version = GAME_VERSION;
    }

    if (!state.ui) {
      state.ui = {
        activeTab: "actions",
        visualPreset: "default",
        easyMode: false,
        attackSourceCountry: null,
        warAdvancedOpen: false
      };
    }

    if (!state.ui.activeTab) {
      state.ui.activeTab = "actions";
    }
    const validTabs = new Set(["actions", "army", "research", "world", "tutorial", "queue"]);
    if (!validTabs.has(state.ui.activeTab)) {
      state.ui.activeTab = "actions";
    }

    if (!state.ui.visualPreset) {
      state.ui.visualPreset = "default";
    }
    if (state.ui.visualPreset !== "default" && state.ui.visualPreset !== "ultra_clean") {
      state.ui.visualPreset = "default";
    }

    if (state.ui.easyMode === undefined) {
      state.ui.easyMode = false;
    }

    if (state.ui.attackSourceCountry === undefined) {
      state.ui.attackSourceCountry = null;
    }

    if (state.ui.warAdvancedOpen === undefined) {
      state.ui.warAdvancedOpen = false;
    }

    if (!state.log) {
      state.log = [];
    }

    if (!state.world) {
      state.world = createInitialState().world;
    }
    const worldDefaults = createInitialState().world;
    for (const [key, value] of Object.entries(worldDefaults)) {
      if (state.world[key] === undefined) {
        state.world[key] = value;
      }
    }
    if (!Array.isArray(state.world.retaliations)) {
      state.world.retaliations = [];
    }
    state.world.retaliations = state.world.retaliations
      .filter((threat) => threat && threat.id && threat.toId && threat.fromId && threat.impactAt)
      .map((threat) => ({
        ...threat,
        defenseBoost: Number(threat.defenseBoost || 0),
        resolved: Boolean(threat.resolved),
        mitigated: Boolean(threat.mitigated)
      }));

    if (!state.stats) {
      state.stats = createInitialState().stats;
    }
    const statDefaults = createInitialState().stats;
    for (const [key, value] of Object.entries(statDefaults)) {
      if (state.stats[key] === undefined) {
        state.stats[key] = value;
      }
    }

    if (!state.countries) {
      state.countries = createInitialState().countries;
    }

    COUNTRY_DATA.forEach((country) => {
      if (!state.countries[country.id]) {
        state.countries[country.id] = {
          ...country,
          owner: "neutral",
          unrest: 0,
          spyDebuffUntil: 0,
          fortifiedUntil: 0
        };
      }
    });

    if (!state.selectedCountry || !state.countries[state.selectedCountry]) {
      state.selectedCountry = state.playerCountry || COUNTRY_DATA[0].id;
    }

    if (!state.ui.attackSourceCountry || !state.countries[state.ui.attackSourceCountry] || state.countries[state.ui.attackSourceCountry].owner !== "player") {
      state.ui.attackSourceCountry = state.playerCountry || getOwnedCountries("player")[0]?.id || COUNTRY_DATA[0].id;
    }

    if (!state.actionQueue) {
      state.actionQueue = [];
    }
    state.actionQueue = state.actionQueue.filter((action) => action && action.id && action.name && action.endAt && action.startAt);
    state.actionQueue.forEach((action) => {
      if (!action.cost) {
        action.cost = {};
      }
      if (action.refundable === undefined) {
        action.refundable = true;
      }
    });
    state.actionQueue.sort((a, b) => a.endAt - b.endAt);

    if (!state.resources) {
      state.resources = createInitialState().resources;
    }
    const resourceDefaults = createInitialState().resources;
    for (const [key, value] of Object.entries(resourceDefaults)) {
      if (state.resources[key] === undefined) {
        state.resources[key] = value;
      }
    }

    if (!state.buildings) {
      state.buildings = createInitialState().buildings;
    }
    const buildingDefaults = createInitialState().buildings;
    for (const [key, value] of Object.entries(buildingDefaults)) {
      if (state.buildings[key] === undefined) {
        state.buildings[key] = value;
      }
    }

    if (!state.troops) {
      state.troops = createInitialState().troops;
    }
    const troopDefaults = createInitialState().troops;
    for (const [key, value] of Object.entries(troopDefaults)) {
      if (state.troops[key] === undefined) {
        state.troops[key] = value;
      }
    }

    if (!state.tech) {
      state.tech = createInitialState().tech;
    }
    const techDefaults = createInitialState().tech;
    for (const [key, value] of Object.entries(techDefaults)) {
      if (state.tech[key] === undefined) {
        state.tech[key] = value;
      }
    }

    if (!state.clockStartedAt) {
      state.clockStartedAt = Date.now();
    }

    if (!state.lastTick) {
      state.lastTick = Date.now();
    }
  }

  function showStartModal() {
    const list = COUNTRY_DATA.map((country) => {
      const yields = stringifyResourcePack(country.yields);
      return `
        <article class="start-card">
          <h4>${country.name}</h4>
          <p>Def ${country.baseDefense} | Renda/h ${yields}</p>
          <button class="primary" data-start-country="${country.id}">Comecar</button>
        </article>
      `;
    }).join("");

    els.startCountryList.innerHTML = list;
    els.startModal.classList.remove("hidden");

    els.startCountryList.querySelectorAll("button[data-start-country]").forEach((btn) => {
      btn.addEventListener("click", () => {
        initializeCampaign(btn.dataset.startCountry);
      });
    });
  }

  function initializeCampaign(countryId) {
    if (!state.countries[countryId]) {
      return;
    }
    state.started = true;
    state.playerCountry = countryId;
    state.selectedCountry = countryId;
    state.ui.attackSourceCountry = countryId;
    state.countries[countryId].owner = "player";
    state.world.nextResistanceAt = Date.now() + 75 * 60 * 1000;
    state.world.nextSkirmishAt = Date.now() + randomInRange(10, 16) * 60 * 1000;
    state.world.retaliations = [];
    globe.ambientFronts = [];
    pushLog(`Comando estabelecido em ${state.countries[countryId].name}.`, "system");
    showToast(`Campanha iniciada com ${state.countries[countryId].name}.`, "success");
    els.startModal.classList.add("hidden");
    saveState();
    renderAll();
  }

  function applyUiModes() {
    document.body.classList.toggle("ultra-clean", state.ui.visualPreset === "ultra_clean");
    document.body.classList.toggle("easy-mode", Boolean(state.ui.easyMode));
  }

  function initializeGlobe() {
    globe.canvas = document.getElementById("globeCanvas");
    globe.ctx = globe.canvas.getContext("2d");
    buildStarField();
    buildLandPoints();
    resizeGlobeCanvas();
    wireGlobeEvents();
  }

  function buildStarField() {
    globe.stars = [];
    for (let i = 0; i < 170; i += 1) {
      globe.stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.9,
        a: 0.2 + Math.random() * 0.45
      });
    }
  }

  function buildLandPoints() {
    const rawPoints = [];
    const lookup = new Set();

    for (let lat = -80; lat <= 82; lat += 2) {
      for (let lon = -180; lon <= 180; lon += 2) {
        if (isLand(lat, lon)) {
          rawPoints.push({ lat, lon });
          lookup.add(pointKey(lat, lon));
        }
      }
    }

    globe.landPoints = rawPoints.map((point) => {
      const north = lookup.has(pointKey(point.lat + 2, point.lon));
      const south = lookup.has(pointKey(point.lat - 2, point.lon));
      const east = lookup.has(pointKey(point.lat, wrapLon(point.lon + 2)));
      const west = lookup.has(pointKey(point.lat, wrapLon(point.lon - 2)));
      const coast = !(north && south && east && west);
      return { ...point, coast };
    });
  }

  function isLand(lat, lon) {
    for (const polygon of LAND_POLYGONS) {
      if (pointInPolygon([lon, lat], polygon)) {
        return true;
      }
    }
    return false;
  }

  function pointInPolygon(point, polygon) {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersects = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1e-6) + xi;
      if (intersects) {
        inside = !inside;
      }
    }
    return inside;
  }

  function pointKey(lat, lon) {
    return `${lat}:${lon}`;
  }

  function wrapLon(lon) {
    if (lon > 180) {
      return lon - 360;
    }
    if (lon < -180) {
      return lon + 360;
    }
    return lon;
  }

  function isMobileViewport() {
    return window.matchMedia(`(max-width: ${MOBILE_UI_BREAKPOINT}px)`).matches;
  }

  function getGlobeDragSensitivity() {
    return isMobileViewport() ? 0.017 : 0.011;
  }

  function getGlobeVelocityFactor() {
    return isMobileViewport() ? 0.00035 : 0.00024;
  }

  function resizeGlobeCanvas() {
    if (!globe.canvas) {
      return;
    }

    const rect = globe.canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    globe.canvas.width = Math.floor(rect.width * ratio);
    globe.canvas.height = Math.floor(rect.height * ratio);
    globe.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function wireGlobeEvents() {
    const canvas = globe.canvas;
    canvas.style.touchAction = "none";

    const startDrag = (clientX, pointerId) => {
      globe.drag = true;
      globe.dragDistance = 0;
      globe.lastX = clientX;
      canvas.classList.add("dragging");
      if (pointerId !== undefined && canvas.setPointerCapture) {
        canvas.setPointerCapture(pointerId);
      }
    };

    const moveDrag = (clientX) => {
      if (!globe.drag) {
        return;
      }
      const dx = clientX - globe.lastX;
      globe.dragDistance += Math.abs(dx);
      globe.rotation += dx * getGlobeDragSensitivity();
      globe.velocity = dx * getGlobeVelocityFactor();
      globe.lastX = clientX;
    };

    const finishDrag = (pointerId) => {
      if (!globe.drag) {
        return;
      }
      globe.drag = false;
      globe.lastDragDistance = globe.dragDistance;
      globe.dragDistance = 0;
      canvas.classList.remove("dragging");
      if (
        pointerId !== undefined
        && canvas.releasePointerCapture
        && (!canvas.hasPointerCapture || canvas.hasPointerCapture(pointerId))
      ) {
        canvas.releasePointerCapture(pointerId);
      }
    };

    if (window.PointerEvent) {
      canvas.addEventListener("pointerdown", (event) => {
        if (!event.isPrimary) {
          return;
        }
        startDrag(event.clientX, event.pointerId);
      });

      canvas.addEventListener("pointermove", (event) => {
        if (!event.isPrimary) {
          return;
        }
        moveDrag(event.clientX);
      });

      canvas.addEventListener("pointerup", (event) => finishDrag(event.pointerId));
      canvas.addEventListener("pointercancel", (event) => finishDrag(event.pointerId));
      canvas.addEventListener("pointerleave", (event) => finishDrag(event.pointerId));
    } else {
      canvas.addEventListener("mousedown", (event) => {
        event.preventDefault();
        startDrag(event.clientX);
      });
      window.addEventListener("mousemove", (event) => moveDrag(event.clientX));
      window.addEventListener("mouseup", () => finishDrag());

      canvas.addEventListener(
        "touchstart",
        (event) => {
          if (!event.touches || event.touches.length === 0) {
            return;
          }
          event.preventDefault();
          startDrag(event.touches[0].clientX);
        },
        { passive: false }
      );

      canvas.addEventListener(
        "touchmove",
        (event) => {
          if (!event.touches || event.touches.length === 0) {
            return;
          }
          event.preventDefault();
          moveDrag(event.touches[0].clientX);
        },
        { passive: false }
      );

      canvas.addEventListener("touchend", () => finishDrag());
      canvas.addEventListener("touchcancel", () => finishDrag());
    }

    canvas.addEventListener("click", (event) => {
      if (globe.lastDragDistance > 7) {
        globe.lastDragDistance = 0;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const candidate = findCountryAtPoint(x, y);
      if (candidate) {
        setSelectedCountry(candidate.id);
      }
    });
  }

  function findCountryAtPoint(x, y) {
    let best = null;
    let bestDist = Infinity;
    for (const marker of globe.markerPositions) {
      if (!marker.clickable) {
        continue;
      }
      const dx = marker.x - x;
      const dy = marker.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist <= marker.r + 5 && dist < bestDist) {
        best = marker;
        bestDist = dist;
      }
    }
    return best;
  }

  function animateGlobe() {
    drawGlobe();
    requestAnimationFrame(animateGlobe);
  }

  function drawGlobe() {
    if (!globe.ctx || !globe.canvas) {
      return;
    }

    const ctx = globe.ctx;
    const width = globe.canvas.clientWidth;
    const height = globe.canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    globe.rotation += globe.velocity;
    globe.velocity *= 0.96;
    if (state.ui.easyMode) {
      if (!globe.drag && Math.abs(globe.velocity) < 0.00008) {
        globe.velocity = isMobileViewport() ? 0.00022 : 0;
      }
    } else if (Math.abs(globe.velocity) < 0.00006 && !globe.drag) {
      globe.velocity = isMobileViewport() ? 0.00078 : 0.0005;
    }

    if (state.ui.visualPreset !== "ultra_clean") {
      drawStars(ctx, width, height);
    }

    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) * 0.33;

    const atmosphere = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius * 1.25);
    atmosphere.addColorStop(0, "rgba(66,142,255,0.10)");
    atmosphere.addColorStop(1, "rgba(66,142,255,0)");
    ctx.fillStyle = atmosphere;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.28, 0, Math.PI * 2);
    ctx.fill();

    const globeGradient = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.32, radius * 0.1, cx, cy, radius);
    globeGradient.addColorStop(0, "#4ca8ff");
    globeGradient.addColorStop(0.5, "#2f64b7");
    globeGradient.addColorStop(1, "#15284c");

    ctx.fillStyle = globeGradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    drawLandMasses(ctx, cx, cy, radius);
    if (state.ui.visualPreset !== "ultra_clean") {
      drawLatitudeLines(ctx, cx, cy, radius);
    }

    drawActiveActionRoutes(ctx, cx, cy, radius, Date.now());

    const markers = [];
    for (const country of COUNTRY_DATA) {
      const pt = projectCountry(country, globe.rotation, globe.tilt);
      const x = cx + pt.x * radius;
      const y = cy - pt.y * radius;
      const z = pt.z;
      const visible = z > -0.08;
      markers.push({
        id: country.id,
        x,
        y,
        z,
        clickable: z > 0,
        r: 3 + Math.max(0, z) * 5,
        owner: state.countries[country.id].owner
      });
    }

    markers.sort((a, b) => a.z - b.z);

    for (const marker of markers) {
      if (!marker.clickable && marker.z < -0.12) {
        continue;
      }
      const alpha = marker.clickable ? 0.95 : 0.26;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = OWNER_COLORS[marker.owner] || OWNER_COLORS.neutral;
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, marker.r, 0, Math.PI * 2);
      ctx.fill();

      if (marker.id === state.selectedCountry) {
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = "#eaf7ff";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(marker.x, marker.y, marker.r + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    globe.markerPositions = markers;

    drawImpactPulses(ctx, cx, cy, radius, Date.now());

    const shade = ctx.createRadialGradient(cx + radius * 0.35, cy - radius * 0.25, radius * 0.2, cx + radius * 0.35, cy - radius * 0.2, radius * 1.1);
    shade.addColorStop(0, "rgba(5,11,20,0)");
    shade.addColorStop(1, "rgba(3,8,14,0.44)");
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(107,175,241,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawStars(ctx, width, height) {
    for (const star of globe.stars) {
      ctx.globalAlpha = star.a;
      ctx.fillStyle = "#f2f7ff";
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawLandMasses(ctx, cx, cy, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    for (const point of globe.landPoints) {
      const proj = projectLatLon((point.lat * Math.PI) / 180, (point.lon * Math.PI) / 180, globe.rotation, globe.tilt);
      if (proj.z <= 0.02) {
        continue;
      }

      const x = cx + proj.x * radius;
      const y = cy - proj.y * radius;
      const pixelSize = 1.3 + proj.z * 1.7;
      ctx.fillStyle = proj.z > 0.35 ? "rgba(82, 158, 114, 0.95)" : "rgba(60, 121, 92, 0.88)";
      ctx.fillRect(x - pixelSize * 0.5, y - pixelSize * 0.5, pixelSize, pixelSize);
    }

    // Coastal contour based on sampled land points.
    ctx.strokeStyle = "rgba(201, 232, 214, 0.24)";
    ctx.lineWidth = 0.7;
    for (const point of globe.landPoints) {
      if (!point.coast) {
        continue;
      }
      const proj = projectLatLon((point.lat * Math.PI) / 180, (point.lon * Math.PI) / 180, globe.rotation, globe.tilt);
      if (proj.z <= 0.14) {
        continue;
      }
      const x = cx + proj.x * radius;
      const y = cy - proj.y * radius;
      ctx.beginPath();
      ctx.arc(x, y, 0.75, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
    drawContinentContours(ctx, cx, cy, radius);
  }

  function drawContinentContours(ctx, cx, cy, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    ctx.strokeStyle = state.ui.visualPreset === "ultra_clean" ? "rgba(212, 239, 227, 0.28)" : "rgba(212, 239, 227, 0.42)";
    ctx.lineWidth = state.ui.easyMode ? 1.3 : 1.05;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (const polygon of LAND_POLYGONS) {
      ctx.beginPath();
      let segmentOpen = false;
      let hasVisibleSegment = false;

      for (const [lon, lat] of polygon) {
        const proj = projectLatLon((lat * Math.PI) / 180, (lon * Math.PI) / 180, globe.rotation, globe.tilt);
        if (proj.z <= 0.03) {
          segmentOpen = false;
          continue;
        }

        const x = cx + proj.x * radius;
        const y = cy - proj.y * radius;

        if (!segmentOpen) {
          ctx.moveTo(x, y);
          segmentOpen = true;
        } else {
          ctx.lineTo(x, y);
        }
        hasVisibleSegment = true;
      }

      if (hasVisibleSegment) {
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function drawLatitudeLines(ctx, cx, cy, radius) {
    ctx.strokeStyle = "rgba(185, 223, 255, 0.11)";
    ctx.lineWidth = 0.8;

    const latitudes = [-60, -30, 0, 30, 60];
    for (const lat of latitudes) {
      const latRad = (lat * Math.PI) / 180;
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 4) {
        const point = projectLatLon(latRad, (lon * Math.PI) / 180, globe.rotation, globe.tilt);
        const x = cx + point.x * radius;
        const y = cy - point.y * radius;
        if (lon === -180) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    const longitudes = [-120, -60, 0, 60, 120];
    for (const lon of longitudes) {
      ctx.beginPath();
      for (let lat = -86; lat <= 86; lat += 4) {
        const point = projectLatLon((lat * Math.PI) / 180, (lon * Math.PI) / 180, globe.rotation, globe.tilt);
        const x = cx + point.x * radius;
        const y = cy - point.y * radius;
        if (lat === -86) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }

  function drawActiveActionRoutes(ctx, cx, cy, radius, now) {
    const routes = [
      ...getActiveGlobeRoutes(now),
      ...getAmbientFrontRoutes(now)
    ];
    if (routes.length === 0) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.03, 0, Math.PI * 2);
    ctx.clip();

    routes.forEach((route, index) => {
      const sourceProj = projectCountry(route.source, globe.rotation, globe.tilt);
      const targetProj = projectCountry(route.target, globe.rotation, globe.tilt);
      if (sourceProj.z < -0.2 && targetProj.z < -0.2) {
        return;
      }

      const sx = cx + sourceProj.x * radius;
      const sy = cy - sourceProj.y * radius;
      const tx = cx + targetProj.x * radius;
      const ty = cy - targetProj.y * radius;
      const dx = tx - sx;
      const dy = ty - sy;
      const dist = Math.max(1, Math.hypot(dx, dy));
      const nx = -dy / dist;
      const ny = dx / dist;
      const bend = (index % 2 === 0 ? 1 : -1) * (state.ui.easyMode ? 0.62 : 1);
      const arcHeight = clamp(dist * 0.24, 14, radius * 0.34);
      const mx = (sx + tx) * 0.5;
      const my = (sy + ty) * 0.5;
      const cp = {
        x: mx + nx * arcHeight * bend,
        y: my + ny * arcHeight * bend - arcHeight * 0.09
      };

      const style = GLOBE_ROUTE_STYLE[route.kind] || GLOBE_ROUTE_STYLE.default;
      const visibility = clamp(((sourceProj.z + 1) * 0.5 + (targetProj.z + 1) * 0.5) * 0.5, 0.18, 1);
      const isFront = route.kind && route.kind.startsWith("front_");

      ctx.globalAlpha = (isFront ? 0.26 : 0.34) * visibility;
      ctx.strokeStyle = style.line;
      ctx.lineWidth = isFront ? (state.ui.easyMode ? 1.4 : 1.15) : (state.ui.easyMode ? 1.9 : 1.5);
      if (isFront) {
        ctx.setLineDash([5, 5]);
      }
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(cp.x, cp.y, tx, ty);
      ctx.stroke();
      if (isFront) {
        ctx.setLineDash([]);
      }

      const head = getQuadraticPoint(clamp(route.progress, 0.02, 0.98), { x: sx, y: sy }, cp, { x: tx, y: ty });
      ctx.globalAlpha = (isFront ? 0.62 : 0.88) * visibility;
      ctx.fillStyle = style.head;
      ctx.beginPath();
      ctx.arc(head.x, head.y, isFront ? (state.ui.easyMode ? 2.7 : 2.2) : (state.ui.easyMode ? 3.3 : 2.7), 0, Math.PI * 2);
      ctx.fill();

      if (!isFront) {
        const pulseR = 5 + Math.sin(now * 0.008 + index) * 1.4;
        ctx.globalAlpha = (0.26 + (1 - route.progress) * 0.22) * visibility;
        ctx.strokeStyle = style.head;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tx, ty, pulseR, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function getActiveGlobeRoutes(now) {
    const allowed = new Set(["invasion", "counterAlien", "nuclearStrike", "bioStrike", "spy", "diplomacy", "pacify", "defendRetaliation"]);
    const routes = [];
    for (const action of state.actionQueue) {
      if (!action || !allowed.has(action.kind) || !action.payload || !action.payload.targetId) {
        continue;
      }
      const target = state.countries[action.payload.targetId];
      const source = state.countries[action.payload.sourceId] || getAttackSourceCountry();
      if (!target) {
        continue;
      }
      if (!source) {
        continue;
      }
      const total = Math.max(1, action.endAt - action.startAt);
      const elapsed = clamp(now - action.startAt, 0, total);
      routes.push({
        kind: action.kind,
        source,
        target,
        progress: elapsed / total,
        remaining: action.endAt - now,
        priority: 2
      });
    }

    if (Array.isArray(state.world.retaliations)) {
      for (const threat of state.world.retaliations) {
        if (!threat || threat.resolved || threat.impactAt <= now) {
          continue;
        }
        const source = state.countries[threat.fromId];
        const target = state.countries[threat.toId];
        if (!source || !target || target.owner !== "player") {
          continue;
        }
        const createdAt = Number(threat.createdAt || (threat.impactAt - 10 * 60 * 1000));
        const duration = Math.max(1000, threat.impactAt - createdAt);
        const elapsed = clamp(now - createdAt, 0, duration);
        const kind = threat.mode === "nuclear"
          ? "retaliationNuclear"
          : threat.mode === "biological"
            ? "retaliationBiological"
            : "retaliationConventional";
        routes.push({
          kind,
          source,
          target,
          progress: clamp(elapsed / duration, 0.03, 0.97),
          remaining: threat.impactAt - now,
          priority: 1
        });
      }
    }

    routes.sort((a, b) => {
      if ((a.priority || 99) !== (b.priority || 99)) {
        return (a.priority || 99) - (b.priority || 99);
      }
      return a.remaining - b.remaining;
    });
    const limit = state.ui.easyMode ? 5 : 10;
    return routes.slice(0, limit);
  }

  function getAmbientFrontRoutes(now) {
    maintainAmbientFronts(now);
    const routes = [];
    for (const front of globe.ambientFronts) {
      const source = state.countries[front.sourceId];
      const target = state.countries[front.targetId];
      if (!source || !target) {
        continue;
      }
      const duration = Math.max(1000, front.endAt - front.startAt);
      const t = clamp((now - front.startAt) / duration, 0, 1);
      const oscillate = 0.5 + Math.sin((now - front.startAt) * 0.0024 + front.phase) * 0.45;
      routes.push({
        kind: front.kind,
        source,
        target,
        progress: clamp(oscillate * (0.75 + (1 - t) * 0.25), 0.03, 0.97),
        remaining: front.endAt - now
      });
    }
    return routes;
  }

  function maintainAmbientFronts(now) {
    if (!globe.ambientFronts) {
      globe.ambientFronts = [];
    }

    globe.ambientFronts = globe.ambientFronts.filter((front) => {
      if (front.endAt <= now) {
        return false;
      }
      if (!state.countries[front.sourceId] || !state.countries[front.targetId]) {
        return false;
      }
      return true;
    });

    const nonPlayer = Object.values(state.countries).filter((country) => country.owner !== "player");
    if (nonPlayer.length < 2) {
      return;
    }

    const desired = state.ui.easyMode ? 1 : 2;
    while (globe.ambientFronts.length < desired) {
      const source = nonPlayer[Math.floor(Math.random() * nonPlayer.length)];
      const candidates = nonPlayer
        .filter((country) => country.id !== source.id && country.owner !== source.owner)
        .sort((a, b) => geoDistanceScore(source, a) - geoDistanceScore(source, b))
        .slice(0, 8);
      if (candidates.length === 0) {
        break;
      }
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      addAmbientFront(source.id, target.id, source.owner, now, randomInRange(5, 10) * 60 * 1000);
    }
  }

  function addAmbientFront(sourceId, targetId, ownerType, now, durationMs) {
    const kind = ownerType === "alien" ? "front_alien" : ownerType === "resistance" ? "front_resistance" : "front_neutral";
    const startAt = now || Date.now();
    const endAt = startAt + Math.max(45 * 1000, durationMs || 5 * 60 * 1000);
    const existing = globe.ambientFronts.find((front) => {
      return (
        (front.sourceId === sourceId && front.targetId === targetId) ||
        (front.sourceId === targetId && front.targetId === sourceId)
      );
    });

    if (existing) {
      existing.startAt = startAt;
      existing.endAt = Math.max(existing.endAt, endAt);
      existing.kind = kind;
      return;
    }

    globe.ambientFronts.push({
      sourceId,
      targetId,
      kind,
      startAt,
      endAt,
      phase: Math.random() * Math.PI * 2
    });
    if (globe.ambientFronts.length > 6) {
      globe.ambientFronts = globe.ambientFronts.slice(-6);
    }
  }

  function getQuadraticPoint(t, p0, p1, p2) {
    const inv = 1 - t;
    return {
      x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
      y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y
    };
  }

  function addImpactPulse(countryId, tone) {
    if (!countryId || !state.countries[countryId]) {
      return;
    }
    globe.impactPulses.push({
      countryId,
      tone: tone || "conquest",
      startedAt: Date.now(),
      duration: 3200
    });
    if (globe.impactPulses.length > 30) {
      globe.impactPulses = globe.impactPulses.slice(-30);
    }
  }

  function drawImpactPulses(ctx, cx, cy, radius, now) {
    if (!globe.impactPulses || globe.impactPulses.length === 0) {
      return;
    }

    globe.impactPulses = globe.impactPulses.filter((pulse) => now - pulse.startedAt <= pulse.duration);
    if (globe.impactPulses.length === 0) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
    ctx.clip();

    for (const pulse of globe.impactPulses) {
      const country = state.countries[pulse.countryId];
      if (!country) {
        continue;
      }

      const proj = projectCountry(country, globe.rotation, globe.tilt);
      if (proj.z < -0.16) {
        continue;
      }

      const t = clamp((now - pulse.startedAt) / pulse.duration, 0, 1);
      const color = GLOBE_IMPACT_STYLE[pulse.tone] || GLOBE_IMPACT_STYLE.conquest;
      const x = cx + proj.x * radius;
      const y = cy - proj.y * radius;
      const visibility = clamp((proj.z + 1) * 0.5, 0.22, 1);
      const alpha = (1 - t) * 0.75 * visibility;
      const outer = 5 + t * 22;

      ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha.toFixed(3)})`;
      ctx.lineWidth = Math.max(0.8, 1.8 - t);
      ctx.beginPath();
      ctx.arc(x, y, outer, 0, Math.PI * 2);
      ctx.stroke();

      if (t < 0.26) {
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${(alpha * 0.9).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, (1 - t / 0.26) * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function projectCountry(country, rotation, tilt) {
    return projectLatLon((country.lat * Math.PI) / 180, (country.lon * Math.PI) / 180, rotation, tilt);
  }

  function projectLatLon(lat, lon, rotation, tilt) {
    const adjustedLon = lon + rotation;
    const x = Math.cos(lat) * Math.cos(adjustedLon);
    const y = Math.sin(lat);
    const z = Math.cos(lat) * Math.sin(adjustedLon);

    const yTilt = y * Math.cos(tilt) - z * Math.sin(tilt);
    const zTilt = y * Math.sin(tilt) + z * Math.cos(tilt);

    return { x, y: yTilt, z: zTilt };
  }

  function tick() {
    const now = Date.now();
    let deltaSeconds = (now - state.lastTick) / 1000;
    if (deltaSeconds < 0) {
      deltaSeconds = 0;
    }
    deltaSeconds = Math.min(deltaSeconds, MAX_OFFLINE_SECONDS);

    if (state.started) {
      applyPassiveEconomy(deltaSeconds);
      processActionQueue(now);
      processWorldEvents(now, deltaSeconds);
      processRetaliations(now);
      updateCountryUnrest(deltaSeconds);
    }

    state.lastTick = now;
    renderAll();

    if (now - lastAutoSave > 9000) {
      saveState();
      lastAutoSave = now;
    }
  }

  function applyPassiveEconomy(deltaSeconds) {
    const ownedCountries = getOwnedCountries("player");
    const balance = getBalanceProfile();
    const logisticsBoost = 1 + state.tech.logistics * 0.06;
    const commandBoost = 1 + (state.buildings.command - 1) * 0.05;

    const basePerHour = {
      wood: 16 + state.buildings.sawmill * 26,
      steel: 10 + state.buildings.mine * 21,
      oil: 7 + state.buildings.refinery * 14,
      food: 20 + state.buildings.farm * 30,
      science: 4 + state.buildings.lab * 9,
      credits: 12 + state.buildings.command * 12,
      alloys: 0.4 + state.buildings.lab * 0.28
    };

    for (const country of ownedCountries) {
      for (const [key, value] of Object.entries(country.yields)) {
        basePerHour[key] = (basePerHour[key] || 0) + value;
      }
    }

    const finalPack = {};
    for (const [key, perHour] of Object.entries(basePerHour)) {
      finalPack[key] = ((perHour * logisticsBoost * commandBoost * balance.production) / 3600) * deltaSeconds;
    }

    addResources(finalPack);

    const upkeep = getTroopUpkeepPerHour();
    const upkeepFoodPerHour = upkeep.food;
    const upkeepOilPerHour = upkeep.oil;

    const neededFood = (upkeepFoodPerHour / 3600) * deltaSeconds;
    const neededOil = (upkeepOilPerHour / 3600) * deltaSeconds;

    const hadFood = state.resources.food >= neededFood;
    const hadOil = state.resources.oil >= neededOil;

    state.resources.food = Math.max(0, state.resources.food - neededFood);
    state.resources.oil = Math.max(0, state.resources.oil - neededOil);

    if (!hadFood || !hadOil) {
      const penalty = (0.012 + balance.resistancePressure * 0.003) * deltaSeconds;
      state.world.instability = Math.min(100, state.world.instability + penalty);
    } else {
      const relief = (0.006 + state.tech.stability * 0.0012 + (1 - balance.resistancePressure) * 0.002) * deltaSeconds;
      state.world.instability = Math.max(0, state.world.instability - relief);
    }
  }

  function processActionQueue(now) {
    const completed = [];
    state.actionQueue = state.actionQueue.filter((action) => {
      if (action.endAt <= now) {
        completed.push(action);
        return false;
      }
      return true;
    });

    completed.sort((a, b) => a.endAt - b.endAt);
    completed.forEach((action) => resolveAction(action, now));
  }

  function resolveAction(action, now) {
    if (action.kind === "collect") {
      addResources(action.payload.reward);
      pushLog(`${action.name} concluída. Recursos recebidos.`, "system");
      showToast(`Concluída: ${action.name}`, "success");
      return;
    }

    if (action.kind === "upgrade") {
      const key = action.payload.key;
      state.buildings[key] += 1;
      pushLog(`${BUILDING_DEFS[key].name} agora está no nível ${state.buildings[key]}.`, "system");
      showToast(`Upgrade finalizado: ${BUILDING_DEFS[key].name}`, "success");
      return;
    }

    if (action.kind === "train") {
      const unitType = action.payload.unit;
      state.troops[unitType] += action.payload.amount;
      pushLog(`Treinamento finalizado: +${action.payload.amount} ${TRAINING_DEFS[unitType].name}.`, "system");
      showToast(`Treinamento pronto: ${TRAINING_DEFS[unitType].name}`, "success");
      return;
    }

    if (action.kind === "research") {
      const techKey = action.payload.tech;
      state.tech[techKey] += 1;
      pushLog(`${TECH_DEFS[techKey].name} evoluiu para nível ${state.tech[techKey]}.`, "system");
      showToast(`Pesquisa concluída: ${TECH_DEFS[techKey].name}`, "success");
      return;
    }

    if (action.kind === "invasion") {
      resolveBattle(action.payload.targetId, action.payload.committed, now, false, action.payload.sourceId);
      return;
    }

    if (action.kind === "counterAlien") {
      resolveBattle(action.payload.targetId, action.payload.committed, now, true, action.payload.sourceId);
      return;
    }

    if (action.kind === "nuclearStrike") {
      resolveNuclearStrike(action.payload.targetId, action.payload.sourceId, now);
      return;
    }

    if (action.kind === "bioStrike") {
      resolveBiologicalStrike(action.payload.targetId, action.payload.sourceId, now);
      return;
    }

    if (action.kind === "spy") {
      const country = state.countries[action.payload.targetId];
      if (country) {
        country.spyDebuffUntil = now + 120 * 60 * 1000;
        pushLog(`Espionagem em ${country.name} concluída. Defesa inimiga reduzida por 2 horas.`, "system");
        showToast(`Espionagem concluída em ${country.name}`, "success");
        addImpactPulse(country.id, "spy");
      }
      return;
    }

    if (action.kind === "diplomacy") {
      resolveDiplomacy(action.payload.targetId);
      return;
    }

    if (action.kind === "pacify") {
      const country = state.countries[action.payload.targetId];
      if (country && country.owner === "player") {
        country.unrest = Math.max(0, country.unrest - 26);
        state.world.instability = Math.max(0, state.world.instability - 4);
        pushLog(`Operação de pacificação em ${country.name} restaurou ordem local.`, "system");
        showToast(`Pacificação concluída em ${country.name}`, "success");
        addImpactPulse(country.id, "support");
      }
      return;
    }

    if (action.kind === "defendRetaliation") {
      const threat = getRetaliationThreat(action.payload.threatId);
      if (threat && !threat.resolved) {
        threat.defenseBoost = Math.min(1.2, (threat.defenseBoost || 0) + (action.payload.boost || 0.28));
        threat.mitigated = true;
        pushLog(`Defesa preparada em ${state.countries[threat.toId]?.name || "território"} contra retaliação iminente.`, "system");
        showToast("Defesa contra retaliação concluída.", "success");
        addImpactPulse(threat.toId, "support");
      }
      return;
    }

    if (action.kind === "fortify") {
      state.world.fortifyUntil = now + 2 * 60 * 60 * 1000;
      state.world.instability = Math.max(0, state.world.instability - 8);
      pushLog("Doutrina defensiva ativada por 2 horas.", "system");
      showToast("Fortificação estratégica ativa por 2 horas.", "success");
      return;
    }

    if (action.kind === "mobilization") {
      state.world.mobilizationUntil = now + 75 * 60 * 1000;
      pushLog("Mobilização rápida ativa por 75 minutos: treinamentos 15% mais velozes.", "system");
      showToast("Mobilização rápida ativa.", "success");
    }
  }

  function resolveBattle(targetId, committed, now, alienBonus, sourceId) {
    const target = state.countries[targetId];
    if (!target) {
      return;
    }

    const targetOwner = target.owner;
    if (targetOwner === "player") {
      returnTroops(committed, 1);
      return;
    }

    const attackPower = calculatePower(committed, targetOwner, alienBonus);
    const defensePower = calculateDefense(target, now);
    let winChance = attackPower / (attackPower + defensePower * 1.05);
    winChance = clamp(winChance, 0.08, 0.95);

    const won = Math.random() < winChance;
    const pressure = 1 + (1 - winChance) * 0.22 + (targetOwner === "alien" ? 0.05 : 0);
    const casualtyBase = won ? randomInRange(0.12, 0.32) : randomInRange(0.34, 0.58);
    const casualtyFactor = clamp(casualtyBase * pressure, 0.08, 0.7);
    returnTroops(committed, 1 - casualtyFactor);

    if (won) {
      const prev = target.owner;
      target.owner = "player";
      target.unrest = prev === "neutral" ? 9 : 22;
      target.spyDebuffUntil = 0;

      if (prev === "alien") {
        state.world.alienTerritories = state.world.alienTerritories.filter((id) => id !== target.id);
      }

      state.stats.warsWon += 1;
      addResources({
        credits: 90 + Math.floor(target.baseDefense * 1.7),
        steel: 36 + Math.floor(target.baseDefense * 0.9),
        science: 6 + Math.floor(target.baseDefense * 0.2)
      });

      pushLog(`Vitória em ${target.name}. Território conquistado.`, "win");
      showToast(`Vitória em ${target.name}!`, "success");
      addImpactPulse(target.id, prev === "alien" ? "liberation" : "conquest");

      if (prev === "alien" && state.world.alienTerritories.length === 0 && state.world.aliensActive) {
        state.stats.wavesSurvived += 1;
      }
    } else {
      state.stats.warsLost += 1;
      target.unrest = Math.min(100, target.unrest + 8);
      pushLog(`Derrota em ${target.name}. O inimigo resistiu.`, "warn");
      showToast(`Derrota em ${target.name}.`, "warn");
      addImpactPulse(target.id, "defeat");
      scheduleRetaliation(target.id, sourceId || state.playerCountry, "conventional", now);
    }
  }

  function resolveDiplomacy(targetId) {
    const target = state.countries[targetId];
    if (!target) {
      return;
    }

    if (target.owner === "player") {
      return;
    }

    if (target.owner === "alien") {
      pushLog(`Canal diplomático em ${target.name} falhou: forças alienígenas ignoraram contato.`, "warn");
      showToast(`Diplomacia falhou em ${target.name}.`, "warn");
      return;
    }

    const finalChance = getDiplomacyChance(target, Date.now());

    if (Math.random() < finalChance) {
      const previous = target.owner;
      target.owner = "player";
      target.unrest = 12;
      target.spyDebuffUntil = 0;
      state.stats.peacefulAnnex += 1;
      if (previous === "alien") {
        state.world.alienTerritories = state.world.alienTerritories.filter((id) => id !== target.id);
        if (state.world.alienTerritories.length === 0 && state.world.aliensActive) {
          state.stats.wavesSurvived += 1;
        }
      }
      pushLog(`Anexação diplomática concluída em ${target.name}.`, "win");
      showToast(`Anexação diplomática: ${target.name}`, "success");
      addImpactPulse(target.id, "diplomacy");
    } else {
      pushLog(`Negociação falhou em ${target.name}.`, "warn");
      showToast(`Negociação falhou em ${target.name}.`, "warn");
      addImpactPulse(target.id, "diplomacyFail");
    }
  }

  function resolveNuclearStrike(targetId, sourceId, now) {
    const target = state.countries[targetId];
    if (!target || target.owner === "player") {
      return;
    }

    const baseDefense = getDefenseBase(target, now);
    const strikePower = 160 + state.tech.ballistics * 22 + state.tech.cyber * 8 + randomInRange(0, 60);
    const successChance = clamp(strikePower / (strikePower + baseDefense), 0.25, 0.9);
    const success = Math.random() < successChance;
    state.world.instability = Math.min(100, state.world.instability + 9);

    if (success) {
      const previous = target.owner;
      target.unrest = Math.min(100, target.unrest + 45);
      target.spyDebuffUntil = now + 4 * 60 * 60 * 1000;
      const alienPenalty = previous === "alien" ? 0.14 : 0;
      const captureChance = clamp(0.36 + state.tech.ballistics * 0.03 - target.baseDefense * 0.0014 - alienPenalty, 0.12, 0.66);
      if (Math.random() < captureChance) {
        target.owner = "player";
        target.unrest = 28;
        target.spyDebuffUntil = 0;
        state.stats.warsWon += 1;
        addResources({
          credits: 70 + Math.floor(target.baseDefense * 1.25),
          steel: 24 + Math.floor(target.baseDefense * 0.72),
          science: 8 + Math.floor(target.baseDefense * 0.12)
        });
        if (previous === "alien") {
          state.world.alienTerritories = state.world.alienTerritories.filter((id) => id !== target.id);
          if (state.world.alienTerritories.length === 0 && state.world.aliensActive) {
            state.stats.wavesSurvived += 1;
          }
        }
        pushLog(`Ataque nuclear em ${target.name} resultou em colapso militar e anexação.`, "win");
        showToast(`Ataque nuclear venceu em ${target.name}.`, "success");
        addImpactPulse(target.id, previous === "alien" ? "liberation" : "conquest");
      } else {
        pushLog(`Ataque nuclear em ${target.name} devastou o alvo, mas sem anexação imediata.`, "warn");
        showToast(`Ataque nuclear impactou ${target.name}.`, "warn");
        addImpactPulse(target.id, "defeat");
        scheduleRetaliation(targetId, sourceId, "nuclear", now);
      }
    } else {
      target.unrest = Math.min(100, target.unrest + 14);
      state.world.instability = Math.min(100, state.world.instability + 4);
      pushLog(`Ataque nuclear em ${target.name} falhou em romper as defesas.`, "warn");
      showToast(`Ataque nuclear falhou em ${target.name}.`, "warn");
      addImpactPulse(target.id, "diplomacyFail");
      scheduleRetaliation(targetId, sourceId, "nuclear", now);
    }
  }

  function resolveBiologicalStrike(targetId, sourceId, now) {
    const target = state.countries[targetId];
    if (!target || target.owner === "player") {
      return;
    }

    const profile = getBiologicalStrikeProfile(target);
    const previous = target.owner;
    const disruption = 20 + state.tech.cyber * 8 + state.tech.stability * 5 + randomInRange(0, 16);
    const resistance = target.baseDefense * 0.22 + randomInRange(6, 22);
    const success = disruption >= resistance;

    target.unrest = Math.min(100, target.unrest + (success ? 34 : 16));
    target.spyDebuffUntil = Math.max(target.spyDebuffUntil, now + (success ? 5 : 2) * 60 * 60 * 1000);
    state.world.instability = Math.min(100, state.world.instability + (success ? 6 : 3));

    if (success) {
      const captureChance = clamp(0.18 + target.unrest * 0.0025 + state.tech.cyber * 0.02 - target.baseDefense * 0.0015, 0.08, 0.48);
      if (Math.random() < captureChance) {
        target.owner = "player";
        target.unrest = 30;
        target.spyDebuffUntil = 0;
        state.stats.warsWon += 1;
        addResources({
          credits: 52 + Math.floor(target.baseDefense * 0.95),
          food: 18 + Math.floor(target.baseDefense * 0.32)
        });
        if (previous === "alien") {
          state.world.alienTerritories = state.world.alienTerritories.filter((id) => id !== target.id);
          if (state.world.alienTerritories.length === 0 && state.world.aliensActive) {
            state.stats.wavesSurvived += 1;
          }
        }
        pushLog(`Ataque biológico desestabilizou ${target.name}, permitindo tomada de controle.`, "win");
        showToast(`Colapso biológico em ${target.name}.`, "success");
        addImpactPulse(target.id, previous === "alien" ? "liberation" : "conquest");
        return;
      }
      pushLog(`Ataque biológico em ${target.name} elevou caos interno, sem anexação imediata.`, "warn");
      showToast(`Ataque biológico afetou ${target.name}.`, "warn");
      addImpactPulse(target.id, "spy");
    } else {
      pushLog(`Ataque biológico em ${target.name} teve efeito parcial e gerou resistência.`, "warn");
      showToast(`Ataque biológico foi contido em ${target.name}.`, "warn");
      addImpactPulse(target.id, "diplomacyFail");
    }

    const backlash = Math.max(0, 4 - state.tech.stability * 0.5);
    state.world.instability = Math.min(100, state.world.instability + backlash);
    if (profile.selfPenalty && profile.selfPenalty > 0) {
      addResources({ food: -profile.selfPenalty });
    }
    scheduleRetaliation(targetId, sourceId, "biological", now);
  }

  function scheduleRetaliation(fromId, toId, mode, now) {
    const fromCountry = state.countries[fromId];
    const toCountry = state.countries[toId];
    if (!fromCountry || !toCountry || toCountry.owner !== "player") {
      return;
    }

    const duplicate = state.world.retaliations.some((threat) => {
      return !threat.resolved && threat.fromId === fromId && threat.toId === toId && threat.mode === mode;
    });
    if (duplicate) {
      return;
    }

    const minutes = mode === "nuclear" ? randomInRange(7, 14) : mode === "biological" ? randomInRange(9, 18) : randomInRange(10, 20);
    const strength = mode === "nuclear" ? randomInRange(0.72, 0.96) : mode === "biological" ? randomInRange(0.46, 0.78) : randomInRange(0.4, 0.74);
    const id = `r_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`;
    state.world.retaliations.push({
      id,
      fromId,
      toId,
      mode,
      createdAt: now,
      impactAt: now + minutes * 60 * 1000,
      strength,
      defenseBoost: 0,
      mitigated: false,
      resolved: false
    });
    const modeLabel = mode === "nuclear" ? "nuclear" : mode === "biological" ? "biológica" : "convencional";
    pushLog(`Inteligência detectou retaliação ${modeLabel} de ${fromCountry.name} contra ${toCountry.name}.`, "warn");
    showToast(`Retaliação detectada: ${fromCountry.name} -> ${toCountry.name}`, "warn");
  }

  function getRetaliationThreat(threatId) {
    return state.world.retaliations.find((threat) => threat.id === threatId) || null;
  }

  function getIncomingRetaliations(countryId, now) {
    return state.world.retaliations.filter((threat) => {
      return !threat.resolved && threat.toId === countryId && threat.impactAt > now;
    });
  }

  function getThreatModeLabel(mode) {
    if (mode === "nuclear") {
      return "Nuclear";
    }
    if (mode === "biological") {
      return "Biológica";
    }
    return "Convencional";
  }

  function processRetaliations(now) {
    if (!Array.isArray(state.world.retaliations) || state.world.retaliations.length === 0) {
      return;
    }

    for (const threat of state.world.retaliations) {
      if (threat.resolved) {
        continue;
      }
      if (threat.impactAt <= now) {
        resolveRetaliation(threat, now);
      }
    }

    state.world.retaliations = state.world.retaliations.slice(-30);
  }

  function resolveRetaliation(threat, now) {
    const source = state.countries[threat.fromId];
    const target = state.countries[threat.toId];
    threat.resolved = true;
    if (!source || !target || target.owner !== "player") {
      return;
    }

    const defenseBase = (getDefenseBase(target, now) / 180) + state.tech.stability * 0.04 + (state.ui.easyMode ? 0.08 : 0);
    const modePressure = threat.mode === "nuclear" ? 0.36 : threat.mode === "biological" ? 0.26 : 0.2;
    const finalDefense = defenseBase + threat.defenseBoost - threat.strength * modePressure;
    const holdChance = clamp(0.28 + finalDefense, 0.1, 0.92);
    const defended = Math.random() < holdChance;

    if (defended) {
      target.unrest = Math.min(100, target.unrest + (threat.mode === "nuclear" ? 10 : 6));
      state.world.instability = Math.min(100, state.world.instability + (threat.mode === "nuclear" ? 4 : 2));
      pushLog(`Retaliação de ${source.name} contra ${target.name} foi contida com sucesso.`, "win");
      showToast(`Defesa bem-sucedida em ${target.name}.`, "success");
      addImpactPulse(target.id, "support");
      return;
    }

    const resourceLoss = threat.mode === "nuclear"
      ? { steel: 140, food: 160, credits: 220 }
      : threat.mode === "biological"
        ? { food: 180, credits: 110, science: 40 }
        : { steel: 80, food: 70, credits: 90 };
    spendResources(resourceLoss);
    target.unrest = Math.min(100, target.unrest + (threat.mode === "nuclear" ? 30 : 20));
    state.world.instability = Math.min(100, state.world.instability + (threat.mode === "nuclear" ? 10 : 6));

    const canLoseTerritory = target.id !== state.playerCountry && getOwnedCountries("player").length > 1;
    const takeoverChance = clamp(threat.strength * (threat.mode === "nuclear" ? 0.65 : 0.42) - threat.defenseBoost * 0.35, 0.05, 0.7);
    if (canLoseTerritory && Math.random() < takeoverChance) {
      target.owner = source.owner === "player" ? "neutral" : source.owner;
      if (target.owner === "alien" && !state.world.alienTerritories.includes(target.id)) {
        state.world.alienTerritories.push(target.id);
      }
      pushLog(`Retaliação de ${source.name} tomou ${target.name} do seu controle.`, "warn");
      showToast(`Você perdeu ${target.name} para retaliação inimiga.`, "warn");
      addImpactPulse(target.id, "defeat");
      return;
    }

    pushLog(`Retaliação de ${source.name} atingiu ${target.name}. Danos severos registrados.`, "warn");
    showToast(`Retaliação atingiu ${target.name}.`, "warn");
    addImpactPulse(target.id, "defeat");
  }

  function processWorldEvents(now, deltaSeconds) {
    const domination = getDominationPercent();
    const balance = getBalanceProfile();

    if (domination >= 100 && !state.world.aliensActive) {
      state.world.aliensActive = true;
      state.world.alienWave = 0;
      state.world.nextAlienAt = now + 24 * 60 * 1000;
      state.world.resistanceActive = true;
      state.world.nextResistanceAt = now + 40 * 60 * 1000;
      pushLog("Humanidade dominou o planeta. Contato hostil alien detectado.", "warn");
    }

    if (state.world.aliensActive && state.world.nextAlienAt && now >= state.world.nextAlienAt) {
      launchAlienWave();
      const cooldownMinutes = Math.max(20, 54 - state.world.alienWave * 2.1 - state.tech.antiAlien * 0.7);
      state.world.nextAlienAt = now + cooldownMinutes * 60 * 1000;
    }

    if (state.world.resistanceActive && state.world.nextResistanceAt && now >= state.world.nextResistanceAt) {
      launchResistanceEvent();
      const min = 38;
      const max = 82;
      const reduction = state.tech.stability * 2.6;
      const cadence = clamp(balance.resistancePressure, 0.82, 1.3);
      const next = randomInRange(min, max) / cadence - reduction;
      state.world.nextResistanceAt = now + Math.max(24, next) * 60 * 1000;
    }

    if (state.world.aliensActive) {
      const decay = (0.006 + state.tech.antiAlien * 0.0015) * deltaSeconds;
      state.world.instability = Math.max(0, state.world.instability - decay);
    }

    if (!state.world.nextSkirmishAt) {
      state.world.nextSkirmishAt = now + randomInRange(10, 16) * 60 * 1000;
    }
    if (state.world.nextSkirmishAt && now >= state.world.nextSkirmishAt) {
      resolveGeopoliticalSkirmish(now);
      const cadence = clamp(balance.resistancePressure * (state.world.aliensActive ? 1.07 : 0.98), 0.86, 1.35);
      const easyBonus = state.ui.easyMode ? 3.5 : 0;
      const nextMinutes = Math.max(8, randomInRange(11, 19) / cadence + easyBonus);
      state.world.nextSkirmishAt = now + nextMinutes * 60 * 1000;
    }
  }

  function resolveGeopoliticalSkirmish(now) {
    const nonPlayer = Object.values(state.countries).filter((country) => country.owner !== "player");
    if (nonPlayer.length < 2) {
      return;
    }

    const attacker = pickSkirmishAttacker(nonPlayer);
    const defender = attacker ? pickSkirmishDefender(attacker, nonPlayer) : null;
    if (!attacker || !defender) {
      return;
    }

    addAmbientFront(attacker.id, defender.id, attacker.owner, now, randomInRange(4.5, 9.5) * 60 * 1000);

    const attackerMultiplier = attacker.owner === "alien" ? 1.22 : attacker.owner === "resistance" ? 1.12 : 1;
    const defenderMultiplier = defender.owner === "alien" ? 1.2 : defender.owner === "resistance" ? 1.1 : 1;
    const atkPower = attacker.baseDefense * attackerMultiplier + attacker.unrest * 0.28 + randomInRange(4, 24);
    const defPower = defender.baseDefense * defenderMultiplier + (100 - defender.unrest) * 0.11 + randomInRange(4, 24);
    const winChance = clamp(atkPower / (atkPower + defPower), 0.18, 0.82);
    const won = Math.random() < winChance;

    if (won && defender.owner !== attacker.owner && defender.owner !== "player") {
      const previousOwner = defender.owner;
      defender.owner = attacker.owner;
      defender.unrest = clamp(defender.unrest + randomInRange(10, 20), 0, 100);

      if (previousOwner === "alien") {
        state.world.alienTerritories = state.world.alienTerritories.filter((id) => id !== defender.id);
      }
      if (attacker.owner === "alien" && !state.world.alienTerritories.includes(defender.id)) {
        state.world.alienTerritories.push(defender.id);
      }
      if (attacker.owner === "resistance") {
        state.world.resistanceActive = true;
      }

      const tone = attacker.owner === "alien" ? "alien" : attacker.owner === "resistance" ? "defeat" : "support";
      addImpactPulse(defender.id, tone);
      pushLog(`Conflito externo: ${attacker.name} (${STATUS_LABELS[attacker.owner]}) tomou ${defender.name}.`, "warn");
      if (state.ui.easyMode) {
        showToast(`Conflito global: ${attacker.name} avançou sobre ${defender.name}.`, "info");
      }
      return;
    }

    attacker.unrest = clamp(attacker.unrest + randomInRange(2, 6), 0, 100);
    defender.unrest = clamp(defender.unrest + randomInRange(4, 9), 0, 100);
    addImpactPulse(defender.id, "defeat");
    pushLog(`Conflito externo: ${attacker.name} atacou ${defender.name}, sem mudança de fronteira.`, "system");
  }

  function pickSkirmishAttacker(candidates) {
    const weighted = [];
    candidates.forEach((country) => {
      const ownerWeight = country.owner === "alien" ? 6 : country.owner === "resistance" ? 4 : 2;
      const unrestWeight = Math.max(0, Math.floor(country.unrest * 0.06));
      const totalWeight = Math.max(1, ownerWeight + unrestWeight);
      for (let i = 0; i < totalWeight; i += 1) {
        weighted.push(country);
      }
    });
    if (weighted.length === 0) {
      return null;
    }
    return weighted[Math.floor(Math.random() * weighted.length)];
  }

  function pickSkirmishDefender(attacker, candidates) {
    const pool = candidates.filter((country) => country.id !== attacker.id && country.owner !== attacker.owner);
    if (pool.length === 0) {
      return null;
    }

    const ranked = pool.map((country) => {
      const dist = geoDistanceScore(attacker, country);
      return { country, dist };
    });
    ranked.sort((a, b) => a.dist - b.dist);
    const shortList = ranked.slice(0, Math.min(8, ranked.length));
    const weighted = [];
    shortList.forEach((entry) => {
      const weight = Math.max(1, Math.floor((200 - entry.dist) / 10));
      for (let i = 0; i < weight; i += 1) {
        weighted.push(entry.country);
      }
    });
    return weighted[Math.floor(Math.random() * weighted.length)] || shortList[0].country;
  }

  function launchAlienWave() {
    state.world.alienWave += 1;
    const wave = state.world.alienWave;
    const playerOwned = getOwnedCountries("player").length;

    const totalTargets = Math.min(4, Math.max(1, Math.floor(1 + wave * 0.25 + Math.max(0, playerOwned - 12) * 0.04)));
    const priority = [
      ...getOwnedCountries("player").filter((country) => country.id !== state.playerCountry),
      ...getOwnedCountries("neutral"),
      ...getOwnedCountries("resistance")
    ];

    shuffle(priority);
    const taken = [];

    for (const country of priority) {
      if (taken.length >= totalTargets) {
        break;
      }
      if (country.owner === "alien") {
        continue;
      }
      country.owner = "alien";
      country.unrest = Math.min(100, country.unrest + 18);
      if (!state.world.alienTerritories.includes(country.id)) {
        state.world.alienTerritories.push(country.id);
      }
      taken.push(country.name);
      addImpactPulse(country.id, "alien");
    }

    if (taken.length > 0) {
      state.world.resistanceActive = true;
      if (!state.world.nextResistanceAt) {
        state.world.nextResistanceAt = Date.now() + 25 * 60 * 1000;
      }
      pushLog(`Onda alien #${wave} tomou: ${taken.join(", ")}.`, "warn");
    } else {
      pushLog(`Onda alien #${wave} foi detectada, mas sem avanço territorial.`, "system");
    }
  }

  function launchResistanceEvent() {
    const balance = getBalanceProfile();
    const controlled = getOwnedCountries("player").filter((country) => country.id !== state.playerCountry);
    if (controlled.length === 0) {
      return;
    }

    const instabilityFactor = state.world.instability / 100;
    const meanUnrest = controlled.reduce((acc, country) => acc + country.unrest, 0) / controlled.length;
    let chance = 0.1 + instabilityFactor * 0.32 + meanUnrest * 0.0018 - state.tech.stability * 0.035;
    chance *= balance.resistancePressure;
    if (state.ui.easyMode) {
      chance *= 0.86;
    }
    chance = clamp(chance, 0.04, 0.66);

    if (Math.random() < chance) {
      const weighted = [];
      controlled.forEach((country) => {
        const weight = Math.max(1, Math.floor(3 + country.unrest * 0.35));
        for (let i = 0; i < weight; i += 1) {
          weighted.push(country);
        }
      });
      const rebel = weighted[Math.floor(Math.random() * weighted.length)];
      rebel.owner = "resistance";
      rebel.unrest = Math.min(100, rebel.unrest + 22);
      pushLog(`Resistência local emergiu em ${rebel.name}.`, "warn");
    } else {
      pushLog("Células de resistência foram neutralizadas antes da revolta.", "system");
    }
  }

  function updateCountryUnrest(deltaSeconds) {
    const ownedCount = getOwnedCountries("player").length;
    const overextension = Math.max(0, ownedCount - 6) * 0.00008;
    const suppress = 0.0014 + state.tech.stability * 0.00045;

    for (const country of Object.values(state.countries)) {
      if (country.owner === "player") {
        const baseGrowth = country.id === state.playerCountry ? -0.0009 : 0.0012 + overextension;
        const fortifyBonus = Date.now() < state.world.fortifyUntil ? -0.0011 : 0;
        country.unrest = clamp(country.unrest + (baseGrowth + fortifyBonus - suppress) * deltaSeconds, 0, 100);
      } else {
        country.unrest = clamp(country.unrest - 0.0012 * deltaSeconds, 0, 100);
      }
    }
  }

  function getAttackSourceCountry() {
    const preferred = state.ui.attackSourceCountry;
    if (preferred && state.countries[preferred] && state.countries[preferred].owner === "player") {
      return state.countries[preferred];
    }
    const fallbackId = state.playerCountry || getOwnedCountries("player")[0]?.id;
    if (fallbackId && state.countries[fallbackId]) {
      state.ui.attackSourceCountry = fallbackId;
      return state.countries[fallbackId];
    }
    return null;
  }

  function setAttackSourceCountry(countryId) {
    if (!countryId || !state.countries[countryId] || state.countries[countryId].owner !== "player") {
      return;
    }
    if (state.ui.attackSourceCountry === countryId) {
      return;
    }
    state.ui.attackSourceCountry = countryId;
    renderSelectedCountry();
    saveState();
  }

  function startCollection(id) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const def = COLLECTION_ACTIONS.find((item) => item.id === id);
    if (!def) {
      return;
    }

    const commandModifier = 1 + (state.buildings.command - 1) * 0.06;
    const reward = multiplyResourcePack(def.reward, commandModifier);

    queueAction({
      kind: "collect",
      name: def.name,
      durationSeconds: def.duration,
      cost: def.cost,
      payload: { reward, sourceId: id }
    });
  }

  function startBuildingUpgrade(key) {
    if (!ensureCampaignStarted()) {
      return;
    }

    if (!BUILDING_DEFS[key]) {
      return;
    }

    const duplicate = state.actionQueue.some((action) => action.kind === "upgrade" && action.payload.key === key);
    if (duplicate) {
      const msg = "Já existe uma melhoria dessa estrutura em andamento.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const level = state.buildings[key];
    const cost = scaleCost(BUILDING_DEFS[key].baseCost, 1 + level * 0.42);
    const duration = Math.floor(BUILDING_DEFS[key].baseDuration * (1 + level * 0.2));

    queueAction({
      kind: "upgrade",
      name: `Upgrade: ${BUILDING_DEFS[key].name}`,
      durationSeconds: duration,
      cost,
      payload: { key }
    });
  }

  function startTraining(unitType) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const def = TRAINING_DEFS[unitType];
    if (!def) {
      return;
    }

    const speedBoost = Date.now() < state.world.mobilizationUntil ? 0.85 : 1;
    const commandBoost = 1 - Math.min(0.25, (state.buildings.command - 1) * 0.03);
    const duration = Math.floor(def.duration * speedBoost * commandBoost);

    queueAction({
      kind: "train",
      name: `Treinar ${def.name}`,
      durationSeconds: duration,
      cost: def.cost,
      payload: {
        unit: unitType,
        amount: def.batch
      }
    });
  }

  function startResearch(techKey) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const def = TECH_DEFS[techKey];
    if (!def) {
      return;
    }

    const level = state.tech[techKey];
    if (level >= def.maxLevel) {
      const msg = `${def.name} já atingiu o nível máximo.`;
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const duplicate = state.actionQueue.some((action) => action.kind === "research" && action.payload.tech === techKey);
    if (duplicate) {
      const msg = "Esse projeto já está em andamento.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const cost = scaleCost(def.baseCost, 1 + level * 0.5);
    const duration = Math.floor(def.baseDuration * (1 + level * 0.22));

    queueAction({
      kind: "research",
      name: `Pesquisa: ${def.name}`,
      durationSeconds: duration,
      cost,
      payload: {
        tech: techKey
      }
    });
  }

  function startInvasion(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const source = getAttackSourceCountry();
    if (!source) {
      showToast("Selecione um país de origem para atacar.", "warn");
      return;
    }
    const target = state.countries[targetId];
    if (!target || target.owner === "player") {
      const msg = "Selecione um país fora do seu domínio para invadir.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }
    if (source.id === target.id) {
      showToast("Origem e alvo não podem ser o mesmo país.", "warn");
      return;
    }

    if (state.ui.easyMode) {
      const ok = window.confirm(`Confirmar invasão em ${target.name}? Essa ação arrisca tropas e recursos.`);
      if (!ok) {
        return;
      }
    }

    if (!canStartNewAction()) {
      return;
    }

    const committed = commitTroops(0.3);
    if (!committed) {
      pushLog("Tropas insuficientes para invasão.", "warn");
      showToast("Tropas insuficientes para invasão.", "warn");
      return;
    }

    const invasionProfile = getInvasionProfile(target);
    const cost = invasionProfile.cost;
    const duration = invasionProfile.durationSeconds;

    if (!hasResources(cost)) {
      returnTroops(committed, 1);
      pushLog("Recursos insuficientes para lançar invasão.", "warn");
      showToast(getMissingResourcesText(cost) || "Recursos insuficientes para invasão.", "warn");
      return;
    }

    spendResources(cost);
    pushAction({
      kind: "invasion",
      name: `Invasão: ${target.name}`,
      durationSeconds: duration,
      cost,
      refundable: false,
      payload: { targetId, sourceId: source.id, committed }
    });
  }

  function startCounterAlienStrike(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const source = getAttackSourceCountry();
    if (!source) {
      showToast("Selecione um país de origem para atacar.", "warn");
      return;
    }
    const target = state.countries[targetId];
    if (!target || target.owner !== "alien") {
      const msg = "Contra-ataque alien só pode ser usado em território alienígena.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    if (state.ui.easyMode) {
      const ok = window.confirm(`Confirmar contra-ataque em ${target.name}?`);
      if (!ok) {
        return;
      }
    }

    if (!canStartNewAction()) {
      return;
    }

    const committed = commitTroops(0.36);
    if (!committed) {
      pushLog("Tropas insuficientes para contra-ataque.", "warn");
      showToast("Tropas insuficientes para contra-ataque.", "warn");
      return;
    }

    const profile = getCounterAlienProfile(target);
    const cost = profile.cost;
    const duration = profile.durationSeconds;

    if (!hasResources(cost)) {
      returnTroops(committed, 1);
      pushLog("Recursos insuficientes para ofensiva anti-alien.", "warn");
      showToast(getMissingResourcesText(cost) || "Recursos insuficientes para ofensiva.", "warn");
      return;
    }

    spendResources(cost);
    pushAction({
      kind: "counterAlien",
      name: `Contra-ataque: ${target.name}`,
      durationSeconds: duration,
      cost,
      refundable: false,
      payload: { targetId, sourceId: source.id, committed }
    });
  }

  function startNuclearStrike(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const source = getAttackSourceCountry();
    const target = state.countries[targetId];
    if (!source || !target || target.owner === "player") {
      showToast("Selecione um alvo inimigo e um país de origem.", "warn");
      return;
    }
    if (state.tech.ballistics < 2) {
      showToast("Requer Balística Avançada nível 2 para ataque nuclear.", "warn");
      return;
    }

    const profile = getNuclearStrikeProfile(target);
    if (!hasResources(profile.cost)) {
      showToast(getMissingResourcesText(profile.cost) || "Recursos insuficientes para ataque nuclear.", "warn");
      return;
    }

    if (state.ui.easyMode) {
      const ok = window.confirm(`Confirmar ataque nuclear em ${target.name}? Isso aumenta instabilidade global.`);
      if (!ok) {
        return;
      }
    }

    queueAction({
      kind: "nuclearStrike",
      name: `Ataque Nuclear: ${target.name}`,
      durationSeconds: profile.durationSeconds,
      cost: profile.cost,
      refundable: false,
      payload: { targetId, sourceId: source.id }
    });
  }

  function startBiologicalStrike(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const source = getAttackSourceCountry();
    const target = state.countries[targetId];
    if (!source || !target || target.owner === "player") {
      showToast("Selecione um alvo inimigo e um país de origem.", "warn");
      return;
    }
    if (state.tech.cyber < 2) {
      showToast("Requer Guerra Cibernética nível 2 para ataque biológico.", "warn");
      return;
    }

    const profile = getBiologicalStrikeProfile(target);
    if (!hasResources(profile.cost)) {
      showToast(getMissingResourcesText(profile.cost) || "Recursos insuficientes para ataque biológico.", "warn");
      return;
    }

    queueAction({
      kind: "bioStrike",
      name: `Ataque Biológico: ${target.name}`,
      durationSeconds: profile.durationSeconds,
      cost: profile.cost,
      refundable: false,
      payload: { targetId, sourceId: source.id }
    });
  }

  function startSpyMission(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const source = getAttackSourceCountry();
    if (!source) {
      showToast("Selecione um país de origem para atacar.", "warn");
      return;
    }
    const target = state.countries[targetId];
    if (!target || target.owner === "player") {
      const msg = "Espionagem é aplicável em países hostis/neutros.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const duplicate = state.actionQueue.some((action) => action.kind === "spy" && action.payload.targetId === targetId);
    if (duplicate) {
      const msg = "Já existe espionagem ativa para esse alvo.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const profile = getSpyProfile(target);
    queueAction({
      kind: "spy",
      name: `Espionagem: ${target.name}`,
      durationSeconds: profile.durationSeconds,
      cost: profile.cost,
      payload: { targetId, sourceId: source.id }
    });
  }

  function startDiplomacyMission(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const source = getAttackSourceCountry();
    if (!source) {
      showToast("Selecione um país de origem para negociar.", "warn");
      return;
    }
    const target = state.countries[targetId];
    if (!target || target.owner === "player") {
      const msg = "Selecione um país fora do seu domínio para negociação.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    if (target.owner === "alien") {
      const msg = "Diplomacia não funciona com forças alienígenas. Use contra-ataque.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const profile = getDiplomacyProfile(target);
    queueAction({
      kind: "diplomacy",
      name: `Diplomacia: ${target.name}`,
      durationSeconds: profile.durationSeconds,
      cost: profile.cost,
      payload: { targetId, sourceId: source.id }
    });
  }

  function startPacifyMission(targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const target = state.countries[targetId];
    if (!target || target.owner !== "player") {
      const msg = "Pacificação só funciona em território sob seu domínio.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    const profile = getPacifyProfile(target);
    queueAction({
      kind: "pacify",
      name: `Pacificação: ${target.name}`,
      durationSeconds: profile.durationSeconds,
      cost: profile.cost,
      payload: { targetId, sourceId: target.id }
    });
  }

  function startRetaliationDefense(threatId, targetId) {
    if (!ensureCampaignStarted()) {
      return;
    }

    const threat = getRetaliationThreat(threatId);
    const target = state.countries[targetId];
    if (!threat || threat.resolved || !target || target.owner !== "player") {
      showToast("Não há retaliação ativa para defender.", "warn");
      return;
    }
    if (threat.toId !== targetId) {
      showToast("Selecione o país que está sob ameaça para iniciar a defesa.", "warn");
      return;
    }

    const duplicate = state.actionQueue.some((action) => action.kind === "defendRetaliation" && action.payload.threatId === threatId);
    if (duplicate) {
      showToast("Defesa para essa retaliação já está em andamento.", "warn");
      return;
    }

    const profile = getRetaliationDefenseProfile(threat);
    queueAction({
      kind: "defendRetaliation",
      name: `Defesa de ${target.name}`,
      durationSeconds: profile.durationSeconds,
      cost: profile.cost,
      payload: { threatId, targetId, boost: profile.boost, sourceId: target.id }
    });
  }

  function startFortifyMission() {
    if (!ensureCampaignStarted()) {
      return;
    }

    const duplicate = state.actionQueue.some((action) => action.kind === "fortify");
    if (duplicate) {
      const msg = "Fortificação estratégica já está em andamento.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    queueAction({
      kind: "fortify",
      name: "Fortificação Estratégica",
      durationSeconds: 30 * 60,
      cost: { steel: 160, credits: 120, food: 60 },
      payload: {}
    });
  }

  function startRapidMobilization() {
    if (!ensureCampaignStarted()) {
      return;
    }

    const duplicate = state.actionQueue.some((action) => action.kind === "mobilization");
    if (duplicate) {
      const msg = "Mobilização rápida já está em andamento.";
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return;
    }

    queueAction({
      kind: "mobilization",
      name: "Mobilização Rápida",
      durationSeconds: 28 * 60,
      cost: { credits: 180, oil: 80, food: 120 },
      payload: {}
    });
  }

  function queueAction(def) {
    if (!canStartNewAction()) {
      return;
    }

    if (!hasResources(def.cost)) {
      const missing = getMissingResourcesText(def.cost);
      pushLog(`Recursos insuficientes para ${def.name}.`, "warn");
      showToast(missing || `Recursos insuficientes para ${def.name}.`, "warn");
      return;
    }

    spendResources(def.cost);
    pushAction(def);
  }

  function pushAction(def) {
    const now = Date.now();
    const action = {
      id: `a_${Math.random().toString(36).slice(2, 9)}_${now.toString(36)}`,
      kind: def.kind,
      name: def.name,
      payload: def.payload,
      cost: def.cost || {},
      refundable: def.refundable !== undefined ? def.refundable : true,
      startAt: now,
      endAt: now + def.durationSeconds * 1000
    };

    state.actionQueue.push(action);
    state.actionQueue.sort((a, b) => a.endAt - b.endAt);
    pushLog(`${def.name} iniciada (${formatDuration(def.durationSeconds)}).`, "system");
    showToast(`Ação iniciada: ${def.name}`, "info");
    saveState();
    renderAll();
  }

  function cancelAction(actionId) {
    const index = state.actionQueue.findIndex((item) => item.id === actionId);
    if (index < 0) {
      return;
    }

    const action = state.actionQueue[index];
    if (action.kind === "invasion" || action.kind === "counterAlien") {
      returnTroops(action.payload.committed, 1);
    }

    const now = Date.now();
    const total = Math.max(1, action.endAt - action.startAt);
    const remaining = Math.max(0, action.endAt - now);
    const refundFactor = 0.7 * (remaining / total);
    const shouldRefund = action.refundable && Object.keys(action.cost || {}).length > 0 && refundFactor > 0;

    state.actionQueue.splice(index, 1);

    if (shouldRefund) {
      const refund = {};
      for (const [key, value] of Object.entries(action.cost)) {
        const refunded = Math.floor(value * refundFactor);
        if (refunded > 0) {
          refund[key] = refunded;
        }
      }
      if (Object.keys(refund).length > 0) {
        addResources(refund);
        pushLog(`Reembolso parcial em ${action.name}: ${stringifyResourcePack(refund)}.`, "system");
        showToast(`Reembolso parcial aplicado em ${action.name}.`, "info");
      }
    }

    pushLog(`Ação cancelada: ${action.name}.`, "warn");
    showToast(`Ação cancelada: ${action.name}`, "warn");
    saveState();
    renderAll();
  }

  function commitTroops(ratio) {
    const committed = {};
    let totalUnits = 0;

    for (const [type, qty] of Object.entries(state.troops)) {
      const reserve = Math.floor(qty * ratio);
      if (reserve > 0) {
        committed[type] = reserve;
        state.troops[type] -= reserve;
        totalUnits += reserve;
      } else {
        committed[type] = 0;
      }
    }

    if (totalUnits === 0) {
      return null;
    }

    return committed;
  }

  function returnTroops(committed, ratio) {
    for (const [type, qty] of Object.entries(committed)) {
      const returned = Math.floor(qty * ratio);
      state.troops[type] += returned;
    }
  }

  function calculatePower(units, targetOwner, alienBonus) {
    const balance = getBalanceProfile();
    const base =
      units.infantry * 1 +
      units.armor * 5 +
      units.air * 8.5 +
      units.drone * 3.2 +
      units.naval * 6.3;

    const ballistics = 1 + state.tech.ballistics * 0.08;
    const cyber = 1 + state.tech.cyber * 0.03;
    const antiAlien = targetOwner === "alien" ? 1 + state.tech.antiAlien * 0.1 : 1;
    const mobilization = Date.now() < state.world.mobilizationUntil ? 1.08 : 1;
    const instabilityPenalty = 1 - clamp(state.world.instability * 0.0032, 0, 0.26);
    const extra = alienBonus ? 1.1 : 1;
    const overextensionPenalty = 1 - clamp(Math.max(0, getOwnedCountries("player").length - 10) * 0.008, 0, 0.14);

    return base * ballistics * cyber * antiAlien * mobilization * instabilityPenalty * extra * balance.combatAssist * overextensionPenalty;
  }

  function getDefenseBase(country, now) {
    const balance = getBalanceProfile();
    let base = country.baseDefense;

    if (country.owner === "neutral") {
      base *= balance.neutralDefense;
    } else if (country.owner === "alien") {
      base *= 1.34 + state.world.alienWave * 0.043;
    } else if (country.owner === "resistance") {
      base *= 1.18 * balance.resistancePressure;
    } else if (country.owner === "player") {
      base *= 1.2;
    }

    if (country.spyDebuffUntil > now) {
      base *= 0.78;
    }

    if (country.owner === "player" && now < state.world.fortifyUntil) {
      base *= 1.22;
    }

    return base;
  }

  function calculateDefense(country, now) {
    const base = getDefenseBase(country, now);
    const random = randomInRange(0.86, 1.15);
    return base * random;
  }

  function getCampaignStage(domination) {
    const dom = domination !== undefined ? domination : getDominationPercent();
    if (dom < 22) {
      return { id: "opening", label: "Início" };
    }
    if (dom < 65) {
      return { id: "expansion", label: "Expansão" };
    }
    if (dom < 100) {
      return { id: "supremacy", label: "Supremacia" };
    }
    return { id: "infinite", label: "Infinito" };
  }

  function getBalanceProfile() {
    const domination = getDominationPercent();
    const stage = getCampaignStage(domination);
    const ownedCount = getOwnedCountries("player").length;
    const commandLv = state.buildings.command || 1;
    const logisticsLv = state.tech.logistics || 0;
    const stabilityLv = state.tech.stability || 0;
    const antiAlienLv = state.tech.antiAlien || 0;

    let production = stage.id === "opening" ? 1.12 : stage.id === "expansion" ? 1.03 : stage.id === "supremacy" ? 0.96 : 0.92;
    let upkeep = stage.id === "opening" ? 0.82 : stage.id === "expansion" ? 0.9 : stage.id === "supremacy" ? 0.98 : 1.04;
    let combatAssist = stage.id === "opening" ? 1.07 : stage.id === "expansion" ? 1.01 : stage.id === "supremacy" ? 0.97 : 0.96;
    let invasionCost = stage.id === "opening" ? 0.9 : stage.id === "expansion" ? 1 : stage.id === "supremacy" ? 1.12 : 1.18;
    let invasionDuration = stage.id === "opening" ? 0.9 : stage.id === "expansion" ? 1 : stage.id === "supremacy" ? 1.1 : 1.16;
    let neutralDefense = stage.id === "opening" ? 0.95 : stage.id === "expansion" ? 1.03 : stage.id === "supremacy" ? 1.12 : 1.16;
    let resistancePressure = stage.id === "opening" ? 0.9 : stage.id === "expansion" ? 1 : stage.id === "supremacy" ? 1.12 : 1.2;

    production += Math.min(0.08, logisticsLv * 0.006 + (commandLv - 1) * 0.008);
    upkeep -= Math.min(0.12, logisticsLv * 0.008 + (commandLv - 1) * 0.01);
    resistancePressure -= Math.min(0.16, stabilityLv * 0.02);
    combatAssist += antiAlienLv * 0.006;

    const overextension = Math.max(0, ownedCount - 10);
    production -= overextension * 0.01;
    upkeep += overextension * 0.01;
    invasionCost += overextension * 0.008;
    invasionDuration += overextension * 0.008;
    resistancePressure += overextension * 0.02;

    if (state.world.aliensActive) {
      production -= 0.04;
      upkeep += 0.05;
      invasionCost += 0.06;
      invasionDuration += 0.05;
      neutralDefense += 0.05;
      resistancePressure += 0.08;
    }

    if (state.ui.easyMode) {
      production += 0.03;
      upkeep -= 0.04;
      combatAssist += 0.06;
      invasionCost -= 0.06;
      invasionDuration -= 0.05;
      neutralDefense -= 0.03;
      resistancePressure -= 0.07;
    }

    return {
      stage,
      production: clamp(production, 0.86, 1.2),
      upkeep: clamp(upkeep, 0.68, 1.2),
      combatAssist: clamp(combatAssist, 0.9, 1.28),
      invasionCost: clamp(invasionCost, 0.82, 1.32),
      invasionDuration: clamp(invasionDuration, 0.82, 1.32),
      neutralDefense: clamp(neutralDefense, 0.88, 1.28),
      resistancePressure: clamp(resistancePressure, 0.76, 1.4)
    };
  }

  function getTroopUpkeepPerHour() {
    const balance = getBalanceProfile();
    const foodBase =
      state.troops.infantry * 0.31 +
      state.troops.armor * 0.68 +
      state.troops.air * 1.08 +
      state.troops.drone * 0.4 +
      state.troops.naval * 0.86;
    const oilBase =
      state.troops.armor * 0.28 +
      state.troops.air * 0.64 +
      state.troops.drone * 0.16 +
      state.troops.naval * 0.5;
    return {
      food: foodBase * balance.upkeep,
      oil: oilBase * balance.upkeep
    };
  }

  function getInvasionProfile(target) {
    const balance = getBalanceProfile();
    const home = getAttackSourceCountry();
    const homeLon = home ? home.lon : 0;
    const distancePenalty = Math.abs(target.lon - homeLon) / 180;
    const oilCost = Math.round((40 + distancePenalty * 16 + target.baseDefense * 0.045) * balance.invasionCost);
    const foodCost = Math.round((62 + target.baseDefense * 0.11) * balance.invasionCost);
    const creditCost = Math.round((128 + target.baseDefense * 0.26 + distancePenalty * 54) * balance.invasionCost);
    const durationSeconds = Math.floor((16 + target.baseDefense * 0.15 + distancePenalty * 18) * 60 * balance.invasionDuration);

    return {
      cost: {
        oil: oilCost,
        food: foodCost,
        credits: creditCost
      },
      durationSeconds
    };
  }

  function getCounterAlienProfile(target) {
    const balance = getBalanceProfile();
    const wavePressure = 1 + state.world.alienWave * 0.04;
    const antiAlienRelief = 1 - Math.min(0.16, state.tech.antiAlien * 0.018);
    const costMultiplier = balance.invasionCost * wavePressure * antiAlienRelief;
    return {
      cost: {
        oil: Math.round(58 * costMultiplier),
        credits: Math.round(170 * costMultiplier),
        alloys: Math.max(3, Math.round(4.5 * wavePressure * antiAlienRelief)),
        food: Math.round(52 * costMultiplier)
      },
      durationSeconds: Math.floor((19 + target.baseDefense * 0.16 + state.world.alienWave * 1.5) * 60 * balance.invasionDuration)
    };
  }

  function getNuclearStrikeProfile(target) {
    const balance = getBalanceProfile();
    const pressure = 1 + target.baseDefense * 0.003 + (target.owner === "alien" ? 0.24 : 0);
    const multiplier = clamp(balance.invasionCost * pressure, 0.9, 1.7);
    return {
      cost: {
        alloys: Math.max(8, Math.round(10 * multiplier)),
        oil: Math.round(130 * multiplier),
        credits: Math.round(360 * multiplier),
        science: Math.round(130 * multiplier)
      },
      durationSeconds: Math.floor((28 + target.baseDefense * 0.12) * 60 * clamp(balance.invasionDuration, 0.9, 1.25))
    };
  }

  function getBiologicalStrikeProfile(target) {
    const balance = getBalanceProfile();
    const multiplier = clamp(balance.invasionCost * (0.95 + target.baseDefense * 0.0018), 0.85, 1.55);
    return {
      cost: {
        food: Math.round(180 * multiplier),
        science: Math.round(115 * multiplier),
        credits: Math.round(220 * multiplier)
      },
      durationSeconds: Math.floor((22 + target.baseDefense * 0.09) * 60 * clamp(balance.invasionDuration, 0.88, 1.2)),
      selfPenalty: Math.round(12 * multiplier)
    };
  }

  function getSpyProfile(target) {
    const balance = getBalanceProfile();
    const defenseLoad = target ? target.baseDefense * 0.08 : 0;
    return {
      cost: {
        credits: Math.round((76 + defenseLoad) * balance.invasionCost),
        science: Math.round((24 + defenseLoad * 0.2) * balance.invasionCost)
      },
      durationSeconds: Math.floor((18 * 60) * (0.9 + balance.invasionDuration * 0.15))
    };
  }

  function getDiplomacyProfile(target) {
    const balance = getBalanceProfile();
    const defenseLoad = target ? target.baseDefense * 0.002 : 0;
    const multiplier = clamp(balance.invasionCost * (0.94 + defenseLoad), 0.85, 1.4);
    return {
      cost: {
        credits: Math.round(150 * multiplier),
        food: Math.round(78 * multiplier),
        science: Math.round(18 * multiplier)
      },
      durationSeconds: Math.floor((50 + (target ? target.baseDefense * 0.16 : 0)) * 60 * balance.invasionDuration * 0.9)
    };
  }

  function getDiplomacyChance(target, now) {
    const balance = getBalanceProfile();
    const chanceBase = 0.09 + state.tech.cyber * 0.016 + state.tech.stability * 0.011;
    const unrestBonus = target.unrest * 0.0011;
    const defensePenalty = target.baseDefense * 0.0017;
    const dominationPenalty = getDominationPercent() * 0.0012;
    const spyBonus = target.spyDebuffUntil > now ? 0.06 : 0;
    let finalChance = chanceBase + unrestBonus + spyBonus - defensePenalty - dominationPenalty;
    if (state.ui.easyMode) {
      finalChance += 0.04;
    }
    finalChance *= 1.02 - (balance.neutralDefense - 1) * 0.32;
    return clamp(finalChance, 0.02, 0.34);
  }

  function getPacifyProfile(target) {
    const balance = getBalanceProfile();
    const unrest = target ? target.unrest : 0;
    const multiplier = clamp(0.85 + unrest * 0.006 + balance.resistancePressure * 0.2, 0.8, 1.5);
    return {
      cost: {
        credits: Math.round(90 * multiplier),
        food: Math.round(56 * multiplier)
      },
      durationSeconds: Math.floor((18 + unrest * 0.25) * 60)
    };
  }

  function getRetaliationDefenseProfile(threat) {
    const balance = getBalanceProfile();
    const modeMult = threat.mode === "nuclear" ? 1.45 : threat.mode === "biological" ? 1.2 : 1;
    const threatWeight = clamp((threat.strength || 0.5) * 1.2, 0.7, 1.35);
    const mult = clamp(modeMult * threatWeight * (0.96 + (balance.resistancePressure - 0.8) * 0.25), 0.72, 1.8);
    return {
      cost: {
        steel: Math.round(65 * mult),
        food: Math.round(58 * mult),
        credits: Math.round(88 * mult),
        science: Math.round(26 * mult)
      },
      durationSeconds: Math.floor((11 + (threat.mode === "nuclear" ? 4 : 1)) * 60),
      boost: threat.mode === "nuclear" ? 0.38 : threat.mode === "biological" ? 0.32 : 0.28
    };
  }

  function getQueueLimitReason() {
    const max = getMaxConcurrentActions();
    if (state.actionQueue.length >= max) {
      return `Limite ativo: ${state.actionQueue.length}/${max} operações. Aguarde conclusão ou cancele uma ação.`;
    }
    return "";
  }

  function findQueuedAction(predicate) {
    return state.actionQueue.find((action) => predicate(action)) || null;
  }

  function getActionProgress(action) {
    if (!action) {
      return null;
    }
    const now = Date.now();
    const total = Math.max(1, action.endAt - action.startAt);
    const elapsed = clamp(now - action.startAt, 0, total);
    const pct = (elapsed / total) * 100;
    const remaining = Math.max(0, Math.ceil((action.endAt - now) / 1000));
    return {
      pct,
      label: `Restante: ${formatDuration(remaining)}`
    };
  }

  function renderAll() {
    applyUiModes();
    renderResources();
    renderTopMetrics();
    renderTabs();
    renderQuickQueue();
    renderSelectedCountry();
    renderCollections();
    renderBuildings();
    renderWarActions();
    renderArmy();
    renderTraining();
    renderDoctrine();
    renderResearch();
    renderTutorial();
    renderWorldOverview();
    renderCountryList();
    renderQueue();
    renderLog();
  }

  function renderResources() {
    for (const [key, label] of Object.entries(RESOURCE_LABELS)) {
      const el = els[`res-${key}`];
      if (!el) {
        continue;
      }
      const value = state.resources[key] || 0;
      el.textContent = key === "alloys" ? formatNumber(value, 1) : formatNumber(value, 0);
      el.title = label;
    }
  }

  function renderTopMetrics() {
    els.dominationValue.textContent = `${formatNumber(getDominationPercent(), 1)}%`;
    els.instabilityValue.textContent = formatNumber(state.world.instability, 1);

    let status = "Humana";
    if (state.world.aliensActive) {
      status = `Alien #${state.world.alienWave} (${state.world.alienTerritories.length} zonas)`;
    } else if (state.world.resistanceActive) {
      status = "Resistência ativa";
    }
    els.alienStatus.textContent = status;

    const elapsed = Math.max(0, Math.floor((Date.now() - state.clockStartedAt) / 1000));
    els.gameTimeValue.textContent = secondsToClock(elapsed);

    if (els.visualPresetBtn) {
      const ultra = state.ui.visualPreset === "ultra_clean";
      els.visualPresetBtn.textContent = ultra ? "Visual: Limpo" : "Visual: Vivo";
      els.visualPresetBtn.classList.toggle("active", ultra);
    }

    if (els.easyModeBtn) {
      els.easyModeBtn.textContent = state.ui.easyMode ? "Fácil: ON" : "Fácil: OFF";
      els.easyModeBtn.classList.toggle("active", state.ui.easyMode);
    }

    if (els.helpBtn) {
      const tutorialOpen = state.ui.activeTab === "tutorial";
      els.helpBtn.textContent = tutorialOpen ? "Guia aberto" : "Guia";
      els.helpBtn.classList.toggle("active", tutorialOpen);
    }
  }

  function renderTabs() {
    const tab = state.ui.activeTab || "actions";

    els.tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });

    els.tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.tab === tab);
    });
  }

  function renderQuickQueue() {
    if (!els.quickQueueList || !els.quickQueueCount) {
      return;
    }

    els.quickQueueCount.textContent = `${state.actionQueue.length}/${getMaxConcurrentActions()}`;

    if (state.actionQueue.length === 0) {
      els.quickQueueList.innerHTML = '<div class="quick-item"><div class="small">Sem acao ativa.</div></div>';
      return;
    }

    const now = Date.now();
    const visibleActions = state.actionQueue.slice(0, 3);
    const hiddenCount = Math.max(0, state.actionQueue.length - visibleActions.length);
    els.quickQueueList.innerHTML = visibleActions.map((action) => {
      const total = Math.max(1, action.endAt - action.startAt);
      const elapsed = clamp(now - action.startAt, 0, total);
      const pct = (elapsed / total) * 100;
      const remaining = Math.max(0, Math.ceil((action.endAt - now) / 1000));
      return `
        <div class="quick-item">
          <div class="quick-item-top">
            <strong>${action.name}</strong>
            <span>${formatDuration(remaining)}</span>
          </div>
          <div class="progress"><span style="width:${pct.toFixed(1)}%"></span></div>
        </div>
      `;
    }).join("") + (hiddenCount > 0 ? `<div class="quick-item"><div class="small">+${hiddenCount} na aba Fila.</div></div>` : "");
  }

  function getGuidanceCard() {
    if (!state.started) {
      return {
        tab: "tutorial",
        message: "Escolha um pais e inicie uma coleta curta."
      };
    }

    const now = Date.now();
    const pendingRetaliations = (state.world.retaliations || []).filter((threat) => {
      return !threat.resolved && threat.impactAt > now && state.countries[threat.toId]?.owner === "player";
    });
    if (pendingRetaliations.length > 0) {
      return {
        tab: "actions",
        message: `${pendingRetaliations.length} retaliacao(oes) a caminho. Defenda agora.`
      };
    }

    if (state.actionQueue.length === 0) {
      return {
        tab: "actions",
        message: "Sem operacoes. Inicie uma coleta."
      };
    }

    const foodLow = state.resources.food < 120;
    const oilLow = state.resources.oil < 80;
    if (foodLow || oilLow) {
      return {
        tab: "actions",
        message: "Comida ou petroleo baixos. Priorize coleta."
      };
    }

    const owned = getOwnedCountries("player").length;
    if (owned < 4) {
      return {
        tab: "actions",
        message: "Expanda em alvos de baixa defesa."
      };
    }

    const anyTech = Object.values(state.tech).some((level) => level > 0);
    if (!anyTech) {
      return {
        tab: "research",
        message: "Pesquise Logistica para acelerar recursos."
      };
    }

    if (state.world.instability > 40) {
      return {
        tab: "actions",
        message: "Instabilidade alta. Use pacificacao."
      };
    }

    if (state.world.aliensActive && state.world.alienTerritories.length > 0) {
      return {
        tab: "actions",
        message: "Aliens ativos. Priorize contra-ataque."
      };
    }

    return {
      tab: "world",
      message: "Situacao estavel. Escolha o proximo alvo."
    };
  }

  function renderTutorial() {
    if (!els.tutorialGuide) {
      return;
    }

    const guidance = getGuidanceCard();
    const tabLabel = {
      actions: "Acoes",
      army: "Tropas",
      research: "Tech",
      world: "Mundo",
      tutorial: "Guia",
      queue: "Fila"
    };
    const steps = [
      { title: "Base pronta", done: state.started },
      { title: "Fila ativa", done: state.actionQueue.length > 0 },
      { title: "Pesquisa iniciada", done: Object.values(state.tech).some((value) => value > 0) || state.actionQueue.some((a) => a.kind === "research") },
      { title: "Defesa em dia", done: !state.world.retaliations.some((threat) => !threat.resolved && state.countries[threat.toId]?.owner === "player") }
    ];

    els.tutorialGuide.innerHTML = `
      <article class="tutorial-focus">
        <h4>Proximo passo</h4>
        <p>${guidance.message}</p>
        <div class="tutorial-focus-actions">
          <button class="secondary" data-open-tab="${guidance.tab}">Abrir ${tabLabel[guidance.tab] || "aba"}</button>
        </div>
      </article>
      ${steps.map((step) => {
        return `
          <article class="tutorial-step ${step.done ? "done" : ""}">
            <div class="tutorial-step-title">${step.title}</div>
            <span class="state">${step.done ? "OK" : "Pendente"}</span>
          </article>
        `;
      }).join("")}
      <article class="tutorial-focus">
        <h4>Regras rapidas</h4>
        <div class="tutorial-list">
          <p>1. Mantenha a fila sempre ativa.</p>
          <p>2. Expanda antes da instabilidade subir.</p>
          <p>3. Defenda retaliacoes primeiro.</p>
          <p>4. Limite atual: ${getMaxConcurrentActions()} operacoes.</p>
        </div>
      </article>
    `;
  }

  function renderSelectedCountry() {
    if (!state.selectedCountry || !state.countries[state.selectedCountry]) {
      els.selectedCountryCard.innerHTML = "<p>Toque em um pais.</p>";
      return;
    }

    const country = state.countries[state.selectedCountry];
    const status = STATUS_LABELS[country.owner] || "Neutro";
    const yields = stringifyResourcePack(country.yields);
    const now = Date.now();
    const spyStatus = country.spyDebuffUntil > now ? `Spy debuff: ${formatDuration(Math.ceil((country.spyDebuffUntil - now) / 1000))}` : "Spy: ok";
    const defensePreview = getDefenseBase(country, now);
    const incomingThreats = country.owner === "player" ? getIncomingRetaliations(country.id, now) : [];
    const sourceTag = country.owner === "player" && state.ui.attackSourceCountry === country.id ? '<span class="source-chip">Origem</span>' : "";
    const threatText = incomingThreats.length === 0
      ? "Sem retaliacoes."
      : incomingThreats
        .slice(0, 2)
        .map((threat) => {
          const from = state.countries[threat.fromId];
          const remaining = Math.max(0, Math.ceil((threat.impactAt - now) / 1000));
          return `${getThreatModeLabel(threat.mode)}: ${from ? from.name : "Desconhecido"} em ${formatDuration(remaining)}`;
        })
        .join(" | ");

    els.selectedCountryCard.innerHTML = `
      <h4>${country.name}</h4>
      <div class="country-meta">
        <span>${status}</span>
        <span>Def ${formatNumber(defensePreview, 0)}</span>
        <span>Tensao ${formatNumber(country.unrest, 1)}</span>
        <span>${spyStatus}</span>
        ${sourceTag}
      </div>
      <p>Renda/h: ${yields}</p>
      ${country.owner === "player" ? `<p class="retaliation-alert">${threatText}</p>` : ""}
    `;
  }

  function renderCollections() {
    els.collectionActions.innerHTML = COLLECTION_ACTIONS.map((def) => {
      const commandModifier = 1 + (state.buildings.command - 1) * 0.06;
      const reward = multiplyResourcePack(def.reward, commandModifier);
      const activeAction = findQueuedAction((action) => {
        if (action.kind !== "collect") {
          return false;
        }
        const sourceId = action.payload && action.payload.sourceId;
        return sourceId ? sourceId === def.id : action.name === def.name;
      });
      const blockedByCost = !hasResources(def.cost);
      const blockedByQueue = !activeAction ? getQueueLimitReason() : "";
      const disabled = Boolean(activeAction) || blockedByCost || Boolean(blockedByQueue);
      const disabledReason = activeAction
        ? "Essa coleta já está em andamento."
        : blockedByQueue || (blockedByCost ? getMissingResourcesText(def.cost) : "");
      return cardTemplate({
        title: def.name,
        description: def.desc,
        metas: [`Duração: ${formatDuration(def.duration)}`, `Custo: ${stringifyResourcePack(def.cost)}`, `Recompensa: ${stringifyResourcePack(reward)}`],
        buttonLabel: activeAction ? "Em progresso" : "Iniciar",
        buttonData: `data-collect-id="${def.id}"`,
        disabled,
        disabledReason,
        progress: getActionProgress(activeAction)
      });
    }).join("");
  }

  function renderBuildings() {
    els.infrastructureActions.innerHTML = Object.entries(BUILDING_DEFS).map(([key, def]) => {
      const level = state.buildings[key];
      const cost = scaleCost(def.baseCost, 1 + level * 0.42);
      const duration = Math.floor(def.baseDuration * (1 + level * 0.2));
      const queuedAction = findQueuedAction((action) => action.kind === "upgrade" && action.payload.key === key);
      const lacksResources = !hasResources(cost);
      const blockedByQueue = !queuedAction ? getQueueLimitReason() : "";
      return cardTemplate({
        title: `${def.name} Lv.${level}`,
        description: def.desc,
        metas: [`Duração: ${formatDuration(duration)}`, `Custo: ${stringifyResourcePack(cost)}`],
        buttonLabel: queuedAction ? "Em progresso" : "Melhorar",
        buttonData: `data-upgrade="${key}"`,
        disabled: Boolean(queuedAction) || lacksResources || Boolean(blockedByQueue),
        disabledReason: queuedAction ? "Já existe melhoria ativa para essa estrutura." : blockedByQueue || (lacksResources ? getMissingResourcesText(cost) : ""),
        progress: getActionProgress(queuedAction)
      });
    }).join("");
  }

  function renderWarActions() {
    const country = state.countries[state.selectedCountry];
    if (!country) {
      els.warActions.innerHTML = "";
      return;
    }

    const activeElement = document.activeElement;
    const sourceSelectFocused = activeElement
      && activeElement.matches("select[data-attack-source]")
      && els.warActions.contains(activeElement);
    if (sourceSelectFocused) {
      return;
    }

    const now = Date.now();
    const header = [];
    const actions = [];
    const advancedActions = [];
    const sourceCountry = getAttackSourceCountry();
    const ownedCountries = getOwnedCountries("player");

    const targetIsAlien = country.owner === "alien";
    const incomingThreats = country.owner === "player" ? getIncomingRetaliations(country.id, now) : [];

    if (sourceCountry && ownedCountries.length > 1) {
      header.push(`
        <article class="war-source-select">
          <label for="attackSourceSelect">Origem do ataque</label>
          <select id="attackSourceSelect" data-attack-source>
            ${ownedCountries.map((item) => `<option value="${item.id}" ${item.id === sourceCountry.id ? "selected" : ""}>${item.name}</option>`).join("")}
          </select>
        </article>
      `);
    }

    if (country.owner !== "player" && !targetIsAlien) {
      const invasionProfile = getInvasionProfile(country);
      const invasionAction = findQueuedAction((action) => action.kind === "invasion" && action.payload.targetId === country.id);
      const invadeBlockedByTroops = !canCommitTroops(0.3);
      const invadeBlockedByCost = !hasResources(invasionProfile.cost);
      const invadeBlockedByQueue = !invasionAction ? getQueueLimitReason() : "";
      actions.push(cardTemplate({
        title: "Invasão Convencional",
        description: "Compromete 30% das tropas para tomar o território selecionado.",
        metas: [
          `Duração: ${formatDuration(invasionProfile.durationSeconds)}`,
          `Custo: ${stringifyResourcePack(invasionProfile.cost)}`,
          `Alvo: ${country.name}`
        ],
        buttonLabel: invasionAction ? "Em progresso" : "Lançar Invasão",
        buttonData: "data-war-action=\"invade\"",
        disabled: Boolean(invasionAction) || invadeBlockedByTroops || invadeBlockedByCost || Boolean(invadeBlockedByQueue),
        disabledReason: invasionAction
          ? "Já existe invasão em andamento para este alvo."
          : invadeBlockedByTroops
            ? "Tropas insuficientes para destacar 30%."
            : invadeBlockedByQueue || (invadeBlockedByCost ? getMissingResourcesText(invasionProfile.cost) : ""),
        progress: getActionProgress(invasionAction)
      }));

      const nuclearProfile = getNuclearStrikeProfile(country);
      const nuclearAction = findQueuedAction((action) => action.kind === "nuclearStrike" && action.payload.targetId === country.id);
      const nuclearTechBlocked = state.tech.ballistics < 2;
      const nuclearCostBlocked = !hasResources(nuclearProfile.cost);
      const nuclearBlockedByQueue = !nuclearAction ? getQueueLimitReason() : "";
      advancedActions.push(cardTemplate({
        title: "Ataque Nuclear",
        description: "Alto impacto e risco global. Pode forçar anexação ou devastar o alvo.",
        metas: [
          `Duração: ${formatDuration(nuclearProfile.durationSeconds)}`,
          `Custo: ${stringifyResourcePack(nuclearProfile.cost)}`,
          "Requer Balística Lv.2"
        ],
        buttonLabel: nuclearAction ? "Em progresso" : "Lançar Nuclear",
        buttonData: "data-war-action=\"nuclear\"",
        disabled: Boolean(nuclearAction) || nuclearTechBlocked || nuclearCostBlocked || Boolean(nuclearBlockedByQueue),
        disabledReason: nuclearAction
          ? "Ataque nuclear já está em andamento para esse alvo."
          : nuclearTechBlocked
            ? "Desbloqueie Balística Avançada nível 2."
            : nuclearBlockedByQueue || (nuclearCostBlocked ? getMissingResourcesText(nuclearProfile.cost) : ""),
        progress: getActionProgress(nuclearAction)
      }));

      const bioProfile = getBiologicalStrikeProfile(country);
      const bioAction = findQueuedAction((action) => action.kind === "bioStrike" && action.payload.targetId === country.id);
      const bioTechBlocked = state.tech.cyber < 2;
      const bioCostBlocked = !hasResources(bioProfile.cost);
      const bioBlockedByQueue = !bioAction ? getQueueLimitReason() : "";
      advancedActions.push(cardTemplate({
        title: "Ataque Biológico",
        description: "Espalha caos e aumenta tensão interna do alvo.",
        metas: [
          `Duração: ${formatDuration(bioProfile.durationSeconds)}`,
          `Custo: ${stringifyResourcePack(bioProfile.cost)}`,
          "Requer Guerra Cibernética Lv.2"
        ],
        buttonLabel: bioAction ? "Em progresso" : "Lançar Biológico",
        buttonData: "data-war-action=\"biological\"",
        disabled: Boolean(bioAction) || bioTechBlocked || bioCostBlocked || Boolean(bioBlockedByQueue),
        disabledReason: bioAction
          ? "Ataque biológico já está em andamento para esse alvo."
          : bioTechBlocked
            ? "Desbloqueie Guerra Cibernética nível 2."
            : bioBlockedByQueue || (bioCostBlocked ? getMissingResourcesText(bioProfile.cost) : ""),
        progress: getActionProgress(bioAction)
      }));

      const spyProfile = getSpyProfile(country);
      const spyCost = spyProfile.cost;
      const spyAction = findQueuedAction((action) => action.kind === "spy" && action.payload.targetId === country.id);
      const spyBlocked = !hasResources(spyCost);
      const spyBlockedByQueue = !spyAction ? getQueueLimitReason() : "";
      actions.push(cardTemplate({
        title: "Espionagem Profunda",
        description: "Reduz defesa do alvo por 2 horas.",
        metas: [`Duração: ${formatDuration(spyProfile.durationSeconds)}`, `Custo: ${stringifyResourcePack(spyCost)}`],
        buttonLabel: spyAction ? "Em progresso" : "Espionar",
        buttonData: "data-war-action=\"spy\"",
        disabled: Boolean(spyAction) || spyBlocked || Boolean(spyBlockedByQueue),
        disabledReason: spyAction ? "Espionagem já ativa para esse alvo." : spyBlockedByQueue || (spyBlocked ? getMissingResourcesText(spyCost) : ""),
        progress: getActionProgress(spyAction)
      }));

      const diplomacyProfile = getDiplomacyProfile(country);
      const diplomacyCost = diplomacyProfile.cost;
      const diplomacyChance = getDiplomacyChance(country, Date.now());
      const diplomacyAction = findQueuedAction((action) => action.kind === "diplomacy" && action.payload.targetId === country.id);
      const diplomacyBlocked = !hasResources(diplomacyCost);
      const diplomacyBlockedByQueue = !diplomacyAction ? getQueueLimitReason() : "";
      actions.push(cardTemplate({
        title: "Pressão Diplomática",
        description: "Tentativa de anexação sem guerra.",
        metas: [
          `Duração: ${formatDuration(diplomacyProfile.durationSeconds)}`,
          `Custo: ${stringifyResourcePack(diplomacyCost)}`,
          `Chance atual: ${formatNumber(diplomacyChance * 100, 1)}%`
        ],
        buttonLabel: diplomacyAction ? "Em progresso" : "Negociar",
        buttonData: "data-war-action=\"diplomacy\"",
        disabled: Boolean(diplomacyAction) || diplomacyBlocked || Boolean(diplomacyBlockedByQueue),
        disabledReason: diplomacyAction ? "Negociação já está em andamento para esse alvo." : diplomacyBlockedByQueue || (diplomacyBlocked ? getMissingResourcesText(diplomacyCost) : ""),
        progress: getActionProgress(diplomacyAction)
      }));

      if (advancedActions.length > 0) {
        actions.push(`
          <details class="advanced-actions" ${state.ui.warAdvancedOpen ? "open" : ""}>
            <summary>Opções avançadas de ataque</summary>
            <div class="advanced-actions-grid">
              ${advancedActions.join("")}
            </div>
          </details>
        `);
      }
    }

    if (targetIsAlien) {
      const counterProfile = getCounterAlienProfile(country);
      const counterCost = counterProfile.cost;
      const counterAction = findQueuedAction((action) => action.kind === "counterAlien" && action.payload.targetId === country.id);
      const counterBlockedByTroops = !canCommitTroops(0.36);
      const counterBlockedByCost = !hasResources(counterCost);
      const counterBlockedByQueue = !counterAction ? getQueueLimitReason() : "";
      actions.push(cardTemplate({
        title: "Contra-ataque Anti-Alien",
        description: "Usa arsenal pesado e ligas para recuperar território.",
        metas: [
          "Compromete 36% das tropas",
          `Duração: ${formatDuration(counterProfile.durationSeconds)}`,
          `Custo: ${stringifyResourcePack(counterCost)}`
        ],
        buttonLabel: counterAction ? "Em progresso" : "Contra-atacar",
        buttonData: "data-war-action=\"counter_alien\"",
        disabled: Boolean(counterAction) || counterBlockedByTroops || counterBlockedByCost || Boolean(counterBlockedByQueue),
        disabledReason: counterAction
          ? "Já existe contra-ataque em andamento para este alvo."
          : counterBlockedByTroops
            ? "Tropas insuficientes para destacar 36%."
            : counterBlockedByQueue || (counterBlockedByCost ? getMissingResourcesText(counterCost) : ""),
        progress: getActionProgress(counterAction)
      }));
    }

    if (incomingThreats.length > 0) {
      const nearestThreat = incomingThreats.slice().sort((a, b) => a.impactAt - b.impactAt)[0];
      const nearestImpact = Math.max(0, Math.ceil((nearestThreat.impactAt - now) / 1000));
      actions.push(`
        <article class="war-alert">
          <strong>Retaliação detectada</strong>
          <p>${incomingThreats.length} ameaça(s) com impacto em até ${formatDuration(nearestImpact)}.</p>
        </article>
      `);
      incomingThreats.slice(0, 3).forEach((threat) => {
        const defenseProfile = getRetaliationDefenseProfile(threat);
        const defenseAction = findQueuedAction((action) => action.kind === "defendRetaliation" && action.payload.threatId === threat.id);
        const defenseCostBlocked = !hasResources(defenseProfile.cost);
        const defenseQueueBlocked = !defenseAction ? getQueueLimitReason() : "";
        const origin = state.countries[threat.fromId];
        const impactIn = Math.max(0, Math.ceil((threat.impactAt - now) / 1000));
        actions.push(cardTemplate({
          title: `Defender ${country.name} (${getThreatModeLabel(threat.mode)})`,
          description: "Prepare escudos e mobilize resposta para reduzir dano da retaliação.",
          metas: [
            `Origem: ${origin ? origin.name : "Desconhecido"}`,
            `Impacto em: ${formatDuration(impactIn)}`,
            `Custo: ${stringifyResourcePack(defenseProfile.cost)}`
          ],
          buttonLabel: defenseAction ? "Defesa em curso" : "Defender Agora",
          buttonData: `data-war-action="defend_retaliation" data-retaliation-id="${threat.id}"`,
          disabled: Boolean(defenseAction) || defenseCostBlocked || Boolean(defenseQueueBlocked),
          disabledReason: defenseAction
            ? "Defesa para essa retaliação já está em andamento."
            : defenseQueueBlocked || (defenseCostBlocked ? getMissingResourcesText(defenseProfile.cost) : ""),
          progress: getActionProgress(defenseAction)
        }));
      });
    }

    if (country.owner === "player" && country.unrest > 5) {
      const pacifyProfile = getPacifyProfile(country);
      const pacifyCost = pacifyProfile.cost;
      const pacifyAction = findQueuedAction((action) => action.kind === "pacify" && action.payload.targetId === country.id);
      const pacifyBlocked = !hasResources(pacifyCost);
      const pacifyBlockedByQueue = !pacifyAction ? getQueueLimitReason() : "";
      actions.push(cardTemplate({
        title: "Pacificação Local",
        description: "Contém células rebeldes e reduz instabilidade.",
        metas: [
          `Duração: ${formatDuration(pacifyProfile.durationSeconds)}`,
          `Custo: ${stringifyResourcePack(pacifyCost)}`
        ],
        buttonLabel: pacifyAction ? "Em progresso" : "Pacificar",
        buttonData: "data-war-action=\"pacify\"",
        disabled: Boolean(pacifyAction) || pacifyBlocked || Boolean(pacifyBlockedByQueue),
        disabledReason: pacifyAction ? "Pacificação já ativa nesse território." : pacifyBlockedByQueue || (pacifyBlocked ? getMissingResourcesText(pacifyCost) : ""),
        progress: getActionProgress(pacifyAction)
      }));
    }

    if (state.ui.easyMode && actions.length > 1) {
      let preferred = actions[0];
      const defenseCard = actions.find((html) => html.includes("data-war-action=\"defend_retaliation\""));
      if (defenseCard) {
        preferred = defenseCard;
      } else if (country.owner !== "player" && !targetIsAlien) {
        const diplomacyCard = actions.find((html) => html.includes("data-war-action=\"diplomacy\""));
        const conventionalCard = actions.find((html) => html.includes("data-war-action=\"invade\""));
        const diplomacyChance = getDiplomacyChance(country, Date.now());
        preferred = diplomacyChance >= 0.24 && diplomacyCard ? diplomacyCard : (conventionalCard || preferred);
      }
      actions.length = 0;
      actions.push(
        `
          <article class="war-simple-tip">
            <strong>Modo Fácil ativo</strong>
            <p>Mostrando a ação principal para reduzir complexidade. Desative o Modo Fácil para ver todas as opções táticas.</p>
          </article>
        `,
        preferred
      );
    }

    if (actions.length === 0) {
      actions.push(cardTemplate({
        title: "Sem operação disponível",
        description: "Selecione outro país para abrir operações militares.",
        metas: ["Dica: use a aba Mundo para escolher alvos"],
        buttonLabel: "Aguardando",
        buttonData: "",
        disabled: true,
        disabledReason: "Selecione outro alvo para liberar operações."
      }));
    }

    els.warActions.innerHTML = header.join("") + actions.join("");
  }

  function renderArmy() {
    const currentPower = calculatePower(state.troops, "neutral", false);
    const upkeep = getTroopUpkeepPerHour();
    const upkeepFood = upkeep.food;
    const upkeepOil = upkeep.oil;

    els.armyStats.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-box"><span>Infantaria</span><strong>${formatNumber(state.troops.infantry, 0)}</strong></div>
        <div class="metric-box"><span>Blindados</span><strong>${formatNumber(state.troops.armor, 0)}</strong></div>
        <div class="metric-box"><span>Aeronaves</span><strong>${formatNumber(state.troops.air, 0)}</strong></div>
        <div class="metric-box"><span>Drones</span><strong>${formatNumber(state.troops.drone, 0)}</strong></div>
        <div class="metric-box"><span>Frota Naval</span><strong>${formatNumber(state.troops.naval, 0)}</strong></div>
        <div class="metric-box"><span>Poder Total</span><strong>${formatNumber(currentPower, 0)}</strong></div>
        <div class="metric-box"><span>Consumo Comida/h</span><strong>${formatNumber(upkeepFood, 1)}</strong></div>
        <div class="metric-box"><span>Consumo Petróleo/h</span><strong>${formatNumber(upkeepOil, 1)}</strong></div>
      </div>
    `;
  }

  function renderTraining() {
    els.trainingActions.innerHTML = Object.entries(TRAINING_DEFS).map(([key, def]) => {
      const speedBoost = Date.now() < state.world.mobilizationUntil ? 0.85 : 1;
      const commandBoost = 1 - Math.min(0.25, (state.buildings.command - 1) * 0.03);
      const duration = Math.floor(def.duration * speedBoost * commandBoost);
      const queuedAction = findQueuedAction((action) => action.kind === "train" && action.payload.unit === key);
      const blockedByCost = !hasResources(def.cost);
      const blockedByQueue = !queuedAction ? getQueueLimitReason() : "";
      const disabled = Boolean(queuedAction) || blockedByCost || Boolean(blockedByQueue);
      return cardTemplate({
        title: `${def.name} (+${def.batch})`,
        description: def.desc,
        metas: [`Duração: ${formatDuration(duration)}`, `Custo: ${stringifyResourcePack(def.cost)}`],
        buttonLabel: queuedAction ? "Em progresso" : "Treinar",
        buttonData: `data-train="${key}"`,
        disabled,
        disabledReason: queuedAction ? "Treinamento desse tipo já está em andamento." : blockedByQueue || (blockedByCost ? getMissingResourcesText(def.cost) : ""),
        progress: getActionProgress(queuedAction)
      });
    }).join("");
  }

  function renderDoctrine() {
    const fortifyCooldown = Date.now() < state.world.fortifyUntil ? `Ativo por ${formatDuration(Math.ceil((state.world.fortifyUntil - Date.now()) / 1000))}` : "Inativo";
    const mobilizationCooldown = Date.now() < state.world.mobilizationUntil ? `Ativo por ${formatDuration(Math.ceil((state.world.mobilizationUntil - Date.now()) / 1000))}` : "Inativo";
    const fortifyCost = { steel: 160, credits: 120, food: 60 };
    const mobilizationCost = { credits: 180, oil: 80, food: 120 };
    const fortifyQueued = findQueuedAction((a) => a.kind === "fortify");
    const mobilizationQueued = findQueuedAction((a) => a.kind === "mobilization");
    const fortifyBlockedByCost = !hasResources(fortifyCost);
    const mobilizationBlockedByCost = !hasResources(mobilizationCost);
    const fortifyBlockedByQueue = !fortifyQueued ? getQueueLimitReason() : "";
    const mobilizationBlockedByQueue = !mobilizationQueued ? getQueueLimitReason() : "";

    els.doctrineActions.innerHTML = [
      cardTemplate({
        title: "Fortificação Estratégica",
        description: "Aumenta defesa geral e reduz tensão interna.",
        metas: [`Status: ${fortifyCooldown}`, "Duração da ação: 30m", "Custo: 160 aço, 120 créditos, 60 comida"],
        buttonLabel: fortifyQueued ? "Em progresso" : "Fortificar",
        buttonData: "data-doctrine=\"fortify\"",
        disabled: fortifyBlockedByCost || Boolean(fortifyQueued) || Boolean(fortifyBlockedByQueue),
        disabledReason: fortifyQueued ? "Fortificação já está em andamento." : fortifyBlockedByQueue || (fortifyBlockedByCost ? getMissingResourcesText(fortifyCost) : ""),
        progress: getActionProgress(fortifyQueued)
      }),
      cardTemplate({
        title: "Mobilização Rápida",
        description: "Acelera treinamentos por 75 minutos.",
        metas: [`Status: ${mobilizationCooldown}`, "Duração da ação: 28m", "Custo: 180 créditos, 80 petróleo, 120 comida"],
        buttonLabel: mobilizationQueued ? "Em progresso" : "Mobilizar",
        buttonData: "data-doctrine=\"rapid_mobilization\"",
        disabled: mobilizationBlockedByCost || Boolean(mobilizationQueued) || Boolean(mobilizationBlockedByQueue),
        disabledReason: mobilizationQueued ? "Mobilização já está em andamento." : mobilizationBlockedByQueue || (mobilizationBlockedByCost ? getMissingResourcesText(mobilizationCost) : ""),
        progress: getActionProgress(mobilizationQueued)
      })
    ].join("");
  }

  function renderResearch() {
    els.researchActions.innerHTML = Object.entries(TECH_DEFS).map(([key, def]) => {
      const level = state.tech[key];
      const maxed = level >= def.maxLevel;
      const cost = scaleCost(def.baseCost, 1 + level * 0.5);
      const duration = Math.floor(def.baseDuration * (1 + level * 0.22));
      const queuedAction = findQueuedAction((action) => action.kind === "research" && action.payload.tech === key);
      const costBlocked = !hasResources(cost);
      const blockedByQueue = !queuedAction ? getQueueLimitReason() : "";

      return cardTemplate({
        title: `${def.name} Lv.${level}/${def.maxLevel}`,
        description: def.desc,
        metas: [
          `Duração: ${formatDuration(duration)}`,
          `Custo: ${stringifyResourcePack(cost)}`
        ],
        buttonLabel: maxed ? "Máximo" : queuedAction ? "Pesquisando" : "Pesquisar",
        buttonData: `data-tech="${key}"`,
        disabled: maxed || Boolean(queuedAction) || costBlocked || Boolean(blockedByQueue),
        disabledReason: maxed ? "Tecnologia no nível máximo." : queuedAction ? "Projeto já está em andamento." : blockedByQueue || (costBlocked ? getMissingResourcesText(cost) : ""),
        progress: getActionProgress(queuedAction)
      });
    }).join("");
  }

  function renderWorldOverview() {
    const balance = getBalanceProfile();
    const playerOwned = getOwnedCountries("player").length;
    const neutral = getOwnedCountries("neutral").length;
    const alien = getOwnedCountries("alien").length;
    const resistance = getOwnedCountries("resistance").length;

    const now = Date.now();
    const nextAlien = state.world.nextAlienAt ? formatDuration(Math.max(0, Math.ceil((state.world.nextAlienAt - now) / 1000))) : "--";
    const nextResistance = state.world.nextResistanceAt ? formatDuration(Math.max(0, Math.ceil((state.world.nextResistanceAt - now) / 1000))) : "--";
    const nextSkirmish = state.world.nextSkirmishAt ? formatDuration(Math.max(0, Math.ceil((state.world.nextSkirmishAt - now) / 1000))) : "--";
    const incomingRetaliations = (state.world.retaliations || [])
      .filter((threat) => !threat.resolved && threat.impactAt > now && state.countries[threat.toId]?.owner === "player")
      .sort((a, b) => a.impactAt - b.impactAt);
    const nextRetaliation = incomingRetaliations.length > 0
      ? formatDuration(Math.max(0, Math.ceil((incomingRetaliations[0].impactAt - now) / 1000)))
      : "--";

    els.worldOverview.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-box"><span>Seu domínio</span><strong>${playerOwned}</strong></div>
        <div class="metric-box"><span>Neutros</span><strong>${neutral}</strong></div>
        <div class="metric-box"><span>Aliens</span><strong>${alien}</strong></div>
        <div class="metric-box"><span>Resistência</span><strong>${resistance}</strong></div>
        <div class="metric-box"><span>Próxima Onda Alien</span><strong>${nextAlien}</strong></div>
        <div class="metric-box"><span>Próxima Revolta</span><strong>${nextResistance}</strong></div>
        <div class="metric-box"><span>Próximo Conflito Externo</span><strong>${nextSkirmish}</strong></div>
        <div class="metric-box"><span>Retaliações Ativas</span><strong>${incomingRetaliations.length}</strong></div>
        <div class="metric-box"><span>Próxima Retaliação</span><strong>${nextRetaliation}</strong></div>
        <div class="metric-box"><span>Guerras Vencidas</span><strong>${state.stats.warsWon}</strong></div>
        <div class="metric-box"><span>Guerras Perdidas</span><strong>${state.stats.warsLost}</strong></div>
        <div class="metric-box"><span>Ondas Superadas</span><strong>${state.stats.wavesSurvived}</strong></div>
        <div class="metric-box"><span>Fase Atual</span><strong>${balance.stage.label}</strong></div>
      </div>
    `;
  }

  function renderCountryList() {
    const countries = Object.values(state.countries);

    countries.sort((a, b) => {
      if (a.owner !== b.owner) {
        return ownerSortOrder(a.owner) - ownerSortOrder(b.owner);
      }
      return a.name.localeCompare(b.name, "pt-BR");
    });

    els.countryList.innerHTML = countries.map((country) => {
      const selected = country.id === state.selectedCountry;
      const ownerClass = country.owner;
      return `
        <article class="country-row" style="outline:${selected ? "1px solid rgba(109,243,180,0.62)" : "none"};">
          <div class="left">
            <div class="name">${country.name}</div>
            <div class="sub">Defesa base: ${country.baseDefense} | Tensão: ${formatNumber(country.unrest, 1)}</div>
            <span class="owner-badge ${ownerClass}">${STATUS_LABELS[country.owner]}</span>
          </div>
          <button class="secondary" data-country-id="${country.id}">Selecionar</button>
        </article>
      `;
    }).join("");
  }

  function renderQueue() {
    if (state.actionQueue.length === 0) {
      els.queueList.innerHTML = '<div class="queue-item"><strong>Fila vazia</strong><p class="small">Inicie ações para produção, guerra e pesquisa.</p></div>';
      return;
    }

    const now = Date.now();

    els.queueList.innerHTML = state.actionQueue.map((action) => {
      const total = Math.max(1, action.endAt - action.startAt);
      const elapsed = clamp(now - action.startAt, 0, total);
      const pct = (elapsed / total) * 100;
      const remaining = Math.max(0, Math.ceil((action.endAt - now) / 1000));
      const canCancel = action.kind !== "research";
      return `
        <div class="queue-item">
          <strong>${action.name}</strong>
          <div class="small">Falta: ${formatDuration(remaining)}</div>
          <div class="progress"><span style="width:${pct.toFixed(1)}%"></span></div>
          ${canCancel ? `<button class="secondary" style="margin-top:6px;" data-cancel-action="${action.id}">Cancelar</button>` : ""}
        </div>
      `;
    }).join("");
  }

  function renderLog() {
    const items = state.log.slice(0, 90);
    if (items.length === 0) {
      els.logList.innerHTML = '<div class="log-item"><strong>Sem eventos</strong><p class="small">Sua campanha aparecerá aqui.</p></div>';
      return;
    }

    els.logList.innerHTML = items.map((entry) => {
      return `
        <div class="log-item">
          <strong>${entry.message}</strong>
          <div class="small">${entry.time}</div>
        </div>
      `;
    }).join("");
  }

  function setSelectedCountry(countryId) {
    if (!state.countries[countryId]) {
      return;
    }
    state.selectedCountry = countryId;
    if (state.countries[countryId].owner === "player") {
      state.ui.attackSourceCountry = countryId;
    }
    renderAll();
    saveState();
  }

  function getOwnedCountries(owner) {
    return Object.values(state.countries).filter((country) => country.owner === owner);
  }

  function getDominationPercent() {
    const total = COUNTRY_DATA.length;
    const owned = getOwnedCountries("player").length;
    return (owned / total) * 100;
  }

  function hasResources(cost) {
    for (const [key, value] of Object.entries(cost || {})) {
      if ((state.resources[key] || 0) < value) {
        return false;
      }
    }
    return true;
  }

  function getMissingResourcesText(cost) {
    const missing = [];
    for (const [key, value] of Object.entries(cost || {})) {
      const available = state.resources[key] || 0;
      if (available < value) {
        const need = value - available;
        const digits = key === "alloys" ? 1 : 0;
        missing.push(`${RESOURCE_LABELS[key] || key}: ${formatNumber(need, digits)}`);
      }
    }
    return missing.length > 0 ? `Falta ${missing.join(" | ")}` : "";
  }

  function spendResources(cost) {
    for (const [key, value] of Object.entries(cost || {})) {
      state.resources[key] = Math.max(0, (state.resources[key] || 0) - value);
    }
  }

  function addResources(pack) {
    for (const [key, value] of Object.entries(pack || {})) {
      if (!Number.isFinite(value)) {
        continue;
      }
      state.resources[key] = Math.max(0, (state.resources[key] || 0) + value);
    }
  }

  function multiplyResourcePack(pack, mult) {
    const result = {};
    for (const [key, value] of Object.entries(pack || {})) {
      result[key] = value * mult;
    }
    return result;
  }

  function scaleCost(baseCost, multiplier) {
    const result = {};
    for (const [key, value] of Object.entries(baseCost)) {
      result[key] = Math.ceil(value * multiplier);
    }
    return result;
  }

  function canCommitTroops(ratio) {
    return Object.values(state.troops).some((qty) => Math.floor(qty * ratio) > 0);
  }

  function getMaxConcurrentActions() {
    const command = state.buildings.command || 1;
    return 4 + Math.floor((command - 1) * 2);
  }

  function canStartNewAction() {
    const max = getMaxConcurrentActions();
    if (state.actionQueue.length >= max) {
      const msg = `Limite de operações ativas atingido (${max}). Aguarde ou cancele alguma ação.`;
      pushLog(msg, "warn");
      showToast(msg, "warn");
      return false;
    }
    return true;
  }

  function showToast(message, tone) {
    if (!els.toastHost || !message) {
      return;
    }
    const item = document.createElement("div");
    item.className = `toast ${tone || "info"}`;
    item.textContent = message;
    els.toastHost.appendChild(item);

    window.setTimeout(() => {
      item.remove();
    }, 3200);
  }

  function ensureCampaignStarted() {
    if (state.started && state.playerCountry && state.countries[state.playerCountry]) {
      return true;
    }
    pushLog("Escolha um país inicial para começar a campanha.", "warn");
    showToast("Escolha um país inicial para começar.", "warn");
    return false;
  }

  function pushLog(message, kind) {
    const timestamp = new Date().toLocaleString("pt-BR");
    const icon = kind === "win" ? "[VITÓRIA]" : kind === "warn" ? "[ALERTA]" : "[INFO]";
    state.log.unshift({
      message: `${icon} ${message}`,
      time: timestamp
    });

    if (state.log.length > MAX_LOG_ENTRIES) {
      state.log.length = MAX_LOG_ENTRIES;
    }
  }

  function saveState() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error("Erro ao carregar save", error);
      return null;
    }
  }

  function exportSave() {
    const payload = JSON.stringify(state, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ww2026-save-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    pushLog("Save exportado para arquivo.", "system");
  }

  function importSaveFromFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object") {
          throw new Error("Formato inválido");
        }
        state = parsed;
        ensureStateShape();
        if (state.started) {
          els.startModal.classList.add("hidden");
        } else {
          showStartModal();
        }
        pushLog("Save importado com sucesso.", "system");
        saveState();
        renderAll();
      } catch (error) {
        console.error(error);
        window.alert("Não foi possível importar esse arquivo de save.");
      }
    };
    reader.readAsText(file);
  }

  function cardTemplate(options) {
    const disabledHint = options.disabled && options.disabledReason ? `<p class="disabled-hint">${options.disabledReason}</p>` : "";
    const showDescription = !COMPACT_TEXT_UI || Boolean(options.forceDescription);
    const description = showDescription && options.description ? `<p class="card-description">${options.description}</p>` : "";
    const metaLimit = COMPACT_TEXT_UI ? (isMobileViewport() ? 2 : 3) : Number.POSITIVE_INFINITY;
    const metas = (options.metas || [])
      .filter(Boolean)
      .slice(0, metaLimit)
      .map((item) => `<span>${COMPACT_TEXT_UI ? compactMetaText(item) : item}</span>`)
      .join("");
    const progress = options.progress
      ? `
        <div class="card-progress">
          <div class="progress"><span style="width:${options.progress.pct.toFixed(1)}%"></span></div>
          <p class="card-progress-meta">${options.progress.label}</p>
        </div>
      `
      : "";
    const clickableClass = !options.disabled && options.buttonData ? " action-card-clickable" : "";
    return `
      <article class="action-card${clickableClass}">
        <h4>${options.title}</h4>
        ${description}
        <div class="meta">${metas}</div>
        ${progress}
        ${disabledHint}
        <button class="primary" ${options.buttonData || ""} ${options.disabled ? "disabled" : ""}>${options.buttonLabel}</button>
      </article>
    `;
  }

  function compactMetaText(value) {
    return String(value)
      .replace(/^Dura..o:\s*/i, "Tempo: ")
      .replace(/^Custo:\s*/i, "Custo: ")
      .replace(/^Recompensa:\s*/i, "Ganho: ")
      .replace(/^Chance atual:\s*/i, "Chance: ")
      .replace(/^Impacto em:\s*/i, "Impacto: ")
      .replace(/^Origem:\s*/i, "Origem: ")
      .replace(/^Status:\s*/i, "Status: ")
      .replace(/^Requer\s*/i, "Req. ");
  }

  function stringifyResourcePack(pack) {
    const parts = [];
    for (const [key, value] of Object.entries(pack || {})) {
      const label = RESOURCE_LABELS[key] || key;
      parts.push(`${formatNumber(value, key === "alloys" ? 1 : 0)} ${label}`);
    }
    return parts.join(" | ");
  }

  function formatDuration(seconds) {
    const sec = Math.max(0, Math.floor(seconds));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    if (h > 0) {
      return `${h}h ${String(m).padStart(2, "0")}m`;
    }
    if (m > 0) {
      return `${m}m ${String(s).padStart(2, "0")}s`;
    }
    return `${s}s`;
  }

  function secondsToClock(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function formatNumber(value, digits) {
    return Number(value || 0).toLocaleString("pt-BR", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    });
  }

  function ownerSortOrder(owner) {
    if (owner === "alien") {
      return 0;
    }
    if (owner === "resistance") {
      return 1;
    }
    if (owner === "neutral") {
      return 2;
    }
    return 3;
  }

  function geoDistanceScore(a, b) {
    const latA = (a.lat * Math.PI) / 180;
    const latB = (b.lat * Math.PI) / 180;
    const dLat = latB - latA;
    const dLon = ((b.lon - a.lon) * Math.PI) / 180;
    const sinLat = Math.sin(dLat / 2);
    const sinLon = Math.sin(dLon / 2);
    const h = sinLat * sinLat + Math.cos(latA) * Math.cos(latB) * sinLon * sinLon;
    return Math.asin(Math.min(1, Math.sqrt(h))) * 2 * 6371;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  }

  function randomInRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
})();
