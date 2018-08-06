class ArquivoController {

    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
    }

    envia() {
        //cria um Arquivo com as suas propriedades;       
        let arquivo = new Arquivo(...this._inputDados.value.split('/').map(item => item.toUpperCase()));       
        
        this._limpaFormulario();
        
        // exibe mensagem no console com os dados do arquivo.
        console.log(`Dados do arquivo: ${arquivo.nome}, ${arquivo.tamanho}, ${arquivo.tipo}`);
    }

    _limpaFormulario() {
        this._inputDados.value = '';
        this._inputDados.focus();
    }
}