// @module MHI.SOIPAddress.Main
define('Main.View'
, [
    'Wizard.Module'
	,	'MHI.SOIPAddress.Model'
  , 'mhi_soipaddress_main.tpl'
  ]
, function (
    WizardModule
	,	SOIPAddressModel
  , mhi_soipaddress_main_tpl
  )
{
  'use strict';

  return WizardModule.extend({
    
    template: mhi_soipaddress_main_tpl,
      
    initialize: function initialize() {

      WizardModule.prototype.initialize.apply(this, arguments);

      var self = this;
      /* var SOIPModel = new SOIPAddressModel();

      SOIPModel
        .fetch()
        .done( function( response ) {
          self.ip = response.ip;
          self.render();
        }); */

      $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        self.ip = data.ip
        self.render();
      });

    },

    submit: function submit() {
      var self = this;

      var options = self.wizard.model.get('options');
      options.custbodycust_so_brip = self.ip;
      self.wizard.model.set('options', options);

      WizardModule.prototype.submit.apply( self, arguments );
    },

    getContext: function getContext() {
      var self = this;
      return { ip: self.ip };
    }

  });

});
