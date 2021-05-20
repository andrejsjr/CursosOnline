import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

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
        @ViewChild injeta uma referencia do elemento do DOM.
        O parâmetro ('userNameInput') é o nome da variável
        de template usada pelo elemento do DOM.

        ElementRef é generics e pode receber tipos específicos
        fornecidos pelo Type Script para tratar elementos DOM.
    */
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        /*
            Construtor de formulários disponibilizado por
            ReactiveFormsModule para facilitar a criação
            de formulários.
        */
        private formBuilder: FormBuilder,
        
        private authService: AuthService,
        
        /*
            Disponibilizado através de RouterModule
            para fazer navegação.
        */
        private router: Router,

        private platformDetectorService: PlatformDetectorService
    ) { }
    
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

        /*
            Como não queremos manipular diretamente o DOM
            através de userNameInput, evitando problemas de
            renderização em server side (Angular Universal),
            e não podemos usar Renderer para invocar métodos,
            condicionamos a execução do método focus() à certeza
            de estar rodando o código em um browwer.
        */
        this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                // () => this.router.navigateByUrl(`/user/${userName}`),
                () => this.router.navigate(['user', userName]),
                error => {
                    console.log(error);
                    // Limpa o formulário.
                    this.loginForm.reset();
                    
                    /*
                        Como não queremos manipular diretamente o DOM
                        através de userNameInput, evitando problemas de
                        renderização em server side (Angular Universal),
                        e não podemos usar Renderer para invocar métodos,
                        condicionamos a execução do método focus() à certeza
                        de estar rodando o código em um browwer.
                    */
                    this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus();
                }
            );
    }
}