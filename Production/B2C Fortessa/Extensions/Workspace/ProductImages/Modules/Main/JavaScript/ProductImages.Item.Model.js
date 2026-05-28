define('ProductImages.Item.Model', ['Item.Model', 'underscore', 'Utils'], function (ItemModel, _, Utils) {
  'use strict';

  return _.extend(ItemModel.prototype, {
    getImages: function (filter, fromItem) {
      var result = [];
      var pdp = SC.Application.getComponent('PDP');
      var allMatrixChilds = pdp && pdp.getAllMatrixChilds();
      var selectedMatrixChilds = pdp && pdp.getSelectedMatrixChilds();
      var environment = SC.Application.getComponent('Environment');

      // This indicates there is images for the item
      if (this.get('custitem_mainimages') || selectedMatrixChilds) {
        if (_.size(selectedMatrixChilds) == _.size(allMatrixChilds)) {
          result = this.mapImages(this.get('custitem_mainimages'));
        } else {
          result = this.mapImages(_.first(selectedMatrixChilds).custitem_mainimages);
        }
      }

      if (result.length > 1) {
        var firstImage = this.getFirstImage(result);
        result = _.filter(result, function (image) {
          return firstImage != image;
        });

        result.unshift(firstImage);
      }

      return result.length
        ? result
        : [
            {
              url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                'img/no_image_available.jpeg',
                environment.getConfig('imageNotAvailable')
              ),
              altimagetext: this.get('_name')
            }
          ];
    },

    mapImages: function (imageData) {
      if (!imageData) {
        return [];
      }

      var self = this;

      return _.compact(
        _.map(imageData.split('|'), function (url) {
          if (url) {
            return {
              url: url.trim(),
              altimagetext: self.get('_name')
            };
          } else {
            return null;
          }
        })
      );
    }
  });
});
