import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
    /*
        Como SignUpComponent possui escopo de página,
        não será chamado dentro do template de nenhum
        outro componente, não precisa ter "selector".
        Quem irá carregá-lo será o sistema de módulos do Angular
        através da tag <routeroutlet></routeroutlet>.
    */
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit { 

    // Controla o form existente no template.
    signupForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router
    ) { }
    
    ngOnInit(): void {
        /*
            Os atributos do objeto são os FormControls (campos do FormGroup);
            
            A primeira posição do array é o valor default do campo.
            A segunda é o validador. Usamos a classe Validators do
            Angular pra fazer as validações.
        
            Validators possui uma série de validações prontas, como required,
            mas também permite validações customizadas.

            Também pode ser usado mais de uma validação no mesmo item.
            Neste caso, os validadores são passados dentro de um array.
            OBS: Esse array pode conter apenas validadores síncronos.

            Para trabalhar com validadores assíncronos,
            é necessário passá-lo num terceiro parâmetro.
        */
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email // Verifica se o e-mail é valido.
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['', 
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ], 
                /*
                    Validador assíncrono.
                    Retorna um Observable. O sistema de validação assíncrona
                    do Angular que irá fazer o subscribe() e acessar o valor.
                */
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });
    }

    signup() {
        /*
            signupForm.getRawValue retorna um objeto com todas
            as propriedades equivalentes aos formsControls e
            os respectivos valores digitados.
        */
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                error => console.log(error)
            );
    }
}