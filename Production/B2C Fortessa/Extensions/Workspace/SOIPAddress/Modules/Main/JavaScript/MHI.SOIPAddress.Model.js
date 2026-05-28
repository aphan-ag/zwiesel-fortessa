define('MHI.SOIPAddress.Model'
,   [
        'Backbone'
    ,   'Utils'
    ]
,   function (
        Backbone,
        Utils
    )
{
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/Main/SuiteScript2/MHI.SOIPAddress.Service.ss"
            ),
            true
        )
    });
})
