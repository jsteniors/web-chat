var SocketManager = function($scope){
    var _socket = io('http://localhost:3000');

    var _id = localStorage.getItem('chatId');//getCookie('chatB2B');

    var _canalDefault = 'message';

    this.openConnection = function () {
        console.log('conectando');
        _socket.on('connect', function () {
            console.log('conectou', _id);
            var islogado = jchat('#logado').attr('value');
            _socket.emit('load', _id);
        });
    };

    this.receiveData = function(){
        _socket.on('receive', function (data) {
            if(data.content.trim().length) {
                data.whos = data.user == 'Super M' ? 0 : 1;
                data.time = new Date(data.time);
                $scope.sendMessageApply(data, true);
                $scope.scrollEnd();
            }
        });
    };
    //<input type="hidden" id="logado" value="n">
    this.startChat = function(){
        _socket.on('startChat', function(data) {
            localStorage.setItem('chatId', data.chatId);
            _id = data.chatId;
            console.log('data', data);
            if (data.boolean && data.chatId == _id) {
                console.log('entrou');
                var messages = data.messages;
                messages.forEach(function (item) {
                    item.whos = item.user == 'Super M' ? 0 : 1;
                    item.time = new Date(item.time);
                    $scope.sendMessageApply(item, true);
                    $scope.verifyTime();
                });
                $scope.scrollEnd();
            }
        });
    }

    this.emit = function(canal, message){
        message.msg = encodeURI(message.msg.toLowerCase());
        message.user = _id;
        _socket.emit(canal, message)
    }

    this.emitDefault = function (message) {
        message.chatId = _id;
        message.user = _id;
        console.log('enviando: ', message);
        _socket.emit(_canalDefault, message);
    }

    this.getSocket = function () {
        return _socket;
    }

    this.getId = function () {
        return _id;
    }

    this.getCanalDefault = function () {
        return _canalDefault;
    }
    this.setCanalDefault = function (canal) {
        _canalDefault = canal;
    }

    this.openConnection();
    this.startChat();
    this.receiveData();
}
