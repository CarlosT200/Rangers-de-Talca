# TODO — Prototipo Rangers de Talca (rediseño)

Lista de lo que **debe confirmar o aportar el cliente** antes de que esta vista previa
pueda considerarse un sitio definitivo. Esta versión es un **prototipo** (no reemplaza el sitio oficial).

**Leyenda:** ✅ Corregido · 🔧 Pendiente técnico · 🎨 Pendiente de diseño · 📋 Pendiente de información del cliente · 🧪 Contenido de demostración.

---

## Pendiente de información del cliente 📋
- **Datos deportivos**: fixture completo, rivales, fechas y horas oficiales (hoy: "Por confirmar").
- **Próximos partidos**: confirmar el próximo encuentro para activar la cuenta regresiva (`js/data.js`).
- **Tabla oficial**: reemplazar la tabla demostrativa (`tabla.html`) por la posición real de la ANFP / Liga de Ascenso.
- **Planteles**: validar nómina, dorsales y cuerpo técnico (primer equipo, femenino, formativo).
- **Fotografías definitivas**: fotos oficiales y autorizadas (hero, jugadores, estadio, noticias).
- **Patrocinadores**: lista verificada y autorización de uso de logos (hoy "Auspiciadores", muestra).
- **Enlaces sociales**: confirmar Instagram, X y YouTube definitivos.
- **Contenido de tienda**: productos y precios reales (hoy vitrina de demostración, sin compra).
- **Videos (Rangers TV)**: miniatura, título y duración reales (hoy "Contenido de muestra").
- **Textos legales / Política de privacidad**: términos, cookies y aviso legal.
- **Derechos de imágenes**: confirmar licencias/autorizaciones de todas las fotos.
- **Hosting y dominio definitivos**: dónde se publicará la versión oficial.

## Contenido de demostración 🧪 (reemplazar por datos reales)
- Módulo "Próximo partido": rival/fecha/hora provisionales, estado "Por confirmar".
- `tabla.html`: posiciones y puntos **no oficiales**.
- "Jugador destacado": ficha editable de muestra (`js/data.js`).
- Rangers TV: tarjeta con título/duración de muestra.
- Datos del estadio: capacidad "Información por confirmar".

## Pendiente de diseño 🎨
- Revisar variante de hero elegida (ver `hero-variantes.html`): el cliente mantiene la actual.
- Afinar placeholders de producto si se incorporan fotos reales de la tienda.

## Pendiente técnico 🔧
- Limpieza de CSS sin uso de la 1ª iteración (`.quick-access`, `.match`, `.hero-stripe`, estilos `qa-*`).
- Evaluar formatos AVIF y `srcset` responsivo para imágenes grandes.
- Página 404 personalizada para GitHub Pages (opcional).
- Revisión de performance con Lighthouse en la URL publicada.

## Ya resuelto en el prototipo ✅
- Publicación activa en GitHub Pages (preview) desde `rediseno/`.
- `noindex` para que la vista previa no aparezca en buscadores.
- Minimenú superior + menú móvil en grupos (en todas las páginas).
- Fondo rojinegro, estados de partido, placeholders SVG, accesibilidad base.
- Optimización de imágenes pesadas.

---

> Mientras existan puntos 📋 y 🧪, esta vista previa **no debe presentarse como el sitio oficial publicado**.
