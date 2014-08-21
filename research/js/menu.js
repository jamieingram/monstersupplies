;(function ($, Menu, undefined){

    $(document).ready(function() {
        var menu = $('.menu');
        var toggle = menu.find('.nav-toggle');
        toggle.on('click', function(e) {
            e.preventDefault();
            menu.toggleClass('is-open');
        });

    });

    $(document).ready(function() {
        //setup the layout handler
        var getWidth = function() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        };

        var minDesktopWidth = 768;
        var previousWidth = getWidth();
        if (previousWidth < minDesktopWidth) {
            $(window).trigger('desktopToMobile');
        }

        $(window).on('resize', $.throttle(50, function(e) {
            var currentWidth = getWidth();
            if ((previousWidth < minDesktopWidth) && (currentWidth >= minDesktopWidth)) {
                // mobile -> desktop transition
                $(window).trigger('mobileToDesktop');
            }
            else if ((previousWidth >= minDesktopWidth) && (currentWidth < minDesktopWidth)) {
                // desktop -> mobile transition
                $(window).trigger('desktopToMobile');
            }
            previousWidth = currentWidth;
        }));
        
    });
    
    
})(jQuery, window.Menu || (window.Menu = {}));