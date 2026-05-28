define('Cart.AddToCart.Button.View.Extension', ['Cart.AddToCart.Button.View', 'Product.Model.Extension', 'underscore'], function (
  CartAddToCartButtonView,
  ProductModelExtension,
  _
) {
  'use strict';

  return {
    loadModule: function mountToApp(container) {
      CartAddToCartButtonView.prototype.getContext = _.wrap(
        CartAddToCartButtonView.prototype.getContext,
        function wrapGetContextFn(getContextFn) {
          var originalReturn = getContextFn.apply(this, _.toArray(arguments).slice(1));

          originalReturn.isCurrentItemPurchasable = ProductModelExtension.productHasStock(this.model.getItem());

          return originalReturn;
        }
      );
    }
  };
});
