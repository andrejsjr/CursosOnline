import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';

// De-para de rotas => componentes
const routes: Routes = [
    { path: 'user/flavio', component: PhotoListComponent },
    { path: 'p/add', component: PhotoFormComponent }
];

@NgModule({
    imports: [
        // Módulo de rotas do Angular
        // Importamos o módulo já configurando suas rotas
        // conforme o que listamos em routes
        RouterModule.forRoot(routes)
    ],    
    // Exportanto RouterModule para que
    // qualquer módulo que importe AppRoutingModule
    // já tenha acesso automaticamente a RouterModule
    // não precisando assim importá-lo    
    
    // Dessa forma, AppModule, ao importar AppRoutingModule,
    // passa também a ter acesso as diretivas de rotas
    // presentes em RouterModule
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}