function login(){
    if (ValidaCamposLogin()) {
        jchat(".loader").show();
        window.location.href = 'https://b.martins.com.br/Login.aspx?email=' + jchat("#desEmail").val() + '&codCli=' + jchat.trim(jchat("#numCodigoCnpj").val()) + '&returnpage=' + encodeURIComponent(window.location.href);
    }
}

function ValidaCamposLogin() {
    jchat(".messages").hide();
    if (jchat("#desEmail").val() != "") {
        if (jchat("#numCodigoCnpj").val() != 0) {
            return true;
        } else {
            jchat(".messages").html("Selecione o c&oacute;digo e CNPJ.").show();
            jchat("#numCodigoCnpj").focus();
            return false;
        }
    } else {
        jchat(".messages").html("Preencha seu e-mail.").show();
        jchat("#desEmail").focus();
        return false;
    }
}

jchat("#desEmail").blur(function() {
    logarclienteTopo(this);
}).keyup(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $('#numCodigoCnpj').focus();
    }
});


function getCodigoClienteTopo(email) {
    var messageData = {"verifyString": "superM", "action": "onBlurEmail", "idemail": email};
    jchat.ajaxSetup({ cache: false });
    jchat.ajax({
        url: "https://botmartins-ricardopimentel.c9users.io/webhook",
        type: 'POST',
        data: messageData,
        dataType: 'text',
        cache: "false",
        beforeSend: function() {
            jchat("#desEmail, #numCodigoCnpj").attr("disabled", "disabled");
            jchat("#numCodigoCnpj").html('<option value="">Aguarde...</option>');
        },
        success: function(txt) {
            jchat("#desEmail, #numCodigoCnpj").removeAttr("disabled");
            if (txt == "") {
                //Mensagem utiliza caracteres ISO 8859-1 (duvidas procurar no google)
                jchat(".not-logged .messages").html("N&atilde;o &eacute; poss&iacute;vel realizar o login.").show();
                jchat("#numCodigoCnpj").html('<option value="0">Selecione o C&oacute;digo e CNPJ do Cliente</option>');
            } else {
                jchat("#numCodigoCnpj").html(txt);
            }
        },
        error: function(error) {
            console.log('erro');
            jchat("#desEmail, #numCodigoCnpj").removeAttr("disabled");
        }
    });
}


function logarclienteTopo(obj) {
    console.log('aq');
    jchat(".not-logged .messages").hide();
    if (jchat(obj).val() != "") {
        var regmail = /^[\w!#$%&amp;'*+\/=?^`{|}~-]+(\.[\w!#$%&amp;'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;

        if (regmail.test(jchat("#desEmail").val())) {
            getCodigoClienteTopo(jchat(obj).val());
        } else {
            jchat("#loginForm .not-logged .messages").html("E-mail inv&aacute;lido.").show();
        }
    }
}