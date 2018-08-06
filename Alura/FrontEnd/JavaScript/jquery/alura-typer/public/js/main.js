var tamanhoFrase = $(".frase").text().split(" ").length;
$("#tamanho-frase").text(tamanhoFrase);

var tempoDigitacaoInicial = $("#tempo-digitacao").text();

var campoDigitacao = $(".campo-digitacao");
var contadorCaracteres = $("#contador-caracteres");
var contadorPalavras = $("#contador-palavras");

campoDigitacao.on("input", function () {
    contadorCaracteres.text(campoDigitacao.val().length);
    contadorPalavras.text(campoDigitacao.val().split(/\S+/).length - 1);
});

campoDigitacao.one("focus", function () {
    tempoDigitacao = $("#tempo-digitacao").text();
    var cronometroID = setInterval(function () {
        $("#tempo-digitacao").text(--tempoDigitacao);
        if (!tempoDigitacao) {
            campoDigitacao.attr("disabled", true);
            clearInterval(cronometroID);
        }
    }, 1000);
});

$("#botao-reiniciar").click(function () {
    $("#tempo-digitacao").text(tempoDigitacaoInicial);
    
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");

    contadorCaracteres.text(0);
    contadorPalavras.text(0);
});