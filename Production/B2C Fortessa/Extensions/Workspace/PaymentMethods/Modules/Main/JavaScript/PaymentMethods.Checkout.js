define('PaymentMethods.Checkout', [
  'OrderWizard.Module.PaymentMethod.Selector.Extension',
  'Wizard.View',
  'underscore'
], function (OrderWizardModulePaymentMethodSelectorExtension, WizardView, _) {
  'use strict';

  return {
    mountToApp: function (container) {
      //Fix for B2C "Ship method not selected" for some new accounts with new addresses
      _.extend(WizardView.prototype, {
        submit: function (e) {
          if (!this.model.get('shipmethod')) {
            if (this.model.get('shipmethods') && this.model.get('shipmethods').pluck) {
              var ids = this.model.get('shipmethods').pluck('internalid');
              if (ids && _.first(ids)) {
                this.model.set('shipmethod', _.first(ids));
              }
            }
          }

          this.wizard.getCurrentStep().submit(e);
        }
      });
    }
  };
});
