import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { SearchComponent } from './search/search.component'
import { DarkenOnHoverModule } from '../../shared/directives/darken-on-hover/darken-on-hover.module';

@NgModule({
    declarations: [
        PhotoListComponent,
        PhotosComponent,
        LoadButtonComponent,
        // PIPE
        FilterByDescription,
        //
        SearchComponent
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
        PhotoModule,
        //
        CardModule,
        DarkenOnHoverModule
    ]
})
export class PhotoListModule {}