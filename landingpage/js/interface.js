( function($) {
  'use strict';
  	/*-------------------------------------------------------------------------------
	  Detect mobile device
	-------------------------------------------------------------------------------*/
	var mobileDevice = false;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	  	$('html').addClass('mobile');
	  	mobileDevice = true;
	}

	else{
		$('html').addClass('no-mobile');
		mobileDevice = false;
	}

    /*-------------------------------------------------------------------------------
	  Window load
	   -------------------------------------------------------------------------------*/
	var navbar=$('.js-navbar');
	var navbarAffixHeight=76

	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/

    $('.js-target-scroll').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });
    /*-------------------------------------------------------------------------------
	  Affix
	   -------------------------------------------------------------------------------*/

	navbar.affix({
	  offset: {
	    top: 12
	  }
	});

	navbar.on('affix.bs.affix', function() {
		if (!navbar.hasClass('affix')){
			navbar.addClass('animated fadeInDown');
  			navbar.find('.js-brand-hinge').addClass('animated hinge');
		}
	});

	navbar.on('affix-top.bs.affix', function() {
	  	navbar.removeClass('animated fadeInDown');
	  	navbar.find('.js-brand-hinge').removeClass('animated hinge');
	  	$('.navbar-collapse').collapse('hide');
	});

	if (navbar.hasClass('affix')){
		navbar.find('.js-brand-hinge').addClass('animated hinge');
	}
	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/
	$('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
  		navbar.find('.js-brand-hinge').addClass('animated hinge');
	});

	$('.navbar-collapse').on('hide.bs.collapse', function () {
		if (navbar.hasClass('affix-top')){
			navbar.removeClass('affix');
  			navbar.find('.js-brand-hinge').removeClass('animated hinge');
		}
	});

	$(".navbar-nav > li > a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});

	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/
	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});
	/*-------------------------------------------------------------------------------
	  Portfolio masonry
	-------------------------------------------------------------------------------*/
	$('.js-iso').each(function() {
		var $container = $(this);
		$container.imagesLoaded( function(){
			$container.isotope({
				itemSelector: '.js-iso-item',
				layoutMode: 'masonry',
				masonry: {
				  columnWidth: '.js-iso-item'
				}
			});
		});
    });
	$('.filter a').on('click', function() {
		$('.filter .active').removeClass('active');
		$(this).closest('li').addClass('active');
		var selector = $(this).attr('data-filter');
		$('.js-iso').isotope({
			filter: selector,
			animationOptions: {
				duration: 500,
				queue: false
			}
		});
		return false;
	});

	/*-------------------------------------------------------------------------------
	  Facts
	-------------------------------------------------------------------------------*/
    function loadFacts(){
        $(".js-counter:in-viewport").each(function() {
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				var datacount = $(this).attr("data-value");
	            var $this = $(this);
	            $({Counter: 0}).animate({Counter: datacount}, {
	                duration: 2000,
	                easing: 'swing',
	                step: function () {
	                    $this.text(Math.ceil(this.Counter));
	                }
	            });
			}
		});
    }

	$(window).scroll(function(){
		loadFacts();
	});

})(jQuery);
