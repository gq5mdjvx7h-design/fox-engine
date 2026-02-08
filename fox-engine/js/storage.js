/* ============================================================
   FOX ENGINE – STORAGE SYSTEM
   Stockage interne du module 3 (lecture seule des modules 1 & 2)
============================================================ */

const FOX_STORAGE_VERSION = 1;

const FOX_KEYS = {
  SETTINGS: "FOX_SETTINGS",
  GAME: "FOX_GAME_DATA",
  SNAPSHOTS: "FOX_SNAPSHOTS",
  VERSION: "FOX_VERSION"
};

/* ============================================================
   Chargement sécurisé
============================================================ */

function foxLoad(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error("FOX STORAGE ERROR (load)", key, e);
    return fallback;
  }
}

/* ============================================================
   Sauvegarde sécurisée
============================================================ */

function foxSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("FOX STORAGE ERROR (save)", key, e);
  }
}

/* ============================================================
   Initialisation du stockage interne
============================================================ */

function foxInitStorage() {
  const version = foxLoad(FOX_KEYS.VERSION, 0);

  if (version !== FOX_STORAGE_VERSION) {
    console.warn("FOX ENGINE – Migration du stockage interne");

    foxSave(FOX_KEYS.SETTINGS, {
      theme: "dark",
      animations: true,
      sound: true
    });

    foxSave(FOX_KEYS.GAME, {
      xp: 0,
      level: 1,
      badges: [],
      lastSync: null
    });

    foxSave(FOX_KEYS.SNAPSHOTS, []);

    foxSave(FOX_KEYS.VERSION, FOX_STORAGE_VERSION);
  }
}

/* ============================================================
   Snapshots internes (pour debug & gamification)
============================================================ */

function foxAddSnapshot(label, payload) {
  const snaps = foxLoad(FOX_KEYS.SNAPSHOTS, []);
  snaps.push({
    date: new Date().toISOString(),
    label,
    payload
  });
  foxSave(FOX_KEYS.SNAPSHOTS, snaps);
}

/* ============================================================
   Export interne (pour debug)
============================================================ */

function foxExportAll() {
  return {
    settings: foxLoad(FOX_KEYS.SETTINGS),
    game: foxLoad(FOX_KEYS.GAME),
    snapshots: foxLoad(FOX_KEYS.SNAPSHOTS),
    version: foxLoad(FOX_KEYS.VERSION)
  };
}

/* ============================================================
   Initialisation automatique
============================================================ */

foxInitStorage();
