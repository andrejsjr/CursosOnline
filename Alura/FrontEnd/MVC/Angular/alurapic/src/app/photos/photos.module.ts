import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo/photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';

@NgModule({
    declarations: [
        PhotoComponent,
        PhotoListComponent,
        PhotoFormComponent,
        PhotosComponent
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
    ]
})
export class PhotosModule {

}