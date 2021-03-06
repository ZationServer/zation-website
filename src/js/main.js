(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 56)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 57
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    setTimeout(function () {
        $( "#zation" ).addClass('animated wobble');
        $( "#findMore" ).addClass('animated pulse');
    },2200);

    new Vivus('logo', {duration: 200, start: 'autostart', animTimingFunction: Vivus.EASE}, function () {
        $( "#path1" ).addClass('path1Animation');
        $( "#path2" ).addClass('path2Animation');
    });

    //scrollMouse Animation
    $('a.scroll-link').click(function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        $('body,html').animate({
            scrollTop: $(id).offset().top -20
        }, 750);
    });


    // Scroll reveal calls
    window.sr = ScrollReveal();

    sr.reveal('.sr-icon-1', {
        delay: 200,
        scale: 0
    });
    sr.reveal('.sr-icon-2', {
        delay: 400,
        scale: 0
    });
    sr.reveal('.sr-icon-3', {
        delay: 600,
        scale: 0
    });
    sr.reveal('.sr-icon-4', {
        delay: 800,
        scale: 0
    });

    var view2RowOffset = {
        top: -100
    };

    sr.reveal('.sr-icon-5', {
        delay: 1000,
        scale: 0,
        viewOffset: view2RowOffset
    });
    sr.reveal('.sr-icon-6', {
        delay: 1200,
        scale: 0,
        viewOffset: view2RowOffset
    });
    sr.reveal('.sr-icon-7', {
        delay: 1400,
        scale: 0,
        viewOffset: view2RowOffset
    });
    sr.reveal('.sr-icon-8', {
        delay: 1600,
        scale: 0,
        viewOffset: view2RowOffset
    });

    sr.reveal('.sr-button', {
        delay: 200,
        distance: '15px',
        origin: 'bottom',
        scale: 0.8
    });

    sr.reveal('.donate-button', {
        delay: 200,
        distance: '15px',
        origin: 'bottom',
        scale: 0.8
    });
    sr.reveal('.sr-contact-1', {
        delay: 200,
        scale: 0
    });
    sr.reveal('.sr-contact-2', {
        delay: 400,
        scale: 0
    });

    //code typing effect

    var codeIsAppear = false;
    $('#getStarted').waypoint(function() {
        if(!codeIsAppear)
        {
            blendCodeIn('#code1','npm i -g zation',true,function () {
                blendCodeIn('#code2','zation create name',true);
            });
            codeIsAppear = true;
        }
    },{ offset: '25%'});

    var blendCodeIn = function (element,text,remCursor,after) {
        new Typed(element, {
            strings : [text],
            typeSpeed: 50,
            onComplete: function () {
                if(remCursor) {
                    removeCursor();
                }
                if(typeof after === 'function') {
                    setTimeout(function () {
                        after();
                    },200)
                }
            }
        });
    };

    var code = $('#code');
    function removeCursor() {
        code.children('.typed-cursor').fadeOut(500);
    }

    // Magnific popup calls
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    particlesJS.load('particlesContainer', 'json/particles-config-points.json');

})(jQuery); // End of use strict
