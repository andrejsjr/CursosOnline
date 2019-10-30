import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    
    /* 
        Provê um UserNotTakenValidatorService
        para a injeção automática no componente,
        já que UserNotTakenValidatorService
        não está configurado com providedIn: 'root'
        no decorator @Injectable.
    */
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {
    
    /* 
        Controlará o form do template.
        FormGroup é ideal para validações
        baseadas em modelo.
     */
    signupForm: FormGroup;

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
    @ViewChild('emailInput')
    emailInput: ElementRef<HTMLInputElement>
    
    // Injetados pelo Angular.

    /* 
        formBuilder é necessário para criação
        do formulário.
    
        router é disponiblizado pelo RouterModule
        e serve para fazer navegação programática.

        platformDetectorService é o serviço que
        criamos para detectar se a plataforma
        do usuário é o browser.
    */
    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }
    
    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
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
                    // Validators.pattern(/^[a-z0-9_\-]+$/),
                    /* 
                        Usaremos um Validator customizado
                        apenas para exemplificar como funciona.
                    */
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                /* 
                    Invoca a função que retorna o "Validator".
                
                    Como a função correspondente é assíncrona,
                    precisa ser passada num terceiro parâmetro.
                    
                    Validators assíncronos são passados
                    num terceiro parâmetro.
                */
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],

            password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ],
        });

        /* 
            Embora estejamos trabalhando com o wrapper do Angular
            precisou-se acessar o elemento nativo do DOM para dar o foco.

            Nesse caso, não podemos usar o Renderer, tal como na diretiva,
            para evitar problemas em caso de renderização em server side.

            O uso não foi possível, pois na versão atual do Renderer,
            o método invokeMethod(), que pemitiria a invocação de um
            método do elemento do DOM como focus(), foi deprecated.

            Para ficar protegido de possíveis problemas em caso
            de renderização em server side, quando não for possível usar o Renderer,
            usuaremos o serviço PlatformDetectorService criado
            para executar a instrução apenas se eu tiver certeza
            que a plataforma utilizada pelo usuário é o browser
        */
        this.platformDetectorService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }
}