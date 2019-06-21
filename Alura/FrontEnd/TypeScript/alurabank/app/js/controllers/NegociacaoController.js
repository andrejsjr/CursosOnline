var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Negociacao, Negociacoes } from '../models/index.js';
import { NegociacoesView, MensagemView } from '../views/index.js';
import { domInject, throttle } from '../helpers/decorators/index.js';
import { NegociacaoService } from '../services/index.js';
import { imprime } from '../helpers/index.js';
export class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView('#mensagemView');
        this._negociacaoService = new NegociacaoService();
        this._negociacoesView.update(this._negociacoes);
    }
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Por favor, somente negociações em dias úteis.');
            return;
        }
        const negociacao = new Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso.');
    }
    _ehDiaUtil(data) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }
    importaDados() {
        this._negociacaoService.obterNegociacoes(res => {
            if (res.ok) {
                return res;
            }
            else {
                throw new Error(res.statusText);
            }
        })
            .then((negsParaImportar) => {
            const negsJaImportadas = this._negociacoes.paraArray();
            negsParaImportar.filter(negociacao => !negsJaImportadas.some(negImportada => negociacao.ehIgual(negImportada)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
        });
    }
}
__decorate([
    domInject('#data')
], NegociacaoController.prototype, "_inputData", void 0);
__decorate([
    domInject('#quantidade')
], NegociacaoController.prototype, "_inputQuantidade", void 0);
__decorate([
    domInject('#valor')
], NegociacaoController.prototype, "_inputValor", void 0);
__decorate([
    throttle()
], NegociacaoController.prototype, "adiciona", null);
__decorate([
    throttle()
], NegociacaoController.prototype, "importaDados", null);
var DiaDaSemana;
(function (DiaDaSemana) {
    DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
    DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
    DiaDaSemana[DiaDaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
    DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
    DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
    DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
    DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
})(DiaDaSemana || (DiaDaSemana = {}));
