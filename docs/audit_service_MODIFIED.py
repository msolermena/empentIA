"""
AUDIT SERVICE v5.1
==================
Versió: 5.1
Data: Març 2026

Servei per gestionar auditories:
- Crear i guardar auditories
- Gestionar conversa (preguntes/respostes)
- Generar informe final

CANVIS v5.1:
- C-04: Forçar nota_p5 amb text original quan P5 té contingut però no hi ha match fort
"""

from models.database import get_supabase
from services.config_service import get_config
from services.claude_service import ClaudeService
import uuid
import json
from datetime import datetime
from typing import Dict, List, Optional


class AuditService:
    """Servei principal de gestió d'auditories."""

    def __init__(self):
        self.supabase = get_supabase()
        self.config = get_config()
        self.claude = ClaudeService()

    # =========================================================================
    # AUDIT LIFECYCLE
    # =========================================================================

    def start_audit(self, company_id: str, origen: str = "auditoria") -> dict:
        """Crea una nova sessió d'auditoria."""
        audit_data = {
            "id": str(uuid.uuid4()),
            "company_id": company_id,
            "status": "in_progress",
            "origen": origen,  # 'auditoria' (hero) o 'auditoria_2' (footer)
            "created_at": datetime.utcnow().isoformat()
        }

        if hasattr(self.supabase, 'table'):
            result = self.supabase.table("audits").insert(audit_data).execute()
            return result.data[0]
        else:
            result = self.supabase.query("audits", "POST", audit_data)
            return result[0] if isinstance(result, list) else result

    def get_audit(self, audit_id: str) -> Optional[dict]:
        """Obté info d'una auditoria."""
        if hasattr(self.supabase, 'table'):
            result = self.supabase.table("audits")\
                .select("*")\
                .eq("id", audit_id)\
                .single()\
                .execute()
            return result.data
        else:
            import httpx
            url = f"{self.supabase.url}/rest/v1/audits?id=eq.{audit_id}"
            with httpx.Client() as client:
                response = client.get(url, headers=self.supabase.headers)
                response.raise_for_status()
                data = response.json()
                return data[0] if data else None

    def update_audit(self, audit_id: str, data: dict) -> bool:
        """Actualitza camps d'una auditoria."""
        try:
            if hasattr(self.supabase, 'table'):
                self.supabase.table("audits").update(data).eq("id", audit_id).execute()
            else:
                import httpx
                url = f"{self.supabase.url}/rest/v1/audits?id=eq.{audit_id}"
                with httpx.Client() as client:
                    response = client.patch(url, json=data, headers=self.supabase.headers)
                    response.raise_for_status()
            return True
        except Exception as e:
            print(f"⚠️ Update audit error: {e}")
            return False

    # =========================================================================
    # CONVERSATION MANAGEMENT
    # =========================================================================

    def save_answer(self, audit_id: str, question_number: int, question_data: dict, answer: str) -> dict:
        """Guarda una pregunta i resposta."""
        conversation_data = {
            "id": str(uuid.uuid4()),
            "audit_id": audit_id,
            "question_number": question_number,
            "question_text": question_data.get("title", ""),
            "question_type": question_data.get("type", ""),
            "question_options": json.dumps(question_data) if question_data else "{}",
            "answer_text": answer,
            "created_at": datetime.utcnow().isoformat()
        }

        if hasattr(self.supabase, 'table'):
            result = self.supabase.table("conversations").insert(conversation_data).execute()
            return result.data[0]
        else:
            result = self.supabase.query("conversations", "POST", conversation_data)
            return result[0] if isinstance(result, list) else result

    def get_conversation_history(self, audit_id: str) -> List[dict]:
        """Obté tota la conversa d'una auditoria."""
        if hasattr(self.supabase, 'table'):
            result = self.supabase.table("conversations")\
                .select("*").eq("audit_id", audit_id).order("question_number").execute()
            return result.data
        else:
            import httpx
            url = f"{self.supabase.url}/rest/v1/conversations?audit_id=eq.{audit_id}&order=question_number"
            with httpx.Client() as client:
                response = client.get(url, headers=self.supabase.headers)
                response.raise_for_status()
                return response.json()

    # =========================================================================
    # GENERATE REPORT (v5.1)
    # =========================================================================

    def generate_report(self, audit_id: str, pre_research: dict, oportunitats: list,
                       conversation: list, contact_data: dict = None) -> dict:
        """Genera l'informe final de l'auditoria."""
        # Extreure dades
        p1 = self._get_answer(conversation, 1)
        p2 = self._get_answer(conversation, 2)
        p3 = self._get_answer(conversation, 3)
        p4 = self._get_answer(conversation, 4)
        p5 = self._get_answer(conversation, 5)

        context = {
            "sector": pre_research.get("sector_id"),
            "sector_name": pre_research.get("sector_name"),
            "nom_empresa": pre_research.get("nom_empresa"),
            "mida": p1.get("mida") if p1 else "6-15",
            "volum": p1.get("volum") if p1 else 100
        }

        eines = p2 if p2 else {}
        estats = p3.get("estats", {}) if p3 else {}
        prioritat = p3.get("prioritat") if p3 else None

        # 🆕 v6.3: Obtenir context d'eines (funcionalitats natives + nivells)
        eines_context = self.config.get_eines_context_for_prompt(eines)

        # Filtrar oportunitats
        seleccionades = []
        for op in oportunitats:
            estat = estats.get(op.get("id"), "manual")
            if estat in ["manual", "no_fem"]:
                op_copy = op.copy()
                op_copy["estat"] = estat
                seleccionades.append(op_copy)

        # 🆕 Match P5 si hi ha text
        match_p5 = None
        p5_oportunitat_afegida = False  # 🆕 v5.1: Trackear si s'ha afegit oportunitat
        text_p5 = p5.get("text") if p5 else None
        if text_p5 and text_p5.strip():
            print(f"🔍 Intentant match P5: '{text_p5}'")
            match_p5 = self._match_p5(text_p5, pre_research, eines)
            if match_p5:
                print(f"✅ Match P5: {match_p5.get('hi_ha_match')} - {match_p5.get('proces_id')}")

                # 🆕 v6.3: Si match amb confiança alta, afegir com a oportunitat real
                if (match_p5.get("hi_ha_match") and
                    match_p5.get("confidence", 0) >= 0.7 and
                    match_p5.get("proces_id")):

                    proces_id = match_p5["proces_id"]

                    # Comprovar que no estigui ja a seleccionades
                    ids_existents = {op.get("id") for op in seleccionades}
                    if proces_id not in ids_existents:
                        # Obtenir info del procés del catàleg
                        proces_info = self.config.get_proces(proces_id)

                        nova_op = {
                            "id": proces_id,
                            "proces_id": proces_id,
                            "text_personalitzat": match_p5.get("text_personalitzat") or
                                (proces_info.get("nom", "") if proces_info else ""),
                            "estimacio_hores": 3,  # Estimació conservadora
                            "capacitats": proces_info.get("capacitats", []) if proces_info else [],
                            "estat": "no_fem",  # Si ho demana a P5, vol dir que no ho fan
                            "origen_p5": True  # Marcar que ve de P5
                        }
                        seleccionades.append(nova_op)
                        p5_oportunitat_afegida = True  # 🆕 v5.1
                        print(f"✅ P5: Afegida oportunitat '{proces_id}' a seleccionades")
                    else:
                        p5_oportunitat_afegida = True  # 🆕 v5.1: Ja existia, comptem com a matchejada
                        print(f"ℹ️ P5: '{proces_id}' ja existeix a seleccionades, no duplicar")

        # Generar informe
        informe = self._generate_informe_ai(context, eines, seleccionades,
                                            p4 or {}, prioritat,
                                            text_p5, match_p5, eines_context)

        # 🆕 v5.1 C-04: Forçar nota_p5 quan P5 té text però no s'ha generat oportunitat
        if text_p5 and text_p5.strip() and not p5_oportunitat_afegida:
            informe["nota_p5"] = (
                f'Ens has mencionat: "{text_p5.strip()}". '
                f'Ho tindrem en compte i et donarem resposta personalitzada '
                f'sobre si és automatitzable i com encaixaria amb el que hem detectat.'
            )
            print(f"📝 P5: nota_p5 forçada amb text original (sense match fort)")
        elif p5_oportunitat_afegida:
            # Si s'ha afegit oportunitat, no cal nota_p5
            informe["nota_p5"] = None

        # 🆕 v6.1: Preparar dades per guardar (amb nous camps contacte)
        update_data = {
            "status": "completed",
            "audit_result": json.dumps(informe),
            "completed_at": datetime.utcnow().isoformat()
        }

        # Afegir camps de contacte si existeixen
        if contact_data:
            if contact_data.get("email"):
                update_data["email"] = contact_data["email"]
            if contact_data.get("telefon"):
                update_data["telefon"] = contact_data["telefon"]
            if contact_data.get("preferencia_contacte"):
                update_data["preferencia_contacte"] = contact_data["preferencia_contacte"]
            if contact_data.get("consentiments"):
                update_data["consentiments"] = json.dumps(contact_data["consentiments"])
            # 🆕 v6.2: Nom i càrrec
            if contact_data.get("nom"):
                update_data["nom"] = contact_data["nom"]
            if contact_data.get("carrec"):
                update_data["carrec"] = contact_data["carrec"]

        # Guardar
        self.update_audit(audit_id, update_data)

        return informe

    def _get_answer(self, conversation: list, qnum: int) -> Optional[dict]:
        """Obté resposta d'una pregunta."""
        for item in conversation:
            if item.get("question_number") == qnum:
                try:
                    return json.loads(item.get("answer_text", "{}"))
                except:
                    return {"raw": item.get("answer_text")}
        return None

    def _generate_informe_ai(self, context, eines, oportunitats, quantificacio,
                            prioritat, text_p5=None, match_p5=None, eines_context=None) -> dict:
        """Genera informe amb Claude."""
        try:
            from prompts import PROMPT_INFORME, get_informe_prompt

            user_prompt = get_informe_prompt(context, eines, oportunitats,
                                             quantificacio, prioritat, text_p5, match_p5,
                                             eines_context)

            result = self.claude.call_json(PROMPT_INFORME, user_prompt, 4000)
            return result if result else self._fallback_informe(oportunitats, context)
        except Exception as e:
            print(f"⚠️ Informe error: {e}")
            return self._fallback_informe(oportunitats, context)

    def _fallback_informe(self, oportunitats: list, context: dict) -> dict:
        """Fallback si IA falla."""
        cost = self.config.get_cost_hora()
        pct = self.config.get_percentatge_automatitzacio()
        total_h = sum(op.get("estimacio_hores", 3) for op in oportunitats[:5])
        euros = int(total_h * pct * 4 * cost / 50) * 50

        return {
            "company_summary": f"Detectades {len(oportunitats)} oportunitats per {context.get('nom_empresa', '')}.",
            "oportunitats": [{
                "nom": op.get("text_personalitzat", "")[:50],
                "descripcio": op.get("text_personalitzat", ""),
                "benefici": "Estalvi de temps.",
                "hores_setmana": op.get("estimacio_hores", 3),
                "euros_mes": int(op.get("estimacio_hores", 3) * pct * 4 * cost / 50) * 50,
                "estat_actual": op.get("estat", "manual"),
                "es_prioritaria": False
            } for op in oportunitats[:5]],
            "impacte_total": {"hores_setmana": total_h, "euros_mes": euros, "percentatge_temps": 15},
            "recomanacio": "Recomanem començar per la vostra prioritat principal.",
            "oportunitats_adicionals": [],
            "nota_p5": None
        }

    def _match_p5(self, text: str, pre_research: dict, eines: dict) -> Optional[dict]:
        """Fa match del text de P5 amb processos disponibles."""
        try:
            from prompts import PROMPT_MATCH_P5, get_match_p5_prompt

            # Obtenir processos del sector
            sector_id = pre_research.get("sector_id", "serveis_b2b")
            processos = self.config.get_processos_per_sector(sector_id)

            # Context per personalitzar
            context = {
                "sector": sector_id,
                "sector_name": pre_research.get("sector_name"),
                "nom_empresa": pre_research.get("nom_empresa"),
                "eines": eines
            }

            user_prompt = get_match_p5_prompt(text, processos, context)
            result = self.claude.call_json(PROMPT_MATCH_P5, user_prompt, 1500)

            return result
        except Exception as e:
            print(f"⚠️ Match P5 error: {e}")
            return None
