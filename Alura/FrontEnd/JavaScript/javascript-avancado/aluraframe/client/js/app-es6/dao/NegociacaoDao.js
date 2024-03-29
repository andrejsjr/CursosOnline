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

            request.onsuccess = e => resolve();

            request.onerror = e => {
                console.log(e.target.error);
                reject();
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            var negociacoes = [];
            
            var cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
            
            cursor.onsuccess = e => {
                var atual = e.target.result;
    
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
    
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };
    
            cursor.onerror = e => {
                console.log(e.target.error);                
                reject();
            };
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            var request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            
            request.onsuccess = e => resolve();
    
            request.onerror = e => {
                console.log(e.target.error);                
                reject();
            };
        });
    }
}