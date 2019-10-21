import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    // Controlará o form do template
    loginForm: FormGroup
    
    // Injetado pelo Angular
    constructor(private formBuilder: FormBuilder) { }    
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required], /* form control que será associado ao input de user name */
            password: ['', Validators.required]  /* form control que será associado ao input de password */

            // Primeiro parâmetro do array é o valor padrão
        });
    }
}