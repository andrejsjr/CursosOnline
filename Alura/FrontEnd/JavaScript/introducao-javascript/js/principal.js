var validaPeso = function (peso) {return !(peso <= 0 || peso >= 1000)};
var validaAltura = function (altura) {return !(altura <= 0 || altura >= 3.00)};
var calculaImc = function (peso, altura) {return (peso / (altura * altura)).toFixed(2)};

var validaTrPaciente = function (trPaciente) {
    var peso = trPaciente.querySelector(".info-peso").textContent;
    var pesoValido = validaPeso(peso);
    
    var altura = trPaciente.querySelector(".info-altura").textContent;
    var alturaValida = validaAltura(altura);

    if (!pesoValido)
        trPaciente.querySelector(".info-peso").textContent = "Inválido";

    if (!alturaValida)
        trPaciente.querySelector(".info-altura").textContent = "Inválida";

    if (pesoValido && alturaValida) {
        var imc = calculaImc(peso, altura);
        trPaciente.querySelector(".info-imc").textContent = imc;
    } else {
        trPaciente.querySelector(".info-imc").textContent = "-";
        trPaciente.classList.add("paciente-invalido");
    };
};

var trPacientes = document.querySelectorAll(".paciente");
trPacientes.forEach(function (trPaciente) {validaTrPaciente(trPaciente)});