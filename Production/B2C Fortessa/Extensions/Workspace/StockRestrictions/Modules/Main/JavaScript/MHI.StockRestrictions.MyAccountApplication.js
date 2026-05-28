define('MHI.StockRestrictions.MyAccountApplication', ['ReorderItems.Actions.AddToCart.View', 'OrderHistory.Item.Actions.View'], function (
  ReorderItemsActionsAddToCartView,
  OrderHistoryItemActionsView
) {
  'use strict';

  return {
    mountToApp: function mountToApp(container) {
      _.extend(ReorderItemsActionsAddToCartView.prototype, {
        getContext: _.wrap(ReorderItemsActionsAddToCartView.prototype.getContext, function (fn) {
          var originalReturn = fn.apply(this, _.toArray(arguments).slice(1));
          originalReturn.disableButtonAddToCart = true;

          var item = this.model.getItem();

          if (item && item.get('quantityAvailableInWinch')) {
            var qtyWinch = parseInt(item.get('quantityAvailableInWinch'));
            var safetyStock = item.get('custitem_mhi_ft_web_safety_stock');

            originalReturn.disableButtonAddToCart = safetyStock ? qtyWinch - safetyStock <= 0 : qtyWinch <= 0;
          }

          return originalReturn;
        })
      });

      _.extend(OrderHistoryItemActionsView.prototype, {
        getContext: _.wrap(OrderHistoryItemActionsView.prototype.getContext, function (fn) {
          var originalReturn = fn.apply(this, _.toArray(arguments).slice(1));

          if (originalReturn.showActions) {
            originalReturn.showActions = false;

            var item = this.model.getItem();

            if (item && item.get('quantityAvailableInWinch')) {
              var qtyWinch = parseInt(item.get('quantityAvailableInWinch'));
              var safetyStock = item.get('custitem_mhi_ft_web_safety_stock');

              originalReturn.showActions = safetyStock ? qtyWinch - safetyStock > 0 : qtyWinch > 0;
            }
          }

          return originalReturn;
        })
      });
    }
  };
});
