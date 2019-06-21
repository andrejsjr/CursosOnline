import { Negociacao, Negociacoes } from '../models/index.js';
import { NegociacoesView, MensagemView } from '../views/index.js';
import { domInject, throttle } from '../helpers/decorators/index.js';
import { NegociacaoService } from '../services/index.js';
import { imprime } from '../helpers/index.js';

export class NegociacaoController {
    
    @domInject('#data')
    private _inputData: JQuery;
    
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    
    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Por favor, somente negociações em dias úteis.');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );        

        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);
        
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso.');
    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo
    }

    @throttle()
    importaDados() {
        this._negociacaoService.obterNegociacoes(res => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        })
        .then((negsParaImportar: Negociacao[]) => {
            const negsJaImportadas = this._negociacoes.paraArray();

            negsParaImportar.filter(negociacao => 
                !negsJaImportadas.some(negImportada => 
                    negociacao.ehIgual(negImportada)))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);
        });
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}