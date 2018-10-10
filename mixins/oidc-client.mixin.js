"use strict";

const OidcService = require("oidc-client-node");

module.exports = function(req, res) {

    const _req = req;
    const _res = res;

    var oidcConfig = {
        scope: 'profile openid api1',
        client_id: 'js_client',
        callbackURL: '/auth/oidc/callback',
        authority: 'http://localhost:5000',
        response_type: 'id_token token',
        scopeSeperator: ' ',
        verboseLogging: true
    }

    return {
        mixins: [OidcService],
        
        methods: {

            createTokenRequest() {
                const OidcClient = require("oidc-client-node");

                var _oidcClient = new OidcClient(this._req, this._res, oidcConfig);

                var tokenRequest = _oidcClient.createTokenRequestAsync();

                tokenRequest.then(function (results) {
                    console.log('about to redirect');
                    res.redirect(results.url);  
                  }).catch(function(error){
                      console.log('error generating redirect url: ' + error);
                  });
            }
        }
    };
}