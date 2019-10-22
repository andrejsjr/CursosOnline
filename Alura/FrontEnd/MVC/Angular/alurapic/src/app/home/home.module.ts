import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { SignInComponent } from './signin/signin.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        
        /* 
            Sendo importado apenas por boa prática
            uma vez que AppModule, ao importar AppRoutingModule que exporta RouterModule,
            reexporta RouterModule para todos os demais módulos que importa
        */
        RouterModule
    ]
    
    /* 
        SignInComponent não precisa ser exportado
        pois não será utilizado em nenhum template
        de outro componente
        Possui escopo de página
    */
})
export class HomeModule {

}