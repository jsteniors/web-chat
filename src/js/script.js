angular.module('chatApp', []);

angular.module('chatApp').component('chat', {
    template: chat,
    controller: 'chatCtrl'
});

angular.module('chatApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('requestInterceptor');
    $httpProvider.defaults.headers.post['Origin'] = 'http://sac-martinsb2b.ascbrazil.com.br';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //$httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
    //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, X-Requested-With';
});

var Message = function (type, content, whos, time) {
    this.type = type;
    this.content = content;
    this.whos = whos;
    this.time = time;
};

var MessageLinked = function (type, buttonText, link, whos, time) {
    this.type = type;
    this.buttonText = buttonText;
    this.link = link;
    this.whos = whos;
    this.time = time;
};


