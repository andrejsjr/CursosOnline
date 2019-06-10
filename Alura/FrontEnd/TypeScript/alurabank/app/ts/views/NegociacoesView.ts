import { View } from './View.js';
import { Negociacoes } from '../models/Negociacoes.js';

export class NegociacoesView extends View<Negociacoes> {

    template(model: Negociacoes): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${model.paraArray().map(negociacao => `
                        <tr>
                            <td>${negociacao.data.getDate()}/${negociacao.data.getMonth()}/${negociacao.data.getFullYear()}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}</td>
                        </tr>
                    `).join('')}
                </tbody>

                <tfoot>
                </tfoot>
            </table>
        `;
    }
}