function fraseAleatoria() {
    $("#spinner").toggle();
    
    $.get("http://localhost:3000/frases", alteraFraseAleatoria)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function () {
            $("#spinner").toggle();
        });
}

function alteraFraseAleatoria(data) {
    var numAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    
    var dados = {id: $("#frase-id").val()};
    $.get("http://localhost:3000/frases", dados, alteraFrase)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function () {
            $("#spinner").toggle();
        });
}

function alteraFrase(data) {
    $(".frase").text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}