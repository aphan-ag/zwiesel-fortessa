define('RemoveProductReviews', [], function RemoveProductReviews() {
	'use strict';

	return  {
		mountToApp: function mountToApp (container) {
			SC.ENVIRONMENT.REVIEWS_CONFIG = {};
		}
	};
});
