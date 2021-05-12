import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    /*
        Como SignInComponent possui escopo de página,
        não será chamado dentro do template de nenhum
        outro componente, não precisa ter "selector".
        Quem irá carregá-lo será o sistema de módulos do Angular
        através da tag <routeroutlet></routeroutlet>.
    */
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    // Controla o form existente no template.
    loginForm: FormGroup;

    /*
        Construtor de formulários disponibilizado por
        ReactiveFormsModule para facilitar a criação
        de formulários.
    */
    constructor(private formBuilder: FormBuilder) { }
    
    ngOnInit(): void {
        /*
            Os atributos do objeto são os FormControls (campos do FormGroup);
            
            A primeira posição do array é o valor default do campo.
            A segunda é o validador. Usamos a classe Validators do
            Angular pra fazer as validações.
        
            Validators possui uma série de validações prontas, como required,
            mas também permite validações customizadas.
        */
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}