function inserePlacar(usuario, palavras) {
    var trPlacar = criaTrPlacar(usuario, palavras);
    trPlacar.find(".botao-remover").click(removeTrPlacar);
    $(".placar").find("tbody").append(trPlacar);

    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top;
    $('body').animate({ scrollTop: posicaoPlacar + 'px'}, 1000);
}

function criaTrPlacar(usuario, palavras) {
    var tr = $("<tr>");
    var tdUsuario = $("<td>").text(usuario);
    var tdNoPalavras = $("<td>").text(palavras);
    var tdRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    tdRemover.append(link);

    tr.append(tdUsuario);
    tr.append(tdNoPalavras);
    tr.append(tdRemover);

    return tr;
}

function removeTrPlacar() {
    event.preventDefault();    
    
    $(this).parent().parent().fadeToggle(1000);
    setTimeout(function () {
        $(this).parent().parent().remove();        
    }, 1000);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(800);
}

function sintonizaPlacar() {
    var placar = [];
    
    $("tbody>tr").each(function () {
        placar.push({usuario: $(this).find("td:nth-child(1)").text(),
                     pontos: $(this).find("td:nth-child(1)").text()});
    });

    var dados = {placar: placar};
    $.post("http://localhost:3000/placar", dados, function () {
        console.log("Salvou a bagaça!");        
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar");
}