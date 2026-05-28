define("ProductImages.Item.KeyMapping", [
  "Item.KeyMapping",
  "underscore",
  "Utils",
], function (ItemKeyMapping, _, Utils) {
  "use strict";

  return _.extend(ItemKeyMapping, {
    getKeyMapping: _.wrap(
      ItemKeyMapping.getKeyMapping,
      function (fn, configuration) {
        var result = fn.apply(this, _.toArray(arguments).slice(1));

        return _.extend(result, {
          _thumbnail: _.bind(this.getThumbnail, this, configuration),
        });
      }
    ),

    getThumbnail: function (configuration, item) {
      if (!item.get("custitem_mainimages")) {
        return {
          url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
            "img/no_image_available.jpeg",
            configuration.get("imageNotAvailable")
          ),
          altimagetext: item.get("_name"),
        };
      }

      var images = _.map(
        item.get("custitem_mainimages").split("|"),
        function (url) {
          return url.trim();
        }
      );

      return {
        url: _.first(images),
        altimagetext: item.get("_name"),
      };
    },
  });
});
