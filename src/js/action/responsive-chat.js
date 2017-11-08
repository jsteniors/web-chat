var oculto = false;
var count = 0;
var content = "";

var toggleChat = function () {
    if(count++==0){
        content = jchat('.chat-txt-desc').html();
    }
    if(oculto) {
        jchat('.chat-header-clo1').fadeIn();
        jchat('.chat-content').fadeIn();
        jchat('.chat-footer').fadeIn();
        jchat('.chat-header, chat-head-container *:not(.chat-header-col1)').animate({'min-height':'96px'}, 300);
        jchat('.chat-header-clo1').animate({'width':'120px', height: '120px'}, 300);
        jchat('.chat-header-clo2').animate({'width': '66.6%'}, 300);
        jchat('.chat-txt-desc').html(content);
    }else {
        jchat('.chat-header-clo1').fadeToggle();
        jchat('.chat-content').fadeToggle();
        jchat('.chat-footer').fadeToggle();
        jchat('.chat-header, .chat-head-container, .chat-head-container *:not(.chat-header-col1)').animate({'min-height':'18px'}, 300);
        jchat('.chat-header-clo1').animate({'width':'0px', 'height': '0'}, 300);
        jchat('.chat-header-clo2').animate({'width': '100%'}, 300);
        jchat('.chat-txt-desc').html('<h3 class="toogle-title">Atendimento ao cliente!</h3>');
    }

    jchat('.chat-container').css({bottom: '10px', right:'20px'});
    oculto = !oculto;
}

