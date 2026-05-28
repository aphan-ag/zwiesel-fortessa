define('QuickAdd.View.Extension', ['QuickAdd.View', 'Product.Model.Extension', 'underscore'], function (
  QuickAddView,
  ProductModelExtension,
  _
) {
  'use strict';

  return {
    loadModule: function mountToApp(container) {
      _.extend(QuickAddView.prototype, {
        saveForm: _.wrap(QuickAddView.prototype.saveForm, function (fn, e) {
          e.preventDefault();
          this.$('#quick-add-oos').addClass('display-none');
          this.model.set(this.$('form').serializeObject());

          var product = this.model.get('selectedProduct');

          if (!ProductModelExtension.productHasStock(product.getItem())) {
            //show stock message error
            this.$('#quick-add-oos').removeClass('display-none');
          } else {
            fn.apply(this, _.toArray(arguments).slice(1));
          }
        }),

        resetHandle: _.wrap(QuickAddView.prototype.resetHandle, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        }),
        addQuantity: _.wrap(QuickAddView.prototype.addQuantity, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        }),
        subQuantity: _.wrap(QuickAddView.prototype.subQuantity, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        }),
        setQuantity: _.wrap(QuickAddView.prototype.setQuantity, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        }),
        selectAll: _.wrap(QuickAddView.prototype.selectAll, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        }),
        submitOnEnter: _.wrap(QuickAddView.prototype.submitOnEnter, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        }),
        onKeyDown: _.wrap(QuickAddView.prototype.onKeyDown, function (fn, e) {
          this.$('#quick-add-oos').addClass('display-none');
          fn.apply(this, _.toArray(arguments).slice(1));
        })
      });
    }
  };
});
