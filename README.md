# Clon front-end — Portal Rangers de Talca

Copia del **front-end** del sitio original, pensada como base para rediseñar y
prototipar. **No incluye back-end** (WordPress, base de datos, PHP ni APIs
internas): eso vive en el servidor y no es accesible desde el navegador.

- **Fuente:** https://www.rangersdetalca.com/portal/
- **Capturado:** 2026-10-28
- **Stack original detectado:** WordPress + tema *Splash* y varios plugins.

## Qué contiene

```
index.html          # HTML de la portada (código fuente del servidor)
index_raw.html      # HTML original sin modificar (respaldo, por si lo necesitas)
assets/css/         # 19 hojas de estilo propias del sitio (el diseño, editable)
assets/js/          # 30 scripts propios del sitio
manifest.json       # mapa URL original -> archivo local
```

## Qué es local y qué es remoto

| Recurso | Estado | Por qué |
|---|---|---|
| HTML | **Local** | Es lo que vas a reestructurar. |
| CSS propio del sitio | **Local** | Es el diseño; acá lo editas. Las rutas internas (`url(...)`) se reescribieron a absolutas para que fondos e íconos sigan cargando. |
| JS propio del sitio | **Local** | Para que la página funcione y puedas estudiarla. |
| Imágenes y fuentes | **Remotas** | Apuntan al servidor original para no inflar el repo. |
| Google Maps, YouTube, Google APIs, FontAwesome CDN | **Remotos** | Servicios de terceros. |

> Un único archivo (`svg-with-js.css`, un shim de FontAwesome servido por HTTP)
> no se pudo descargar y quedó apuntando a su URL original. No afecta el diseño.

## Cómo previsualizarlo

Ábrelo con un servidor local (con internet activo, para que carguen las
imágenes remotas):

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000 en tu navegador
```

Abrir `index.html` con doble clic también funciona, pero un servidor local
evita problemas con rutas y CORS.

## Si más adelante quieres hacerlo 100% offline

Habría que descargar las imágenes y fuentes al repo y reapuntar las rutas.
Puedo generarte un script para eso cuando lo necesites.

---
*Clon con fines de estudio, rediseño y prototipado. Mantén el repositorio
privado y no lo publiques como si fuera el sitio oficial.*
