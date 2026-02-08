/* ============================================================
   FOX ENGINE — DEBUG & SAFETY SYSTEM
   Anti-crash, logs internes, surveillance du moteur
============================================================ */

const FOX_DEBUG = {
  enabled: true,        // tu pourras désactiver plus tard
  logs: [],
  maxLogs: 200
};

/* ============================================================
   Logger interne
============================================================ */

function foxLog(type, message, data = null) {
  if (!FOX_DEBUG.enabled) return;

  const entry = {
    time: new Date().toISOString(),
    type,
    message,
    data
  };

  FOX_DEBUG.logs.push(entry);

  // limite mémoire
  if (FOX_DEBUG.logs.length > FOX_DEBUG.maxLogs) {
    FOX_DEBUG.logs.shift();
  }

  console.log(`🦊 FOX [${type}] → ${message}`, data || "");
}

/* ============================================================
   Protection globale (anti-crash)
============================================================ */

window.addEventListener("error", (event) => {
  foxLog("CRASH", "Erreur JavaScript détectée", {
    message: event.message,
    file: event.filename,
    line: event.lineno,
    column: event.colno
  });
});

window.addEventListener("unhandledrejection", (event) => {
  foxLog("CRASH", "Promesse non gérée", {
    reason: event.reason
  });
});

/* ============================================================
   Mode diagnostic
============================================================ */

function foxDebugDump() {
  return {
    logs: FOX_DEBUG.logs,
    storage: foxExportAll()
  };
}

/* ============================================================
   Marqueur d'étapes (pour gamification)
============================================================ */

function foxMark(stepName, payload = null) {
  foxLog("STEP", stepName, payload);
  foxAddSnapshot(stepName, payload);
}
