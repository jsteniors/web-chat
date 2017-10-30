angular.module('chatApp').directive('ngEnter', function () {
    
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            console.log('teclado');
        });
    }
    
});