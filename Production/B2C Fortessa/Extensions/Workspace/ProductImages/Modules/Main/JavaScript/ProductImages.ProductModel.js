define("ProductImages.ProductModel", [
  "Transaction.Line.Model",
  "Product.Model",
  "Utils",
  "underscore",
], function (TransactionLineModel, ProductModel, Utils, _) {
  "use strict";

  var ProductImagesProductModel = {
    getThumbnail: function () {
      var environment = SC.Application.getComponent("Environment");

      if (!this.get("item").get("custitem_mainimages")) {
        return {
          url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
            "img/no_image_available.jpeg",
            environment.getConfig("imageNotAvailable")
          ),
          altimagetext: this.get("_name"),
        };
      }

      var images = _.map(
        this.get("item").get("custitem_mainimages").split("|"),
        function (url) {
          return url.trim();
        }
      );

      return {
        url: _.first(images),
        altimagetext: this.get("item").get("displayname"),
      };
    },
  };

  _.extend(ProductModel.prototype, ProductImagesProductModel);
  _.extend(TransactionLineModel.prototype, ProductImagesProductModel);
});
