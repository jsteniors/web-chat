angular.module('chatApp', []);

angular.module('chatApp').component('chat', {
    template: chat,
    controller: 'chatCtrl'
});

angular.module('chatApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('requestInterceptor');
});