angular.module('chatApp').provider('errorAlert', function () {
    var _time = 800;
    this.setTime = function (time) {
       _time = time;
    }
    this.getTime = function () {
        return _time;
    }
    this.$get =  function ($timeout) {
        return{
            messageError: function (errorMessage) {
                jchat('.msg-error-desc').text(errorMessage);
                jchat('.msg-errors').css('display', 'block');
                jchat('.msg-errors').animate({'margin-top': '0'}, _time);
                $timeout(function () {
                    $timeout(function () {
                        jchat('.msg-errors').css('display', 'none');
                    }, _time+200);
                }, 8000);
            }
        }
    }
    
});