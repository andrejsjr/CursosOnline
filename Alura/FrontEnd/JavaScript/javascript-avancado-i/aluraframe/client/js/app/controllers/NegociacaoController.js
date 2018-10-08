class NegociacaoController {
    
    constructor() {
        let $ = document.querySelector.bind(document);

        this._ordemAtual = ''; // quando a página for carregada, não tem critério. 
                               // Só passa a ter quando ele começa a clicar nas colunas

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoes-view')), 
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), 
            new MensagemView($('#mensagem-view')), 'texto');

        this._init();
    }
    
    _init() {
        connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });

        setInterval(() => this.importaNegociacoes(), 3000);
    }
    
    adiciona(event) {
        event.preventDefault();

        var negociacao = this._criaNegociacao();

        new NegociacaoService().cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);        
                this._mensagem.texto = mensagem;        
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    
    importaNegociacoes() {
        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()    
        ])
        .then(todasAsNegociacoes => 
            todasAsNegociacoes
                .reduce((todasAsNegociacoesAchatadas, negociacoes) => 
                    todasAsNegociacoesAchatadas.concat(negociacoes), []))
        .then(negociacoes => 
            negociacoes.filter(negociacao => 
                !this._listaNegociacoes.negociacoes.some(negociacaoExistente => 
                    JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao))))
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);
    }
    
    esvazia() {        
        connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._listaNegociacoes.esvazia();        
                this._mensagem.texto = mensagem;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}