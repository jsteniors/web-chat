var verify = function (response) {
    if(response.data){
        var dados = response.data;
        if(dados.length>0)
            return dados;
    }
    return false;
}

var scrollEnd = function () {
    var msgs = jchat('.chat-messages');
    if(msgs)
        if(msgs.length>0)
        msgs.animate({scrollTop: msgs[0].scrollHeight}, 500);
}