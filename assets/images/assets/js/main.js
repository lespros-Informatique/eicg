/* ============================================================
   SCRIPTS PRINCIPAUX – Groupe EICG
   Fichier : assets/js/main.js
============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. PAGE LOADER
  ============================================================ */
  window.addEventListener('load', function () {
    var loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
        // Déclencher les animations du hero après le loader
        triggerHeroAnimations();
      }, 400);
    }
  });

  /* ============================================================
     2. SCROLL REVEAL – Intersection Observer
  ============================================================ */
  function initScrollReveal() {
    var animatedElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate'
    );

    if (!animatedElements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Animations du hero au chargement */
  function triggerHeroAnimations() {
    var heroElements = document.querySelectorAll(
      '#hero .reveal, #hero .reveal-left, #hero .reveal-right, #hero .reveal-scale'
    );
    heroElements.forEach(function (el) {
      el.classList.add('active');
    });
  }

  /* ============================================================
     3. STICKY HEADER – Ombre au scroll
  ============================================================ */
  function initHeaderScroll() {
    var header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ============================================================
     4. NAV LINK ACTIVE au scroll
  ============================================================ */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    if (!sections.length || !navLinks.length) return;

    function highlight() {
      var scrollY = window.pageYOffset;
      sections.forEach(function (section) {
        var top = section.offsetTop - 150;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlight, { passive: true });
  }

  /* ============================================================
     5. BOUTON RETOUR EN HAUT
  ============================================================ */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     6. SMOOTH SCROLL pour les ancres
  ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // Fermer le menu mobile si ouvert
        var navCollapse = document.getElementById('navbarMain');
        if (navCollapse && navCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }

        var headerOffset = 90;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      });
    });
  }

  /* ============================================================
     7. SWIPER – Actualités
  ============================================================ */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    var swiperEl = document.querySelector('.newsSwiper');
    if (!swiperEl) return;

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        576: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ============================================================
     8. FORMULAIRE DE CONTACT
  ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var submitBtn = document.getElementById('submitBtn');
    var btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    var btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;
    var formAlert = document.getElementById('formAlert');
    var formError = document.getElementById('formError');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (formAlert) formAlert.classList.add('d-none');
      if (formError) formError.classList.add('d-none');

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        if (formError) formError.classList.remove('d-none');
        return;
      }

      // Simulation d'envoi
      if (btnText) btnText.classList.add('d-none');
      if (btnLoading) btnLoading.classList.remove('d-none');
      submitBtn.disabled = true;

      setTimeout(function () {
        if (btnText) btnText.classList.remove('d-none');
        if (btnLoading) btnLoading.classList.add('d-none');
        submitBtn.disabled = false;
        form.reset();
        form.classList.remove('was-validated');
        if (formAlert) formAlert.classList.remove('d-none');
      }, 2000);
    });
  }

  /* ============================================================
     9. ANNÉE COURANTE dans le footer
  ============================================================ */
  function initFooterYear() {
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ============================================================
     10. TILT EFFECT sur les cartes (subtil au survol)
  ============================================================ */
  function initTiltEffect() {
    var cards = document.querySelectorAll('.prog-card, .value-item, .news-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 25;
        var rotateY = (centerX - x) / 25;

        card.style.transform =
          'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     11. IMAGES – Lazy fade-in
  ============================================================ */
  function initImageFade() {
    var images = document.querySelectorAll('img');
    if (!images.length) return;

    var imgObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.add('loaded');
          imgObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '100px' }
    );

    images.forEach(function (img) {
      img.classList.add('img-fade-in');
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        imgObserver.observe(img);
        img.addEventListener('load', function () {
          img.classList.add('loaded');
        });
        img.addEventListener('error', function () {
          img.classList.add('loaded');
        });
      }
    });
  }

  /* ============================================================
     INITIALISATION GLOBALE
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initHeaderScroll();
    initActiveNav();
    initBackToTop();
    initSmoothScroll();
    initSwiper();
    initContactForm();
    initFooterYear();
    initTiltEffect();
    initImageFade();
  });
})();
