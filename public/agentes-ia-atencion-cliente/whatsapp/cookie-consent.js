/*
 * Mecanisme oficial de consentiment de cookies — landing estàtica.
 * Comparteix la mateixa clau d'emmagatzematge i cookie que el site principal,
 * de manera que una decisió presa aquí es respecta també a empentia.com (i viceversa).
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
  var POLICY_UPDATED = "11 de febrer de 2026";

  var CATEGORIES = [
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
  ];

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

  function parseConsent(raw) {
    if (!raw) return null;
    try {
      var p = JSON.parse(raw);
      if (
        !p ||
        typeof p.version !== "number" ||
        typeof p.timestamp !== "string" ||
        !p.categories ||
        typeof p.categories.analytics !== "boolean" ||
        typeof p.categories.marketing !== "boolean"
      )
        return null;
      return {
        version: p.version,
        timestamp: p.timestamp,
        categories: {
          necessary: true,
          analytics: p.categories.analytics,
          marketing: p.categories.marketing,
        },
      };
    } catch (_) {
      return null;
    }
  }

  function isExpired(consent) {
    var ts = Date.parse(consent.timestamp);
    if (isNaN(ts)) return true;
    var ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return ageDays > MAX_AGE_DAYS;
  }

  function readConsent() {
    var raw = null;
    try {
      raw = window.localStorage.getItem(LS_KEY);
    } catch (_) {}
    if (!raw) raw = readCookie(COOKIE_NAME);
    var consent = parseConsent(raw);
    if (!consent) return null;
    if (consent.version !== VERSION) return null;
    if (isExpired(consent)) return null;
    return consent;
  }

  function writeConsent(cats) {
    var consent = {
      version: VERSION,
      timestamp: new Date().toISOString(),
      categories: {
        necessary: true,
        analytics: cats.analytics === true,
        marketing: cats.marketing === true,
      },
    };
    var serialized = JSON.stringify(consent);
    try {
      window.localStorage.setItem(LS_KEY, serialized);
    } catch (_) {}
    writeCookie(COOKIE_NAME, serialized, MAX_AGE_DAYS);
    window.dispatchEvent(
      new CustomEvent("empentia:cookies:change", { detail: consent }),
    );
    return consent;
  }

  function resetConsent() {
    try {
      window.localStorage.removeItem(LS_KEY);
    } catch (_) {}
    deleteCookie(COOKIE_NAME);
    window.dispatchEvent(
      new CustomEvent("empentia:cookies:change", { detail: null }),
    );
  }

  // ---------- styles ----------
  function injectStyles() {
    if (document.getElementById("empentia-cc-styles")) return;
    var css =
      "" +
      ".ecc-overlay{position:fixed;inset:0;background:rgba(26,26,26,.45);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:9998;display:none;align-items:flex-end;justify-content:center;padding:16px;}" +
      "@media(min-width:640px){.ecc-overlay{align-items:center;}}" +
      ".ecc-overlay.open{display:flex;}" +
      ".ecc-banner{position:fixed;left:0;right:0;bottom:0;z-index:9997;padding:16px;display:none;}" +
      "@media(min-width:640px){.ecc-banner{padding:24px;}}" +
      ".ecc-banner.open{display:block;}" +
      ".ecc-card{max-width:960px;margin:0 auto;background:#ffffff;border:1px solid #e8e6df;border-radius:14px;box-shadow:0 20px 50px rgba(26,26,26,.18);padding:20px;font-family:'Instrument Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1a1a;}" +
      "@media(min-width:640px){.ecc-card{padding:24px;}}" +
      ".ecc-title{font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:20px;margin:0 0 8px;letter-spacing:-.01em;}" +
      ".ecc-text{font-size:14px;line-height:1.55;color:#4a4a4a;margin:0;}" +
      ".ecc-text a{color:#1a1a1a;text-decoration:underline;text-underline-offset:2px;}" +
      ".ecc-actions{margin-top:16px;display:flex;flex-direction:column-reverse;gap:8px;}" +
      "@media(min-width:640px){.ecc-actions{flex-direction:row;justify-content:flex-end;align-items:center;}}" +
      ".ecc-btn{appearance:none;border:1px solid transparent;border-radius:10px;padding:10px 16px;font:inherit;font-size:14px;font-weight:500;cursor:pointer;transition:background .15s ease,border-color .15s ease,color .15s ease;}" +
      ".ecc-btn:focus-visible{outline:2px solid #1a1a1a;outline-offset:2px;}" +
      ".ecc-btn-primary{background:#1a1a1a;color:#ffffff;}" +
      ".ecc-btn-primary:hover{background:#2a2a2a;}" +
      ".ecc-btn-secondary{background:#f4f3ee;color:#1a1a1a;border-color:#e8e6df;}" +
      ".ecc-btn-secondary:hover{background:#ece9e0;}" +
      ".ecc-btn-ghost{background:transparent;color:#4a4a4a;}" +
      ".ecc-btn-ghost:hover{color:#1a1a1a;}" +
      ".ecc-modal{width:100%;max-width:640px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;background:#ffffff;border:1px solid #e8e6df;border-radius:16px;box-shadow:0 24px 60px rgba(26,26,26,.22);font-family:'Instrument Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1a1a;}" +
      ".ecc-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:20px 20px 16px;border-bottom:1px solid #efede6;}" +
      ".ecc-modal-title{font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:22px;margin:0;}" +
      ".ecc-modal-sub{font-size:12px;color:#8a8a85;margin-top:4px;}" +
      ".ecc-close{background:none;border:0;cursor:pointer;font-size:22px;line-height:1;color:#8a8a85;padding:4px;border-radius:6px;}" +
      ".ecc-close:hover{color:#1a1a1a;background:#f4f3ee;}" +
      ".ecc-modal-body{padding:16px 20px;overflow-y:auto;}" +
      ".ecc-intro{font-size:14px;line-height:1.55;color:#4a4a4a;margin:0 0 12px;}" +
      ".ecc-intro a{color:#1a1a1a;text-decoration:underline;}" +
      ".ecc-cat{border:1px solid #e8e6df;border-radius:12px;padding:14px;margin-top:10px;background:#fafaf7;}" +
      ".ecc-cat-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}" +
      ".ecc-cat-label{font-size:14px;font-weight:600;margin:0;}" +
      ".ecc-cat-desc{font-size:12px;line-height:1.5;color:#4a4a4a;margin:4px 0 0;}" +
      ".ecc-switch{position:relative;width:42px;height:24px;border-radius:999px;background:#d4d1c8;border:0;cursor:pointer;transition:background .2s ease;flex-shrink:0;padding:0;}" +
      ".ecc-switch[aria-checked='true']{background:#1a1a1a;}" +
      ".ecc-switch[disabled]{opacity:.6;cursor:not-allowed;}" +
      ".ecc-switch:focus-visible{outline:2px solid #1a1a1a;outline-offset:2px;}" +
      ".ecc-switch::after{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#ffffff;transition:transform .2s ease;box-shadow:0 1px 2px rgba(0,0,0,.15);}" +
      ".ecc-switch[aria-checked='true']::after{transform:translateX(18px);}" +
      ".ecc-modal-foot{display:flex;flex-direction:column-reverse;gap:8px;padding:16px 20px;border-top:1px solid #efede6;}" +
      "@media(min-width:640px){.ecc-modal-foot{flex-direction:row;justify-content:flex-end;}}";
    var style = document.createElement("style");
    style.id = "empentia-cc-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---------- DOM ----------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs)
      Object.keys(attrs).forEach(function (k) {
        if (k === "html") node.innerHTML = attrs[k];
        else if (k === "onclick") node.addEventListener("click", attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    if (children)
      children.forEach(function (c) {
        if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    return node;
  }

  var bannerEl = null;
  var overlayEl = null;
  var selection = { necessary: true, analytics: false, marketing: false };

  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove("open");
  }
  function showBanner() {
    if (bannerEl) bannerEl.classList.add("open");
  }
  function hideModal() {
    if (overlayEl) overlayEl.classList.remove("open");
  }
  function showModal() {
    if (overlayEl) overlayEl.classList.add("open");
  }

  function buildBanner() {
    var card = el("div", { class: "ecc-card", role: "dialog", "aria-label": "Avís de cookies" }, [
      el("h2", { class: "ecc-title" }, ["Respectem la teva privacitat"]),
      el("p", {
        class: "ecc-text",
        html:
          "Utilitzem cookies tècniques necessàries i, amb el teu consentiment, cookies opcionals per a analítica i preferències. Pots acceptar-les, rebutjar-les o configurar-les. " +
          '<a href="' +
          POLICY_URL +
          '">Més informació</a>.',
      }),
      el("div", { class: "ecc-actions" }, [
        el("button", { class: "ecc-btn ecc-btn-ghost", type: "button", onclick: openPreferencesFromBanner }, [
          "Configurar",
        ]),
        el("button", { class: "ecc-btn ecc-btn-secondary", type: "button", onclick: onRejectAll }, [
          "Rebutjar totes",
        ]),
        el("button", { class: "ecc-btn ecc-btn-primary", type: "button", onclick: onAcceptAll }, [
          "Acceptar totes",
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
      "aria-label": "Activar categoria " + cat.label,
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
      "aria-label": "Tancar",
      onclick: function () {
        if (readConsent()) hideModal();
      },
    }, ["×"]);

    var head = el("div", { class: "ecc-modal-head" }, [
      el("div", {}, [
        el("h2", { class: "ecc-modal-title" }, ["Preferències de cookies"]),
        el("p", { class: "ecc-modal-sub" }, ["Darrera actualització de la política: " + POLICY_UPDATED]),
      ]),
      closeBtn,
    ]);

    var body = el("div", { class: "ecc-modal-body" }, [
      el("p", {
        class: "ecc-intro",
        html:
          'Activa o desactiva les categories. Els canvis es desaran quan premis <strong>Desar preferències</strong>. Consulta el detall a la <a href="' +
          POLICY_URL +
          '">Política de Cookies</a>.',
      }),
    ]);
    CATEGORIES.forEach(function (cat) {
      body.appendChild(buildCategoryRow(cat));
    });

    var foot = el("div", { class: "ecc-modal-foot" }, [
      el("button", { class: "ecc-btn ecc-btn-secondary", type: "button", onclick: onRejectAll }, [
        "Rebutjar totes",
      ]),
      el("button", { class: "ecc-btn ecc-btn-secondary", type: "button", onclick: onAcceptAll }, [
        "Acceptar totes",
      ]),
      el("button", { class: "ecc-btn ecc-btn-primary", type: "button", onclick: onSave }, [
        "Desar preferències",
      ]),
    ]);

    var modal = el("div", { class: "ecc-modal", role: "dialog", "aria-modal": "true", "aria-label": "Preferències de cookies" }, [
      head,
      body,
      foot,
    ]);

    overlayEl = el("div", { class: "ecc-overlay" }, [modal]);
    overlayEl.addEventListener("click", function (e) {
      if (e.target === overlayEl && readConsent()) hideModal();
    });
    document.body.appendChild(overlayEl);
  }

  function syncSelectionFromStorage() {
    var stored = readConsent();
    selection = stored
      ? {
          necessary: true,
          analytics: !!stored.categories.analytics,
          marketing: !!stored.categories.marketing,
        }
      : { necessary: true, analytics: false, marketing: false };
    if (!overlayEl) return;
    var switches = overlayEl.querySelectorAll(".ecc-switch");
    switches.forEach(function (sw, idx) {
      var cat = CATEGORIES[idx];
      if (!cat) return;
      sw.setAttribute("aria-checked", selection[cat.id] ? "true" : "false");
    });
  }

  function openPreferencesFromBanner() {
    syncSelectionFromStorage();
    hideBanner();
    showModal();
  }

  function onAcceptAll() {
    writeConsent({ analytics: true, marketing: true });
    hideBanner();
    hideModal();
  }

  function onRejectAll() {
    writeConsent({ analytics: false, marketing: false });
    hideBanner();
    hideModal();
  }

  function onSave() {
    writeConsent(selection);
    hideBanner();
    hideModal();
  }

  // ---------- public API ----------
  window.empentIACookies = {
    open: function () {
      syncSelectionFromStorage();
      hideBanner();
      showModal();
    },
    reset: function () {
      resetConsent();
      showBanner();
    },
    get: readConsent,
    hasConsent: function (cat) {
      if (cat === "necessary") return true;
      var c = readConsent();
      return !!(c && c.categories && c.categories[cat]);
    },
  };

  // ---------- init ----------
  function init() {
    injectStyles();
    buildBanner();
    buildModal();
    syncSelectionFromStorage();

    // Delegació: qualsevol element amb data-cookie-open obre el modal.
    document.addEventListener("click", function (e) {
      var target = e.target;
      while (target && target !== document) {
        if (target.nodeType === 1 && target.hasAttribute && target.hasAttribute("data-cookie-open")) {
          e.preventDefault();
          window.empentIACookies.open();
          return;
        }
        target = target.parentNode;
      }
    });

    if (!readConsent()) showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
