define('Newsletter.Model.Extension', [
  'Newsletter.Model',
  'SC.Models.Init',
  'Configuration',
  'underscore'
], function (NewsletterModel, ModelsInit, Configuration, _) {
  'use strict';

  return _.extend(NewsletterModel, {
    subscribe: function subscribe(email, extraField) {

      if ( !!extraField ) {
        throw this.buildErrorAnswer('ERROR');
      } else {
        this.validate({ email: email });

        var searchFilter = new nlobjSearchFilter('email', null, 'is', email);
        var searchColumnSubscriptionStatus = new nlobjSearchColumn(
            'globalsubscriptionstatus'
        );
        var customers = nlapiSearchRecord(
            'customer',
            null,
            [searchFilter],
            [searchColumnSubscriptionStatus]
        );
        
        var records = _.groupBy(customers, function(customer) {
            return customer.getRecordType();
        });

        
        if (!records.customer && !records.lead) {
            return this.createSubscription(email);
        }
        return records.customer
            ? this.updateSubscription(records.customer)
            : this.updateSubscription(records.lead);
      }
    },

    createSubscription: function createSubscription(email) {
      const record = nlapiCreateRecord('lead');
      record.setFieldValue('entityid', email);
      record.setFieldValue('firstname', Configuration.get('newsletter.genericFirstName'));
      record.setFieldValue('lastname', Configuration.get('newsletter.genericLastName'));
      record.setFieldValue('email', email);
      record.setFieldValue('subsidiary', ModelsInit.session.getShopperSubsidiary());
      record.setFieldValue('companyname', Configuration.get('newsletter.companyName'));
      record.setFieldValue('globalsubscriptionstatus', 1);
      record.setFieldValue('cseg1', 2); //CPD - Consumer Products Division
      record.setFieldValue('custentity_ft_ship_policy', 8); // SHIPFREE
      record.setFieldValue('custentity_ft_customer_default_pl', 35); //CPDSAT
      record.setFieldValue('custentity_ft_ship_via', 3); //BC
      nlapiSubmitRecord(record);
      return this.subscriptionDone;
    }
  });
});
