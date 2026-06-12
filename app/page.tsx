"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./home.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

declare global {
  interface Window {
    Cal?: any;
  }
}

const CAL_SNIPPET = `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.eu/embed/embed.js", "init");
Cal("init", "descobriment", { origin: "https://app.cal.eu" });
Cal.ns["descobriment"]("ui", { hideEventTypeDetails: false });
`;

function normalizeUrl(input: string): string {
  let url = input.trim().replace(/\s+/g, "");
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  if (!url.includes(".")) {
    throw new Error("Introduce una URL válida (ejemplo: empresa.com)");
  }
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error("Introduce una URL válida (ejemplo: https://empresa.com)");
  }
}

function openCal(formId: string) {
  if (typeof window !== "undefined" && window.Cal?.ns?.descobriment) {
    window.Cal.ns.descobriment("modal", {
      calLink: "empentia/descobriment-empentia",
      config: { metadata: { source: "home_global", form_id: formId } },
    });
  }
}

const FAQS = [
  {
    q: "¿Qué es exactamente empentIA?",
    a: "Diseñamos, montamos y operamos agentes de inteligencia artificial para pymes. No vendemos software genérico: cada agente se configura con el conocimiento, el tono y los sistemas de tu negocio, y nosotros nos encargamos de que funcione bien.",
  },
  {
    q: "¿Qué soluciones puedo contratar hoy?",
    a: "Atención al cliente: los agentes de Webchat y Email ya están en producción y puedes activarlos esta semana. El resto de canales (WhatsApp, Llamadas, Reseñas) y la gestión documental están en desarrollo.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. Nos encargamos de la configuración, la integración con tus herramientas y el mantenimiento. Tú solo defines cómo quieres que se comporte el agente y revisas resultados desde tu panel.",
  },
  {
    q: "¿Se integra con mis herramientas?",
    a: "Sí. Trabajamos con WooCommerce, PrestaShop, Shopify, Holded, Odoo, SAP Business One, HubSpot, Pipedrive y más. Si usas otra herramienta, cuéntanoslo y estudiamos la integración.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Cada servicio tiene su propia membresía desde 49€/mes, sin permanencia. Activa solo lo que necesitas y cancela cuando quieras desde tu panel de cliente.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Todos los datos se procesan en servidores dentro de la Unión Europea, cifrados en tránsito (TLS) y en reposo (AES-256), cumpliendo el RGPD. Nunca usamos tus datos para entrenar modelos de terceros.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [auditUrl, setAuditUrl] = useState("");
  const [auditError, setAuditError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = CAL_SNIPPET;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditError(null);
    try {
      const normalized = normalizeUrl(auditUrl);
      const params = new URLSearchParams({ url: normalized, cta_origin: "home_global" });
      router.push(`/audit/analyzing?${params.toString()}`);
    } catch (err) {
      setAuditError(err instanceof Error ? err.message : "Error iniciando la auditoría");
    }
  };

  return (
    <div className={`hm ${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}>
      {/* ====== NAV ====== */}
      <nav>
        <div className="nav-inner">
          <a href="/" className="logo">
            <img src="/images/logo/logo-horizontal-green.png" alt="empentIA" />
          </a>
          <div className="nav-links">
            <a href="#soluciones">Soluciones</a>
            <a href="#como-trabajamos">Cómo trabajamos</a>
            <a href="#quienes-somos">Quiénes somos</a>
            <a href="#faq">FAQ</a>
            <a href="https://app.empentia.com/login" className="nav-client">Acceso clientes →</a>
            <button className="nav-cta" onClick={() => openCal("home_nav")}>Agenda una llamada</button>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <a href="#soluciones" onClick={() => setMenuOpen(false)}>Soluciones</a>
          <a href="#como-trabajamos" onClick={() => setMenuOpen(false)}>Cómo trabajamos</a>
          <a href="#quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes somos</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="https://app.empentia.com/login" className="mobile-cta-btn" onClick={() => setMenuOpen(false)}>
            Acceso clientes →
          </a>
        </div>
      </div>

      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="container">
          <div className="hero-center">
            <div className="hero-eyebrow fade-up">
              <span className="pulse-dot"></span>
              Agentes IA en producción · pymes y eCommerce
            </div>
            <h1 className="fade-up fade-up-1">
              La IA que <em>empuja</em><br />tu negocio.
            </h1>
            <p className="hero-sub fade-up fade-up-2">
              Diseñamos y operamos agentes de inteligencia artificial para pymes:
              atienden a tus clientes, gestionan tus documentos y te quitan el trabajo
              repetitivo. Tú pones el criterio; ellos, las horas.
            </p>
            <div className="hero-ctas fade-up fade-up-3">
              <button className="btn btn-primary" onClick={() => openCal("home_hero")}>
                Agenda una llamada gratuita <span className="btn-arrow">→</span>
              </button>
              <a href="#soluciones" className="btn btn-secondary">Ver soluciones</a>
            </div>
            <div className="hero-note fade-up fade-up-3">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Tu primer agente operativo en <strong>&nbsp;72h</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SOLUCIONES ====== */}
      <section className="sols-section" id="soluciones">
        <div className="container">
          <div className="section-label">Soluciones</div>
          <h2>Un agente experto para <em>cada área.</em></h2>
          <p className="section-intro">
            Cada solución es un producto independiente, con sus propios planes.
            Empieza por donde más te duela y amplía cuando quieras.
          </p>

          <div className="sols-grid">
            {/* Atención al cliente — LIVE */}
            <div className="sol-card" style={{ "--ch": "#00c389" } as React.CSSProperties}>
              <div className="sol-head">
                <div className="sol-head-left">
                  <span className="sol-icwrap">
                    <img src="/images/icons/agente-webchat.svg" alt="" aria-hidden="true" />
                  </span>
                  <div className="sol-title">Atención al <em>cliente</em></div>
                </div>
                <span className="sol-badge on">Operativo</span>
              </div>
              <div className="sol-desc">
                Agentes que responden a tus clientes por webchat, email, WhatsApp, teléfono
                y reseñas. 24 horas, con el conocimiento de tu negocio y conectados a tu ERP o CRM.
              </div>
              <ul className="sol-list">
                <li><span className="tick"><svg className="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>Webchat y Email ya en producción</li>
                <li><span className="tick"><svg className="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>Todos los canales comparten el conocimiento de tu negocio</li>
                <li><span className="soon-dot"><svg className="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg></span>WhatsApp, Llamadas y Reseñas en camino</li>
              </ul>
              <div className="sol-foot">
                <div className="sol-price">
                  <span className="sol-price-from">Desde</span>
                  <span className="sol-price-val">49€</span>
                  <span className="sol-price-period">/mes</span>
                </div>
                <a href="/agentes-ia-atencion-cliente/" className="sol-cta">Ver servicios <span className="arr">→</span></a>
              </div>
            </div>

            {/* Gestión documental — SOON */}
            <div className="sol-card" style={{ "--ch": "#0061c2" } as React.CSSProperties}>
              <div className="sol-head">
                <div className="sol-head-left">
                  <span className="sol-icwrap">
                    <svg className="ic" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6" /><path d="M9 17h6" /></svg>
                  </span>
                  <div className="sol-title">Gestión <em>documental</em></div>
                </div>
                <span className="sol-badge off">En desarrollo</span>
              </div>
              <div className="sol-desc">
                Facturas, contratos, albaranes, firma digital y archivo inteligente.
                Tus documentos se leen, se clasifican y se archivan solos — conectados a tu ERP.
              </div>
              <ul className="sol-list">
                <li><span className="tick"><svg className="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>Captura y clasificación automática de facturas</li>
                <li><span className="tick"><svg className="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>Análisis de contratos y procesos de firma</li>
                <li><span className="tick"><svg className="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>Búsqueda semántica en todo tu archivo</li>
              </ul>
              <div className="sol-foot">
                <span className="sol-soon-note">Disponible próximamente</span>
                <a href="mailto:hola@empentia.com?subject=Avisadme%20cuando%20Gesti%C3%B3n%20Documental%20est%C3%A9%20disponible" className="sol-cta ghost">Avísame <span className="arr">→</span></a>
              </div>
            </div>
          </div>

          {/* A medida */}
          <div className="sol-custom">
            <div>
              <div className="solc-label">¿Otra área de tu negocio?</div>
              <div className="solc-title">Diseñamos el agente <em>a medida.</em></div>
              <div className="solc-desc">
                Cuéntanos el proceso que más horas te roba — operaciones, compras, RRHH,
                lo que sea — y estudiamos cómo un agente puede hacérselo solo.
              </div>
            </div>
            <button className="solc-cta" onClick={() => openCal("home_custom")}>
              Hablar con el equipo →
            </button>
          </div>
        </div>
      </section>

      {/* ====== CÓMO TRABAJAMOS ====== */}
      <section id="como-trabajamos">
        <div className="container">
          <div className="section-label">Cómo trabajamos</div>
          <h2>De la primera llamada a producción, <em>sin fricción.</em></h2>
          <p className="section-intro">
            No te vendemos una licencia y te dejamos solo. Montamos el agente contigo,
            lo ponemos a trabajar y lo seguimos mejorando.
          </p>

          <div className="process-steps">
            <div className="step">
              <div className="step-num">1</div>
              <span className="step-time">30 minutos</span>
              <div className="step-title">Llamada de descubrimiento</div>
              <div className="step-desc">
                Entendemos tu negocio, tus canales y tus herramientas. Detectamos dónde
                un agente IA aporta más valor desde el primer día.
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <span className="step-time">48–72 horas</span>
              <div className="step-title">Demo con tus datos</div>
              <div className="step-desc">
                Montamos un agente real con tu catálogo, tus FAQs y tu tono. Lo pruebas
                como si fueras un cliente. Sin compromiso de compra.
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <span className="step-time">Continuo</span>
              <div className="step-title">En producción</div>
              <div className="step-desc">
                El agente trabaja y tú lo ves todo desde tu panel: conversaciones, leads,
                métricas. Nosotros lo operamos, medimos y mejoramos.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== AUDITORÍA ====== */}
      <section className="audit-section" id="auditoria">
        <div className="container">
          <div className="audit-inner">
            <div className="section-label">Empieza gratis</div>
            <h2>¿No sabes por dónde empezar? <em>Audita tu web.</em></h2>
            <p className="section-intro">
              Introduce tu web y nuestra IA te dirá en minutos dónde puedes ganar
              tiempo y ventas con agentes. Gratis y sin registro.
            </p>
            <form className="audit-form" onSubmit={handleAudit}>
              <input
                type="text"
                className="audit-input"
                placeholder="Tu web (ej: empresa.com)"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                required
              />
              <button type="submit" className="audit-btn">Auditar mi web →</button>
            </form>
            {auditError && <div className="audit-error">{auditError}</div>}
            <div className="audit-note">Sin tarjeta · resultados en menos de 3 minutos</div>
          </div>
        </div>
      </section>

      {/* ====== QUIÉNES SOMOS ====== */}
      <section id="quienes-somos">
        <div className="container">
          <div className="founder-inner">
            <div className="founder-photo">
              <img src="/images/team/marc-soler.jpeg" alt="Marc Soler" />
            </div>
            <div>
              <div className="section-label">Quiénes somos</div>
              <div className="founder-quote">
                &ldquo;Creamos empentIA porque ningún negocio debería quedarse atrás por falta
                de manos. La IA puede atender, gestionar y vender. Y nosotros nos encargamos
                de que funcione bien.&rdquo;
              </div>
              <div className="founder-name">Marc Soler</div>
              <div className="founder-role">Product &amp; Marketing Partner · empentIA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section id="faq">
        <div className="container">
          <div className="faq-grid">
            <div className="faq-header">
              <div className="section-label">FAQ</div>
              <h2>Preguntas <em>frecuentes.</em></h2>
              <p className="section-intro" style={{ marginTop: 16 }}>
                Si tienes una duda que no ves aquí, escríbenos. Te respondemos el mismo día.
              </p>
            </div>
            <div className="faq-items">
              {FAQS.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                  </div>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="final-cta" id="cta">
        <div className="container">
          <div className="section-label">Empieza hoy</div>
          <h2>Tu primer agente, <em>listo en 72 horas.</em></h2>
          <p>Cuéntanos tu caso y te preparamos una propuesta a medida. Sin compromiso.</p>
          <div className="final-ctas">
            <button className="btn btn-primary" onClick={() => openCal("home_cta_bottom")}>
              Hablar con el equipo <span className="btn-arrow">→</span>
            </button>
          </div>
          <div className="final-mini">
            <a href="/agentes-ia-atencion-cliente/">Atención al cliente →</a>
            <a href="#auditoria">Auditoría gratuita →</a>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div>
              <a href="/" className="footer-logo">
                <img src="/images/logo/logo-horizontal-green.png" alt="empentIA" />
              </a>
              <p className="footer-tag">
                Agentes de inteligencia artificial que trabajan para tu negocio:
                atención al cliente, gestión documental y más.
              </p>
              <div className="footer-social" aria-label="Redes sociales">
                <a href="mailto:hola@empentia.com" aria-label="Enviar email" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/empentia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
                </a>
                <a href="https://www.instagram.com/empent_ia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.73 1.48 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Soluciones</h4>
              <a href="/agentes-ia-atencion-cliente/">Atención al cliente</a>
              <a href="/agentes-ia-atencion-cliente/webchat/">Agente IA Webchat</a>
              <a href="/agentes-ia-atencion-cliente/email/">Agente IA Email</a>
              <span className="soon">Gestión documental <small>(próximamente)</small></span>
            </div>
            <div className="footer-col">
              <h4>Recursos</h4>
              <a href="#como-trabajamos">Cómo trabajamos</a>
              <a href="#quienes-somos">Quiénes somos</a>
              <a href="#auditoria">Auditoría gratuita</a>
              <a href="#faq">Preguntas frecuentes</a>
              <a href="https://app.empentia.com/login">Acceso clientes</a>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href="mailto:hola@empentia.com">Enviar correo</a>
              <a href="https://www.linkedin.com/company/empentia">LinkedIn</a>
              <a href="https://www.instagram.com/empent_ia/">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} empentIA. Todos los derechos reservados.</div>
            <div>
              <a href="/legal">Aviso legal</a>
              <a href="/privacy">Privacidad</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
