class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoes-view')), 
            'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), 
            new MensagemView($('#mensagem-view')), 'texto');
    }
    
    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());        
        this._mensagem.texto = 'Negociação incluida com sucesso';        
        this._limpaFormulario();
    }
    
    importaNegociacoes() {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'nogociacoes/semana');

        xhr.onreadystatechange = () => {
            /*
                0: requisição ainda não iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisicao
                4: requisição concluída e a resposta está pronta
            */

            if (xhr.readyState == 4) {
                if (xhr.status = 200) {

                }
            }
        };

        xhr.send();
    }
    
    esvazia() {
        this._listaNegociacoes.esvazia();
        
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }


    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}