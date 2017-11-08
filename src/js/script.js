angular.module('chatApp', []);

angular.module('chatApp').component('chat', {
    template: chat,
    controller: 'chatCtrl'
});

var socket = io('https://botmartins-ricardopimentel.c9users.io');


socket.on('connect', function () {
    socket.emit('load', null);
    console.log('conectando');
});

socket.on('startChat', function (data) {
    console.log('recebido', data);
});

angular.module('chatApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('requestInterceptor');
});