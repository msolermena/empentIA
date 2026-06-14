import { NextResponse } from "next/server";
import type { AuditoriaDetalle } from "@/lib/api";

// ============================================================
// Notificación por email de cada auditoría.
//
// 1) Email INTERNO a hola@empentia.com con el detalle completo.
// 2) Email al CLIENTE con su resumen personalizado (si enviarCliente).
//
// Proveedor: Resend (API REST, sin dependencias) cuando hay
// RESEND_API_KEY. Si no, fallback a FormSubmit (solo email interno),
// que requiere activación única.
//
// Variables de entorno (en Vercel):
//   RESEND_API_KEY  → clave de Resend (https://resend.com)
//   MAIL_FROM       → remitente verificado, p.ej. "empentIA <hola@empentia.com>"
// ============================================================

const NOTIFY_EMAIL = "hola@empentia.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`;
const RESEND_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM || "empentIA <hola@empentia.com>";
const CAL_LINK = "https://cal.com/empentia/descobriment-empentia";

const GREEN = "#00a87a";
const INK = "#1a1a1a";
const SOFT = "#4a4a4a";
const LINE = "#e8e6df";

interface NotifyBody {
  estado: string;
  nombre?: string;
  email?: string;
  empresa?: string;
  web?: string;
  marketing?: boolean;
  enviarCliente?: boolean;
  detalle: AuditoriaDetalle;
}

const eur = (n: number) => Math.round(n).toLocaleString("es-ES");

function lineasResumen(d: AuditoriaDetalle): string[] {
  const lineas = d.propuesta.lineas.map((l) =>
    l.personalizado
      ? `${l.servicio} (${l.canal}) — ${l.plan} — a medida`
      : `${l.servicio} (${l.canal}) — ${l.plan} — ${l.precio_mes} €/mes · setup ${l.setup} €`
  );
  const addons = d.propuesta.addons.map(
    (a) => `${a.nombre} — ${a.precio_mes} €/mes`
  );
  return [...lineas, ...addons];
}

// ---------- Email INTERNO (equipo) ----------
function internalHtml(b: NotifyBody): string {
  const d = b.detalle;
  const row = (k: string, v: string | number) =>
    `<tr><td style="padding:6px 12px;border:1px solid ${LINE};color:${SOFT};font-size:13px">${k}</td><td style="padding:6px 12px;border:1px solid ${LINE};color:${INK};font-size:13px"><b>${v}</b></td></tr>`;
  const masMedida = d.propuesta.hay_personalizado ? " + a medida" : "";
  const lineas = lineasResumen(d)
    .map((l) => `<li style="margin:2px 0">${l}</li>`)
    .join("");
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px">
    <h2 style="color:${INK}">Auditoría atención al cliente — ${b.estado}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${row("Nombre", b.nombre || "—")}
      ${row("Email", b.email || "—")}
      ${row("Empresa", b.empresa || "—")}
      ${row("Web", b.web || "—")}
      ${row("Idioma", d.idioma)}
      ${row("Marketing", b.marketing ? "Sí" : "No")}
      ${row("Canales activos", d.canales_activos.join(", ") || "—")}
      ${row("Canales a abrir", d.canales_nuevos.join(", ") || "—")}
      ${row("Consultas/semana", d.consultas_semana)}
      ${row("Consultas/mes (aprox)", d.consultas_mes)}
      ${row("Tipo principal", d.tipo_principal || "—")}
      ${row("Horas/semana", d.horas_semana)}
      ${row("Coste/hora", d.coste_hora + " €")}
      ${row("Tiempo de respuesta", d.tiempo_respuesta)}
      ${row("Coste actual (mes)", eur(d.coste_mes) + " €")}
      ${row("Coste actual (año)", eur(d.coste_anio) + " €")}
      ${row("Ahorro estimado (mes)", eur(d.ahorro_mes) + " €")}
      ${row("Ahorro estimado (año)", eur(d.ahorro_anio) + " €")}
      ${row("Plan dominante", d.propuesta.tramo_dominante || "—")}
      ${row("Setup total", eur(d.propuesta.setup_total) + " €" + masMedida)}
      ${row("Cuota mensual", eur(d.propuesta.cuota_mensual) + " €/mes" + masMedida)}
      ${row("Notas", d.notas || "—")}
    </table>
    <p style="color:${INK};font-size:13px;margin-top:14px"><b>Propuesta:</b></p>
    <ul style="color:${SOFT};font-size:13px">${lineas}</ul>
  </div>`;
}

// ---------- Email al CLIENTE (bilingüe) ----------
function customerHtml(b: NotifyBody): string {
  const d = b.detalle;
  const ca = d.idioma === "ca";
  const t = ca
    ? {
        hola: `Hola${b.nombre ? " " + b.nombre : ""},`,
        intro:
          "Gràcies per fer la teva auditoria d'atenció al client amb empentIA. Aquí tens el teu resum:",
        costeT: "Cost actual de la teva atenció",
        mes: "/mes",
        anio: "a l'any",
        ahorroT: "Estalvi estimat automatitzant",
        hasta: "fins a",
        propT: "La teva proposta recomanada",
        setup: "Setup (pagament únic)",
        cuota: "Quota mensual",
        sinIva: "Preus sense IVA",
        nota: "Són una estimació amb les teves dades; els afinem junts al kickoff.",
        cta: "Reserva el teu kickoff",
        dudas: "Algun dubte? Respon aquest correu i t'ajudem.",
        masMedida: " + a mida",
        subject: "El teu resum d'auditoria — empentIA",
      }
    : {
        hola: `Hola${b.nombre ? " " + b.nombre : ""},`,
        intro:
          "Gracias por hacer tu auditoría de atención al cliente con empentIA. Aquí tienes tu resumen:",
        costeT: "Coste actual de tu atención",
        mes: "/mes",
        anio: "al año",
        ahorroT: "Ahorro estimado automatizando",
        hasta: "hasta",
        propT: "Tu propuesta recomendada",
        setup: "Setup (pago único)",
        cuota: "Cuota mensual",
        sinIva: "Precios sin IVA",
        nota: "Son una estimación con tus datos; los afinamos juntos en el kickoff.",
        cta: "Reserva tu kickoff",
        dudas: "¿Alguna duda? Responde a este email y te ayudamos.",
        masMedida: " + a medida",
        subject: "Tu resumen de auditoría — empentIA",
      };

  const masMedida = d.propuesta.hay_personalizado ? t.masMedida : "";
  const lineas = lineasResumen(d)
    .map(
      (l) =>
        `<li style="margin:4px 0;color:${SOFT};font-size:14px;line-height:1.5">${l}</li>`
    )
    .join("");

  return `
  <div style="background:#fafaf7;padding:24px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid ${LINE};border-radius:14px;overflow:hidden">
      <div style="background:${INK};padding:18px 28px">
        <span style="color:#fff;font-size:18px;font-weight:bold">empent<span style="color:${GREEN}">IA</span></span>
      </div>
      <div style="padding:28px">
        <p style="color:${INK};font-size:16px;margin:0 0 6px"><b>${t.hola}</b></p>
        <p style="color:${SOFT};font-size:14px;line-height:1.6;margin:0 0 22px">${t.intro}</p>

        <div style="border:1px solid ${LINE};border-radius:12px;padding:16px 18px;margin-bottom:14px">
          <div style="color:#9a5a1a;font-size:12px;text-transform:uppercase;letter-spacing:.05em">${t.costeT}</div>
          <div style="color:#9a5a1a;font-size:26px;font-weight:bold">${eur(d.coste_mes)} €${t.mes}</div>
          <div style="color:${SOFT};font-size:13px">${eur(d.coste_anio)} € ${t.anio}</div>
        </div>

        <div style="border:1px solid ${GREEN};border-radius:12px;padding:16px 18px;margin-bottom:22px;background:rgba(0,192,136,.06)">
          <div style="color:${GREEN};font-size:12px;text-transform:uppercase;letter-spacing:.05em">${t.ahorroT}</div>
          <div style="color:${GREEN};font-size:26px;font-weight:bold">${t.hasta} ${eur(d.ahorro_mes)} €${t.mes}</div>
        </div>

        <p style="color:${INK};font-size:14px;font-weight:bold;margin:0 0 8px">${t.propT}</p>
        <ul style="margin:0 0 14px;padding-left:18px">${lineas}</ul>

        <table style="width:100%;border-collapse:collapse;margin-bottom:18px">
          <tr>
            <td style="padding:10px 14px;border:1px solid ${LINE};border-radius:10px">
              <div style="color:${SOFT};font-size:12px">${t.setup}</div>
              <div style="color:${INK};font-size:18px;font-weight:bold">${eur(d.propuesta.setup_total)} €${masMedida}</div>
            </td>
            <td style="width:12px"></td>
            <td style="padding:10px 14px;border:1px solid ${GREEN};border-radius:10px;background:rgba(0,192,136,.06)">
              <div style="color:${GREEN};font-size:12px">${t.cuota}</div>
              <div style="color:${GREEN};font-size:18px;font-weight:bold">${eur(d.propuesta.cuota_mensual)} €${t.mes}${masMedida}</div>
            </td>
          </tr>
        </table>
        <p style="color:#8a8a85;font-size:12px;margin:0 0 22px">${t.sinIva}. ${t.nota}</p>

        <a href="${CAL_LINK}" style="display:inline-block;background:${GREEN};color:#06241a;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 26px;border-radius:100px">${t.cta} →</a>

        <p style="color:${SOFT};font-size:13px;line-height:1.6;margin:22px 0 0">${t.dudas}</p>
      </div>
      <div style="padding:16px 28px;border-top:1px solid ${LINE};color:#8a8a85;font-size:12px">empentIA · ${b.web || "empentia.com"}</div>
    </div>
  </div>`;
}

async function sendResend(to: string, subject: string, html: string, replyTo?: string) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
}

async function sendFormsubmitInternal(b: NotifyBody) {
  const d = b.detalle;
  const masMedida = d.propuesta.hay_personalizado ? " + a medida" : "";
  const payload = {
    _subject: `[Auditoría atención] ${b.estado} — ${
      b.empresa || b.nombre || b.email || "sin nombre"
    }`,
    _template: "table",
    _captcha: "false",
    Estado: b.estado,
    Nombre: b.nombre || "—",
    Email: b.email || "—",
    Empresa: b.empresa || "—",
    Web: b.web || "—",
    Idioma: d.idioma,
    Marketing: b.marketing ? "Sí" : "No",
    "Canales activos": d.canales_activos.join(", ") || "—",
    "Canales a abrir": d.canales_nuevos.join(", ") || "—",
    "Consultas/mes (aprox)": d.consultas_mes,
    "Tipo principal": d.tipo_principal || "—",
    "Horas/semana": d.horas_semana,
    "Coste/hora (€)": d.coste_hora,
    "Tiempo de respuesta": d.tiempo_respuesta,
    "Coste actual (mes €)": d.coste_mes,
    "Ahorro estimado (mes €)": d.ahorro_mes,
    "Plan dominante": d.propuesta.tramo_dominante || "—",
    "Setup total (€)": d.propuesta.setup_total + masMedida,
    "Cuota mensual (€)": d.propuesta.cuota_mensual + masMedida,
    Propuesta: lineasResumen(d).join("\n"),
    Notas: d.notas || "—",
  };
  await fetch(FORMSUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as NotifyBody;
    const quien = body.empresa || body.nombre || body.email || "sin nombre";

    if (RESEND_KEY) {
      // Email interno (siempre)
      await sendResend(
        NOTIFY_EMAIL,
        `[Auditoría] ${body.estado} — ${quien}`,
        internalHtml(body),
        body.email
      );
      // Copia al cliente (solo al completar, no en el pre-acuerdo)
      if (body.enviarCliente && body.email) {
        const subject =
          body.detalle.idioma === "ca"
            ? "El teu resum d'auditoria — empentIA"
            : "Tu resumen de auditoría — empentIA";
        await sendResend(body.email, subject, customerHtml(body));
      }
    } else {
      // Sin Resend: solo aviso interno por FormSubmit (sin copia al cliente)
      await sendFormsubmitInternal(body);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
