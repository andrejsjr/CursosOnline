export class Negociacao {
    constructor(data, quantidade, valor) {
        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    paraTexto() {
        console.log('impressão');
        console.log(`
                Data: ${this.data}
                Quantidade: ${this.quantidade}
                Valor: ${this.valor}
            `);
    }
    ehIgual(negociacao) {
        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}
