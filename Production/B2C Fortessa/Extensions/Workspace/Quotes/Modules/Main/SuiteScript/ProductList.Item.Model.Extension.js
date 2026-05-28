define('ProductList.Item.Model.Extension', ['ProductList.Item.Model', 'underscore'], function (
  ProductListItemModel,
  _
) {
  'use strict';

  _.extend(ProductListItemModel, {
    parseLineOptionsToProductList: function (options_array) {
      // if the value is undefined, we don't store the options. This is due to a NS limitation:
      // The field custrecord_ns_pl_pli_options contained more than the maximum number ( 1000000 ) of characters allowed.
      var result = {};
      _.each(options_array, function (option) {
        if (option.value && option.value.internalid) {
          result[option.cartOptionId] = {
            value: option.value && option.value.internalid,
            displayvalue: option.value && option.value.label,
            itemOptionId: option.itemOptionId,
            label: option.label,
            type: option.type,
            values: option.values
          };
        }
      });

      return result;
    }
  });
});
