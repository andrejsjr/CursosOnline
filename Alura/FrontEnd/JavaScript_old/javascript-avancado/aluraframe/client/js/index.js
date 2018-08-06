var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tbody = document.querySelector('table tbody');

var form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    var trNegociacao = document.createElement('tr');

    campos.forEach(function (campo) {        
        var tdCampo = document.createElement('td');
        tdCampo.textContent = campo.value;

        trNegociacao.appendChild(tdCampo); 
    });

    var tdVolume = document.createElement('td')
    tdVolume.textContent = campos[1].value * campos[2].value;

    trNegociacao.appendChild(tdVolume);

    tbody.appendChild(trNegociacao);

    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0.0;

    campos[0].focus();
});