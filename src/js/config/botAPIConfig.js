angular.module('chatApp').config(function (botAPIProvider) {
    // botAPIProvider.setBaseUrl('https://impressora-web.herokuapp.com/robot');
    botAPIProvider.setBaseUrl('http://sac-martinsb2b.ascbrazil.com.br/Chat/login/resp-login');
    botAPIProvider.setMethod('POST');
});
