define('RemoveReturns.Shopping.EntryPoint', ['MyAccountMenu'], function (MyAccountMenu) {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      var myAccountMenu = MyAccountMenu.MyAccountMenu || MyAccountMenu;
      var myAccountInstance = myAccountMenu.getInstance();

      myAccountInstance.removeSubEntry('returns');
    }
  };
});
