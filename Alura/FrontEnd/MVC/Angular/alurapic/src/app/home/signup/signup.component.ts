import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
    templateUrl: './signup.component.html'    
})
export class SignUpComponent implements OnInit {
    
    signupForm: FormGroup;
    
    // Injetados pelo Angular.
    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService
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
        })
    }
}