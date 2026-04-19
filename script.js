// WIP banner — persist dismiss in localStorage
const wipBanner = document.getElementById('wipBanner');
const wipClose = document.getElementById('wipClose');

if (localStorage.getItem('wip-dismissed')) {
  wipBanner.classList.add('hidden');
}

wipClose.addEventListener('click', () => {
  wipBanner.classList.add('hidden');
  localStorage.setItem('wip-dismissed', '1');
});

// Nav scroll effect — offset for WIP banner height
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hero Ken Burns
window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('loaded');
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.classList.toggle('active');
});

links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('active');
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => {
  const siblings = [...el.parentElement.querySelectorAll('.reveal')];
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = `${idx * 0.1}s`;
  revealObserver.observe(el);
});

// Hide placeholder once Behold widget renders real content
const beholdWidget = document.getElementById('behold-widget');
const placeholder = document.getElementById('instagramPlaceholder');

if (beholdWidget && placeholder) {
  const beholdObserver = new MutationObserver(() => {
    if (beholdWidget.children.length > 0) {
      placeholder.style.display = 'none';
      beholdObserver.disconnect();
    }
  });
  beholdObserver.observe(beholdWidget, { childList: true, subtree: true });

  // Fallback: if still empty after 4s, keep placeholder visible
  setTimeout(() => {
    if (beholdWidget.children.length === 0) {
      beholdObserver.disconnect();
    }
  }, 4000);
}

// Contact form
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Replace with real endpoint / Formspree when ready
  setTimeout(() => {
    form.reset();
    success.classList.add('show');
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1000);
});

// Smooth scroll with nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + (wipBanner.classList.contains('hidden') ? 0 : wipBanner.offsetHeight) + 20;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
