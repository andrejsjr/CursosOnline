import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [
        PhotoListComponent,
        PhotosComponent,
        LoadButtonComponent,
        // PIPE
        FilterByDescription
        // 
    ],
    imports: [
        /* 
            Necessário para disponibilizar as diretivas do Angular
            como *ngIf, *ngFor etc...
            É uma boa prática importar esse módulo
            em todos os módulos criados
        */
        CommonModule,
        // 
        // Necessário para o PhotosComponent
        PhotoModule
        // 
    ]
})
export class PhotoListModule {}