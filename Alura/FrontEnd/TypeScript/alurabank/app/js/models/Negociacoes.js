export class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        return [...this._negociacoes];
    }
    paraTexto() {
        console.log('impressao');
        console.log(JSON.stringify(this._negociacoes));
    }
    ehIgual(negociacoes) {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}
