jchat = jQuery.noConflict();
jchat(document).ready(function () {
    jchat('body').append(chat);
    var content = jchat('.chat-container');
    console.log(content);
    var clicado = false;
    jchat(document).on('mousemove', function (event) {
        if(clicado){
            var dy = event.offsetY - content[0].offsetTop;
            var dx = event.offsetX - content[0].offsetLeft;
            content.css({
                top: (content[0].offsetTop+dy)+"px",
                left: (content[0].offsetLeft+dx)+'px'
            });

        }
    });
    content.on('mousedown',function (event) {
        console.log('entrou');
        clicado = true;
    });
    content.on('mouseup',function (event) {
        console.log('saiu');
        clicado = false;
    });

});