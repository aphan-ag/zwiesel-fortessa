//@ts-check
// @ts-ignore
define(
    'UOM.Price.Model',
    [
        'SCModel',
        'Utils',
        'jQuery',
        'underscore'
    ],
    function (
        SCModelComponent,
        Utils,
        jQuery,
        _
    ) {
        'use strict';

        var SCModel = SCModelComponent.SCModel;

        function UOMPriceModel() {
            SCModel.call(this, { items: [] });
            var self = this;

            this.save = SCModel.prototype.save;
            this.on = SCModel.prototype.on;
            this.get = SCModel.prototype.get;
            this.set = SCModel.prototype.set;

            this.urlRoot = function () {
                return Utils.getAbsoluteUrl(
                    // @ts-ignore
                    getExtensionAssetsPath("Modules/UOMCustomization/SuiteScript2/UOM.Price.Service.ss"), true
                )
            };
            this.getItemPrices = function (itemsArray) {
                var promise = jQuery.Deferred();

                //Hotfix for the case when only one item is requested
                if (!Array.isArray(itemsArray)) {
                    itemsArray = [itemsArray];
                }

                if (!itemsArray.length || !itemsArray[0]) {
                    promise.resolve({ data: {} })
                    return promise.promise();
                }

                if (self._alredyRequestedItems(itemsArray) === true) {
                    return promise.resolve({ data: {} })

                }
                this.save({
                    data: {
                        // custId: ProfileModel.getInstance().get('internalid'),
                        items: itemsArray
                    }
                }).then(function (response) {
                    self._saveItems(response.data);
                    promise.resolve(response)
                })
                return promise.promise();
            };
            this.getItemPriceById = function (itemId) {
                var deferred = jQuery.Deferred();
                var findedItem = self._findItem(itemId);

                if (findedItem) {
                    deferred.resolve(findedItem);
                } else {
                    this.getItemPrices([itemId]).then(function (response) {
                        self._saveItems(response.data);
                        var newItem = self._findItem(itemId);
                        deferred.resolve(newItem);
                    }.bind(this)).fail(function (error) {
                        deferred.reject(error);
                    });
                }

                return deferred.promise();
            };
            this._findItem = function (itemId) {
                return this.get('items').find(function (item) {
                    return item.internalid == itemId
                });
            };
            this._saveItems = function (items) {
                var existingItems = self.get('items');
                var newItems = Object.keys(items).filter(function (itemId) {
                    return !existingItems.some(function (existingItem) {
                        return existingItem.internalid === itemId;
                    });
                }).map(function (itemId) {
                    var item = items[itemId];
                    var unitName = item.unit.name;
                    var unitNameSeparated = unitName.replace(/(\D+)(\d+)/, '$1 $2');
                    return {
                        internalid: itemId,
                        uom: unitNameSeparated ? unitNameSeparated : unitName,
                        uomFormatted: unitNameSeparated,
                        price: item.rate.converted,
                        priceFormatted: Utils.formatCurrency(item.rate.converted),
                        showPerCase: unitNameSeparated.indexOf('CASE') !== -1,
                        isPurchasable: !!item.isPurchasable
                    };
                });
                self.set('items', existingItems.concat(newItems));
            };
            this._alredyRequestedItems = function (itemsArray) {

                //Hotfix for the case when only one item is requested
                if (!Array.isArray(itemsArray)) {
                    itemsArray = [itemsArray];
                }

                var existingItems = self.get('items');
                if (existingItems.length > 0) {
                    var newItems = itemsArray.filter(function (item) {
                        return !existingItems.some(function (existingItem) {
                            return existingItem.internalid === item;
                        });
                    });

                    if (newItems.length === 0) {
                        return true
                    }
                }
                return false;
            };
        }

        UOMPriceModel.prototype = Object.create(SCModel.prototype);
        UOMPriceModel.prototype.constructor = UOMPriceModel;

        UOMPriceModel.getInstance = function () {
            this.instance = this.instance || new UOMPriceModel();
            return this.instance;
        }

        return UOMPriceModel;
    }
);
