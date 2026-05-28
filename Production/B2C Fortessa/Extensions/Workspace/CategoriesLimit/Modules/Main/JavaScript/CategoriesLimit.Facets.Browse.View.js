define("CategoriesLimit.Facets.Browse.View", [
  "Facets.Browse.View",
  "Facets.CategoryCell.View",
  "Backbone.CollectionView",
  "underscore",
], function (
  FacetsBrowseView,
  FacetsCategoryCellView,
  BackboneCollectionView,
  _
) {
  "use strict";

  return _.extend(FacetsBrowseView.prototype, {
    childViews: _.extend(FacetsBrowseView.prototype.childViews, {
      "Facets.CategoryCells": function () {
        return new BackboneCollectionView({
          childView: FacetsCategoryCellView,
          collection: this.filterCategoriesByLimit(),
        });
      },
    }),

    filterCategoriesByLimit: function () {
      if (!this.model.get("category")) {
        return [];
      }

      var categoriesLimit =
        SC.ENVIRONMENT.published && SC.ENVIRONMENT.published.categoriesLimit;

      if (!_.size(categoriesLimit)) {
        return this.model.get("category").get("categories");
      }

      var categoryLimit = _.findWhere(categoriesLimit, {
        internalid: this.model.get("category").get("internalid"),
      });

      if (categoryLimit && categoryLimit.limit) {
        return this.model
          .get("category")
          .get("categories")
          .filter(function (category, index) {
            return index < categoryLimit.limit;
          });
      }

      return this.model.get("category").get("categories");
    },
  });
});
