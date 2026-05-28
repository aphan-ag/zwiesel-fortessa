
define(
	'ItemSearcher.EntryPoint'
,   [
		'ItemSearcher.View.Ext'
	]
,   function (
		ItemSearcherViewExt
	)
{
	'use strict';

	return {
		mountToApp: function (container) { 
			/* var layout = container.getComponent('Layout');

			layout.addToViewContextDefinition('SiteSearch', 'uid', 'string', function(context) {
				var uid = Math.random().toString(36).substr(2, 4);
				console.log('uid', uid)
				return uid;
			}); */
		}
	}	
});
