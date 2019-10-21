import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { SignInComponent } from './signin/signin.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule
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