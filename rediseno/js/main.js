/* Rangers de Talca — interacciones de la portada
   Mejora progresiva: si este archivo no carga, la página sigue siendo
   usable (contenido visible, enlaces y menú por anclas funcionan). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menú móvil con foco atrapado ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  var closeBtn = document.getElementById("navClose");
  var lastFocused = null;

  function focusable() {
    return menu.querySelectorAll('a[href], button:not([disabled])');
  }

  function openMenu() {
    lastFocused = document.activeElement;
    menu.hidden = false;
    // fuerza reflow para que la transición de entrada se aplique
    void menu.offsetWidth;
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    var f = focusable();
    if (f.length) f[0].focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeydown);
    var finish = function () {
      menu.hidden = true;
      menu.removeEventListener("transitionend", finish);
    };
    if (reduceMotion) finish();
    else menu.addEventListener("transitionend", finish);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key === "Tab") {
      var f = focusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  if (toggle && menu && closeBtn) {
    toggle.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    menu.addEventListener("click", function (e) {
      if (e.target === menu) closeMenu();               // click en el velo
    });
    // cerrar al pulsar un enlace del menú
    menu.querySelectorAll("a[href]").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Reveal al entrar en viewport (una sola vez) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Botón volver arriba ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) toTop.hidden = false;
      // pequeño retraso para permitir la transición tras quitar [hidden]
      requestAnimationFrame(function () {
        toTop.classList.toggle("show", window.scrollY > 600);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
