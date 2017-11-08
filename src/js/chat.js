var chat = "<div class=\"chat-container\" >\n" +
    "<div class='outer-chat'><a onclick='toggleChat()' class='chat-closer-icon'><i class=\"fa fa-times-circle-o\" aria-hidden=\"true\"></i></a></div>"+
    "        <div class='inner-chat'>  "+
        "        <header class=\"chat-header\">\n" +
        "            <div class=\"container-fluid chat-head-container\">\n" +
        "                <div class=\"row\">\n" +
        "                    <div class=\"col-sm-4 chat-header-clo1\"></div>\n" +
        "                    <div class=\"col-sm-8 chat-header-clo2\">\n" +
        "                        <div class=\"chat-txt-desc\">\n" +
        "                            <h3>Olá, eu sou o Mart. <br>\n" +
        "                            Seu consultor virtual.</h3>\n" +
        "                            <h4>Estou aqui para lhe auxiliar à <br>\n" +
        "                                realizar as compras no site.</h4>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </header>\n" +
        "        <div class=\"chat-content\">\n" +
        "            <div class=\"bg-style\"></div>\n" +
        "            <div class=\"chat-messages\" >\n" +
        "                <div class=\"chat-message-box {{message.continued?'msg-continued':''}}\" ng-repeat=\"message in messages\">\n" +
        "                    <div class=\"message-chat-container {{message.whos?'chat-message-right':'chat-message-left'}}\" ng-if=\"message.type=='message'\">\n" +
        "                        <div class=\"message-content\">\n" +
        "                            <span class=\"msg {{message.whos?'msg-icon-right':'msg-icon-left'}}\"></span>\n" +
        "                            <span class=\"message-text\" html-content=\"{{message}}\" >\n" +
        "                                {{message.content}}\n" +
        "                            </span>\n" +
        "                        </div>\n" +
        "                        <span class=\"chat-message-time\">{{(message.since)?(message.since<1)?'Menos de um minuto':message.since<2?'1 minuto atrás':message.since+' minutos atrás':'Menos de um minuto'}}</span>\n" +
        "                    </div>\n" +
        "                    <div class=\"message-chat-container {{message.whos?'chat-message-right':'chat-message-left'}} msg-type-linked\" ng-if=\"message.type=='linked'\">\n" +
        "                        <div class=\"message-content\">\n" +
        "                            <a class=\"btn btn-primary\" href=\"{{message.link}}\">{{message.buttonText}}</a>\n" +
        "                        </div>\n" +
        "                        <span class=\"chat-message-time\">{{(message.since)?(message.since<1)?'Menos de um minuto':message.since<2?'1 minuto atrás':message.since+' minutos atrás':'Menos de um minuto'}}</span>\n" +
        "                    </div>\n" +
        "                    <div class=\"message-chat-container {{message.whos?'chat-message-right':'chat-message-left'}}\" ng-if=\"message.type=='form'\">\n" +
        "                        <div class=\"message-content\">\n" +
        "                            <span class=\"msg {{message.whos?'msg-icon-right':'msg-icon-left'}}\"></span>\n" +
        "                            <div class=\"msg-form\">\n" +
        "                                <input class=\"form-control\" type=\"text\" placeholder=\"DIGITE SEU EMAIL\">\n" +
        "                                <select class=\"form-control\">\n" +
        "                                    <option>SELECIONE O CODIGO DE CNPJ</option>\n" +
        "                                    <option>Teste</option>\n" +
        "                                    <option>Outro teste</option>\n" +
        "                                    <option>Teste form</option>\n" +
        "                                </select>\n" +
        "                                <button class=\"btn btn-primary btn-block\">\n" +
        "                                    ENTRAR<i class=\"fa fa-angle-right\" aria-hidden=\"true\" style=\"color: #F07830\"></i>\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <div>\n" +
        "                            <span class=\"chat-message-time\">{{(message.since)?(message.since<1)?'Menos de um minuto':message.since<2?'1 minuto atrás':message.since+' minutos atrás':'Menos de um minuto'}}</span>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"msg-errors\">\n" +
        "            <div class=\"msg-error\">\n" +
        "                    <span class=\"msg-error-desc\">\n" +
        "                        Houve um problema de conexao;\n" +
        "                    </span>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <footer class=\"chat-footer\">\n" +
        "            <div class=\"content-fluid\">\n" +
        "                <div class=\"row\">\n" +
        "                    <div class=\"col-lg-2 chat-menu-icon\">\n" +
        "                        <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n" +
        "                    </div>\n" +
        "                    <div class=\"col-lg-10 chat-input-message\">\n" +
        "                        <div class=\"input-line\" style=\"position: relative;width: 100%;\">\n" +
        "                            <textarea rows=\"1\" id=\"msg-txt\" class=\"form-control\" placeholder=\"Digite aqui uma mensagem...\" ng-model=\"messageText\" ng-keypress=\"($event.keyCode==13)?enterKey($event):0\" onresize=\"false\">\n" +
        "\n" +
        "                            </textarea>\n" +
        "                            <span ng-click=\"buttonSend(messageText)\">\n" +
        "                                <i class=\"fa fa-paper-plane\" aria-hidden=\"true\"></i>\n" +
        "                            </span>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </footer>\n" +
        "    </div>\n"+
     "  </div>";