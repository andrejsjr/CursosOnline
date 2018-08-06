import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            var request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve('Negociação adicionada com sucesso.');
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação.');
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            var cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            var negociacoes = [];

            // chamado em razão do store.openCursor(), fará com o que o regAtual aponte para o primeiro objeto da store
            // chamado em razão do regAtual.continue(), fará com o que o regAtual aponte para o próximo objeto da store
            cursor.onsuccess = e => {                
                var regAtual = e.target.result;
                if (regAtual) {
                    /* dadosRegAtual não é uma negociação pois regAtual contem apenas
                    os valores das propriedades - formato JSON  */
                    let dadosRegAtual = regAtual.value;

                    negociacoes.push(new Negociacao(dadosRegAtual._data, dadosRegAtual._quantidade, dadosRegAtual._valor));

                    regAtual.continue();
                } else {
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações.');
            };
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            var request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso.');

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível apagar as negociações');
            }
        });
    }
}