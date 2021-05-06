import { NgModule } from '@angular/core';

import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { CommonModule } from '@angular/common';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        PhotoListComponent,
        PhotosComponent,
        LoadButtonComponent,
        SearchComponent,
        /*
            Pipes, assim como componentes,
            precisam ser declarados em módulos.
        */
        FilterByDescription
    ],
    imports: [
        /*
            CommonModule é o módulo que contem as diretivas (*ngIf, *ngFor etc...).
            Por isso é uma boa prática importar sempre esse módulo.
        */
        CommonModule,
        PhotoModule,
        CardModule
    ]
})
export class PhotoListModule { }