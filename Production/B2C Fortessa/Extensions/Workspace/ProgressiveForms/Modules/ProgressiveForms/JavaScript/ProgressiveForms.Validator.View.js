define('Progressive.Module.View', [
	'Wizard.Module',
	'progressive.tpl',
	'jQuery',
	'Utils'
], function (
	WizardModule,
	progressive_tpl,
	jQuery,
	Utils
) {
	'use strict';

	return WizardModule.extend({

		template: progressive_tpl,


		initialize: function(options){
			WizardModule.prototype.initialize.apply(this, arguments);
			var self = this;
		},

		submit: function () {
			var valCVV = jQuery('[name="ccsecuritycode"]').val();
			var myRe = /^[0-9]{3,4}$/;
         	var myArray = myRe.exec(valCVV);
			if(valCVV!=myArray){
				jQuery("html, body").animate({ scrollTop: 0 }, "slow");
				return jQuery.Deferred().reject({
                    errorCode: 'ERR_CHK_SELECT_STEP',
                    errorMessage: Utils.translate('Review payment information')
                });
			}else{
				return jQuery.Deferred().resolve();
			}
		},

		getContext: function () {
			return {
				
			};
		}

	});

});
