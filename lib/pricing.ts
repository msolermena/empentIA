// ============================================================
// MOTOR DE PRECIOS — espejo de data/empentia-precios_2 (1).xlsx
// (v. 8 jun 2026) · todos los precios SIN IVA.
//
// Reglas de negocio:
//  - Cada canal es un servicio con su propia escalera por volumen.
//  - Solo se ofrecen los 3 primeros tramos (Starter / Pro / Business).
//    Por encima del volumen de Business → "Plan personalizado" (a medida).
//  - Setup (pago único, por canal) escalado por tramo: 390 / 495 / 600 €.
//    Los 800 € se reservan a planes personalizados (no se muestran aquí).
// ============================================================

export type TierId = "starter" | "pro" | "business" | "personalizado";

export interface Tier {
  id: TierId;
  label: string;
  precio: number | null; // €/mes sin IVA (null = a medida)
  incluidas: number | null; // unidades/mes incluidas (null = a medida)
}

export interface ChannelPlan {
  id: string; // id del canal en el cuestionario
  label: string;
  unidad: string; // plural: "conversaciones", "emails", "minutos", "reseñas"
  estado: "publicado" | "proximamente" | "nuevo";
  tiers: Tier[]; // [starter, pro, business]
}

// Setup (pago único) por tramo. 800 € reservado a personalizado.
export const SETUP_POR_TRAMO: Record<TierId, number> = {
  starter: 390,
  pro: 495,
  business: 600,
  personalizado: 800,
};

// Tramos por canal (solo los 3 publicables). Fuente: Excel de precios.
export const CANALES_PLAN: Record<string, ChannelPlan> = {
  webchat: {
    id: "webchat",
    label: "Webchat",
    unidad: "conversaciones",
    estado: "publicado",
    tiers: [
      { id: "starter", label: "Starter", precio: 49, incluidas: 50 },
      { id: "pro", label: "Pro", precio: 79, incluidas: 100 },
      { id: "business", label: "Business", precio: 149, incluidas: 200 },
    ],
  },
  email: {
    id: "email",
    label: "Email",
    unidad: "emails",
    estado: "publicado",
    tiers: [
      { id: "starter", label: "Starter", precio: 59, incluidas: 100 },
      { id: "pro", label: "Pro", precio: 115, incluidas: 250 },
      { id: "business", label: "Business", precio: 260, incluidas: 650 },
    ],
  },
  whatsapp: {
    id: "whatsapp",
    label: "WhatsApp",
    unidad: "conversaciones",
    estado: "proximamente",
    tiers: [
      { id: "starter", label: "Starter", precio: 59, incluidas: 50 },
      { id: "pro", label: "Pro", precio: 99, incluidas: 100 },
      { id: "business", label: "Business", precio: 189, incluidas: 200 },
    ],
  },
  telefono: {
    id: "telefono",
    label: "Teléfono (voz)",
    unidad: "minutos",
    estado: "proximamente",
    tiers: [
      { id: "starter", label: "Starter", precio: 79, incluidas: 150 },
      { id: "pro", label: "Pro", precio: 159, incluidas: 350 },
      { id: "business", label: "Business", precio: 299, incluidas: 750 },
    ],
  },
  resenas: {
    id: "resenas",
    label: "Reseñas (Google)",
    unidad: "reseñas",
    estado: "proximamente",
    tiers: [
      { id: "starter", label: "Starter", precio: 29, incluidas: 50 },
      { id: "pro", label: "Pro", precio: 59, incluidas: 150 },
      { id: "business", label: "Business", precio: 119, incluidas: 350 },
    ],
  },
  redes: {
    id: "redes",
    label: "Redes sociales (DMs)",
    unidad: "conversaciones",
    estado: "nuevo",
    tiers: [
      { id: "starter", label: "Starter", precio: 59, incluidas: 50 },
      { id: "pro", label: "Pro", precio: 99, incluidas: 100 },
      { id: "business", label: "Business", precio: 179, incluidas: 200 },
    ],
  },
};

const PERSONALIZADO: Tier = {
  id: "personalizado",
  label: "Personalizado",
  precio: null,
  incluidas: null,
};

// ------------------------------------------------------------
// Selección de tramo según volumen estimado del canal.
// ------------------------------------------------------------
function pickTier(plan: ChannelPlan, volumen: number): Tier {
  const business = plan.tiers[plan.tiers.length - 1];
  if (volumen > (business.incluidas ?? Infinity)) return PERSONALIZADO;
  for (const t of plan.tiers) {
    if ((t.incluidas ?? Infinity) >= volumen) return t;
  }
  return business;
}

// ------------------------------------------------------------
// Propuesta
// ------------------------------------------------------------
export interface LineaPropuesta {
  channelId: string;
  label: string;
  unidad: string;
  estado: ChannelPlan["estado"];
  tier: Tier;
  esPersonalizado: boolean;
  esNuevo: boolean; // canal que aún no usan (sin volumen) → tramo de entrada
  precioMes: number; // 0 si personalizado
  setup: number; // € una vez (0 si personalizado → a medida)
  volumenEstimado: number; // en unidad de tarifa/mes
}

export interface AddonPropuesta {
  label: string;
  precioMes: number;
}

export interface Propuesta {
  lineas: LineaPropuesta[];
  addons: AddonPropuesta[];
  numCanales: number; // canales con producto (cuentan para setup)
  setupTotal: number;
  cuotaMensual: number; // tramos no personalizados + add-ons
  hayPersonalizado: boolean;
  tramoDominante: "Starter" | "Pro" | "Business" | null; // para el campo `pla` del lead
  sinCanalesVendibles: boolean;
}

const ORDEN_TRAMO: Record<string, number> = {
  starter: 1,
  pro: 2,
  business: 3,
  personalizado: 4,
};

/**
 * Construye la propuesta a partir de los canales elegidos y el volumen mensual
 * REAL de cada canal activo (en su unidad de tarifa). Los canales nuevos (que
 * aún no usan) no tienen volumen → se proponen en el tramo de entrada.
 */
export function buildProposal(opts: {
  canalesActivos: string[];
  canalesNuevos: string[];
  // volumen mensual por canal en unidad de tarifa (solo canales activos)
  volumenPorCanal: Record<string, number>;
}): Propuesta {
  const activos = opts.canalesActivos.filter((c) => CANALES_PLAN[c]);
  const nuevos = opts.canalesNuevos.filter(
    (c) => CANALES_PLAN[c] && !opts.canalesActivos.includes(c)
  );
  const conProducto = [...activos, ...nuevos];

  const lineas: LineaPropuesta[] = conProducto.map((id) => {
    const plan = CANALES_PLAN[id];
    const esNuevo = !opts.canalesActivos.includes(id);
    const vol = esNuevo
      ? 0
      : Math.max(0, Math.round(opts.volumenPorCanal[id] || 0));
    const tier = pickTier(plan, vol);
    const esPersonalizado = tier.id === "personalizado";
    return {
      channelId: id,
      label: plan.label,
      unidad: plan.unidad,
      estado: plan.estado,
      tier,
      esPersonalizado,
      esNuevo,
      precioMes: tier.precio ?? 0,
      setup: esPersonalizado ? 0 : SETUP_POR_TRAMO[tier.id],
      volumenEstimado: vol,
    };
  });

  const addons: AddonPropuesta[] = [];

  const setupTotal = lineas.reduce((s, l) => s + l.setup, 0);
  const cuotaMensual =
    lineas.reduce((s, l) => s + l.precioMes, 0) +
    addons.reduce((s, a) => s + a.precioMes, 0);

  const hayPersonalizado = lineas.some((l) => l.esPersonalizado);

  // Tramo dominante (el más alto entre los no personalizados) para el lead.
  const noPersonalizados = lineas.filter((l) => !l.esPersonalizado);
  let tramoDominante: "Starter" | "Pro" | "Business" | null = null;
  if (noPersonalizados.length > 0) {
    const top = noPersonalizados.reduce((a, b) =>
      ORDEN_TRAMO[b.tier.id] > ORDEN_TRAMO[a.tier.id] ? b : a
    );
    tramoDominante = top.tier.label as "Starter" | "Pro" | "Business";
  }

  return {
    lineas,
    addons,
    numCanales: conProducto.length,
    setupTotal,
    cuotaMensual,
    hayPersonalizado,
    tramoDominante,
    sinCanalesVendibles: lineas.length === 0 && addons.length === 0,
  };
}
