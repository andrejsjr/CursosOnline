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
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(() => {
                throw new Error('Não foi possível cadastrar a negociação');
            });
    }

    lista() {
        return connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(() => {
                throw new Error('Não foi possível listar as negociações');
            });
    }

    apaga() {
        return connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(() => {
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual) {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()    
        ])
        .then(todasAsNegociacoes => 
            todasAsNegociacoes
                .reduce((todasAsNegociacoesAchatadas, negociacoes) => 
                    todasAsNegociacoesAchatadas.concat(negociacoes), []))
        .then(negociacoes => 
            negociacoes.filter(negociacao => 
                !listaAtual.some(negociacaoExistente => 
                    negociacao.isEquals(negociacaoExistente))))
        .catch(erro => {
            console.log(erro);
            throw new Error(erro);
        });
    }
}