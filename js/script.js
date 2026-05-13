/* ============================================================
   SHAKTI GROUP — Main Script
   ============================================================ */

/* ─── NAVBAR: scroll state + active section ─────────────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-links a');
const sections  = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  updateNavbar();
  updateActiveLink();
}, { passive: true });

updateNavbar();

/* ─── MOBILE MENU ────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── REVEAL ON SCROLL ───────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach((el, i) => {
  // Stagger siblings within the same parent
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const sibIndex = siblings.indexOf(el);
  if (sibIndex > 0) {
    el.style.transitionDelay = `${sibIndex * 0.1}s`;
  }
  revealObserver.observe(el);
});

/* ─── ANIMATED COUNTERS ──────────────────────────────────── */
const counterEls = document.querySelectorAll('.hstat-num');

function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start   = performance.now();

  function step(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

/* ─── SMOOTH SCROLL for nav links ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── CONTACT FORM (client-side only) ───────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.createElement('div');
formSuccess.className = 'form-success';
formSuccess.innerHTML = `
  <div class="fs-check">✓</div>
  <h4>Message sent!</h4>
  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
`;

if (form) {
  form.parentElement.appendChild(formSuccess);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate a short delay then show success
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('visible');
    }, 800);
  });
}

/* ─── PARALLAX on hero orbs (lightweight) ───────────────── */
const orbs = document.querySelectorAll('.hero .orb');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.15;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
}, { passive: true });

/* ─── HOVER glow on division cards ──────────────────────── */
document.querySelectorAll('.dv-card, .pstep, .av-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });
});
