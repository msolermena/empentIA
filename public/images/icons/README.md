# Iconos animados de servicios

Carpeta para los iconos en movimiento de los servicios de atención al cliente.

## Cómo se sirven
Todo lo que está aquí se publica automáticamente en:

```
/images/icons/<archivo>              → en la web
https://empentia.com/images/icons/<archivo>   → URL completa
```

## Convención de nombres (recomendada)
Un archivo por servicio, en minúsculas y sin acentos:

| Servicio        | Nombre sugerido        |
|-----------------|------------------------|
| Webchat         | `webchat`              |
| Email           | `email`                |
| WhatsApp        | `whatsapp`             |
| Voz / Llamadas  | `voz`                  |
| Redes Sociales  | `redes`                |
| Reseñas         | `resenas`              |

Ej.: `webchat.json`, `whatsapp.gif`, `voz.svg`…

## Formatos
- **GIF / SVG animado / APNG** → se insertan con `<img>`.
- **Lottie (.json / .lottie)** → requieren reproductor (lottie-web / dotlottie-player).
- **MP4 / WebM** → se insertan con `<video autoplay loop muted playsinline>`.

> Al añadir los archivos, avisar para conectarlos en la sección de servicios
> (sustituyen a los SVG embebidos actuales en agentes-ia y webchat).
