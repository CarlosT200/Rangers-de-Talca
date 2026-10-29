(function () {
  var btn = document.querySelector('.burger');
  var nav = document.getElementById('menu');
  var mq = window.matchMedia('(max-width: 899px)');
  if (!btn || !nav) return;

  function focusables() { return nav.querySelectorAll('a[href]'); }
  function setOpen(open, restore) {
    btn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) { var f = focusables()[0]; if (f) f.focus(); }
    else if (restore) btn.focus();
  }
  function sync() {
    // en móvil el menú cerrado no debe ser alcanzable por teclado
    if (mq.matches && btn.getAttribute('aria-expanded') !== 'true') nav.setAttribute('inert', '');
    else nav.removeAttribute('inert');
    if (!mq.matches) setOpen(false, false);
  }

  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') !== 'true';
    nav.removeAttribute('inert');
    setOpen(open, !open);
    if (!open) sync();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setOpen(false, true); sync(); return; }
    if (e.key === 'Tab' && btn.getAttribute('aria-expanded') === 'true') {
      var items = [btn].concat([].slice.call(focusables()));
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && mq.matches) { setOpen(false, false); sync(); }
  });
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(sync);
  sync();
})();
