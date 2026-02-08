/* ============================================================
   FOX ENGINE — GAME SYSTEM
   XP, niveaux, badges, progression interne
============================================================ */

let FOX_GAME = {
  xp: 0,
  level: 1,
  badges: []
};

/* ============================================================
   Chargement de la progression interne
============================================================ */

function foxLoadGame() {
  const saved = foxLoad(FOX_KEYS.GAME);

  if (saved) {
    FOX_GAME = saved;
    foxLog("GAME", "Progression chargée", FOX_GAME);
  } else {
    foxLog("GAME", "Aucune progression trouvée, initialisation");
  }
}

/* ============================================================
   Sauvegarde interne
============================================================ */

function foxSaveGame() {
  foxSave(FOX_KEYS.GAME, FOX_GAME);
  foxLog("GAME", "Progression sauvegardée", FOX_GAME);
}

/* ============================================================
   Calcul du XP depuis les données fusionnées
============================================================ */

function foxComputeXP(merged) {
  let xp = 0;

  // Module 1 : heures annuelles
  if (merged.module1 && merged.module1.years) {
    for (const year of Object.values(merged.module1.years)) {
      for (const month of Object.values(year.months || {})) {
        xp += (month.total || 0) * 1; // 1 XP par heure
      }
    }
  }

  // Module 2 : heures mensualisées
  if (merged.module2 && merged.module2.years) {
    for (const year of Object.values(merged.module2.years)) {
      for (const month of Object.values(year.months || {})) {
        xp += (month.h25 || 0) * 2; // 2 XP par heure 25%
        xp += (month.h50 || 0) * 3; // 3 XP par heure 50%
      }
    }
  }

  return xp;
}

/* ============================================================
   Calcul du niveau
============================================================ */

function foxComputeLevel(xp) {
  return Math.floor(Math.sqrt(xp / 10)) + 1;
}

/* ============================================================
   Attribution de badges simples
============================================================ */

function foxComputeBadges(xp, level) {
  const badges = [];

  if (xp > 100) badges.push("Renard Bronze");
  if (xp > 500) badges.push("Renard Argent");
  if (xp > 1500) badges.push("Renard Or");
  if (level > 10) badges.push("Maître du Temps");

  return badges;
}

/* ============================================================
   Initialisation du moteur de jeu
============================================================ */

function foxInitGame(merged) {
  foxLoadGame();

  const xp = foxComputeXP(merged);
  const level = foxComputeLevel(xp);
  const badges = foxComputeBadges(xp, level);

  FOX_GAME.xp = xp;
  FOX_GAME.level = level;
  FOX_GAME.badges = badges;

  foxSaveGame();
  foxMark("Game update", { xp, level, badges });
}
