angular.module('chatApp').controller('chatSocketCtrl', function ($scope, $interval, errorAlert, botAPI) {

    $scope.messages = [];
    $scope.message = '';

    $scope.scrollEnd = function () {
        scrollEnd();
    }

    var content = jchat('.chat-container');

    $scope.socket = new SocketManager($scope);

    var sendMessage = function (message, continued, apply) {
        if(message.content != ''){
            message.continued = continued;
            $scope.messages.push(message);
            if(message.whos==1)
                $scope.messageText = new String();
            if(apply)
                $scope.$apply();
        }
    }

    $scope.buttonSend = function(messageText){
        if(messageText.trim()!='') {
            var esta = new Message('message', messageText, 1, new Date());
            esta.msg = esta.content;
            $scope.socket.emitDefault(esta);
            $scope.sendMessageApply(esta, false);
            $scope.scrollEnd();
        }
    }

    //verificar se a mensagem anterior é a mesma de quem esta mandando atualmente
    var sendContinuetedMessage = function (message, apply) {
        var isContinued = false;
        if($scope.messages.length>0)
            isContinued = $scope.messages[$scope.messages.length - 1].whos==message.whos;
        sendMessage(message, isContinued, apply);
    };

    $scope.sendMessageApply = function(message, apply){
        sendContinuetedMessage(message, apply);
    }

    //evento ao apertar enter enviar mensagem
    $scope.enterKey = function (event) {
        if(event.shiftKey){
            if (jchat('#msg-txt').attr('rows') == '1')
                jchat('#msg-txt').attr('rows', '2');
            $scope.messageText.concat('\n');
        }else {
            if($scope.messageText.trim()!='') {
                event.preventDefault();
                var esta = new Message('message', $scope.messageText, 1, new Date());
                esta.msg = esta.content;
                $scope.socket.emitDefault(esta);
                $scope.sendMessageApply(esta, false);
                $scope.scrollEnd();
            }
        }
    };

    $scope.verifyTime = function () {
        if($scope.messages) {
            $scope.messages = $scope.messages.map(function (m) {
                if (m.time) {
                    var timills = new Date().getTime() - m.time.getTime();
                    m.since = parseInt(timills / 1000 / 60);
                }
                return m;
            });
        }
    };

    //colocar o tempo que as mensagens foram enviadas
    $interval(function () {
        $scope.verifyTime();
    }, 60*1000);



    $scope.verItens = function () {
        var itens = JSON.parse(sessionStorage.getItem('pages'));
        if(itens){
            console.log('itens', itens);
        }else console.log('itens vazios');
    }

});