import { Imprimivel } from './Imprimivel.js'
import { Igualavel } from './Igualavel.js'

export class Negociacao implements Imprimivel, Igualavel<Negociacao> {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('impressão');
        console.log(
            `
                Data: ${this.data}
                Quantidade: ${this.quantidade}
                Valor: ${this.valor}
            `
        );
    }

    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear()
    }
}