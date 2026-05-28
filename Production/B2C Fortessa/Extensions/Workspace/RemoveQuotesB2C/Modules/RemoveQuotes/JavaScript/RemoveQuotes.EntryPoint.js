
define(
	'RemoveQuotes.EntryPoint'
,   [
	]
,   function (
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var layout = container.getComponent('Layout');
			var pdp = container.getComponent('PDP');
			
			if(layout && pdp)
			{
				pdp.removeChildView('ProductDetails.AddToQuote');
				layout.removeChildView('RequestQuoteWizardHeaderLink');
			}
		}
	};
});
