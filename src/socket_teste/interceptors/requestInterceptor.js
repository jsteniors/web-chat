angular.module('chatApp').provider('requestInterceptor', function () {
    this.$get = function () {
        return {
            request: function(config) {
                console.log('inter', config.url);
                 return config;
            }
        }
    }
});