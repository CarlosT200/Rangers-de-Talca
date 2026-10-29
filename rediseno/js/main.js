/* Rangers de Talca — interacciones de la portada
   Mejora progresiva: si este archivo no carga, la página sigue usable
   (contenido visible, enlaces y menú por anclas funcionan). */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DATA = window.RANGERS_DATA || {};

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

    /* Failsafe: si la pestaña carga en segundo plano o el observer no dispara,
       muestra igual lo que ya está en pantalla (el scroll revela el resto). */
    var revealInView = function(){
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function(el){
        if (el.classList.contains("is-visible")) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.98 && r.bottom > 0){ el.classList.add("is-visible"); }
      });
    };
    window.addEventListener("load", revealInView);
    window.addEventListener("scroll", revealInView, { passive:true });
    document.addEventListener("visibilitychange", function(){ if (!document.hidden) revealInView(); });
    setTimeout(revealInView, 1000);
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

  /* ---------- Marquees: duplica el contenido (clones ocultos a lectores) ---------- */
  function seamless(track){
    if (!track) return;
    var kids = Array.prototype.slice.call(track.children);
    kids.forEach(function(node){
      var clone = node.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      if (clone.hasAttribute && clone.hasAttribute("href")) clone.setAttribute("tabindex", "-1");
      var f = clone.querySelectorAll ? clone.querySelectorAll("a[href],button") : [];
      for (var i = 0; i < f.length; i++) f[i].setAttribute("tabindex", "-1");
      track.appendChild(clone);
    });
  }
  seamless(document.querySelector(".ticker-track"));
  seamless(document.querySelector(".marquee-track"));

  /* ---------- Pausar/reanudar el carrusel de auspiciadores ---------- */
  var mqPause = document.getElementById("mqPause");
  var sponsorsMarquee = document.getElementById("sponsorsMarquee");
  if (mqPause && sponsorsMarquee){
    mqPause.addEventListener("click", function(){
      var paused = sponsorsMarquee.classList.toggle("is-paused");
      mqPause.setAttribute("aria-pressed", paused ? "true" : "false");
      var txt = mqPause.querySelector(".mq-pause-txt");
      if (txt) txt.textContent = paused ? "Reanudar" : "Pausar";
    });
  }

  /* ---------- Cuenta regresiva del próximo partido ---------- */
  var nm = document.getElementById("nextMatch");
  if (nm){
    var pp = DATA.proximoPartido;
    if (pp){
      var compEl = nm.querySelector(".nm-comp"); if (compEl && pp.competencia) compEl.textContent = pp.competencia;
      var rivalEl = nm.querySelector(".nm-name"); if (rivalEl && (pp.rivalCorto || pp.rival)) rivalEl.textContent = pp.rivalCorto || pp.rival;
      var whenEl = nm.querySelector(".nm-when"); if (whenEl){ whenEl.textContent = [pp.condicion, pp.hora, pp.fechaTexto].filter(Boolean).join(" · "); }
      if (pp.kickoff) nm.setAttribute("data-kickoff", pp.kickoff);
    }
    var kickoff = nm.getAttribute("data-kickoff");
    var target = kickoff ? new Date(kickoff).getTime() : NaN;
    var wrap = nm.querySelector(".nm-countdown");
    var cd = {
      days: nm.querySelector('[data-cd="days"]'),
      hours: nm.querySelector('[data-cd="hours"]'),
      mins: nm.querySelector('[data-cd="mins"]'),
      secs: nm.querySelector('[data-cd="secs"]')
    };
    var pad = function(n){ return (n < 10 ? "0" : "") + n; };
    var timer;
    var tick = function(){
      var diff = target - Date.now();
      if (diff <= 0){
        if (wrap) wrap.innerHTML = '<span class="nm-live">¡Hoy juega Rangers!</span>';
        if (timer) clearInterval(timer);
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if (cd.days) cd.days.textContent = d;
      if (cd.hours) cd.hours.textContent = pad(h);
      if (cd.mins) cd.mins.textContent = pad(m);
      if (cd.secs) cd.secs.textContent = pad(s);
    };
    if (!isNaN(target)){ tick(); timer = setInterval(tick, 1000); }
    else if (wrap){ wrap.innerHTML = '<span class="nm-live">Por confirmar</span>'; }
  }

  /* ---------- Jugador destacado (datos editables desde data.js) ---------- */
  var fp = document.getElementById("featuredPlayer");
  if (fp && DATA.jugadorDestacado){
    var j = DATA.jugadorDestacado;
    var setTxt = function(sel, val){ var e = fp.querySelector(sel); if (e && val != null) e.textContent = val; };
    var fimg = fp.querySelector("[data-fp='foto']");
    if (fimg && j.foto){ fimg.setAttribute("src", j.foto); fimg.setAttribute("alt", j.nombre || ""); }
    setTxt("[data-fp='nombre']", j.nombre);
    setTxt("[data-fp='posicion']", j.posicion);
    setTxt("[data-fp='equipo']", j.equipo);
    setTxt("[data-fp='cita']", j.cita);
    setTxt("[data-fp='nota']", j.nota);
  }
})();
