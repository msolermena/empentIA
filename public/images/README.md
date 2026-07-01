# 📸 Imatges Necessàries per empentIA

## 🎯 On Col·locar les Imatges

Copia les imatges exportades de Canva a aquestes carpetes:

```
public/
  images/
    logo/
      logo-horizontal.png       (480x120px - PRIORITAT ALTA)
      logo-horizontal-sm.png    (240x60px - mobile)
      logo-square.png           (256x256px - avatars)
      
    favicons/
      favicon.ico               (16x16, 32x32, 48x48 combinats)
      favicon-16x16.png
      favicon-32x32.png
      apple-touch-icon.png      (180x180px)
      android-chrome-192x192.png
      android-chrome-512x512.png
      
    social/
      og-image.png              (1200x630px - Open Graph)
      twitter-card.png          (1200x675px - opcional)
```

---

## ✅ Prioritat d'Exportació

### 1️⃣ PRIORITAT MÀXIMA (fer PRIMER)
```
✓ logo-horizontal.png (480x120px)
✓ favicon.ico
✓ apple-touch-icon.png (180x180px)
✓ android-chrome-192x192.png
✓ android-chrome-512x512.png
```

### 2️⃣ PRIORITAT ALTA (fer DESPRÉS)
```
✓ logo-horizontal-sm.png (240x60px)
✓ logo-square.png (256x256px)
✓ og-image.png (1200x630px)
```

### 3️⃣ OPCIONAL (si tens temps)
```
✓ favicon-16x16.png
✓ favicon-32x32.png
✓ twitter-card.png
```

---

## 🎨 Com Exportar de Canva

### Logo Horizontal (480x120px)
1. Obre el teu disseny empentIA a Canva
2. Ajusta canvas a **1920x480px** (4:1 ratio)
3. Mou el logo amb l'icon a l'esquerra
4. **Exportar** → PNG → **Transparent background**
5. Descarrega → Redimensiona a 480x120px
6. Guarda com `logo-horizontal.png`

### Logo Horizontal Small (240x60px)
- Mateix procés però redimensiona a 240x60px
- Per mobile/tablets

### Logo Square (256x256px)
- Canvas quadrat amb el logo centrat
- 70-75% d'ompliment (amb padding)
- PNG transparent

### Favicons
1. **favicon.ico:**
   - Usa eina online: https://realfavicongenerator.net/
   - Puja el teu logo quadrat
   - Genera tots els favicons automàticament

2. **apple-touch-icon.png (180x180px):**
   - Logo quadrat 180x180px
   - PNG transparent o amb fons (recomanat: transparent)

3. **Android Chrome (192x192 i 512x512):**
   - Logo quadrat 
   - PNG transparent
   - Padding ~15% al voltant

### Open Graph Image (1200x630px)
1. Canvas 1200x630px a Canva
2. Fons: #0F172A (slate-900) o gradient
3. Logo centrat
4. Text: "Auditoria IA Gratuïta per Pimes"
5. Exportar PNG (NO transparent, amb fons)

---

## 🔧 Configuració Meta Tags

Un cop tinguis les imatges, actualitza `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "empentIA - Auditoria IA Gratuïta per Pimes",
  description: "Descobreix com automatitzar processos...",
  icons: {
    icon: [
      { url: '/images/favicons/favicon.ico' },
      { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'empentIA - Auditoria IA Gratuïta',
    description: 'Descobreix com automatitzar processos...',
    images: [
      {
        url: 'https://empentia.com/images/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'empentIA',
      },
    ],
  },
};
```

---

## ⚡ Quick Test

Després de copiar les imatges:

```bash
# Verifica que existeixen
ls public/images/logo/
ls public/images/favicons/

# Reinicia el servidor
npm run dev
```

Obre http://localhost:3000 i hauries de veure el logo!

---

## 🐛 Troubleshooting

### Error: "Image not found"
- Verifica que el path és exacte: `public/images/logo/logo-horizontal.png`
- Next.js serveix `/public` com a root, així que usa `/images/logo/...`

### Logo es veu pixelat
- Exporta a mida 2x (960x240px) i Next.js el redimensionarà
- Usa PNG amb qualitat alta

### Favicon no apareix
- Neteja cache del navegador (Cmd+Shift+R)
- Espera 1-2 minuts
- Comprova developer tools → Network

---

## 📝 Checklist Final

- [ ] logo-horizontal.png a `/public/images/logo/`
- [ ] favicon.ico a `/public/images/favicons/`
- [ ] apple-touch-icon.png a `/public/images/favicons/`
- [ ] android-chrome-192x192.png a `/public/images/favicons/`
- [ ] android-chrome-512x512.png a `/public/images/favicons/`
- [ ] Reiniciat `npm run dev`
- [ ] Logo visible al navegador
- [ ] Favicon visible a la pestanya

---

**Nota:** Si vols usar el logo TEXT mentrestant (mentre exportes imatges), canvia a `app/page.tsx`:

```tsx
<Logo variant="text" size="md" />
```

Això farà servir el logo text fins que tinguis les imatges.
