//@ts-check
//@ts-ignore
define(
    'UOM.Price.EntryPoint',
    [
        'ProductViews.Price.View',
        'UOM.Price.Model',

        'underscore'
    ],
    function (
        ProductViewsPriceView,
        UOMPriceModel,

        _
    ) {
        'use strict';

        return {
            mountToApp: function (container) {
                var Layout = container.getComponent('Layout');
                var uomPriceModel = UOMPriceModel.getInstance();

                var PLP = container.getComponent('PLP');
                var PDP = container.getComponent('PDP');
                var Cart = container.getComponent('Cart');

                if (PLP) {
                    PLP.on('beforeShowContent', function () {
                        return Cart.getLines().then(function (lines) {

                            var cartItems = _.map(lines, function (line) { return line.item.internalid });
                            var plpItems = [];

                            if (PLP.getItemsInfo()) {
                                plpItems = _.map(PLP.getItemsInfo(), function (item) { return item.internalid });
                            }

                            var items = _.union(
                                plpItems,
                                cartItems
                            );
                            return uomPriceModel.getItemPrices(items);
                        });
                    })
                }

                if (PDP) {
                    PDP.on('beforeShowContent', function () {
                        return Cart.getLines().then(function (lines) {
                            var cartItems = _.map(lines, function (line) { return line.item.internalid });
                            var pdpItem = [];

                            if (PDP.getItemInfo()) {
                                pdpItem = [PDP.getItemInfo().item.internalid];
                            }
                            var items = _.union(
                                pdpItem,
                                cartItems
                            );
                            return uomPriceModel.getItemPrices(items);
                        });
                    })

                    function pdpIsPurchasable(context) {
                        var item = context.model.item.internalid
                        var uomData = uomPriceModel._findItem(item) || {}
                        return uomData ? uomData.isPurchasable : context.isPriceEnabled
                    }

                    PDP.addToViewContextDefinition(PDP.PDP_FULL_VIEW, 'isPriceEnabled', 'boolean', pdpIsPurchasable)
                    PDP.addToViewContextDefinition(PDP.PDP_QUICK_VIEW, 'isPriceEnabled', 'boolean', pdpIsPurchasable)
                }

                if (Layout) {
                    var isPlp = !!(PLP ? PLP.getItemsInfo() : false);
                    var isPdp = !!(PDP ? PDP.getItemInfo() : false);

                    if (!isPdp && !isPlp) {
                        Layout.on('beforeShowContent', function () {

                            return Cart.getLines().then(function (lines) {
                                var cartItems = _.map(lines, function (line) { return line.item.internalid });
                                var pdpItem = [];
                                var plpItems = [];

                                if (PDP && PDP.getItemInfo()) {
                                    pdpItem = [PDP.getItemInfo().internalid];
                                }

                                if (PLP && PLP.getItemsInfo()) {
                                    plpItems = _.map(PLP.getItemsInfo(), function (item) { return item.internalid });
                                }

                                var items = _.union(
                                    pdpItem,
                                    plpItems,
                                    cartItems
                                );
                                return uomPriceModel.getItemPrices(items);
                            });
                        });
                    }
                    //B2C only
                    Layout.addToViewContextDefinition('ProductViews.Price.View', 'defaultMessages', 'boolean', function (context) {

                        var item = context.model.item ? context.model.item.internalid : context.model.internalid;
                        if (!item) {
                            return context.defaultMessages;
                        }

                        var uomData = context.uomData || uomPriceModel._findItem(item);

                        if (!uomData) {
                            return context.defaultMessages;
                        }

                        return uomData.isPurchasable;
                    });
                    //End B2C only

                    Layout.addToViewContextDefinition('ProductViews.Price.View', 'priceFormatted', 'string', function (context) {

                        if (context.model.itemsIds) { return '' }

                        var uomPrice = context.model.uomPrice
                        var itemId = context.model.item ? context.model.item.internalid : context.model.internalid

                        if (!uomPrice && itemId) {
                            uomPrice = uomPriceModel._findItem(itemId) || {}
                        }

                        return uomPrice.priceFormatted || context.priceFormatted
                    });

                    // Add the uomData to the ProductViews.Price.View context
                    // product_views_price.tpl
                    Layout.addToViewContextDefinition('ProductViews.Price.View', 'uomData', 'object', function (context) {
                        var item = context.model.item ? context.model.item.internalid : context.model.internalid;
                        if (!item) {
                            return {}
                        }
                        return uomPriceModel._findItem(item)
                    });

                    Layout.addToViewContextDefinition('ProductViews.Price.View', 'disablePricingMessage', 'string', function (context) {
                        return context.disablePricingMessage || 'You are unable to buy this item.\n Please Contact Support'
                    });

                    Layout.addToViewContextDefinition('ProductViews.Price.View', 'isPriceEnabled', 'boolean', function (context) {
                        var item = context.model.item ? context.model.item.internalid : context.model.internalid;
                        // If no item is found, determine if the price is zero to set isPriceEnabled
                        if (!item) {
                            return context.price === 0 ? false : context.isPriceEnabled;
                        }

                        // Retrieve UOM data for the item
                        var uomData = context.uomData || uomPriceModel._findItem(item);

                        // If no UOM data is found, determine if the price is zero to set isPriceEnabled
                        if (!uomData) {
                            return context.price === 0 ? false : context.isPriceEnabled;
                        }

                        // Return whether the item is purchasable based on UOM data
                        return uomData.isPurchasable;
                    });

                    // Add the uomData to the Header.MiniCartItemCell.View context
                    Layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'uomData', 'object', function (context) {
                        var internalid = context.line.item.internalid
                        return uomPriceModel._findItem(internalid)
                    });

                    //Add the uomData to the Transaction.Line.Views.Price.View context
                    // transaction_line_views_price.tpl
                    Layout.addToViewContextDefinition('Transaction.Line.Views.Price.View', 'uomData', 'object', function (context) {
                        var item = context.model.item ? context.model.item.internalid : context.model.internalid;

                        if (!item) {
                            return {}
                        }
                        return uomPriceModel._findItem(item)
                    });

                    function uomRateFormatted(context) {
                        var itemModel = context.model ? context.model : context.line;
                        var uomData = uomPriceModel._findItem(itemModel.item.internalid) || {}
                        return uomData ? uomData.priceFormatted : context.model.rateFormatted ? context.model.rateFormatted : context.rateFormatted
                    }

                    //Add the rateFormatted to the Transaction.Line.Views.Price.View context
                    // transaction_line_views_price.tpl
                    Layout.addToViewContextDefinition('Transaction.Line.Views.Price.View', 'rateFormatted', 'string', uomRateFormatted);
                    Layout.addToViewContextDefinition("Header.MiniCartItemCell.View", 'rateFormatted', 'string', uomRateFormatted);

                    Layout.addToViewContextDefinition('Cart.Lines.View', 'uomData', 'object', function (context) {
                        var internalid = context.item.internalid

                        return uomPriceModel._findItem(internalid)
                    });
                }

                _.extend(ProductViewsPriceView.prototype, {
                    initialize: _.wrap(ProductViewsPriceView.prototype.initialize, function (fn) {
                        var self = this
                        var item_internalid = this.model.get('item') ? this.model.get('item').get('internalid') : this.model.id
                        if (item_internalid) {
                            uomPriceModel.getItemPriceById(item_internalid).then(function (itemPrice) {
                                self.uomPrice = itemPrice
                                self.model.set('uomPrice', itemPrice, { silent: true })

                                self.render()
                            })
                        }
                    })
                })
            }
        };
    }
);
