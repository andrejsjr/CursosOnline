document.querySelector("#buscar-pacientes")
    .addEventListener("click", function () {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
        
        xhr.addEventListener("load", function (){
            var erroAjax = document.querySelector("#erro-ajax");
            
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                
                JSON.parse(xhr.responseText).forEach(function (paciente) {
                    adicionaPaciente(paciente, true);
                });
            }
            else erroAjax.classList.remove("invisivel");
        });

        xhr.send();
});