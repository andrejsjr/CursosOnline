import { Negociacao } from './Negociacao.js';
import { MeuObjeto } from './MeuObjeto.js';

export class Negociacoes implements MeuObjeto<Negociacoes> {
    
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