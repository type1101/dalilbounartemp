/* ============================================================
   DALIL BOUNAR — PORTFOLIO JS
   Rewritten: no custom cursor, no parallax bug
   ============================================================ */

// ── NAVBAR ────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

// ── HAMBURGER ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ── SMOOTH SCROLL ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 72,
        behavior: 'smooth'
      });
    }
  });
});

// ── ACTIVE NAV ────────────────────────────────────────────────
const navAnchors = document.querySelectorAll('.nav-link:not(.nav-cta)');
const allSections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  allSections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + sec.id) {
          a.style.color = 'var(--charcoal)';
          a.style.fontWeight = '700';
        } else {
          a.style.fontWeight = '';
        }
      });
    }
  });
}

// ── ROLE CHIPS ROTATOR ────────────────────────────────────────
const chips = document.querySelectorAll('.role-chip');
let activeChip = 0;

setInterval(() => {
  chips[activeChip].classList.remove('active');
  activeChip = (activeChip + 1) % chips.length;
  chips[activeChip].classList.add('active');
}, 2600);

// ── TYPEWRITER ────────────────────────────────────────────────
const lines = [
  '{',
  '  "name":     "Dalil Bounar",',
  '  "location": "Paris, France",',
  '  "school":   "IPSSI Paris",',
  '  "level":    "BTS SIO SLAM",',
  '  "focus": [',
  '    "Data", "IA", "BI"',
  '  ],',
  '  "stack": [',
  '    "Python", "Power BI",',
  '    "SQL", "JavaScript"',
  '  ],',
  '  "status": "Open to work 🚀"',
  '}',
];

function hlLine(line) {
  return line
    .replace(/("[^"]+")(\s*:)/g, '<span style="color:#f59e0b">$1</span>$2')
    .replace(/(?<=:\s*)("[^"]*")/g, '<span style="color:#86efac">$1</span>')
    .replace(/[\[\]{}]/g, '<span style="color:#93c5fd">$&</span>');
}

const codeEl = document.getElementById('typeCode');
let li = 0, ci = 0, current = '';
let typing = true;

function typeStep() {
  if (!typing || li >= lines.length) return;
  if (ci < lines[li].length) {
    current += lines[li][ci++];
    const done = lines.slice(0, li).map(hlLine).join('\n');
    codeEl.innerHTML = (done ? done + '\n' : '') + hlLine(current);
    setTimeout(typeStep, 18);
  } else {
    const done = lines.slice(0, li + 1).map(hlLine).join('\n');
    codeEl.innerHTML = done;
    li++; ci = 0; current = '';
    setTimeout(typeStep, 55);
  }
}

// Start only when about section enters viewport
const aboutEl = document.getElementById('about');
const typeObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && li === 0) {
    setTimeout(typeStep, 300);
    typeObs.disconnect();
  }
}, { threshold: 0.25 });
typeObs.observe(aboutEl);

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseFloat(
        getComputedStyle(entry.target).getPropertyValue('--delay') || '0'
      ) * 1000;
      setTimeout(() => entry.target.classList.add('revealed'), delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// Hero reveals on page load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 200 + i * 140);
  });
});

// ── SKILL BARS ────────────────────────────────────────────────
const bars = document.querySelectorAll('.bar-fill');

const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.width = entry.target.dataset.w + '%';
      }, 150);
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(b => barObs.observe(b));

// ── CONTACT FORM ──────────────────────────────────────────────
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const ok  = document.getElementById('formOk');

  btn.querySelector('span').textContent = 'Envoi…';
  btn.disabled = true;

  setTimeout(() => {
    btn.querySelector('span').textContent = 'Envoyé ✓';
    ok.classList.add('show');
    setTimeout(() => {
      btn.querySelector('span').textContent = 'Envoyer';
      btn.disabled = false;
      ok.classList.remove('show');
      e.target.reset();
    }, 3500);
  }, 1200);
}
