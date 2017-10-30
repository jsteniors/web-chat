angular.module('chatApp').provider('botAPI', function () {
   var _baseUrl = "http://localhost:3000/robot";

    this.setBaseUrl = function (baseUrl) {
       _baseUrl = baseUrl;
    };

    this.getBaseUrl = function () {
        return _baseUrl;
    };

    this.$get = function ($http) {
        return {
            sendMessage : function () {
                return $http.get(_baseUrl);
            }
        }
    };

});