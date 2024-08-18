//PRIMEIRO IMPORTA-SE A BIBLIOTECA 'ws', QUE IMPLEMENTA O WEBSOCKET EM JS
const ws = require('ws');

//DEPOIS IMPORTA-SE A BIBLIOTECA 'http', QUE IMPLEMENTA SERVIDORES HTTP EM JS
const http = require('http');

//CRIA-SE O SERVIDOR HTTP
const server = http.createServer();

//ESSE SERVIDOR É UTILIZADO COMO ENDEREÇO PARA SERVIDOR WEBSOCKET
const wsServer = new ws.Server({server});

//ESSE SERVIDOR JS É O QUE SERÁ UTILIZADO PARA ESCUTAR AS INTERAÇÕES DO SISTEMA

//A LINHA DE CÓDIGO ABAIXO DETECTA UMA CONEXÃO
wsServer.on('connection', (connection)=>{
    console.log('conectado');

    //A LINHA DE CÓDIGO ABAIXO DETECTA UMA MENSAGEM
    connection.on('message', (message)=>{

        //A LINHA A BAIXO ITERA COM TODOS OS CLIENTES DO SERVIDOR, CONFERE SE A CONEXÃO E ENVIA A MENSAGEM.
        wsServer.clients.forEach((client)=>{
            if(client.readyState===ws.OPEN){
                client.send(message)
            }
        })

        
    });

    //A LINHAS DE CÓDIGO ABAIXO DETECTA UMA DESCONEXÃO
    connection.on('close', ()=>{
        console.log('desconectado');
    });
});

//A LINHA ABAIXO RODA O SERVIDOR || O PRIMEIRO PARÂMETRO É A PORTA EM QUE O SERVIDOR VAI RODAR, E O SEGUNDO É UMA FUNÇÃO QUE SERÁ EXECUTADO QUANDO ELE ESTIVER NO AR.
server.listen(8080, ()=>{
    console.log('o server está escutando na porta 8080.')
})
