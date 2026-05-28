/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    'N/url',
    'N/https'
], function (url, https) {
    "use strict";
    return {
        service: function (ctx) {
            var data = ctx.request.body;
            log.error('ctx.request', ctx.request);
            
            /* var params = JSON.parse( data );
            log.error('params', params);
            
            if ( ctx.request.method == 'POST' ) {
                var headerObj = new Array();
                headerObj['Content-Type'] = 'application/json';
                headerObj['Accept'] = 'application/json';

                var response = https.get({
                    url: 'https://api.ipify.org',
                    headers: headerObj
                });

                log.error('response', response );
                log.error('response.ip', response.body ); 
                var ip = response.body;
                var soID = params.data.soID;

                var output = url.resolveScript({
                    scriptId: 'customscript_mhi_so_ip_address',
                    deploymentId: 'customdeploy_mhi_so_ip_address',
                    returnExternalUrl: true
                });

                var response = https.get({
                    url: output +
                         "&soID=" + soID +
                         "&ip=" + ip,
                    headers: headerObj
                });

            } */

            var headerObj = new Array();
            headerObj['Content-Type'] = 'application/json';
            headerObj['Accept'] = 'application/json';

            var response = https.get({
                url: 'https://api.ipify.org?format=jsonp&callback=?',
                headers: headerObj
            });

            log.error('response.ip', response.body ); 
            var ip = response.body;

            ctx.response.write( 
                JSON.stringify({
                    ip: ip
                })
            );

            //ctx.response.write( JSON.stringify({ success: response }) );
        }
    };
});
