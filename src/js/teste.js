// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var mongodb = require('mongodb');

var sockets = [];
var mydb;

var MongoClient = mongodb.MongoClient;

const yourverifystring = "superM";

// Export a function, so that we can pass
// the app and io instances from the app.js file:



module.exports = function(app,io){

    //With this as the connector
    /*
    MongoClient.connect(mongo.url, function(err, db) {
        if(err) {
            console.log("failed to connect to the database");
        } else {
            console.log("connected to database");
            mongodb = db;
        }
    });
    */

    //var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
    var credentials = {
        db_type: "mongodb",
        maps: [],
        name: "bmix-dal-yp-13cb1c7c-b04b-4e73-ab31-a5a17c2e37a8",
        uri_cli: "mongo --ssl --sslAllowInvalidCertificates sl-us-south-1-portal.10.dblayer.com:26248/compose -u admin -p DGYWXVYCQECYGYES --authenticationDatabase admin",
        ca_certificate_base64: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURkekNDQWwrZ0F3SUJBZ0lFV2Zja2F6QU5CZ2txaGtpRzl3MEJBUTBGQURBOU1Uc3dPUVlEVlFRRERESnUKYVdNdWRHZDJRR2R0WVdsc0xtTnZiUzB5WkRnd09EazNaRFV3TjJaaVpESTBOMlJoWW1abVlUSTJZV1JtWXpKaQpNVEFlRncweE56RXdNekF4TXpBNE5UbGFGdzB6TnpFd016QXhNekF3TURCYU1EMHhPekE1QmdOVkJBTU1NbTVwCll5NTBaM1pBWjIxaGFXd3VZMjl0TFRKa09EQTRPVGRrTlRBM1ptSmtNalEzWkdGaVptWmhNalpoWkdaak1tSXgKTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUErVmU2Vm9VZTFqWkJ1WmRreGJacAora25icGdhSG5acVFIN09mZnVORktPVlR1Qm1UeWdpR1dTZ3N6Z2g1dElkclpyR2lWMFhBMVZZNUo1c0NRSVA1CkR1T0huY2tUZXhheDhKVTlsczUyRGIrT2VHa2t6eVdJSVhDV3o3S3dUSU1QLzloOFBBckpiYkdZZzRkL29hVGEKYys5bWVZQm5ZdU90WDNHSGhFVi9wZFFTa1lBdkpGVUFGRldFQ2NjUmtEdmJib1FpZWFXZTBSdWx1RGNIQjZHUwo2dTY1M3NXWkRxZEVzZk1lbmVEdTFxMTdHUzEwd3hhelhIVnZ5aWpvcUo3YkowUkZaSGtLdHJlSlhJTy9pOGRXCjNPNUFzZlRtMjYrWmJQSFZYSDdzck1RczNvd1pYYjJXcmZJTmpLaVdtTTV4L0ZwbmhVR1dvdnNleFl5eFh0OTYKMXdJREFRQUJvMzh3ZlRBZEJnTlZIUTRFRmdRVTFBNFYvQ1kyWVdsOElVUytOVy9WWkMwbmNNWXdEZ1lEVlIwUApBUUgvQkFRREFnSUVNQjBHQTFVZEpRUVdNQlFHQ0NzR0FRVUZCd01CQmdnckJnRUZCUWNEQWpBTUJnTlZIUk1FCkJUQURBUUgvTUI4R0ExVWRJd1FZTUJhQUZOUU9GZndtTm1GcGZDRkV2alZ2MVdRdEozREdNQTBHQ1NxR1NJYjMKRFFFQkRRVUFBNElCQVFCNUVNSEs5eEpaYUFHSHVraENubEZaR0V4NWZFZzdwemhwcjFoaXp6S3lZcHUwM1l2UAo3SVM4U080djBhaVdJTE44QUV0MnFpdXNpa2RTbS9jN1FkSm92ZWNjNis5RVY4c2tBM3hucmtkODdmTGxPSS9qCmxBelllUmw2V1hETWpNbnpLUk1lOVV0WEhkSmI4aE4rSEtiREwwVXR4WFowZXlENkZXU2lMSm8wbnkxS3N0RFkKOU8vSWhjcC9sMmNDdENxTjQ5ZjIwNEtFQ2daeTRBT0ZmTFhvakIvT1grbVNrN1ZIWHRUOW44UFNpdHFnTmxvagpFK1RYUVR2cmhLcVNtR1Q4SzkzMUxaUGI1K0JaVUVjZ0M1Q0xaZnZDYmh3U1pKMk9OdWcyb3hMV0I4VmVORWQ0CmxXbTBRcmlscmRFTzNrb21WODd0Z3M3SkdzajMvRzBLQlQyMgotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==",
        deployment_id: "59f72460e03ad80019a463d5",
        uri: "mongodb://admin:DGYWXVYCQECYGYES@sl-us-south-1-portal.10.dblayer.com:26248,sl-us-south-1-portal.11.dblayer.com:26248/compose?ssl=true&authSource=admin"
    }

    MongoClient.connect(credentials.uri, function(err, db) {
        if (err) {
            console.log('Erro', err);
        } else {
            //console.log('Conectou');
            mydb = db;

        }
    });

    // Metodos para webhook
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Using cookie
    app.use(cookieParser());

    // Then we create a route to handle our example database call
    app.get("/mensagem", function(request, response) {
        // and we call on the connection to return us all the documents in the
        // words collection.
        mydb.collection("mensagensB2B").find().toArray(function(err, mensagem) {
            if (err) {
                response.status(500).send(err);
            } else {
                //console.log(mensagem);
                response.send(mensagem);
            }
        });
    });

    // Then we create a route to handle our example database call
    app.get("/limparbanco", function(request, response) {
        // and we call on the connection to return us all the documents in the
        // words collection.
        try {
            mydb.collection("usuariosB2B").drop();
            mydb.collection("mensagensB2B").drop();
            mydb.createCollection("usuariosB2B");
            mydb.createCollection("mensagensB2B");
        } catch (e) {
            console.log(e);
            response.send('erro: ' + e);
        }
        response.send('sucesso');
    });

    // Then we create a route to handle our example database call
    app.get("/usuarios", function(request, response) {
        // and we call on the connection to return us all the documents in the
        // words collection.
        mydb.collection("usuariosB2B").find().toArray(function(err, mensagem) {
            if (err) {
                response.status(500).send(err);
            } else {
                //console.log(mensagem);
                response.send(mensagem);
            }
        });
    });


    app.get('/webhook', function(req, res) {
        console.warn('GET');
        console.warn(req.query);
        console.log(req.body);

        if (req.body.action = 'start') {

            console.log('Chat já criado.');



            res.json([{"type":"message","message":"Bom dia "+req.body.message}]);

        }

    });

    app.post('/webhook', function(req, res){
        console.log('POST DO CONVERSE', data);
        var data = req.body;

        if (data.verifyString === yourverifystring) {
            if (data.action === "challenge") {
                console.log(data.payload.message.text);
                var retorno = '{"challenge": "' + data.payload.message.text + '"}';
                console.log(retorno);
                res.status(200).send(retorno);
            }
            else if (data.action === "message") {
                var mensagem = data.payload.message.text;
                var userId = data.payload.message.userId;
                var chatId = data.payload.message.threadID;

                // Envia mensagem para o cliente
                var msg = {chatid: chatId, msg: mensagem, user: 'Super M'};
                insereMensagem(mydb, msg);

                sockets.forEach(function (socket) {
                    if (socket.room === chatId) {
                        socket.emit('receive', msg);
                    }
                });
            }
            else if (data.action === 'onBlurEmail') {
                var idemail = data.idemail;
                var bodyB2B = getCodigoClienteTopo(idemail);
                console.log('retorno B2B', bodyB2B)
                res.status(200).send(bodyB2B);
            }
            else {
                console.log(data);
            }
            res.sendStatus(200);
        }
        else {
            console.log("Acesso negado");
            res.sendStatus(403);
        }
    });

    app.get('/', function(req,res){

        var id = '';

        //console.log('req.cookies.chatB2B', req.cookies.chatB2B);
        if (req.cookies.chatB2B != undefined) {

            //console.log('cookies', req.cookies.chatB2B);
            id = req.cookies.chatB2B;
        }else{
            console.log('corpo', req.body);
            if(req.body.id){
                id = req.body.id;
            }
        }

        if (id != '') {
            console.log('ContinuaChat', id);
        }
        else {
            // Generate unique id for the room
            var dominio = req.headers.host;
            /*if (ambiente(req) == 'prd')
                dominio = 'chatmartins.mybluemix.net';
            else
                dominio = 'botmartins-ricardopimentel.c9users.io';
            */
            var shortid = require('shortid');
            shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$');
            id = shortid.generate();
            console.log('CreateChat', id);
            res.cookie('chatB2B', id, {
                domain: dominio,
                expires: new Date(Date.now() + 2*60*60*1000)
                //httpOnly: true
            });
        }

        // Redirect to the random room
        //res.redirect('/chat/'+id);

        res.json({id: id});
        //res.send('chat');

    });

    app.get('/tagmanager', function(req, res) {
        res.render('tagmanager');
    });

    app.get('/teste', function(req,res){

        var id = '';

        //console.log('req.cookies.chatB2B', req.cookies.chatB2B);
        if (req.cookies.chatB2B != undefined) {
            //console.log('cookies', req.cookies.chatB2B);
            id = req.cookies.chatB2B;
        }

        if (id != '') {
            console.log('ContinuaChat', id);
        }
        else {
            // Generate unique id for the room
            var dominio = '';

            //if (req.headers.host.indexOf('botmartins-ricardopimentel.c9users.io') > -1)
            dominio = 'botmartins-ricardopimentel.c9users.io';
            //else
            //	dominio = 'chatmartins.mybluemix.net';

            var shortid = require('shortid');
            shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$');
            id = shortid.generate();
            console.log('CreateChat', id);
            res.cookie('chatB2B', id, {
                domain: dominio,
                expires: new Date(Date.now() + 2*60*60*1000)
                //httpOnly: true
            });
        }

        res.render('chat');

    });

    app.get('/testeangular', function(req, res) {
        res.render('teste');
    });
    app.get('/chat/:id', function(req,res){

        // Render the chat.html view
        res.render('chat');
    });


    // Initialize a new socket.io application, named 'chat'
    var chat = io.on('connection', function (socket) {

        console.log("url: " + socket.handshake.url);

        sockets.push(socket);

        // When the client emits 'login', save his name,
        // and add them to the room
        socket.on('load', function(data) {


            var room = findClientsSocket(io, data);

            console.log('Quantidade de janelas na sala:', data, room.length);

            // Only two people per room are allowed
            if (room.length == 0) {

                // Use the socket object to store data. Each client gets
                // their own unique socket object

                var chatId = data;
                socket.username = chatId;
                socket.room = chatId;

                // Add the client to the room
                socket.join(data);

                var usuario = retornaUsuarioOuInsereDB(mydb, chatId);

                if (usuario.novousuario == true) {
                    console.log('Novo cliente');
                    var mensagem = 'Olá, você é nosso cliente?';

                    var msg = {chatid: chatId, msg: mensagem, user: 'Super M'};
                    socket.emit('receive', msg);

                    insereMensagem(mydb, msg);

                    mensagem = '<a class="submit orange-button" message="sim">Sim</a>&nbsp&nbsp<a class="submit orange-button" message="nao">Não</a>';
                    msg = {chatid: chatId, msg: mensagem, user: 'Super M'};
                    socket.emit('receive', msg);

                    insereMensagem(mydb, msg);
                }
                else {

                    console.log('Chat já criado.');

                    var messagesDB = retornaMensagensUsuarioDB(mydb, chatId);
                    var mensagensDaSala = [];

                    for (var i = 0;  i < parseInt(messagesDB.length); i++) {
                        var item = messagesDB[i];
                        mensagensDaSala.push(item);
                    }

                    chat.in(data).emit('startChat', {
                        boolean: true,
                        id: data,
                        messages: mensagensDaSala
                    });

                }

            }

            else if (room.length <= 10) {

                // Send the startChat event to all the people in the
                // room, along with a list of people that are in it.

                var chatId = data;
                socket.username = chatId;
                socket.room = chatId;

                console.log('Outra janela', chatId);

                // Add the client to the room
                socket.join(data);

                var messagesDB = retornaMensagensUsuarioDB(mydb, chatId);
                var mensagensDaSala = [];

                for (var i = 0;  i < parseInt(messagesDB.length); i++) {
                    var item = messagesDB[i];
                    mensagensDaSala.push(item);
                }

                chat.in(data).emit('startChat', {
                    boolean: true,
                    id: data,
                    messages: mensagensDaSala
                });

            }
            else {
                console.log('Sala lotada no login do cliente.');
                //socket.emit('tooMany', {boolean: true});
            }
        });

        // Somebody left the chat
        socket.on('disconnect', function() {

            // Notify the other person in the chat room
            // that his partner has left

            console.log('Desconectou', socket.room);

            var room = findClientsSocket(io, socket.room);

            if (room.length == 0) {
                console.log('Sala encerrada');
                // leave the room
                socket.leave(socket.room);
            }

            sockets.splice(sockets.indexOf(socket), 1);
        });


        // Handle the sending of messages
        socket.on('respostaLogin', function(data){

            var logMsg = {chatid: socket.room, msg: data.msg, user: socket.room};
            insereMensagem(mydb, logMsg);

            solicitaLogin(socket, data.user, data.msg)
            // When the server receives a message, it sends it to the other person in the room.

        });

        // Handle the sending of messages
        socket.on('msg', function(data){

            var ambiente = '';
            console.log('socket.url', socket.handshake.headers.host);
            if (socket.handshake.headers.host.indexOf('botmartins-ricardopimentel.c9users.io') > -1)
                ambiente = 'dsv';
            else
                ambiente = 'prd';

            socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user});

            sendMessageTextToConverse(ambiente, socket.room.toString(), data);

            // When the server receives a message, it sends it to the other person in the room.
            var logMsg = {chatid: socket.room, msg: data.msg, user: data.user};
            insereMensagem(mydb, logMsg);

        });
    });

};

function solicitaLogin(socket, user, msg) {

    var mensagem = '';

    if (msg.toLowerCase() == 'sim') {
        mensagem = '<div class="logincompleto">' +
            '<div class="loader"><span>Processando, aguarde...</span></div>' +
            '<form class="loginForm">' +
            '<div class="bodylogin">' +
            '<div class="messages" style="display: none;">E-mail inválido.</div>' +
            '<input type="text" name="desEmail" id="desEmail" placeholder="DIGITE SEU E-MAIL" onblur="logarclienteTopo(this);">' +
            '<select name="numCodigoCnpj" id="numCodigoCnpj">' +
            '<option value="0">Selecione o Código e CNPJ do Cliente</option>' +
            '</select>' +
            '<a id="submit-login" class="submit blue-button" data-url="https://b.martins.com.br/" onclick="login()" href="#">' +
            'ENTRAR <span class="arrow-right"></span>' +
            '</a>' +
            '<div class="clearfix"></div>' +
            '</div>' +
            '</form>' +
            '</div>';
    }
    else if (msg.toLowerCase() == 'não') {
        mensagem = '<div class="loginemail">' +
            '<form class="loginForm">' +
            '<div class="bodylogin">' +
            '<div class="messages" style="display: none;">E-mail inválido.</div>' +
            '<input type="text" name="desEmail" id="desEmail" placeholder="DIGITE SEU E-MAIL">' +
            '<a id="submit-login" class="submit blue-button" data-url="https://b.martins.com.br/">' +
            'ENTRAR <span class="arrow-right"></span>' +
            '</a>' +
            '<div class="clearfix"></div>' +
            '</div>' +
            '</form>' +
            '</div>';
    }
    else {
        mensagem = "Responda sim ou não.";
    }

    socket.emit('receive', {chatid: user, msg: mensagem, user: "Super M"});
    insereMensagem(mydb, {chatid: user, msg: mensagem, user: "Super M"});

}

function findClientsSocket(io, roomId, namespace) {
    var res = [],
        ns = io.of(namespace ||"/");    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            }
            else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}

// Metodos para chamar o Converse.ai
function sendMessageTextToConverse(ambiente, chatId, data) {
    var messageData = {
        action: "message",
        verifyString: yourverifystring,
        payload: {
            message: {
                userID: data.user,
                threadID: chatId,
                text: data.msg
            }
        }
    }
    callSendAPI(ambiente, messageData);
}

function callSendAPI(ambiente, messageData) {
    var url = '';
    if (ambiente == 'prd')
        url = 'https://chatmartins60514.converse.ai/channel/generic_channel/inbound?wp=4F2DADE2-5ADD-4C5C-80E9-56CEC7402119&wph=0fe201b5026b000d58257286be3fa9ce47312a9fc36ee4dd65a504b0ebc10ab0';
    else
        url = 'https://chatmartins60514.converse.ai/channel/generic_channel/inbound?wp=77787B5D-5199-4981-9C0F-3C8EECD8EBA1&wph=5292c30bf60320a4acd949a44fa9d434e907e0a6d9a6f703eb6d356ae1bc85b0',

            console.log('callSendAPI');
    console.log(ambiente);
    console.log(url);

    request({
            uri: url,
            method: 'POST',
            json: messageData
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Mensagem enviada com sucesso!");
                //console.log(response);
                //console.log(body);
            }
            else {
                console.log("Erro ao enviar mensagem!");
                console.log(error);
            }
        }
    );
}

function getCodigoClienteTopo(email) {
    var source;
    console.log('chegou getCodigoClienteTopo', email);
    var messageData = {
        idemail: email
    }
    request({
            uri: "https://b.martins.com.br/ajax/ajaxCodigoCliente.aspx?mail=" + email,
            method: 'POST',
            json: messageData
        }, function(error, response, body) {
            console.log("b2b respondeu", body);
            source = body;
        }
    );
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return source;
}

function insereMensagem(mydb, msg) {

    var user;
    var novoUsuario;

    user = retornaUsuarioOuInsereDB(mydb, msg.chatid);

    console.log('Mensagem', msg);

    user.sequencial = user.sequencial + 1;
    atualizaUserDB(mydb, user);

    var d = new Date,
        dformat = [d.getMonth()+1,
                d.getDate(),
                d.getFullYear()].join('/')+' '+
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

    var msgCompleta = {
        chatid: msg.chatid,
        sequencial: user.sequencial,
        user: msg.user,
        email: user.email,
        codcli: user.codcli,
        contato: user.contato,
        msg: msg.msg,
        time: d.getTime()
    };

    mydb.collection("mensagensB2B").insertOne(
        msgCompleta, function(error, result) {
            if (error) {
                //console.log('Erro no mongo', error);
            } else {
                //console.log('Gravou no mongo mensagem');
            }
        });

}

function retornaUsuarioOuInsereDB(mydb, chatId) {
    var source;

    var d = new Date,
        dformat = [d.getMonth()+1,
                d.getDate(),
                d.getFullYear()].join('/')+' '+
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

    mydb.collection("usuariosB2B").find(
        {_id: chatId}
    ).toArray(function(error, result) {
        if (error) {
            console.log('Erro no mongo', error);
        } else {

            if (result.length == 0) {

                console.log('Vai inserir usuario');

                var usuario = {
                    _id: chatId,
                    chatid: chatId,
                    sequencial: 0,
                    email: '',
                    codcli: 0,
                    contato: '',
                    timestamp: d,
                    novousuario: true
                };

                mydb.collection("usuariosB2B").insertOne(
                    usuario,
                    function(error, result) {
                        if (error) {
                            console.log('Erro no mongo', error);
                        } else {
                            source = usuario;
                            console.log('Gravou novo usuario');
                        }
                    });
            }
            else {
                source = result[0];
            }
        }
    });

    while(source === undefined) {
        require('deasync').runLoopOnce();
    }

    return source;
}

function atualizaUserDB(mydb, usuario) {
    var source;
    try {
        mydb.collection("usuariosB2B").updateOne(
            { "_id" : usuario.chatid },
            { $inc: { sequencial: 1 },
                $set: {novousuario: false} },
            function(error, result) {
                if (error) {
                    console.log('Erro no mongo', error);
                } else {
                    source = result;
                    console.log('Atualizou no mongo');
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
    while(source === undefined) {
        require('deasync').runLoopOnce();
    }
    return source;

}

function retornaMensagensUsuarioDB(mydb, chatId) {
    var source;

    mydb.collection("mensagensB2B").find(
        {chatid: chatId}
    ).toArray(function(error, result) {
        if (error) {
            console.log('Erro no mongo', error);
        } else {

            if (result.length == 0) {

            }
            else {
                source = result;
            }
        }
    });

    while(source === undefined) {
        require('deasync').runLoopOnce();
    }

    return source;
}

function ambiente(req) {
    if (req.headers.host.indexOf('botmartins-ricardopimentel.c9users.io') > -1)
        return 'dsv';
    else
        return 'prd';
}