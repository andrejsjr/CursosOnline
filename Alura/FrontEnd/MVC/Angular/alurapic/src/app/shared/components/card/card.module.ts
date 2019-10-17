import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [
        /* 
            Necessário para disponibilizar as diretivas do Angular
            como *ngIf, *ngFor etc...
            É uma boa prática importar esse módulo
            em todos os módulos criados
        */
        CommonModule
    ],
    exports: [CardComponent]
})
export class CardModule {

}