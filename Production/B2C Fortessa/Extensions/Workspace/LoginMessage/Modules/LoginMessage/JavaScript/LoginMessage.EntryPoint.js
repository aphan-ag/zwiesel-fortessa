define('LoginMessage.EntryPoint', [], function () {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      var layout = container.getComponent('Layout');
      var environmentComponent = container.getComponent('Environment');
      var message = environmentComponent.getConfig('loginMessage.message');

      layout.addToViewContextDefinition(
        'LoginRegister.Login.View',
        'showForgotPasswordMessage',
        'boolean',
        function () {
          return !!message;
        }
      );

      layout.addToViewContextDefinition(
        'LoginRegister.Login.View',
        'forgotPasswordCustomMessage',
        'string',
        function () {
          return message;
        }
      );
    }
  };
});
