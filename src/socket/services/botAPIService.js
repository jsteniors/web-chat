angular.module('chatApp').provider('botAPI', function () {
   var _baseUrl = "https://botmartins-ricardopimentel.c9users.io/";
   var _method = 'GET';

    this.setBaseUrl = function (baseUrl) {
       _baseUrl = baseUrl;
    };

    this.getBaseUrl = function () {
        return _baseUrl;
    };

    this.setMethod = function (method) {
        _method = method.toUpperCase();
    };

    this.getMethod = function () {
        return _method;
    };

    this.$get = function ($http) {
        return {
            sendMessage: function (data) {
                return $http({
                    url: _baseUrl,
                    method: _method,
                    data: data
                });
            }
        }
    };

});