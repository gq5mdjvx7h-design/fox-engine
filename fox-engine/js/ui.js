/* ============================================================
   FOX ENGINE — USER INTERFACE
   Affichage des données fusionnées + progression du jeu
============================================================ */

function foxInitUI(merged) {
  const app = document.getElementById("app");

  if (!app) {
    foxLog("ERROR", "Impossible de trouver #app");
    return;
  }

  // Nettoyage
  app.innerHTML = "";

  // Carte progression
  const cardGame = document.createElement("div");
  cardGame.className = "card";
  cardGame.innerHTML = `
    <h2>Progression</h2>
    <p><strong>XP :</strong> ${FOX_GAME.xp}</p>
    <p><strong>Niveau :</strong> ${FOX_GAME.level}</p>
    <p><strong>Badges :</strong> ${FOX_GAME.badges.join(", ") || "Aucun"}</p>
  `;
  app.appendChild(cardGame);

  // Carte données fusionnées
  const cardData = document.createElement("div");
  cardData.className = "card";
  cardData.innerHTML = `
    <h2>Données détectées</h2>
    <p><strong>Module 1 :</strong> ${merged.module1 ? "Oui" : "Non"}</p>
    <p><strong>Module 2 :</strong> ${merged.module2 ? "Oui" : "Non"}</p>
    <p><strong>Dernière synchronisation :</strong> ${merged.lastSync}</p>
  `;
  app.appendChild(cardData);

  foxLog("UI", "Interface affichée");
  foxMark("UI ready");
}
