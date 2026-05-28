
//@ts-check
/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
// @ts-ignore
define([
    'N/url',
    'N/https',
    'N/log'
], function (
    url,
    https,
    log
) {
    'use strict';

    function service(context) {
        var response = {};

        switch (context.request.method) {
            case 'POST':

                var suiteletUrl = url.resolveScript({
                    scriptId: 'customscript_pla_sl_cp_b2c',
                    deploymentId: 'customdeploy_pla_sl_cp_b2c',
                    returnExternalUrl: true
                });

                var payload = JSON.parse(context.request.body);

                log.debug('UOM.Price.Service.ss', 'Suitelet Request Body ', JSON.stringify(payload.data ? payload.data : payload));

                var suiteletResponse = https.post({
                    url: suiteletUrl,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload.data ? payload.data : payload)
                });

                response = JSON.parse(suiteletResponse.body);
                break;
            default:
                response.error = 'Method not allowed';
                context.response.statusCode = 405;
                break;
        }

        context.response.write(JSON.stringify(response));
    }

    return {
        service: service
    }
})
