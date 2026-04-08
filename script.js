/* ============================================
   INDIAN ROCKS BEACH GUIDE — SCRIPTS
   Nav scroll, active sections, reveal, back-to-top
   ============================================ */

(function () {
  'use strict';

  /* ─── NAV SCROLL BEHAVIOR ─── */
  const header = document.getElementById('site-header');
  const SCROLL_THRESHOLD = 80;

  function updateNavState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavState, { passive: true });
  updateNavState(); // initial state

  /* ─── MOBILE HAMBURGER ─── */
  const hamburger = document.getElementById('nav-hamburger');
  const navDrawer = document.getElementById('nav-drawer');

  if (hamburger && navDrawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      navDrawer.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close drawer on nav link click (mobile)
    navDrawer.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        navDrawer.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) && navDrawer.classList.contains('open')) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        navDrawer.classList.remove('open');
      }
    });
  }

  /* ─── ACTIVE NAV SECTION ─── */
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];

  navLinks.forEach(function (link) {
    const sectionId = link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({ link: link, section: section });
    }
  });

  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('data-section') === activeId);
            });
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach(function (item) {
      sectionObserver.observe(item.section);
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Immediately show all elements
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target); // fire once
            }
          });
        },
        {
          rootMargin: '0px 0px -60px 0px',
          threshold: 0.05,
        }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ─── BACK TO TOP ─── */
  const backToTopBtn = document.getElementById('back-to-top');
  const BACK_TO_TOP_THRESHOLD = 500;

  if (backToTopBtn) {
    function updateBackToTop() {
      if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
