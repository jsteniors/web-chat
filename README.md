Web Chat
====

Para executar um teste do web-chat: <br/>
 - Ter o jquery e do angular >=1.6.6 <br/>
 - Adcionar o arquivo [lib/script.js](https://github.com/jsteniors/web-chat/blob/master/dist/script.js) ao seu script <br/>
 - Referenciar arquivo [lib/style.css](https://github.com/jsteniors/web-chat/blob/master/dist/style.css) <br/>
 - Em uma tag qualquer adicionar referenciar o modulo angular e colocar a tag <chat>: <br/>
 ```
    <body>
        <!-- Qualquer tag com corpo -->
        <ANY ng-app='chatApp'>
            <!-- Seu chat sera inserido aqui -->
            <chat></chat>
        </ANY
    </body>
 ```
 <br/>
Para configurar a url da requisição basta configurar o modulo:<br/>
```
    angular.module('chatApp').config(function(botAPIProvider){
        botAPIProvider.setBaseUrl('your-url-here');
    });
```



