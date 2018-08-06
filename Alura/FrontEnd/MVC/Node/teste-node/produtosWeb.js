var http = require("http");
http.createServer(function (req, res) {
    console.log("Recebendo request...");    
    res.end("<html><body>Lista de Produtos</body></html>");
    console.log("Response devolvido.");
}).listen(3000);