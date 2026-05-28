define('Product.Model.Extension', ['underscore'], function (_) {
  'use strict';

  return {
    productHasStock: function (item) {
      if (item && item.get('quantityonhand')) {
        var stock = item.get('quantityonhand_detail');
        if (stock && _.isArray(stock.locations)) {
          var stockInWinch = _.findWhere(stock.locations, { internalid: 21 }); //Winch
          if (stockInWinch && stockInWinch.quantityonhand) {
            var safetyStock = item.get('custitem_mhi_ft_web_safety_stock');

            return safetyStock
              ? stockInWinch.quantityonhand - safetyStock > 0
              : stockInWinch.quantityonhand > 0;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
});
