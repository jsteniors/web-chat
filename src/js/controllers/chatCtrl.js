angular.module('chatApp').controller('chatCtrl', function ($scope, $interval, errorAlert, botAPI) {

    $scope.messages = [];

    var content = jchat('.chat-container');

    //enviar mensagem com parametro continued para diferenciar mensagem continuadas
    var sendMessageDefault = function (message, continued) {
        if(message.content != ''){
            message.continued = continued;
            $scope.messages.push(message);
            if(message.whos==1)
                $scope.messageText = new String();
        }
    };
    //'sobrescrevendo' metedo de enviar mensagem
    $scope.sendMessage = function (message) {
        sendMessageDefault(message, false);
    };

    //verificar se a mensagem anterior é a mesma de quem esta mandando atualmente
    $scope.sendContinuetedMessage = function (message) {
        var isContinued = false;
        if($scope.messages.length>0)
            isContinued = $scope.messages[$scope.messages.length - 1].whos==message.whos;
        sendMessageDefault(message, isContinued);
    };


    //evento ao apertar enter enviar mensagem
    $scope.enterKey = function (event) {
        if(event.shiftKey){
            if (jchat('#msg-txt').attr('rows') == '1')
                jchat('#msg-txt').attr('rows', '2');
            $scope.messageText.concat('\n');
        }else {
            if($scope.messageText.trim()!='') {
                var esta = new Message('message', $scope.messageText, 1, new Date());
                $scope.sendContinuetedMessage(esta);
                scrollEnd();
                botAPI.sendMessage('message='+$scope.messageText+'&tipo_solicitacao=cnpj').then(function (response) {
                    if ($scope.messageText.indexOf('\n') > -1)
                        jchat('#msg-txt').attr('rows', '2');

                    var dados = verify(response);
                    if (dados) {
                        dados.forEach(function (dado) {
                            dado.whos = 0;
                            dado.time = new Date();
                            dado.content = d.message;
                            $scope.sendContinuetedMessage(dado);
                        });
                    }
                    scrollEnd();
                }, function (error) {
                    errorAlert.messageError("Houve um problema de conexao!");
                });
            }
        }
    };
    //colocar o tempo que as mensagens foram enviadas
    $interval(function () {
        if($scope.messages) {
            $scope.messages = $scope.messages.map(function (m) {
                if (m.time) {
                    var timills = new Date().getTime() - m.time.getTime();
                    m.since = parseInt(timills / 1000 / 60);
                }
                return m;
            });
        }
    }, 60*1000);

    //iniciar a conexao com o robot
    var doInit = function () {

        jchat.ajax({
            url: "http://sac-martinsb2b.ascbrazil.com.br/Chat/login/resp-login",
            type: 'POST',
            Origin: 'http://sac-martinsb2b.ascbrazil.com.br',
            Accept : 'application/json, text/javascript, */*; q=0.01',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            data: 'message=aasdsadasd',
            success: function(data) {
                console.log('ajax', data);
            }
        });

        botAPI.sendMessage().then(function (response) {
            var dados = verify(response);
            if(dados){
                dados.forEach(function (d) {
                   d.whos = 0;
                   d.time = new Date();
                   d.content = d.message;
                   $scope.sendContinuetedMessage(d);
                });
                scrollEnd();
            }
        }, function (error) {
            errorAlert.messageError("Houve um problema de conexao!");
        });
    };
    doInit();
});

