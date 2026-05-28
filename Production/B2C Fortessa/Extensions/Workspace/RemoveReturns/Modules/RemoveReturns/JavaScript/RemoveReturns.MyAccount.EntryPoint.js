define('RemoveReturns.MyAccount.EntryPoint', ['MyAccountMenu'], function (MyAccountMenu) {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      var myAccountMenu = MyAccountMenu.MyAccountMenu || MyAccountMenu;
      var myAccountInstance = myAccountMenu.getInstance();

      myAccountInstance.removeSubEntry('returns');

      var layout = container.getComponent('Layout');

      layout.addToViewContextDefinition(
        'Invoice.Details.View',
        'showRequestReturnButton',
        'boolean',
        function () {
          return false;
        }
      );

      layout.addToViewContextDefinition(
        'OrderHistory.Summary.View',
        'showRequestReturnButton',
        'boolean',
        function () {
          return false;
        }
      );
    }
  };
});
