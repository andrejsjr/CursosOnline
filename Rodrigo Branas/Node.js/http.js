var router = require('./router');

var app = router(3412);

var operadoras = [
    {nome: "Oi", codigo: 14, categoria: "celular", preco: 2},
    {nome: "Vivo", codigo: 15, categoria: "celular", preco: 1},
    {nome: "Tim", codigo: 41, categoria: "celular", preco: 3}
]

var contatos = [
    {id: 1, nome: "Bruno", telefone: "9999-2222", data: new Date(), operadora: operadoras[1]},
    {id: 2, nome: "Sandra", telefone: "9999-3333", data: new Date(), operadora: operadoras[2]},
    {id: 3, nome: "Mariana", telefone: "9999-9999", data: new Date(), operadora: operadoras[3]}
]

app.interceptor((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type');
    next();
});

app.interceptor((req, res, next) => {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    next();
});

app.get('/operadoras', (req, res) => {
    res.write(JSON.stringify(operadoras));
    res.end();
});

app.get('/contatos', (req, res) => {
    res.write(JSON.stringify(contatos));
    res.end();
});

app.post('/contatos', (req, res) => {
    var contato = req.body;
    contatos.push(JSON.parse(contato));
    res.end();
});

app.options('/contatos', (req, res) => {
    res.end();
});
