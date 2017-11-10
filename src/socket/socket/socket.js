var SocketManager = function($scope, id){
    var _socket = io('http://botmartins-ricardopimentel.c9users.io/');

    var _id = id;

    var _canalDefault = 'msg';
    console.log('chamou');
    this.openConnection = function () {
        console.log('conectando');
        _socket.on('connect', function () {
            console.log('conectou', _id);
            _socket.emit('load', _id);
        });
    }

    this.receiveData = function(){
        _socket.on('receive', function (data) {
            if(data.msg.trim().length) {
                var enviar = {type:'message', message: decodes(data),content: decodes(data), user: data.user, time: new Date(), whos: data.user == 'Super M' ? 0 : 1};
                $scope.sendMessageApply(enviar, true);
                $scope.scrollEnd();
            }
        });
    }
    this.startChat = function(){
        _socket.on('startChat', function(data) {
            console.log('start', data);
            if (data.boolean && data.id == _id) {
                var messages = data.messages;
                messages.forEach(function (item) {
                    item = {
                        type: "message",
                        whos: item.user == 'Super M' ? 0 : 1,
                        time: new Date(item.time),
                        content: item.msg,
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
        message.msg = message.msg.toLowerCase();
        message.user = _id;
        _socket.emit(canal, message)
    }

    this.emitDefault = function (message) {
        message.msg = message.msg.toLowerCase();
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
