define('ItemSearcher.View.Ext', [
    'ItemsSearcher.View',
    'itemssearcher_ext.tpl'
  ], function (
    ItemsSearcherView,
    itemssearcher_ext_tpl
  ) {
    'use strict';
  
    return _.extend( ItemsSearcherView.prototype, {

        template: itemssearcher_ext_tpl,

        getContext: _.wrap( ItemsSearcherView.prototype.getContext, function (fn) {
            var result = fn.apply(this, _.toArray(arguments).slice(1));
            console.log('asdfasdf')
            result.uid = Math.random().toString(36).substr(2, 4);
            console.log(result)
            return result;
        })
    });
  });
  
