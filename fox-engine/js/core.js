/* ============================================================
   FOX ENGINE — CORE SYSTEM
   Initialisation du moteur, fusion des données, orchestration
============================================================ */

let FOX_ENGINE = {
  ready: false,
  mergedData: null
};

/* ============================================================
   Initialisation principale
============================================================ */

async function foxInit() {
  foxLog("INIT", "Initialisation du Fox Engine…");

  // Lecture des modules 1 et 2
  const merged = foxMergeData();
  FOX_ENGINE.mergedData = merged;

  foxMark("Données fusionnées");

  // Préparation du moteur de jeu
  foxInitGame(merged);

  foxMark("Moteur de jeu initialisé");

  // Préparation de l'interface
  foxInitUI(merged);

  foxMark("Interface initialisée");

  FOX_ENGINE.ready = true;
  foxLog("READY", "Fox Engine opérationnel");
}

/* ============================================================
   Rafraîchissement manuel (si besoin)
============================================================ */

function foxRefresh() {
  foxLog("REFRESH", "Rafraîchissement manuel demandé");

  const merged = foxMergeData();
  FOX_ENGINE.mergedData = merged;

  foxInitGame(merged);
  foxInitUI(merged);

  foxMark("Rafraîchissement terminé");
}

/* ============================================================
   Auto-démarrage
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  foxInit();
});
