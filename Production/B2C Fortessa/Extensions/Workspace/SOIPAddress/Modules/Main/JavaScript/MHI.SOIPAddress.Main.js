
define(
	'MHI.SOIPAddress.Main'
,   [
		'Main.View',
		'OrderWizard.Module.Confirmation.Ext'
	]
,   function (
		MainView,
		OrderWizardModuleConfirmationExt
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp ( container )
		{
			var checkout = container.getComponent('Checkout');
			
			checkout.addModuleToStep({
				//step_url: 'review'
				step_url: 'opc'
				, module: {
					id: 'MainView'
					, index: 99
					, classname: 'Main.View'
				}
			});
		}
	};
});
