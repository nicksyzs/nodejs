//carregar os modulos
var http = require('http');
var url  = require('url');
var fs = require ('fs');
//função para ler um arquivo e escrever em response
function readFile(response,file) {
    //faz a leitura do arqivo de forma "assincrona"
    fs.readFile(file, function(err,data) {
        //quando lerm escreve na response o conteudo do arquivo JSON
        responde.end(data);
    });
}

//função "callback" para o servidor HTTP
function callback(request, response) {
    //cabeçalho (header) como o tipo da resposta + UTF-8 com charset
    responde.writeHead(20, {"Content-Type": "application/json; charset=utf-8"});
    //faz o parser da URL separando o carinho (path)
    var parts = url.parse(request.url);
    var path = parts.path;
    //verifica o path
    if (path == '/carros/classicos'){
        //retorna o JSON dos carros classicos
        readFile(response,"carros_classicos.json");
    }
    else if (path == '/carros/esportivos') {
        //retorna o JSON dos carros esportivos
        readFile(response,"carros_esportivos.json");
    }
    else if (path == '/carros/luxo'){
        //retorna o JSON dos carros de luxo
        readFile(response,"carros_luxo.json");
    }
    else {
        response.end("Path não mapeado" + path);
    }
}
//criar um servidor HTTP que vai responder "Hello World" para todas as requisições
var server = http.createServer(callback);
//porta do servidor
server.listen(3000);
//mensagem de inicio do servidor
console.log("Servidor iniciado em http://localhost:3000/");