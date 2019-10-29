import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

// De-para de rotas => componentes
const routes: Routes = [
    {
        path: '',
        /* 
            Quando a rota localhost:4200 for acessada,
            haverá o redirecionamento para /home
        
            Para especificar que precisa ser a rota
            exatamente igual (/),
            caso contrário ele pegaria /qualquer coisa.
        */
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        /* 
            Indicação do carregamento
            vai lazy loading.
            
            módulo#classe
        */
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'user/:userName',
        component: PhotoListComponent,
        resolve: {
            // photos terá o retorno de PhotoListResolver.
            photos: PhotoListResolver
        }
    },
    {
        path: 'p/add',
        component: PhotoFormComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        // Módulo de rotas do Angular.
        // Importamos o módulo já configurando suas rotas
        // conforme o que listamos em routes.
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