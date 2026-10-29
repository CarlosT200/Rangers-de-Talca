/* Rangers de Talca — interacciones de la portada
   Mejora progresiva: si este archivo no carga, la página sigue usable
   (contenido visible, enlaces y menú por anclas funcionan). */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menú móvil con foco atrapado ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  var closeBtn = document.getElementById("navClose");
  var lastFocused = null;
  function focusable(){ return menu.querySelectorAll('a[href],button:not([disabled])'); }
  function openMenu(){
    lastFocused = document.activeElement;
    menu.hidden = false; void menu.offsetWidth;
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded","true");
    var f = focusable(); if (f.length) f[0].focus();
    document.addEventListener("keydown", onKey);
  }
  function closeMenu(){
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded","false");
    document.removeEventListener("keydown", onKey);
    var done = function(){ menu.hidden = true; menu.removeEventListener("transitionend", done); };
    if (reduce) done(); else menu.addEventListener("transitionend", done);
    if (lastFocused) lastFocused.focus();
  }
  function onKey(e){
    if (e.key === "Escape"){ closeMenu(); return; }
    if (e.key === "Tab"){
      var f = focusable(); if (!f.length) return;
      var first = f[0], last = f[f.length-1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }
  if (toggle && menu && closeBtn){
    toggle.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    menu.addEventListener("click", function(e){ if (e.target === menu) closeMenu(); });
    menu.querySelectorAll("a[href]").forEach(function(a){ a.addEventListener("click", closeMenu); });
  }

  /* ---------- Reveal al entrar en viewport (una vez) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)){
    reveals.forEach(function(el){ el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin:"0px 0px -8% 0px", threshold:.12 });
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Header: estado "scrolled" + barra de progreso ---------- */
  var header = document.getElementById("siteHeader");
  var progress = document.getElementById("progress");
  var ticking = false;
  function onScroll(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle("scrolled", y > 20);
      if (progress){
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
      var tt = document.getElementById("toTop");
      if (tt){ tt.hidden = false; tt.classList.toggle("show", y > 600); }
      // parallax del hero
      if (!reduce && heroMedia && y < window.innerHeight){
        heroMedia.style.transform = "translateY(" + (y * 0.18) + "px)";
      }
      ticking = false;
    });
  }
  var heroMedia = document.querySelector(".hero-media[data-parallax]");
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  var toTop = document.getElementById("toTop");
  if (toTop){ toTop.addEventListener("click", function(){ window.scrollTo({ top:0, behavior: reduce ? "auto" : "smooth" }); }); }

  /* ---------- Contadores (count-up) ---------- */
  function countUp(el){
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (reduce){ el.textContent = String(target); return; }
    var dur = 1100, start = null, from = 0;
    function step(ts){
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(from + (target - from) * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length){
    if (reduce || !("IntersectionObserver" in window)){
      counters.forEach(countUp);
    } else {
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if (en.isIntersecting){ countUp(en.target); cio.unobserve(en.target); } });
      }, { threshold:.5 });
      counters.forEach(function(c){ cio.observe(c); });
    }
  }

  /* ---------- Marquees: duplica el contenido para bucle continuo ---------- */
  function seamless(track){
    if (!track) return;
    var html = track.innerHTML;
    track.innerHTML = html + html;   // dos copias -> translateX(-50%) encaja
  }
  seamless(document.querySelector(".ticker-track"));
  seamless(document.querySelector(".marquee-track"));
})();
