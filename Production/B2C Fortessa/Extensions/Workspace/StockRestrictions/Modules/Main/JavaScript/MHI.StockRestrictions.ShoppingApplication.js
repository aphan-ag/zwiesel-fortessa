define('MHI.StockRestrictions.ShoppingApplication', [
  'Cart.AddToCart.Button.View.Extension',
  'QuickAdd.View.Extension',
  'Product.Model.Extension',
  'Facets.ItemCell.View.Extension',
], function (CartAddToCartButtonViewExtension, QuickAddViewExtension, ProductModelExtension, FacetsItemCellViewExtension) {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      CartAddToCartButtonViewExtension.loadModule(container);
      QuickAddViewExtension.loadModule(container);
      FacetsItemCellViewExtension.loadModule(container);
    }
  };
});
