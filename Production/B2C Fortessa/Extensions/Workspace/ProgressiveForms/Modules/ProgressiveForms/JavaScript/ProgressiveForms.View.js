// @module MHI.ProgressiveForms.ProgressiveForms
define('ProgressiveForms.View'
,	[
		'progressiveforms.tpl'
	
	,	'Backbone'
	,	'jQuery'
    ]
, function (
		progressiveforms_tpl
	
	,	Backbone
	,	jQuery
)
{
    'use strict';

	return Backbone.View.extend({

		template: progressiveforms_tpl

	,	initialize: function (options) {
			var layout = options.container.getComponent('Layout');
			layout.on('afterShowContent', function () {
				jQuery('.order-wizard-paymentmethod-giftcertificates-module-expander-head-toggle').click(function(){
					jQuery('.progressive-container.in').collapse('hide');
					sessionStorage.setItem("actualStep", jQuery(this).parent().siblings( ".progressive-container" ).attr('id'));
				});
				//Show first step available open
				jQuery('.module-rendered').find('.progressive-container').first().collapse('show');
			});

			this.on('afterViewRender', function() {
				var actualStep = sessionStorage.getItem("actualStep");
				if(actualStep){
					jQuery('#'+actualStep).collapse('show');
				}
			});
		}

	,	events: {
			'click [data-action="progressive-step"]': 'nextStep'
		}

	,	nextStep: function(e) {
			try {
				jQuery(e.target).closest('.progressive-container').collapse('hide');
				var actual = jQuery(e.target).closest('.module-rendered');
				while(actual != false){
					actual = actual.next();
					if(actual.find('.progressive-container').length > 0){
						sessionStorage.setItem("actualStep", actual.find('.progressive-container').attr('id'));
						actual.find('.progressive-container').collapse('show');
						return actual = false;
					}
				}
			} catch (error) {
				console.log(error)
			}
		}

	,	getContext: function getContext()
		{
			this.buttonMessage = this.buttonMessage || 'Continue'
			return {
				buttonMessage: this.buttonMessage
			};
		}
	});
});
