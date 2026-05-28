define('Facets.ItemCell.View.Extension', ['Facets.ItemCell.View', 'Product.Model.Extension', 'underscore'], function (
  FacetsItemCellView,
  ProductModelExtension,
  _
) {
  'use strict';

  return {
    loadModule: function mountToApp(container) {
      _.extend(FacetsItemCellView.prototype, {
        getContext: _.wrap(FacetsItemCellView.prototype.getContext, function (fn) {
          var originalReturn = fn.apply(this, _.toArray(arguments).slice(1));

          originalReturn.isOutOfStock = !ProductModelExtension.productHasStock(this.model);

          return originalReturn;
        })
      });
    }
  };
});
