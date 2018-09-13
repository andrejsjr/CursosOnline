var tempoDigitacaoInicial = $("#tempo-digitacao").text();

$(function () {    
    atualizaTamanhoFrase();
    atribuiEventos();
});

function finalizaJogo() {
    $(".campo-digitacao").attr("disabled", true);
    $(".campo-digitacao").toggleClass("campo-desabilitado");
    $("#botao-reiniciar").attr("disabled", false);
    inserePlacar();
}

function disparaCronometro() {
    $("#botao-reiniciar").attr("disabled", true);
    
    var tempoDigitacao = tempoDigitacaoInicial;    
    
    var cronometroID = setInterval(function () {
        $("#tempo-digitacao").text(--tempoDigitacao);
        if (!tempoDigitacao) {
            clearInterval(cronometroID);
            finalizaJogo();
        }
    }, 1000);
}

function reiniciaJogo() {
    $("#tempo-digitacao").text(tempoDigitacaoInicial);

    $(".campo-digitacao").attr("disabled", false);
    $(".campo-digitacao").val("");
    $(".campo-digitacao").toggleClass("campo-desabilitado");
    $(".campo-digitacao").removeClass("campo-correto");
    $(".campo-digitacao").removeClass("campo-errado");

    $("#contador-caracteres").text(0);
    $("#contador-palavras").text(0);
    
    disparaCronometro();
}

function atualizaBorda() {
    var comparavel = $(".frase").text().substr(0, $(".campo-digitacao").val().length);

    if ($(".campo-digitacao").val()) {
        if ($(".campo-digitacao").val() == comparavel) {
            $(".campo-digitacao").addClass("campo-correto");
            $(".campo-digitacao").removeClass("campo-errado");
        } else {
            $(".campo-digitacao").addClass("campo-errado");            
            $(".campo-digitacao").removeClass("campo-correto");
        }
    } else {
        $(".campo-digitacao").removeClass("campo-correto");
        $(".campo-digitacao").removeClass("campo-errado");
    }
}

function atribuiEventos() {
    $(".campo-digitacao").on("input", function () {
        $("#contador-caracteres").text($(".campo-digitacao").val().length);
        $("#contador-palavras").text($(".campo-digitacao").val().split(/\S+/).length - 1);
        atualizaBorda();
    });
    
    $(".campo-digitacao").one("focus", disparaCronometro);    
    $("#botao-reiniciar").click(reiniciaJogo);
    $(".botao-remover").click(removeTrPlacar);
    $("#botao-placar").click(mostraPlacar);
    $("#botao-frase").click(fraseAleatoria);
}

function atualizaTamanhoFrase() {
    var tamanhoFrase = $(".frase").text().split(" ").length;
    $("#tamanho-frase").text(tamanhoFrase);
}

function atualizaTempoInicial(tempo) {
    tempoDigitacaoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}