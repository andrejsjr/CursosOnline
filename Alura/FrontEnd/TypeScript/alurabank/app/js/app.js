import { NegociacaoController } from './controllers/NegociacaoController.js';
const negociacaoController = new NegociacaoController();
$('.form').submit(negociacaoController.adiciona.bind(negociacaoController));
