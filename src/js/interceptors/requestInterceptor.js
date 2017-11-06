angular.module('chatApp').provider('requestInterceptor', function () {
    this.$get = function () {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                config.headers.Origin = 'http://sac-martinsb2b.ascbrazil.com.br';
                console.log(config);
                 return config;
            }
        }
    }
});