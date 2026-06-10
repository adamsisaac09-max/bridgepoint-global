/* ═══════════════════════════════════════════════════════════
   BRIDGE POINT GLOBAL — main.js
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── NAV SCROLL BEHAVIOUR ──────────────────────────────────
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── MOBILE NAV TOGGLE ─────────────────────────────────────
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      // Animate hamburger to X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ── SCROLL ANIMATIONS ─────────────────────────────────────
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything
    animatedEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── CONTACT FORM ──────────────────────────────────────────
  const form = document.getElementById('engage-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Collect data
      const data = {
        name:         form.name.value.trim(),
        organisation: form.organisation.value.trim(),
        email:        form.email.value.trim(),
        message:      form.message.value.trim(),
      };

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        showFormMessage(form, 'Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(data.email)) {
        showFormMessage(form, 'Please enter a valid email address.', 'error');
        return;
      }

      // Sending state
      btn.textContent = 'Sending…';
      btn.disabled    = true;

      try {
        // ── Formspree integration ──────────────────────────
        // Replace YOUR_FORM_ID with your Formspree form ID
        // Sign up free at formspree.io
        const FORMSPREE_ID = 'YOUR_FORM_ID';

        if (FORMSPREE_ID !== 'YOUR_FORM_ID') {
          const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body:    JSON.stringify(data),
          });

          if (!res.ok) throw new Error('Network response was not ok');
        }

        // Success — works even without Formspree in demo mode
        form.reset();
        showFormMessage(
          form,
          'Your message has been sent. We will respond within 48 hours.',
          'success'
        );
      } catch (err) {
        showFormMessage(form, 'Something went wrong. Please email us directly.', 'error');
      } finally {
        btn.textContent = originalText;
        btn.disabled    = false;
      }
    });
  }

  function showFormMessage(form, text, type) {
    // Remove any existing message
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className  = `form-message form-message--${type}`;
    msg.textContent = text;
    msg.style.cssText = `
      grid-column: 1 / -1;
      margin-top: 16px;
      font-size: 13px;
      letter-spacing: 0.04em;
      color: ${type === 'success' ? '#C8883A' : '#E07060'};
    `;
    form.appendChild(msg);

    if (type === 'success') {
      setTimeout(() => msg.remove(), 6000);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ── HERO PARALLAX (subtle) ────────────────────────────────
  const heroScene = document.querySelector('.hero__scene');

  if (heroScene && window.matchMedia('(min-width: 768px)').matches) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroH   = document.querySelector('.hero').offsetHeight;
          if (scrollY < heroH) {
            const progress = scrollY / heroH;
            heroScene.style.transform = `translateY(${progress * 40}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
