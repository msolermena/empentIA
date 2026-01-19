# 📸 Guia d'Imatges - empentIA

## 📂 Estructura de Carpetes

```
public/
├── images/
│   ├── logo/
│   │   ├── logo-horizontal.png          (480x120px) ⭐ PRIORITAT
│   │   ├── logo-horizontal-sm.png       (240x60px)
│   │   └── logo-square.png              (256x256px)
│   └── social/
│       ├── og-image.png                 (1200x630px)
│       └── twitter-card.png             (1200x675px)
└── favicons/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png             (180x180px)
    ├── android-chrome-192x192.png
    └── android-chrome-512x512.png
```

---

## 🎯 Imatges a Exportar de Canva

### 1. Logo Horizontal (PRIORITAT MÀXIMA)

**Mida canvas Canva:** 1920x480px  
**Exportar a:** 480x120px  
**Nom fitxer:** `logo-horizontal.png`

**Com crear:**
1. Canvas 1920x480px (ratio 4:1)
2. Icon hexàgon + xarxa a l'esquerra (~20-25% amplada)
3. Text "empentIA" a la dreta
4. Padding ~40-60px entre icon i text
5. Exportar PNG transparent
6. Redimensionar a 480x120px

---

### 2. Logo Horizontal Small (mobile)

**Mida:** 240x60px  
**Nom:** `logo-horizontal-sm.png`  
**Procés:** Mateix que anterior però redimensionat

---

### 3. Logo Square (avatars)

**Mida canvas:** 1024x1024px  
**Exportar a:** 256x256px  
**Nom:** `logo-square.png`

**Com crear:**
1. Canvas quadrat 1024x1024px
2. Icon centrat
3. 70-75% ompliment (padding ~15% voltant)
4. PNG transparent

---

### 4. Favicons

#### favicon.ico
Usa: **https://realfavicongenerator.net/**
1. Puja logo-square.png
2. Genera tots els favicons automàticament
3. Descarrega el zip
4. Copia fitxers a `/public/favicons/`

#### Manual (alternativa):
- **16x16px** → favicon-16x16.png
- **32x32px** → favicon-32x32.png
- **180x180px** → apple-touch-icon.png
- **192x192px** → android-chrome-192x192.png
- **512x512px** → android-chrome-512x512.png

---

### 5. Open Graph Image (xarxes socials)

**Mida:** 1200x630px  
**Nom:** `og-image.png`

**Disseny:**
1. Canvas 1200x630px
2. Fons: #0F172A (slate-900) o gradient
3. Logo centrat (gran, ~400px)
4. Text inferior: "Auditoria IA Gratuïta per Pimes"
5. Font: Inter Bold, color: #F8FAFC
6. Exportar PNG amb fons (NO transparent)

---

## ⚡ Passos Ràpids

### Opció A: Exportar Tot de Cop
```bash
# A Canva, crea 1 pàgina per cada mida
# Exportar totes → PNG → Transparent
# Renombra segons noms d'aquí
# Copia a carpetes corresponents
```

### Opció B: Mínim Viable
```bash
# Només 3 fitxers essencials:
1. logo-horizontal.png (480x120)
2. favicon.ico (genera amb realfavicongenerator.net)
3. apple-touch-icon.png (180x180)
```

---

## 🔧 Després d'Exportar

### 1. Copia Imatges
```bash
# Copia els fitxers exportats a:
public/images/logo/logo-horizontal.png
public/favicons/favicon.ico
public/favicons/apple-touch-icon.png
# etc...
```

### 2. Actualitza Logo Component
A `app/page.tsx`, canvia:
```tsx
<Logo size="md" variant="text" />
```
per:
```tsx
<Logo size="md" variant="image" />
```

### 3. Restart Dev Server
```bash
npm run dev
```

---

## ✅ Verificació

- [ ] Logo visible al header
- [ ] Favicon visible a pestanya navegador
- [ ] Apple touch icon per iOS
- [ ] No errors 404 a Developer Tools → Network

---

## 💡 Consells

**Qualitat:**
- Exporta a mida 2x (960x240px per horizontal) si vols més nitidesa
- Next.js redimensionarà automàticament

**Formats:**
- PNG transparent per logos
- PNG amb fons per OG images

**Noms:**
- Usa exactament els noms especificats aquí
- Minúscules, guions (no underscores)

---

## 🐛 Troubleshooting

### "Image not found"
- Verifica path: `public/images/logo/logo-horizontal.png`
- Reinicia `npm run dev`

### Logo pixelat
- Exporta mida superior (2x)
- Comprova qualitat exportació Canva (alta)

### Favicon no apareix
- Neteja cache navegador (Cmd+Shift+R)
- Espera 1-2 minuts
- Hard refresh (Ctrl+F5)

---

**Mentrestant:** El logo TEXT funciona perfectament mentre exportes les imatges! 🎨
