import { NextResponse } from "next/server";
import type { AuditoriaDetalle } from "@/lib/api";

// ============================================================
// Notificación por email de cada auditoría completada / pre-aceptada.
// TEMPORAL: stopgap mientras el portal (app.empentia.com) no recoge los
// datos. Reenvía un resumen a hola@empentia.com vía FormSubmit (sin
// credenciales). Para cambiar a Resend/SMTP/portal, solo se toca este
// archivo.
//
// ⚠️ Activación única: la PRIMERA vez que llegue un envío, FormSubmit
// manda un email de activación a hola@empentia.com. Hay que abrirlo y
// confirmar una vez; a partir de ahí llegan todos los resúmenes.
// ============================================================

const NOTIFY_EMAIL = "hola@empentia.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`;

interface NotifyBody {
  estado: string;
  nombre?: string;
  email?: string;
  empresa?: string;
  web?: string;
  marketing?: boolean;
  detalle: AuditoriaDetalle;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as NotifyBody;
    const d = body.detalle;
    const prop = d.propuesta;

    const lineas = prop.lineas
      .map(
        (l) =>
          `• ${l.servicio} (${l.canal}) — ${l.plan} — ${
            l.personalizado
              ? "a medida"
              : `${l.precio_mes} €/mes · setup ${l.setup} €`
          }`
      )
      .join("\n");
    const addons = prop.addons
      .map((a) => `• ${a.nombre} — ${a.precio_mes} €/mes`)
      .join("\n");

    const payload = {
      _subject: `[Auditoría atención] ${body.estado} — ${
        body.empresa || body.nombre || body.email || "sin nombre"
      }`,
      _template: "table",
      _captcha: "false",
      Estado: body.estado,
      Nombre: body.nombre || "—",
      Email: body.email || "—",
      Empresa: body.empresa || "—",
      Web: body.web || "—",
      Idioma: d.idioma,
      Marketing: body.marketing ? "Sí" : "No",
      "Canales activos": d.canales_activos.join(", ") || "—",
      "Canales a abrir": d.canales_nuevos.join(", ") || "—",
      "Consultas/semana": d.consultas_semana,
      "Consultas/mes (aprox)": d.consultas_mes,
      "Tipo principal": d.tipo_principal || "—",
      "Horas/semana": d.horas_semana,
      "Coste/hora (€)": d.coste_hora,
      "Tiempo de respuesta": d.tiempo_respuesta,
      "Coste actual (mes €)": d.coste_mes,
      "Coste actual (año €)": d.coste_anio,
      "Ahorro estimado (mes €)": d.ahorro_mes,
      "Ahorro estimado (año €)": d.ahorro_anio,
      "Horas liberadas/sem": d.horas_liberadas,
      "Plan dominante": prop.tramo_dominante || "—",
      "Setup total (€)": prop.setup_total,
      "Cuota mensual (€)": prop.cuota_mensual,
      Propuesta: lineas + (addons ? `\n— Add-ons —\n${addons}` : ""),
      Notas: d.notas || "—",
    };

    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: res.ok });
  } catch {
    return NextResponse.json({ success: false });
  }
}
