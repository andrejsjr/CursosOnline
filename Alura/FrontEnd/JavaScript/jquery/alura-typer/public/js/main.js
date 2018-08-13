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
};

function disparaCronometro() {    
    
    var tempoDigitacao = tempoDigitacaoInicial;
    
    $("#botao-reiniciar").attr("disabled", true);
    
    var cronometroID = setInterval(function () {
        $("#tempo-digitacao").text(--tempoDigitacao);
        if (!tempoDigitacao) {
            clearInterval(cronometroID);
            finalizaJogo();
        }
    }, 1000);
};

function inserePlacar() {
    var usuario = "Jesus";
    $(".placar").find("tbody").append(criaTrPlacar(usuario));
};

function criaTrPlacar(usuario) {
    var tr = $("<tr>");
    var tdUsuario = $("<td>").text(usuario);
    var tdNoPalavras = $("<td>").text($("#contador-palavras").text());
    var tdRemover = $("td");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    tdRemover.append(link);

    tr.append(tdUsuario);
    tr.append(tdNoPalavras);
    tr.append(tdRemover);

    return tr;
};

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
};

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
};

function atribuiEventos() {
    $(".campo-digitacao").on("input", function () {
        $("#contador-caracteres").text($(".campo-digitacao").val().length);
        $("#contador-palavras").text($(".campo-digitacao").val().split(/\S+/).length - 1);
        atualizaBorda();
    });
    
    $(".campo-digitacao").one("focus", disparaCronometro);
    
    $("#botao-reiniciar").click(reiniciaJogo);
};

function atualizaTamanhoFrase() {
    var tamanhoFrase = $(".frase").text().split(" ").length;
    $("#tamanho-frase").text(tamanhoFrase);
};