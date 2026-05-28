define("CategoriesLimit.Model", ["SC.Model", "underscore"], function (
  SCModel,
  _
) {
  "use strict";

  return SCModel.extend({
    name: "CategoriesLimit.Model",

    get: function () {
      var commerceCategory = nlapiSearchRecord(
        "commercecategory",
        null,
        [
          new nlobjSearchFilter("isinactive", null, "is", "F"),
          new nlobjSearchFilter("displayinsite", null, "is", "T"),
          new nlobjSearchFilter("primaryparent", null, "anyof", "@NONE@"),
          new nlobjSearchFilter(
            "custrecord_mhi_categories_limit",
            null,
            "greaterthan",
            0
          ),
        ],
        [
          new nlobjSearchColumn("internalid"),
          new nlobjSearchColumn("custrecord_mhi_categories_limit"),
        ]
      );

      return _.map(commerceCategory, function (category) {
        return {
          internalid: category.getValue("internalid"),
          limit: category.getValue("custrecord_mhi_categories_limit"),
        };
      });
    },
  });
});
