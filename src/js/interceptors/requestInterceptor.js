angular.module('chatApp').factory('requestInterceptor', function () {
    return{
        request: function (config) {
            // config.headers = config.headers || {};
            //config.headers.Origin = 'http://sac-martinsb2b.ascbrazil.com.br';
            console.log(config);
            return config;
        },
        requestError: function (aa) {
            console.log(aa);
            return aa;
        }
    }
})