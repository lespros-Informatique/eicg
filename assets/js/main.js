/* ================================================================
   EICG – École d'Excellence | JavaScript (jQuery)
   Auteur  : Template Scolaire
   Version : 1.0.0
   ================================================================ */

$(document).ready(function() {
    "use strict";

    // 1. Mise à jour de l'année en cours dans le footer
    $('#currentYear').text(new Date().getFullYear());

    // 2. Gestion du Header au défilement (Scroll)
    var header = $('#mainNav');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    // 3. Gestion du bouton "Retour en haut" (Back to Top)
    var backToTopBtn = $('#backToTop');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            backToTopBtn.addClass('visible');
        } else {
            backToTopBtn.removeClass('visible');
        }
    });

    backToTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    // 4. Fermeture automatique du menu mobile après clic sur un lien
    $('.navbar-nav .nav-link:not(.dropdown-toggle)').on('click', function() {
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').click();
        }
    });

    // 5. Animation simple des compteurs (Statistiques Hero)
    var statsAnimated = false;
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var target = parseInt($this.attr('data-target'));
            $({ countNum: 0 }).animate({
                countNum: target
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Lancement de l'animation des stats
    if ($('#hero').length > 0) {
        animateCounters();
    }

    // 6. Gestion et validation du formulaire de contact en jQuery
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var form = $(this);
        var alertSuccess = $('#formAlert');
        var alertError = $('#formError');
        var submitBtn = $('#submitBtn');

        // Cacher les alertes précédentes
        alertSuccess.addClass('d-none');
        alertError.addClass('d-none');

        // Vérification HTML5 Bootstrap
        if (this.checkValidity() === false) {
            e.stopPropagation();
            form.addClass('was-validated');
            alertError.removeClass('d-none');
            // Scroll vers l'alerte
            $('html, body').animate({
                scrollTop: alertError.offset().top - 120
            }, 300);
        } else {
            // Formulaire valide – simulation d'envoi AJAX
            form.removeClass('was-validated');
            
            // État de chargement du bouton
            submitBtn.prop('disabled', true);
            submitBtn.find('.btn-text').addClass('d-none');
            submitBtn.find('.btn-loading').removeClass('d-none');

            // Simulation d'un délai réseau de 1.5s
            setTimeout(function() {
                // Rétablir le bouton
                submitBtn.prop('disabled', false);
                submitBtn.find('.btn-text').removeClass('d-none');
                submitBtn.find('.btn-loading').addClass('d-none');

                // Afficher le message de succès
                alertSuccess.removeClass('d-none');
                
                // Réinitialiser le formulaire
                form[0].reset();

                // Scroll vers l'alerte de succès
                $('html, body').animate({
                    scrollTop: alertSuccess.offset().top - 120
                }, 300);
            }, 1500);
        }
    });

    // 7. Gestion de l'état actif des liens de navigation lors du scroll
    var sections = $('section');
    var navLinks = $('.navbar-nav .nav-link');

    $(window).on('scroll', function() {
        var currentScroll = $(window).scrollTop() + 150; // Offset pour correspondre au header

        sections.each(function() {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();

            if (currentScroll >= top && currentScroll <= bottom) {
                var id = $(this).attr('id');
                navLinks.removeClass('active');
                $('.navbar-nav').find('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });
});


var swiper = new Swiper(".newsSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
    }
});