import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    // Controlará o form do template
    loginForm: FormGroup

    /* 
        ElementRef é um wrapper do Angular
        para elementos do DOM,
        para que se possa trabalhar com o elemento
        de forma integrada ao framework

        @ViewChield pede ao Angular para injetar
        uma referência ao elemento do DOM especificada
        no parâmetro (variável de template atribuída ao elemento no template)

        A tipagem no generics não é necessário,
        mas pode ser usada para indicar pro TypeScript
        que trata-se de um input do HTML,
        melhorando o code completion etc..

    */
    @ViewChild('userNameInput')
    userNameInput: ElementRef<HTMLInputElement>
    
    // Injetados pelo Angular

    /* 
        router é disponiblizado pelo RouterModule
        e serve para fazer navegação programática

        platformDetectorService é o serviço que
        criamos para detectar se a plataforma
        do usuário é o browser
    */
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required], /* form control que será associado ao input de user name */
            password: ['', Validators.required]  /* form control que será associado ao input de password */

            // Primeiro parâmetro do array é o valor padrão
        });
    }
    
    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        
        this.authService
            .authenticate(userName, password)
            .subscribe(
                // () => this.router.navigateByUrl(`user/${userName}`),
                () => this.router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    
                    /* 
                        Embora estejamos trabalhando com o wrapper do Angular
                        precisou-se acessar o elemento nativo do DOM para dar o foco

                        Nesse caso, não podemos usar o Renderer, tal como na diretiva,
                        para evitar problemas em caso de renderização no em server side

                        O uso não foi possível, pois na versão atual do Renderer,
                        o método invokeMethod(), que pemitiria a invocação de um
                        método do elemento do DOM como focus(), foi deprecated

                        Para ficar protegido de possíveis problemas em caso
                        de renderização em server side, quando não for possível usar o Renderer,
                        usuaremos o serviço PlatformDetectorService criado
                        para executar a instrução apenas se eu tiver certeza
                        que a plataforma utilizada pelo usuário é o browser
                    */                    
                    this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus()
                    
                    alert('Invalid user name or password');
                }
            );
    }
}