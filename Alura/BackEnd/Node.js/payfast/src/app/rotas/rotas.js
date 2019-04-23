module.exports = function(app) {
    app.get('/pagamentos', (req, res) => {
        res.send('OK');
    });

    app.post('/pagamentos/pagamento', (req, res) => {
        const pagamento = req.body;
        pagamento.status = 'CRIADO';
        pagamento.data = new Date();
        res.send(pagamento);
    });
};