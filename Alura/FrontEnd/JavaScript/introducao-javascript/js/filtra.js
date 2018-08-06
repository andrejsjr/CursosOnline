document.querySelector("#filtrar-tabela")
    .addEventListener("input", function () {
        var trsPaciente = document.querySelectorAll(".paciente");
        
        for (var i = 0; i < trsPaciente.length; i++) {
            var trPaciente = trsPaciente[i];

            if (this.value) {
                var expressao = new RegExp(this.value, "i");
                if (!expressao.test(trPaciente.querySelector(".info-nome").textContent))
                    trPaciente.classList.add("invisivel")
                else trPaciente.classList.remove("invisivel");
            } else trPaciente.classList.remove("invisivel");
        }       
    });