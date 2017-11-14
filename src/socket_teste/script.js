angular.module('chatApp', []);

angular.module('chatApp').component('chat', {
    template: chat,
    controller: 'chatSocketCtrl'
});

angular.module('chatApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('requestInterceptor');
});