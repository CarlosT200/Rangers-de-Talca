# QA — Prototipo Rangers de Talca (rediseño)

Auditoría de la **vista previa** del prototipo. Fecha: **2026-10-29**.
Rama: `feat/4-rediseno-A` (PR #5). URL publicada: https://carlost200.github.io/Rangers-de-Talca/

**Leyenda de estado:** ✅ Corregido · 🔧 Pendiente técnico · 🎨 Pendiente de diseño · 📋 Pendiente de información del cliente · 🧪 Contenido de demostración.

---

## FUNCIONAMIENTO

| Comprobación | Resultado | Estado | Archivo(s) |
|---|---|---|---|
| Enlaces/recursos internos rotos | **0** de ~60 enlaces internos verificados por script | ✅ | — |
| Enlaces externos | Serviticket, Rangers Store, YouTube, Instagram, X verificados | ✅ | global |
| Rutas incorrectas (local y GitHub Pages) | Todas relativas; CSS/subpáginas/assets responden 200 en Pages | ✅ | — |
| Imágenes que no cargan | 0 imágenes rotas en portada y subpáginas | ✅ | — |
| Archivos inexistentes | Ninguno referenciado | ✅ | — |
| Errores de JavaScript | Sin errores propios | ✅ | `js/main.js`, `js/data.js` |
| Errores/advertencias de consola | Solo errores externos de fuentes de `rangersdetalca.com` (CORS). **No provienen del prototipo** (0 peticiones a ese host desde nuestras páginas; son residuales del navegador de pruebas) | ✅ | — |
| Botones sin acción | Todos los botones enlazan o ejecutan | ✅ | — |
| Menú móvil (abrir/cerrar, X, fuera, Escape, bloqueo scroll) | Funciona; 2 grupos (Competencia / Club y servicios / Más) | ✅ | `index.html`, `js/main.js` |
| Navegación por anclas (#nextMatch, #noticias…) | Funciona | ✅ | — |
| Botón volver arriba | Aparece tras scroll y funciona | ✅ | `js/main.js` |
| Carrusel + control de pausa | Pausa/reanuda accesible; clones ocultos a lectores | ✅ | `index.html`, `js/main.js` |
| Funcionamiento sin JavaScript | Contenido visible (las animaciones solo ocultan si corre `main.js`). Nav principal de escritorio visible. El menú hamburguesa requiere JS (comportamiento estándar) | ✅ / 🔧 | `css/main.css` |

## RESPONSIVE (sin desbordamiento horizontal)

| Ancho | overflow-X | Estado |
|---|---|---|
| 320 px | 0 | ✅ |
| 390 px | 0 | ✅ |
| 768 px | 0 | ✅ |
| 1024 px | 0 | ✅ |
| 1440 px | 0 | ✅ |
| 1920 px | 0 | ✅ |

- Textos cortados: no detectados. · Botones muy pequeños: táctiles ≥40–46 px. · Imágenes deformadas: `object-fit:cover` + `aspect-ratio`. · Menús fuera de pantalla: el minimenú se oculta <900 px y pasa al hamburguesa. · Superposición del encabezado: cabecera sticky con compensación. ✅

## ACCESIBILIDAD

| Comprobación | Estado | Nota |
|---|---|---|
| Navegación por teclado | ✅ | enlaces/botones enfocables; clones del carrusel con `tabindex=-1` |
| Estados focus visibles | ✅ | `:focus-visible` con contorno rojo |
| Contraste de texto | ✅ | texto claro sobre fondos oscuros; scrim reforzado en el hero |
| Textos alternativos | ✅ | imágenes con `alt`; decorativas con `alt=""`/`aria-hidden` |
| Jerarquía de títulos / un solo `<h1>` | ✅ | corregido en `hero-variantes.html` (tenía 4 → 1) |
| Etiquetas accesibles en iconos/botones | ✅ | `aria-label` en toggles, iconos `aria-hidden`, `aria-pressed` en pausa |
| Escape cierra el menú | ✅ | — |
| Respeto de `prefers-reduced-motion` | ✅ | desactiva reveal, marquees, glow y cuenta regresiva visual |
| Enlace "Saltar al contenido" | ✅ | presente en todas las páginas |

## CONTENIDO (demostrativo claramente marcado)

| Tema | Estado | Nota |
|---|---|---|
| Datos deportivos potencialmente falsos | 🧪 | Próximo partido tomado de la programación más reciente; estado "Por confirmar" |
| Fechas/resultados no confirmados | 🧪/📋 | sin cuenta regresiva hasta que haya fecha oficial |
| Tabla de posiciones | 🧪 | `tabla.html` marcada "Datos de demostración" |
| Estadísticas sin fuente | ✅ | no se inventan; cifras del club (1902, +120 años, 1970) |
| Patrocinadores no verificados | ✅ | "Auspiciadores" (no "oficiales") |
| Fotografías sin autorización clara | 📋 | imágenes del club con fines de prototipo; estadio con CC BY 4.0 atribuida |
| Testimonios falsos | ✅ | no hay testimonios; la frase de hinchada no se atribuye como oficial |
| Textos demo que parezcan oficiales | ✅ | jugador destacado y Rangers TV marcados como muestra/demostración |

## RENDIMIENTO

| Comprobación | Estado | Nota |
|---|---|---|
| Tamaño de imágenes | ✅ | `news-femenino` 1,07 MB → 97 KB; fotos de jugadores 45 MB → 1,8 MB |
| WebP/AVIF | ✅ / 🔧 | varias en WebP; resto JPEG optimizado. AVIF pendiente (opcional) |
| Lazy loading | ✅ | imágenes bajo el pliegue con `loading="lazy"` (escudo de cabecera carga eager) |
| Dimensiones de imágenes | ✅ | vía `width/height` o `aspect-ratio` en CSS (evita CLS) |
| Movimientos de contenido en carga (CLS) | ✅ | contenedores con `aspect-ratio`; minimenú en HTML (sin inyección) |
| CSS/JS innecesario | 🔧 | quedan estilos de la 1ª iteración sin uso (`.quick-access`, `.match`, `.hero-stripe`); no afectan, limpieza pendiente |
| Fuentes pesadas | ✅ | Google Fonts (Oswald + Inter) con `display=swap` |
| Conexión lenta | ✅ | sitio estático liviano; imágenes diferidas |

## SEGURIDAD Y ENLACES

| Comprobación | Estado |
|---|---|
| `target="_blank"` + `rel="noopener noreferrer"` | ✅ (0 incumplimientos) |
| Claves/datos privados en el repo | ✅ ninguno |
| Formularios a destinos inexistentes | ✅ no hay formularios |
| `noindex` configurado | ✅ `noindex, nofollow, noarchive` en las 12 páginas |
| Scripts externos innecesarios | ✅ solo Google Fonts; JS propio liviano, sin dependencias |

---

## Resumen de errores encontrados y corregidos en esta iteración

1. ✅ **Múltiples `<h1>`** en `hero-variantes.html` (4 → 1).
2. ✅ **`rel="noopener noreferrer"`** añadido a todos los enlaces `target="_blank"`.
3. ✅ **`loading="lazy"`** añadido a escudos/imágenes bajo el pliegue.
4. ✅ **`noindex`** y **footer discreto** en todas las páginas.
5. ✅ **Emojis** sustituidos por **SVG** en accesos y en la tienda.
6. ✅ Publicación en **GitHub Pages** verificada (HTTP 200 en portada, CSS, subpáginas y assets).

### Pendientes conocidos (ver `TODO-PROTOTIPO.md`)
- 🔧 Limpieza de CSS sin uso de la 1ª iteración.
- 🎨 Menú hamburguesa de **subpáginas** aún usa la nav estándar (el de 2 grupos está en la portada).
- 📋 Datos deportivos, fotografías definitivas, patrocinadores y textos legales a confirmar por el cliente.
