define('RemoveBilling.EntryPoint', ['MyAccountMenu'], function (MyAccountMenu) {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      var myAccountMenu = MyAccountMenu.MyAccountMenu || MyAccountMenu,
        myAccountInstance = myAccountMenu.getInstance();

        myAccountInstance.removeEntry('billing');
        myAccountInstance.removeEntry('cases');
    
        // REMOVE QUOTES
        myAccountInstance.subEntries = _.filter( myAccountInstance.subEntries , function( menu ){ 
          return menu.edntryId !== 'orders' && menu.id !== 'quotes';
        });
    }
  };
});
