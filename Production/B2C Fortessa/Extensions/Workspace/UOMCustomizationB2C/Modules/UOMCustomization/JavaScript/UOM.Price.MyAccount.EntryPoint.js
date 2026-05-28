//@ts-check
//@ts-ignore
define(
    'UOM.Price.MyAccount.EntryPoint',
    [
        'UOM.Price.EntryPoint',

        'UOM.Price.Model',
        'Quote.Details.View',

        'ReorderItems.List.View',
        'ReorderItems.Collection',

        'AjaxRequestsKiller',
        'underscore',
        'jQuery'
    ],
    function (
        UOMPriceEntryPoint,

        UOMPriceModel,
        QuoteDetailsView,

        ReorderItemsListView,
        ReorderItemsCollection,

        AjaxRequestsKiller,
        _,
        $
    ) {
        'use strict';

        return {
            mountToApp: function (container) {
                var uomPriceModel = UOMPriceModel.getInstance();
                var Layout = container.getComponent('Layout');

                QuoteDetailsView.prototype.beforeShowContent = function (fn) {
                    var promise = $.Deferred();

                    this.model.fetch({
                        killerId: AjaxRequestsKiller.getKillerId(),
                        success: function (quote) {
                            var lines = _.map(quote.get('lines').toJSON(), function (line) {
                                return line.item.internalid
                            })

                            uomPriceModel.getItemPrices(lines).done(function (res) {
                                promise.resolve(quote)
                            })
                        }
                    });

                    return promise;
                };

                ReorderItemsListView.prototype.beforeShowContent = function () {

                    var promise = $.Deferred();
                    var collection = new ReorderItemsCollection();

                    collection.fetch().then(function (res) {
                        var items = _.map(res.records, function (line) {
                            return line.item ? line.item.internalid : line.id;
                        })
                        uomPriceModel.getItemPrices(items).done(function (res) {
                            promise.resolve(res)
                        })
                    });

                    return promise.promise();
                }

                UOMPriceEntryPoint.mountToApp(container);
            }
        };
    }
);
