define('NSeComm.ExternalCSS.Shopping', [
    'jQuery'
],
function NSeCommExternalCSSShopping(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var element;
            var cssFile = environment ?
                environment.getConfig('externalcss.shoppingCss') :
                container.getConfig('externalcss.shoppingCss');

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
