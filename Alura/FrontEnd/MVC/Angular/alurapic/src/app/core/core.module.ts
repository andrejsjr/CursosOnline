import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [HeaderComponent],
    
    /* 
        O Angular possui um interceptador
        próprio que, por default, não faz nada.

        Como queremos forçar a utilização
        do nosso interceptador (RequestInterceptor),
        precisamos incluir um provider conforme abaixo:
    */
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            /* 
                Caso haja mais de um interceptador
                queremos que vá delegando sucessivamente.
            */
            multi: true
        }
    ]
})
export class CoreModule {

}