/* ===== Acarani landing interactions ===== */

// Sticky nav state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');
const backdrop = document.getElementById('navBackdrop');
const setMenu = (open) => {
  links.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  backdrop.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
backdrop.addEventListener('click', () => setMenu(false));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const fmt = (n) => n.toLocaleString('id-ID');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.firstChild && (el.childNodes[0].nodeValue = prefix + fmt(Math.round(target * eased)) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.num[data-count]').forEach(el => counterIO.observe(el));

// FAQ accordion
document.querySelectorAll('.qa__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const qa = btn.parentElement;
    const ans = qa.querySelector('.qa__a');
    const open = qa.classList.contains('open');
    document.querySelectorAll('.qa.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.qa__a').style.maxHeight = null;
    });
    if (!open) {
      qa.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// Subtle hero parallax
const art = document.querySelector('.hero__art');
if (art && window.matchMedia('(min-width: 980px)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 800) art.style.transform = `translateY(${y * 0.04}px)`;
  }, { passive: true });
}

// Drifting sparkles — injected into a few key sections
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function seedSparkles(target, count, rose) {
  if (!target) return;
  const layer = document.createElement('div');
  layer.className = 'sparkle-layer';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle' + (rose ? ' rose' : '');
    s.style.left = (Math.random() * 100).toFixed(2) + '%';
    s.style.top = (Math.random() * 100).toFixed(2) + '%';
    s.style.setProperty('--sz', (3 + Math.random() * 5).toFixed(1) + 'px');
    s.style.setProperty('--d', (6 + Math.random() * 8).toFixed(2) + 's');
    s.style.setProperty('--delay', (-Math.random() * 12).toFixed(2) + 's');
    layer.appendChild(s);
  }
  target.prepend(layer);
}
if (!reduceMotion) {
  seedSparkles(document.querySelector('.hero'), 16, true);
  seedSparkles(document.querySelector('.stats'), 14);
  seedSparkles(document.querySelector('.selfhost'), 22);
  seedSparkles(document.querySelector('.final__box'), 20);
}

// Richer section entrances: directional reveals + staggered card grids
document.querySelectorAll('.feat').forEach(f => {
  f.classList.add(f.classList.contains('rev') ? 'from-right' : 'from-left');
});
document.querySelectorAll('.cards3, .pillars, .roles__grid, .price__grid, .selfhost__grid')
  .forEach(grid => {
    [...grid.children].forEach((child, i) => {
      if (!child.classList.contains('reveal')) child.classList.add('reveal');
      child.classList.add('zoom');
      child.style.transitionDelay = (i * 0.09) + 's';
      io.observe(child);
    });
  });
