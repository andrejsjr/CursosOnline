class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
                .then(negociacoes => 
                    resolve(negociacoes.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
    }
    
    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
                .then(negociacoes => 
                    resolve(negociacoes.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });
        });
    }
    
    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => 
                    resolve(negociacoes.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
    }

    cadastra(negociacao) {
        return connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação incluida com sucesso')
            .catch(erro => {
                throw new Error('Não foi possível incluir a negociação');
            });
    }
}