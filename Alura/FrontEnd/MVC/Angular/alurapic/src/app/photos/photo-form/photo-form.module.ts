import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports: [
        /*
            CommonModule é o módulo que contem as diretivas (*ngIf, *ngFor etc...).
            Por isso é uma boa prática importar sempre esse módulo.
        */
        CommonModule
    ]
})
export class PhotoFormModule { }