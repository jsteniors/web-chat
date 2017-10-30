Web Chat
====

Para executar um teste do web-chat: <br/>
 - Ter o jquery e angular >=1.6.6 <br/>
 - Adcionar o arquivo [lib/script.js](https://github.com/jsteniors/web-chat/blob/master/lib/script.js) ao seu script <br/>
 - Referenciar arquivo [lib/style.css](https://github.com/jsteniors/web-chat/blob/master/lib/style.css) <br/>
 - Em uma tag qualquer com corpo referenciar o modulo angular 'chatApp' e colocar a tag <chat>: <br/>
 ```html
    <body>
        <!-- Qualquer tag com corpo -->
        <ANY ng-app='chatApp'>
            <!-- Seu chat sera inserido aqui -->
            <chat></chat>
        </ANY>
    </body>
 ```
 <br/>
Para configurar a url da requisição basta configurar o modulo: <br/>

```javascript
    angular.module('chatApp').config(function(botAPIProvider){
        botAPIProvider.setBaseUrl('your-url-here');
    });

```

Para configrar o metodo da requisição basta configurar o modulo: <br/>

```javascript
    angular.module('chatApp').config(function(botAPIProvider){
        botAPIProvider.setMethod('METHOD');
    });

```




