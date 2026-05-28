define('ProgressiveForms.EntryPoint', [
  'ProgressiveForms.View',
  'Progressive.Module.View',
  'Wizard.View',
  'underscore'
], function (ProgressiveFormsView, ProgressiveModuleView, WizardView, _) {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      var layout = container.getComponent('Layout');
      var checkout = container.getComponent('Checkout');

      if (layout) {
        layout.addChildView('Progressive.Button', function () {
          return new ProgressiveFormsView({ container: container });
        });
      }

      checkout.addModuleToStep({
        step_url: 'opc',
        module: {
          id: 'ProgressiveModuleView',
          index: 12,
          classname: 'Progressive.Module.View'
        }
      });

      //Fix for B2B "Ship method not selected" for some new accounts with new addresses
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
