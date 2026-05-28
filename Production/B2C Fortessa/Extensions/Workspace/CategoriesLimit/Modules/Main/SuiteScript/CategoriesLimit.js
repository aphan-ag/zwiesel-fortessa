define("CategoriesLimit", ["Configuration", "CategoriesLimit.Model"], function (
  Configuration,
  CategoriesLimitModel
) {
  "use strict";

  Configuration.get().publish = Configuration.get().publish || [];

  Configuration.get().publish.push({
    key: "categoriesLimit",
    model: "CategoriesLimit.Model",
    call: "get",
  });
});
