import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignInComponent } from './signin/signin.component';

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        /*
            Home module não precisaria importar RouterModule
            para que SignInComponent tivesse acesso a Router
            para fazer as navegações, uma vez que RouterModule
            está sendo exportado em AppRoutingModule.
            Como AppModule importa AppRoutingModule, todos os
            outros modules carregados por ele também tem acesso
            à RouterModule.
            No entanto, queremos deixar explícito que HomeModule
            depende de RouterModule, por isso estamos importanto-o
            mesmo assim.
        */
       RouterModule
    ]
    /*
        Não precisa exportar SignInComponent pois o mesmo
        não será carregado no template de nenhum outro
        componente (escopo de página).
    */
})
export class HomeModule { }