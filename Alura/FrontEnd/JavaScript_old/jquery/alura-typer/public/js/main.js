var frase = $('.frase').text();
var numPalavras = frase.split(' ').length;
var tamanhoFrase = $('#tamanho-frase');
tamanhoFrase.text(numPalavras);

var campo = $('.campo-digitacao');
campo.on('input', () => {
    var conteudo = campo.val();
    
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $('#contador-caracteres').text(qtdCaracteres);
});

var tempoRestante = $('#tempo-digitacao').tempoDigitacao.text();
campo.one('focus', () => {
    var IntervaloID = setInterval(() => {
        tempoRestante--;
        tempoDigitacao.text(tempoRestante);
        
        if (tempoRestante < 1) {
            campo.attr('disabled', true);
            clearInterval(IntervaloID);
        };            
    }, 1000);
});