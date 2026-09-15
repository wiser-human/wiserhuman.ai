// Shared behaviour: current year in the footer + the Menu dropdown.
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  function close() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') close(); });
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();

// Cookie consent banner: reads/writes the choice made in index.html's
// inline consent-mode bootstrap. Non-modal by design (see styles.css) —
// never steals focus, never blocks the page.
(function () {
  var STORAGE_KEY = 'cookie_consent'; // 'granted' | 'denied'
  var banner = document.getElementById('cookie-banner');
  if (!banner || typeof window.gtag !== 'function') return;

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  if (stored === 'granted' || stored === 'denied') {
    window.gtag('consent', 'update', { analytics_storage: stored });
    return;
  }

  banner.hidden = false;

  function choose(value) {
    window.gtag('consent', 'update', { analytics_storage: value });
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    banner.hidden = true;
  }

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { choose('granted'); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { choose('denied'); });
})();
