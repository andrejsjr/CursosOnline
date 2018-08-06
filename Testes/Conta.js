class Conta {
    constructor(saldo) {
        this._saldo = saldo;
    }

    get saldo() {
        return this.saldo;
    }

    atualiza(taxa) {
        throw new Error('Você deve sobrescrever o método.');
    }
}