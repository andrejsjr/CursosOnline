import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo/photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';

@NgModule({
    declarations: [ 
        PhotoComponent,
        PhotoListComponent,
        PhotoFormComponent
    ],
    imports: [
        HttpClientModule,
        // Necessário para disponibilizar as diretivas do Angular
        // como ngIf, ngFor etc..
        // É uma boa prática importar esse módulo
        // em todos os módulos criados
        CommonModule
    ]
})
export class PhotosModule {}