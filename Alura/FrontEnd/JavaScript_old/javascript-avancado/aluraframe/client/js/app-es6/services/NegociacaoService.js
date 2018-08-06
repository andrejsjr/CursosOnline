import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoDao} from '../dao/NegociacaoDao';

export class NegociacaoService {
    constructor() {
        this._service = new HttpService();
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()        
        ])
        .then(listaTodasAsNegociacoes => {
            return listaTodasAsNegociacoes
                .reduce((todasAsNegociacoes, negociacoes) => todasAsNegociacoes.concat(negociacoes), []);
        })            
        .catch(erro => {
            console.log(erro);
            throw new Error(erro)
        });
    }
    
    obterNegociacoesDaSemana() {
        return this._service.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),
                    objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(`Não foi possível importar negociações da semana (${erro})`);
                throw new Error(erro);
                // throw new Error('Não foi possível importar negociações da semana.');
            });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._service.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),
                    objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(`Não foi possível importar negociações da semana anterior (${erro})`);
                throw new Error(erro);
                // throw new Error('Não foi possível importar negociações da semana anterior.');
            });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._service.get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),
                    objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(`Não foi possível importar negociações da semana retrasada (${erro})`);
                throw new Error(erro);
                // throw new Error('Não foi possível importar negociações da semana retrasada.');
            });
    }

    cadastra(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(mensagem => mensagem)
            .catch(erro => {throw new Error(erro)});
    }

    apaga() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => mensagem)
            .catch(erro => {throw new Error(erro)});
    }

    lista() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {throw new Error(erro)});
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente => 
                        negociacaoExistente.isEquals(negociacao))))
            .catch(erro => {throw new Error(erro)});
    }
}