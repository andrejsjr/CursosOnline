import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
    declarations: [PhotoFormComponent],
    imports: [
        /* 
            Necessário para disponibilizar as diretivas do Angular
            como *ngIf, *ngFor etc...
            É uma boa prática importar esse módulo
            em todos os módulos criados
        */
        CommonModule
    ]
})
export class PhotoFormModule {}