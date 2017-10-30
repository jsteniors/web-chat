angular.module('chatApp').provider('botAPI', function () {
   var _baseUrl = "http://localhost:3000/robot";
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

    this.teste = function (teste) {
        console.log('test', teste);
    }

    this.$get = function ($http) {
        return {
            sendMessage : function (data) {
                return $http({
                    url: _baseUrl,
                    method: _method,
                    data: data,
                    headers: {
                        Origin: 'http://sac-martinsb2b.ascbrazil.com.br',
                        Accept : 'application/json,text/javascript,*/*;q=0.01',
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Origin',
                        'X-Random-Shit':'123123123'
                    }
                });
            }
        }
    };

});