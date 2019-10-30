import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './signup/signup.service';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Para utilização do FormGroup.
        ReactiveFormsModule,
        // 
        VMessageModule,
        
        /* 
            Sendo importado apenas por boa prática
            uma vez que AppModule, ao importar AppRoutingModule que exporta RouterModule,
            reexporta RouterModule para todos os demais módulos que importa.
        */
        RouterModule,

        HomeRoutingModule
    ],
    
    /* 
        SignInComponent SignOutComponente
        não precisam ser exportados
        pois não serão utilizados em nenhum template
        de outro componente.
        Possuem escopo de página.
    */

    /* 
        Provendo SignUpService para qualquer
        artefato do módulo que queira uma
        injeção do mesmo.
    */
    providers: [
        SignUpService
    ]
})
export class HomeModule {

}