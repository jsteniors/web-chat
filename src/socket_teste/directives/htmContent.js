angular.module('chatApp').directive('htmlContent', function ($location) {
    return{
        transclude: true,
        scope: {
            message: '=htmlContent'
        },
        link: function (scope, el , attrs) {
            if(scope.message.type=='render'){
                $location.path(message.location);
            }else {
                el.html(scope.message.content);
                el.find('img').css("width", "90%");
                el.find('input').addClass('form-control');
                el.find('select').addClass('form-control');
                el.find('select, input').css('margin-bottom', '10px');
                var bts = el.find('a:not(.link)');
                if (bts.length > 1) {
                    var sc = angular.element('.chat-container').scope();

                    var btNo = el.find('a:nth-of-type(2)');

                    var btYes = el.find('a:first-of-type');

                    btYes.addClass('btn btn-primary');
                    btNo.addClass('btn btn-danger');

                    bts.on('click', function(event){
                        var messageCont = jchat(event.target).attr('message');
                        var message = {content: messageCont, type:'message', whos: 1, time: new Date()};
                        bts.off('click');
                        sc.sendMessageApply(message, false);
                        sc.socket.emit('respostaLogin', {msg: messageCont});
                        sc.scrollEnd();
                    });
                } else {
                    el.find('a:not(.link)').addClass('btn btn-primary btn-block');
                }

                if(el.find('a.link').length>0){
                    el.find('a.link').css({
                        'color': '#4e4e4e',
                        'text-decoration': 'underline'
                    });
                }
            }
        }
    }
});
