angular.module('chatApp', []);

angular.module('chatApp').component('chat', {
    template: chat,
    controller: 'chatCtrl'
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


