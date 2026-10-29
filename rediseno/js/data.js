/* ================================================================
   Datos editables del PROTOTIPO — Rangers de Talca (rediseño v2)
   ----------------------------------------------------------------
   Edita AQUÍ la información del prototipo. Lo marcado como "demo" o
   "por confirmar" NO es información oficial: es contenido de
   demostración mientras no exista una fuente verificada.
   Este archivo se carga ANTES de main.js; si no carga, la página
   sigue mostrando el contenido por defecto escrito en el HTML.
   ================================================================ */
window.RANGERS_DATA = {

  /* ---- Próximo partido (módulo de la portada) ---- */
  proximoPartido: {
    rival: "Deportes Santa Cruz",
    rivalCorto: "D. Santa Cruz",         // nombre corto para el módulo
    condicion: "Visita",                 // "Local" o "Visita"
    hora: "12:30 h",
    fechaTexto: "Fecha por confirmar",   // texto que se muestra
    kickoff: null,                       // ISO (p.ej. "2026-11-09T12:30:00-03:00") para activar el cronómetro; null = "Por confirmar"
    competencia: "Liga de Ascenso 2026 · Última fecha",
    estadio: "Estadio Municipal Joaquín Muñoz García, Santa Cruz",
    estado: "Información por confirmar"
  },

  /* ---- Jugador destacado (editable; no inventar como oficial) ---- */
  jugadorDestacado: {
    nombre: "José Luis Gamonal",
    posicion: "Arquero",
    equipo: "Primer equipo",
    foto: "assets/img/jugadores/Jose-Luis-Gamonal.webp",
    cita: "El arco rojinegro.",
    nota: "Ficha de demostración",       // aviso de que no es dato oficial
    demo: true
  }
};
