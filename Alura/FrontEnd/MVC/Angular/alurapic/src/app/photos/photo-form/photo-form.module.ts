import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
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
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        FormsModule
    ]
})
export class PhotoFormModule {}