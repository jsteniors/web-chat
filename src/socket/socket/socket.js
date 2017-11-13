var SocketManager = function($scope){
    var _socket = io('https://botmartins-ricardopimentel.c9users.io/');

    var _id = getCookie('chatB2B');

    var _canalDefault = 'msg';

    this.openConnection = function () {
        console.log('conectando');
        _socket.on('connect', function () {
            console.log('conectou', _id);
            var islogado = jchat('#logado').attr('value');
            _socket.emit('load', {chatid:_id, logado:islogado});
        });
    }

    this.receiveData = function(){
        _socket.on('receive', function (data) {
            if(data.msg.trim().length) {
                if (!_id)
                    document.cookie = 'chatB2B='+data.chatid;
                var enviar = {type:'message', message: decodeURI(data.msg),content: decodeURI(data.msg), user: data.user, time: new Date(), whos: data.user == 'Super M' ? 0 : 1};
                $scope.sendMessageApply(enviar, true);
                $scope.scrollEnd();
            }
        });
    }
    //<input type="hidden" id="logado" value="n">
    this.startChat = function(){
        _socket.on('startChat', function(data) {
            console.log('start', data);
            if (data.boolean && data.chatid == _id) {
                var messages = data.messages;
                messages.forEach(function (item) {
                    item = {
                        type: "message",
                        whos: item.user == 'Super M' ? 0 : 1,
                        time: new Date(item.time),
                        content: decodeURI(item.msg),
                        user: item.user
                    };
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
        message.msg = encodeURI(message.msg.toLowerCase());
        message.user = _id;
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
