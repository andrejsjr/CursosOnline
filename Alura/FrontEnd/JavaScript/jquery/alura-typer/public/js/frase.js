function fraseAleatoria() {
    $.get("http://localhost:3000/frases", alteraFraseAleatoria);
}

function alteraFraseAleatoria(data) {
    var numAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numAleatorio].texto);
}