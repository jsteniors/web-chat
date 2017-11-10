
var SocketManager = function($scope){
    var _socket = io();

    var _id = getCookie("chatB2B");
    var _canalDefault = 'msg';

    this.openConnection = function () {
        _socket.on('connect', function () {
            _socket.emit('load', _id);
        });
    }

    this.receiveData = function(){
        _socket.on('receive', function (data) {
            if(data.msg.trim().length) {
                $scope.sendMessageApply({message: data.msg, user: data.user, time: new Date(), whos: 1}, true);
                $scope.scrollEnd();
            }
        });
    }
    this.startChat = function(){
        _socket.on('startChat', function(data) {
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
        message.content = message.content.toLowerCase();
        _socket.emit(canal, mesage)
    }

    this.emitDefault = function (message) {
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
}



