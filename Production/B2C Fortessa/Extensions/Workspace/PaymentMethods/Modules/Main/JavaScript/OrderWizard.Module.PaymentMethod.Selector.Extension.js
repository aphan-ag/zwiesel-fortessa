define('OrderWizard.Module.PaymentMethod.Selector.Extension', [
  'OrderWizard.Module.PaymentMethod.Selector',
  'Profile.Model',
  'SC.Configuration',
  'underscore'
], function (OrderWizardModulePaymentMethod, ProfileModel, Configuration, _) {
  'use strict';

  _.extend(OrderWizardModulePaymentMethod.prototype, {
    getContext: _.wrap(OrderWizardModulePaymentMethod.prototype.getContext, function (fn) {
      var result = fn.apply(this, _.toArray(arguments).slice(1));

      result.activeModules = _.reject(result.activeModules, function (module) {
        return module.type === 'invoice';
      });

      var creditCard = _.findWhere(result.activeModules, {
        type: 'creditcard'
      });

      if (creditCard && !creditCard.isSelected) {
        this.setModuleByType('creditcard');

        creditCard.isSelected = true;
      }

      return result;
    })
  });
});
