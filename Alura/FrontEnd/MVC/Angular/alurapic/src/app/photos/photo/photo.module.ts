import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoComponent } from './photo.component';

@NgModule({
    declarations: [
        PhotoComponent
    ],
    imports: [
        /*
            HttpClientModule contem o provider que fornece ao
            Angular o HttpClient que será injetado em AppComponent
            através do constructor.
        */
        HttpClientModule,
        /*
            CommonModule é o módulo que contem as diretivas (*ngIf, *ngFor etc...).
            Por isso é uma boa prática importar sempre esse módulo.
        */
        CommonModule
    ],
    exports: [
        PhotoComponent
    ]
})
export class PhotoModule { }