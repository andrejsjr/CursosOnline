import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoComponent } from './photo.component';

@NgModule({
    declarations: [PhotoComponent],
    imports: [
        /* 
            Necessário para disponibilizar as diretivas do Angular
            como *ngIf, *ngFor etc...
            É uma boa prática importar esse módulo
            em todos os módulos criados
        */
        CommonModule,
        /* 
            Módulo que diponibiliza o provider
            necessário para que o Angular
            injete um HttpClient como dependência        
        */
        HttpClientModule
    ],
    exports: [PhotoComponent]
})
export class PhotoModule {}