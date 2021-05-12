import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './signin/signin.component';

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
    /*
        Não precisa exportar SignInComponent pois o mesmo
        não será carregado no template de nenhum outro
        componente (escopo de página).
    */
})
export class HomeModule { }