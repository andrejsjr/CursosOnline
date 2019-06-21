import { Negociacao } from './Negociacao.js';
import { Imprimivel } from './Imprimivel.js';
import { Igualavel } from './Igualavel.js';

export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {
    
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        return [...this._negociacoes];
    }

    paraTexto() {
        console.log('impressao');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}