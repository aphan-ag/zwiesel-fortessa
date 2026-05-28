define(
	'OrderWizard.Module.Confirmation.Ext'
,   [
        'OrderWizard.Module.Confirmation',
        'LiveOrder.Model',
        'Profile.Model',

        'MHI.SOIPAddress.Model'
	]
,   function (
        OrderWizardModuleConfirmation,
        LiveOrderModel,
        ProfileModel,

        SOIPAddressModel
	)
{
	'use strict';

	return  {
        loadModule: function loadModule(options) {
            _.extend( OrderWizardModuleConfirmation.prototype, {
                render: _.wrap( OrderWizardModuleConfirmation.prototype.render, function initFunc(fn){
                    fn.apply(this, Array.prototype.slice.call(arguments,1));

                    var confirmation = this.model.get('confirmation');

                    var SOIPModel = new SOIPAddressModel();
                    SOIPModel
                        .save({
                            data: {
                                soID: confirmation.internalid
                            }
                        })
                        .done( function( response ) {
                            console.log( 'response', response );
        				}); 

                })
            })
        }        
	};
});
