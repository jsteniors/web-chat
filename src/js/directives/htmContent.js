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
                if (el.find('a:not(.link)').length > 1) {
                    var $injector = angular.injector(['ng', 'chatApp']);
                    var sc = angular.element('.chat-container').scope();

                    var btYes = el.find('a:first-of-type');

                    btYes.addClass('btn btn-primary');
                    btYes.on('click', function(event){
                        btYes.off('click');
                        btNo.off('click');
                        sc.sendContinuetedMessage({content: 'Sim', type:'message', whos: 1});
                        sc.scrollEnd();
                    });
                    var btNo = el.find('a:nth-of-type(2)');
                    btNo.on('click', function(){
                        btYes.off('click');
                        btNo.off('click');
                        sc.sendContinuetedMessage({content: 'Não', type:'message', whos: 1});
                        sc.scrollEnd();
                    });
                    btNo.addClass('btn btn-danger');
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