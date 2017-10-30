angular.module('chatApp').config(function (botAPIProvider) {
    botAPIProvider.setBaseUrl('https://impressora-web.herokuapp.com/robot');
});
