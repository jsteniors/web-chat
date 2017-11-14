function loginBot(){
    if (ValidaCamposLoginBot()) {
        jchat("#loginForm .loader").show();
        window.location.href = 'https://b.martins.com.br/Login.aspx?email=' + jchat("#desEmailBot").val() + '&codCli=' + jchat.trim(jchat("#numCodigoCnpjBot").val()) + '&returnpage=' + encodeURIComponent(window.location.href);
    }
}

function ValidaCamposLoginBot() {
    jchat("#loginForm .messages").hide();
    if (jchat("#desEmailBot").val() != "") {
        if (jchat("#numCodigoCnpjBot").val() != 0) {
            return true;
        } else {
            jchat("#loginForm .messages").html("Selecione o c&oacute;digo e CNPJ.").show();
            jchat("#numCodigoCnpjBot").focus();
            return false;
        }
    } else {
        jchat("#loginForm .messages").html("Preencha seu e-mail.").show();
        jchat("#desEmailBot").focus();
        return false;
    }
}

jchat("#desEmailBot").blur(function() {
    logarclienteTopoBot(this);
}).keyup(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $('#numCodigoCnpjBot').focus();
    }
});


function getCodigoClienteTopoBot(email) {
    var messageData = {"verifyString": "superM", "action": "onBlurEmail", "idemail": email};
    jchat.ajaxSetup({ cache: false });
    jchat.ajax({
        url: "https://botmartins-ricardopimentel.c9users.io/webhook",
        type: 'POST',
        data: messageData,
        dataType: 'text',
        cache: "false",
        beforeSend: function() {
            jchat("#desEmailBot, #numCodigoCnpjBot").attr("disabled", "disabled");
            jchat("#numCodigoCnpjBot").html('<option value="">Aguarde...</option>');
        },
        success: function(txt) {
            jchat("#desEmailBot, #numCodigoCnpjBot").removeAttr("disabled");
            if (txt == "") {
                //Mensagem utiliza caracteres ISO 8859-1 (duvidas procurar no google)
                jchat("#loginForm .not-logged .messages").html("N&atilde;o &eacute; poss&iacute;vel realizar o login.").show();
                jchat("#numCodigoCnpjBot").html('<option value="0">Selecione o C&oacute;digo e CNPJ do Cliente</option>');
            } else {
                jchat("#numCodigoCnpjBot").html(txt);
            }
        },
        error: function(error) {
            console.log('erro');
            jchat("#desEmailBot, #numCodigoCnpjBot").removeAttr("disabled");
        }
    });
}


function logarclienteTopoBot(obj) {
    console.log('aq');
    jchat("#loginForm .not-logged .messages").hide();
    if (jchat(obj).val() != "") {
        var regmail = /^[\w!#$%&amp;'*+\/=?^`{|}~-]+(\.[\w!#$%&amp;'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;

        if (regmail.test(jchat("#desEmailBot").val())) {
            getCodigoClienteTopoBot(jchat(obj).val());
        } else {
            jchat("#loginForm .not-logged .messages").html("E-mail inv&aacute;lido.").show();
        }
    }
}