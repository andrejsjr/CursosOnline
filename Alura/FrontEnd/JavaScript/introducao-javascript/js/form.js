var Paciente = function (form) {
    this.nome = form.nome.value;
    this.peso = form.peso.value;
    this.altura = form.altura.value;
    this.gordura = form.gordura.value;
    this.imc = calculaImc(this.peso, this.altura);
};

var validaPaciente = function (paciente) {
    var erros = [];
    
    if (!paciente.nome) erros.push("É obrigatório preencher o nome");    
    
    if (!paciente.peso) erros.push("É obrigatório preencher o peso");
    if (paciente.peso && !validaPeso(paciente.peso)) erros.push("peso inválido");

    if (!paciente.altura) erros.push("É obrigatório preencher a altura");
    if (paciente.altura && !validaAltura(paciente.altura)) erros.push("altura inválida");
    
    if (!paciente.gordura) erros.push("É obrigatório preencher o percentual de gordura");
    return erros;
};

var criaTd = function (classe, valor) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = valor;
    return td;
}

var criaTrPaciente = function (paciente) {
    var trPaciente = document.createElement("tr");
    trPaciente.classList.add("paciente");
    trPaciente.appendChild(criaTd("info-nome", paciente.nome));
    trPaciente.appendChild(criaTd("info-peso", paciente.peso));
    trPaciente.appendChild(criaTd("info-altura", paciente.altura));
    trPaciente.appendChild(criaTd("info-gordura", paciente.gordura));
    trPaciente.appendChild(criaTd("info-imc", paciente.imc));
    return trPaciente;
};

var adicionaPaciente = function (paciente, validar) {
    var trPaciente = criaTrPaciente(paciente);        
    
    if (validar) validaTrPaciente(trPaciente);
    
    document.querySelector("#tabela-pacientes").appendChild(trPaciente);
};

var exibeErros = function (erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;

        ul.appendChild(li);
    });
};

document.querySelector("#adicionar-paciente")
    .addEventListener("click", function (event) {
        event.preventDefault();

        var form = document.querySelector("#form-adiciona");
        var p = new Paciente(form);
        var erros = validaPaciente(p);

        if (erros.length > 0) {
            exibeErros(erros);
            return;
        };

        adicionaPaciente(p, false);        

        form.reset();
        document.querySelector("#mensagens-erro").innerHTML = "";
    });