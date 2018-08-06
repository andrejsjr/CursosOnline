import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

// Safari só aceita let dentro de bloco
// let negociacaoController = new NegociacaoController();
var negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = 
    negociacaoController.adiciona.bind(negociacaoController);

document.querySelector('[type=button]').onclick = 
    negociacaoController.apaga.bind(negociacaoController);