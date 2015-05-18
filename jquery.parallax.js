/*!
 * jQuery Parallax Plugin
 * Copyright (c) J. Zwicker
 * Version: 1.0 (08.04.2015)
 * Dual licensed under the MIT and GPL licenses.
 * Requires: jQuery v1.11.1 or later
 */
(function ($) {
    $.fn.parallax = function (options) {
        var windowHeight = $(window).height();
        var settings = $.extend({
            speed: 0.5,
            offsetFix: 0
        }, options);
        var thatSelector = this.selector;
        thatSelector = thatSelector.replace('.', '');
        this.each(function () {
            var $this = $(this);
            $this.wrapInner('<div class="' + thatSelector + '-inner-wrapper"></div>');
        });
        $('.' + thatSelector).css({
            position: 'relative'
        });
        $('.' + thatSelector + '-inner-wrapper').css({
            position: 'absolute',
            width: '100%'
        })
        return $('.' + thatSelector + '-inner-wrapper').each(function () {
            var $this = $(this);
            $(document).scroll(function () {
                var elemOffsetFix = settings.offsetFix;
                if ($this.parent().hasClass('full')) {
                    elemOffsetFix = 0;
                }
                var scrollTop = $(window).scrollTop();
                var offset = $this.parent().offset().top - elemOffsetFix;
                var height = $this.height();
                if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                    return;
                }
                var yBgPosition = Math.round((offset - scrollTop) * settings.speed * -1);
                $this.css('top', yBgPosition + 'px');
            });
        })
    }
}(jQuery));