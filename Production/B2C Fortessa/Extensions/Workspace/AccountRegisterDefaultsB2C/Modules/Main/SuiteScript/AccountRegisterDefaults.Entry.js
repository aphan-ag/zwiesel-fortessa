define('AccountRegisterDefaults.Entry', ['Account.Model', 'LiveOrder.Model', 'underscore'], function (
  AccountModel,
  LiveOrderModel,
  _
) {
  'use strict';

  _.extend(AccountModel, {
    register: _.wrap(AccountModel.register, function (fn, args) {
      var ret = fn.apply(this, _.toArray(arguments).slice(1));

      var serviceUrl = nlapiResolveURL(
        'SUITELET',
        'customscript_mhi_set_default_price_lvl',
        'customdeploy_mhi_set_default_price_lvl',
        true
      );

      nlapiRequestURL(serviceUrl + '&userId=' + nlapiGetUser() + '&site=b2c');

      return ret;
    })
  });

  _.extend(LiveOrderModel, {
    submit: _.wrap(LiveOrderModel.submit, function (fn, id, data) {
      var serviceUrl = nlapiResolveURL(
        'SUITELET',
        'customscript_mhi_set_territory',
        'customdeploy_mhi_set_territory',
        true
      );

      nlapiRequestURL(serviceUrl + '&customerId=' + nlapiGetUser() + '&site=b2c');

      return fn.apply(this, _.toArray(arguments).slice(1));
    })
  });
});
