define('Newsletter.ServiceController.Extension', 
[
    'Newsletter.ServiceController',
    'Newsletter.Model.Extension',
    'underscore'
], function(
    NewsletterServiceController,
    NewsletterModelExtension,
    _
) {
    return _.extend( NewsletterServiceController, {
        post: function() {
            return NewsletterModelExtension.subscribe(
                this.data.email, 
                this.data.extraField
            );
        }
    });

});
