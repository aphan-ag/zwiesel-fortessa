define('Newsletter.Shopping.Entry', 
[
    'Newsletter.View',
    'newsletter_extension.tpl'
], function (
    NewsletterView,
    newsletter_extension_tpl
) {
    'use strict';

    return {
		mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            /**
             * REMOVE LEGACY NEWSLETTER
             */
            layout.removeChildView('FooterContent');

            /**
             * REPLACE NEWSLETTER WITH UPDATED FORM
             * TEMPLATE CONTAINS HONEYPOT FIELD 'EXTRA FIELD'
             */
            layout.addChildView('FooterContent', function() {
                var newsletter = new NewsletterView();
                newsletter.template = newsletter_extension_tpl;

                return newsletter;
            });
        }
    }

});
