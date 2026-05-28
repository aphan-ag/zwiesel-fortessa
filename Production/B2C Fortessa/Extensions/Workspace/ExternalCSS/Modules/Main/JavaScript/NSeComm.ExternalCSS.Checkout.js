define('NSeComm.ExternalCSS.Checkout', [
    'jQuery'
],
function NSeCommExternalCSSCheckout(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var element;
            var cssFile = environment ?
                environment.getConfig('externalcss.checkoutCss') :
                container.getConfig('externalcss.checkoutCss');

            if (!cssFile || (typeof cssFile !== 'string')) {
                return;
            }

            element = jQuery('link[id=externalcss]');
            if (!element.length) {
                jQuery('<link id="externalcss" rel="stylesheet">').attr('href', cssFile).appendTo(jQuery('head'));
            } else {
                element.attr('href', cssFile);
            }
        }
    };
});
