/*
 * Mecanisme oficial de consentiment de cookies — landing estàtica.
 * Comparteix la mateixa clau d'emmagatzematge i cookie que el site principal,
 * de manera que una decisió presa aquí es respecta també a empentia.com (i viceversa).
 * i18n: detecta l'idioma de <html lang="..."> i serveix els textos en ES o CA.
 */
(function () {
  "use strict";

  if (window.__empentiaCookiesInit) return;
  window.__empentiaCookiesInit = true;

  var VERSION = 1;
  var LS_KEY = "empentia:cookie-consent";
  var COOKIE_NAME = "empentia_cc";
  var MAX_AGE_DAYS = 365;
  var POLICY_URL = "/cookies/";

  // ---------- i18n ----------
  var LANG = (document.documentElement.lang || "es").toLowerCase().slice(0, 2);
  if (LANG !== "ca") LANG = "es"; // por defecto castellano

  var I18N = {
    es: {
      policyUpdated: "11 de febrero de 2026",
      bannerAriaLabel: "Aviso de cookies",
      modalAriaLabel: "Preferencias de cookies",
      bannerTitle: "Respetamos tu privacidad",
      bannerText:
        "Usamos cookies técnicas necesarias y, con tu consentimiento, cookies opcionales para analítica y preferencias. Puedes aceptarlas, rechazarlas o configurarlas. ",
      moreInfo: "Más información",
      configure: "Configurar",
      rejectAll: "Rechazar todas",
      acceptAll: "Aceptar todas",
      save: "Guardar preferencias",
      modalTitle: "Preferencias de cookies",
      lastUpdated: "Última actualización de la política: ",
      modalIntroPre:
        "Activa o desactiva las categorías. Los cambios se guardarán al pulsar ",
      modalIntroSave: "Guardar preferencias",
      modalIntroPost: ". Consulta el detalle en la ",
      cookiesPolicy: "Política de Cookies",
      close: "Cerrar",
      activateCategory: "Activar categoría ",
      categories: [
        {
          id: "necessary",
          label: "Técnicas (necesarias)",
          required: true,
          description:
            "Imprescindibles para el funcionamiento del sitio. Incluyen sesión y preferencias básicas. No se pueden desactivar.",
        },
        {
          id: "analytics",
          label: "Analíticas",
          required: false,
          description:
            "Miden el uso del sitio de forma agregada y anónima para mejorar el contenido y el rendimiento.",
        },
        {
          id: "marketing",
          label: "Marketing y preferencias",
          required: false,
          description:
            "Personalizan contenidos y miden campañas. Quedarán desactivadas hasta que lo autorices.",
        },
      ],
    },
    ca: {
      policyUpdated: "11 de febrer de 2026",
      bannerAriaLabel: "Avís de cookies",
      modalAriaLabel: "Preferències de cookies",
      bannerTitle: "Respectem la teva privacitat",
      bannerText:
        "Utilitzem cookies tècniques necessàries i, amb el teu consentiment, cookies opcionals per a analítica i preferències. Pots acceptar-les, rebutjar-les o configurar-les. ",
      moreInfo: "Més informació",
      configure: "Configurar",
      rejectAll: "Rebutjar totes",
      acceptAll: "Acceptar totes",
      save: "Desar preferències",
      modalTitle: "Preferències de cookies",
      lastUpdated: "Darrera actualització de la política: ",
      modalIntroPre:
        "Activa o desactiva les categories. Els canvis es desaran quan premis ",
      modalIntroSave: "Desar preferències",
      modalIntroPost: ". Consulta el detall a la ",
      cookiesPolicy: "Política de Cookies",
      close: "Tancar",
      activateCategory: "Activar categoria ",
      categories: [
        {
          id: "necessary",
          label: "Tècniques (necessàries)",
          required: true,
          description:
            "Imprescindibles per al funcionament del lloc. Inclouen sessió i preferències bàsiques. No es poden desactivar.",
        },
        {
          id: "analytics",
          label: "Analítiques",
          required: false,
          description:
            "Mesuren l'ús del lloc de forma agregada i anònima per millorar el contingut i el rendiment.",
        },
        {
          id: "marketing",
          label: "Màrqueting i preferències",
          required: false,
          description:
            "Personalitzen continguts i mesuren campanyes. Quedaran desactivades fins que ho autoritzis.",
        },
      ],
    },
  };

  var T = I18N[LANG];
  var POLICY_UPDATED = T.policyUpdated;
  var CATEGORIES = T.categories;

  // ---------- storage ----------
  function readCookie(name) {
    var parts = document.cookie.split("; ");
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].indexOf(name + "=") === 0) {
        return decodeURIComponent(parts[i].slice(name.length + 1));
      }
    }
    return null;
  }

  function writeCookie(name, value, days) {
    var maxAge = days * 24 * 60 * 60;
    var secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; Max-Age=" +
      maxAge +
      "; Path=/; SameSite=Lax" +
      secure;
  }

  function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax";
  }

  function readConsent() {
    try {
      var raw = window.localStorage.getItem(LS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.version === VERSION && parsed.categories) {
          return parsed;
        }
      }
    } catch (_) {}
    var cookie = readCookie(COOKIE_NAME);
    if (cookie) {
      try {
        var parsedCookie = JSON.parse(cookie);
        if (parsedCookie && parsedCookie.version === VERSION && parsedCookie.categories) {
          return parsedCookie;
        }
      } catch (_) {}
    }
    return null;
  }

  function writeConsent(categories) {
    var consent = {
      version: VERSION,
      decidedAt: new Date().toISOString(),
      categories: {
        necessary: true,
        analytics: !!categories.analytics,
        marketing: !!categories.marketing,
      },
    };
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(consent));
    } catch (_) {}
    writeCookie(COOKIE_NAME, JSON.stringify(consent), MAX_AGE_DAYS);
    window.dispatchEvent(
      new CustomEvent("empentia:cookies:change", { detail: consent }),
    );
    return consent;
  }

  function clearConsent() {
    try {
      window.localStorage.removeItem(LS_KEY);
    } catch (_) {}
    deleteCookie(COOKIE_NAME);
    window.dispatchEvent(
      new CustomEvent("empentia:cookies:change", { detail: null }),
    );
  }

  function hasDecided() {
    return !!readConsent();
  }

  // ---------- styles (un sol cop) ----------
  function injectStyles() {
    if (document.getElementById("empentia-cc-styles")) return;
    var css =
      ".ecc-banner{position:fixed;inset-inline:0;bottom:0;z-index:2147483646;padding:16px;}" +
      ".ecc-card{max-width:880px;margin:0 auto;background:#0f172a;color:#e2e8f0;border:1px solid rgba(16,185,129,.25);border-radius:18px;box-shadow:0 30px 60px rgba(0,0,0,.4);padding:20px;}" +
      "@media(min-width:640px){.ecc-card{padding:24px;}.ecc-banner{padding:24px;}}" +
      ".ecc-title{font-size:16px;font-weight:600;margin:0 0 10px;color:#f1f5f9;}" +
      ".ecc-text{margin:0;font-size:14px;color:#cbd5e1;line-height:1.55;}" +
      ".ecc-text a{color:#34d399;text-decoration:underline;text-underline-offset:2px;}" +
      ".ecc-actions{display:flex;flex-direction:column-reverse;gap:8px;margin-top:18px;}" +
      "@media(min-width:640px){.ecc-actions{flex-direction:row;justify-content:flex-end;}}" +
      ".ecc-btn{appearance:none;border:0;cursor:pointer;font:inherit;font-size:14px;font-weight:500;padding:10px 18px;border-radius:999px;transition:background .15s,color .15s,border-color .15s;}" +
      ".ecc-btn-primary{background:#10b981;color:#022c22;}" +
      ".ecc-btn-primary:hover{background:#34d399;}" +
      ".ecc-btn-secondary{background:transparent;color:#e2e8f0;border:1px solid rgba(226,232,240,.25);}" +
      ".ecc-btn-secondary:hover{border-color:#34d399;color:#34d399;}" +
      ".ecc-btn-ghost{background:transparent;color:#cbd5e1;}" +
      ".ecc-btn-ghost:hover{color:#34d399;}" +
      ".ecc-modal{position:fixed;inset:0;z-index:2147483647;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(2,6,23,.7);backdrop-filter:blur(4px);}" +
      ".ecc-modal.open{display:flex;}" +
      ".ecc-modal-card{width:100%;max-width:640px;background:#0f172a;color:#e2e8f0;border:1px solid rgba(16,185,129,.25);border-radius:18px;box-shadow:0 30px 80px rgba(0,0,0,.5);overflow:hidden;display:flex;flex-direction:column;max-height:calc(100vh - 32px);}" +
      ".ecc-modal-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:24px;border-bottom:1px solid rgba(16,185,129,.12);}" +
      ".ecc-modal-title{margin:0;font-size:18px;font-weight:700;color:#f1f5f9;}" +
      ".ecc-modal-sub{margin:6px 0 0;font-size:12px;color:#94a3b8;}" +
      ".ecc-close{background:transparent;border:0;color:#94a3b8;cursor:pointer;font-size:22px;line-height:1;padding:6px;border-radius:8px;}" +
      ".ecc-close:hover{background:#1e293b;color:#e2e8f0;}" +
      ".ecc-modal-body{padding:24px;overflow-y:auto;}" +
      ".ecc-intro{margin:0 0 18px;font-size:14px;color:#cbd5e1;line-height:1.55;}" +
      ".ecc-intro a{color:#34d399;text-decoration:underline;text-underline-offset:2px;}" +
      ".ecc-cat{border:1px solid rgba(16,185,129,.12);background:rgba(2,6,23,.4);border-radius:14px;padding:16px;margin-bottom:10px;}" +
      ".ecc-cat-row{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;}" +
      ".ecc-cat-label{margin:0;font-size:14px;font-weight:600;color:#f1f5f9;}" +
      ".ecc-cat-desc{margin:6px 0 0;font-size:12px;color:#94a3b8;line-height:1.55;}" +
      ".ecc-switch{appearance:none;border:0;cursor:pointer;background:#475569;width:44px;height:24px;border-radius:999px;position:relative;flex-shrink:0;transition:background .15s;}" +
      ".ecc-switch[aria-checked='true']{background:#10b981;}" +
      ".ecc-switch[disabled]{cursor:not-allowed;opacity:.7;}" +
      ".ecc-switch::after{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s;}" +
      ".ecc-switch[aria-checked='true']::after{transform:translateX(20px);}" +
      ".ecc-modal-foot{display:flex;flex-direction:column-reverse;gap:8px;padding:18px 24px;border-top:1px solid rgba(16,185,129,.12);}" +
      "@media(min-width:640px){.ecc-modal-foot{flex-direction:row;justify-content:flex-end;}}";
    var styleEl = document.createElement("style");
    styleEl.id = "empentia-cc-styles";
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // ---------- DOM helper ----------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (key === "html") {
          node.innerHTML = attrs.html;
        } else if (key === "onclick") {
          node.addEventListener("click", attrs.onclick);
        } else {
          node.setAttribute(key, attrs[key]);
        }
      }
    }
    if (children) {
      children.forEach(function (child) {
        if (typeof child === "string") {
          node.appendChild(document.createTextNode(child));
        } else if (child) {
          node.appendChild(child);
        }
      });
    }
    return node;
  }

  // ---------- state + render ----------
  var bannerEl = null;
  var overlayEl = null;
  var selection = { necessary: true, analytics: false, marketing: false };

  function syncSelection() {
    var existing = readConsent();
    if (existing) {
      selection.analytics = !!existing.categories.analytics;
      selection.marketing = !!existing.categories.marketing;
    }
  }

  function hideBanner() {
    if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
    bannerEl = null;
  }
  function hideModal() {
    if (overlayEl) overlayEl.classList.remove("open");
  }
  function showModal() {
    if (overlayEl) overlayEl.classList.add("open");
  }

  function buildBanner() {
    var card = el("div", { class: "ecc-card", role: "dialog", "aria-label": T.bannerAriaLabel }, [
      el("h2", { class: "ecc-title" }, [T.bannerTitle]),
      el("p", {
        class: "ecc-text",
        html:
          T.bannerText +
          '<a href="' +
          POLICY_URL +
          '">' + T.moreInfo + '</a>.',
      }),
      el("div", { class: "ecc-actions" }, [
        el("button", { class: "ecc-btn ecc-btn-ghost", type: "button", onclick: openPreferencesFromBanner }, [
          T.configure,
        ]),
        el("button", { class: "ecc-btn ecc-btn-secondary", type: "button", onclick: onRejectAll }, [
          T.rejectAll,
        ]),
        el("button", { class: "ecc-btn ecc-btn-primary", type: "button", onclick: onAcceptAll }, [
          T.acceptAll,
        ]),
      ]),
    ]);
    bannerEl = el("div", { class: "ecc-banner", "aria-live": "polite" }, [card]);
    document.body.appendChild(bannerEl);
  }

  function buildCategoryRow(cat) {
    var sw = el("button", {
      class: "ecc-switch",
      type: "button",
      role: "switch",
      "aria-checked": selection[cat.id] ? "true" : "false",
      "aria-label": T.activateCategory + cat.label,
    });
    if (cat.required) sw.setAttribute("disabled", "");
    sw.addEventListener("click", function () {
      if (cat.required) return;
      selection[cat.id] = !selection[cat.id];
      sw.setAttribute("aria-checked", selection[cat.id] ? "true" : "false");
    });
    return el("div", { class: "ecc-cat" }, [
      el("div", { class: "ecc-cat-row" }, [
        el("div", {}, [
          el("p", { class: "ecc-cat-label" }, [cat.label]),
          el("p", { class: "ecc-cat-desc" }, [cat.description]),
        ]),
        sw,
      ]),
    ]);
  }

  function buildModal() {
    var closeBtn = el("button", {
      class: "ecc-close",
      type: "button",
      "aria-label": T.close,
      onclick: function () {
        if (readConsent()) hideModal();
      },
    }, ["×"]);

    var head = el("div", { class: "ecc-modal-head" }, [
      el("div", {}, [
        el("h2", { class: "ecc-modal-title" }, [T.modalTitle]),
        el("p", { class: "ecc-modal-sub" }, [T.lastUpdated + POLICY_UPDATED]),
      ]),
      closeBtn,
    ]);

    var body = el("div", { class: "ecc-modal-body" }, [
      el("p", {
        class: "ecc-intro",
        html:
          T.modalIntroPre +
          '<strong>' + T.modalIntroSave + '</strong>' +
          T.modalIntroPost +
          '<a href="' +
          POLICY_URL +
          '">' + T.cookiesPolicy + '</a>.',
      }),
    ]);
    CATEGORIES.forEach(function (cat) {
      body.appendChild(buildCategoryRow(cat));
    });

    var foot = el("div", { class: "ecc-modal-foot" }, [
      el("button", { class: "ecc-btn ecc-btn-secondary", type: "button", onclick: onRejectAll }, [
        T.rejectAll,
      ]),
      el("button", { class: "ecc-btn ecc-btn-secondary", type: "button", onclick: onAcceptAll }, [
        T.acceptAll,
      ]),
      el("button", { class: "ecc-btn ecc-btn-primary", type: "button", onclick: onSave }, [
        T.save,
      ]),
    ]);

    var card = el("div", { class: "ecc-modal-card" }, [head, body, foot]);
    overlayEl = el("div", { class: "ecc-modal", role: "dialog", "aria-modal": "true", "aria-label": T.modalAriaLabel }, [card]);
    overlayEl.addEventListener("click", function (e) {
      if (e.target === overlayEl && readConsent()) hideModal();
    });
    document.body.appendChild(overlayEl);
  }

  // ---------- actions ----------
  function onAcceptAll() {
    selection = { necessary: true, analytics: true, marketing: true };
    writeConsent(selection);
    hideBanner();
    hideModal();
  }
  function onRejectAll() {
    selection = { necessary: true, analytics: false, marketing: false };
    writeConsent(selection);
    hideBanner();
    hideModal();
  }
  function onSave() {
    writeConsent(selection);
    hideBanner();
    hideModal();
  }
  function openPreferencesFromBanner() {
    if (!overlayEl) buildModal();
    syncSelection();
    refreshSwitches();
    showModal();
  }

  function refreshSwitches() {
    if (!overlayEl) return;
    var switches = overlayEl.querySelectorAll(".ecc-switch");
    var i = 0;
    CATEGORIES.forEach(function (cat) {
      if (switches[i]) {
        switches[i].setAttribute(
          "aria-checked",
          selection[cat.id] ? "true" : "false",
        );
      }
      i++;
    });
  }

  // ---------- public API ----------
  window.empentiaCookies = {
    open: function () {
      if (!overlayEl) buildModal();
      syncSelection();
      refreshSwitches();
      showModal();
    },
    accept: onAcceptAll,
    reject: onRejectAll,
    read: readConsent,
    clear: clearConsent,
  };

  // ---------- delegació data-cookie-open ----------
  document.addEventListener("click", function (e) {
    var target = e.target;
    while (target && target !== document) {
      if (target.nodeType === 1 && target.hasAttribute && target.hasAttribute("data-cookie-open")) {
        e.preventDefault();
        window.empentiaCookies.open();
        return;
      }
      target = target.parentNode;
    }
  });

  // ---------- init ----------
  function init() {
    injectStyles();
    syncSelection();
    buildModal();
    if (!hasDecided()) {
      buildBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
