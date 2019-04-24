const puta1 = {
    nome: 'Camila',
    idade: 20,
    oral: true,
    vaginal: true,
    anal: false
}

function getPuta(...putas) {
    console.log(putas);
    for (let puta of putas) {
        console.log(puta);
    }
}

getPuta(puta1);