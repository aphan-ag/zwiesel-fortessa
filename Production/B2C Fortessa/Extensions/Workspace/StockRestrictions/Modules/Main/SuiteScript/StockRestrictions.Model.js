define('StockRestrictions.Model', ['SC.Model', 'underscore'], function (SCModel, _) {
  'use strict';

  return SCModel.extend({
    name: 'StockRestrictions.Model',

    get: function (items) {
      if (!items) {
        return {parsingError: true};
      }

      try {
        return JSON.parse(nlapiRequestURL(this.getSuiteletUrl(items), null, this.getHeaders(), 'GET').getBody());
      } catch (e) {
        return {parsingError: true};
      }

    },

    getSuiteletUrl: function (items) {
      return (
        nlapiResolveURL(
          'SUITELET',
          'customscript_mhi_stock_information',
          'customdeploy_mhi_stock_information',
          true
        ) +
        '&items=' + items
      );
    },

    getHeaders: function () {
      return {
        'User-Agent': 'Mozilla/5.0'
      };
    }
  });
});
