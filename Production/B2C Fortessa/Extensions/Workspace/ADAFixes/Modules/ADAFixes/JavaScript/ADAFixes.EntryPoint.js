
define(
	'ADAFixes.EntryPoint'
,   [
		'SC.ThreadsThemeExtension.LogoView',
		'ada_sc-threads-logo.tpl',
		'Backbone',
		'jQuery',
		'underscore'
	]
,   function (
		ThreadsThemeExtensionLogoView,
		ada_sc_threads_logo_tpl,
		Backbone,
		jQuery,
		_
	)
{
	'use strict';


	_.extend(ThreadsThemeExtensionLogoView.prototype, {

		template: ada_sc_threads_logo_tpl
    })

    Backbone.on('cms:loaded', function cmsLoaded(CMSInstance) {
        this.listenTo(CMSInstance, 'page:content:set', function pageContentSet() {
			jQuery('.bx-controls a').attr('aria-hidden',true);
        });
    });

	return {
		mountToApp: function (container) {
		  var layout = container.getComponent("Layout");
	
		  if (layout) {
			layout.on('afterShowContent', function () {
				jQuery('.global-loading-indicator').attr('alt','Loading Image');
				jQuery('.bx-controls a').attr('aria-hidden',true);
			});
		  }
		}
	}	
});
