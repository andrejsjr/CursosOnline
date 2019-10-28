import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignInComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignUpComponent } from './home/signup/signup.component';

// De-para de rotas => componentes
const routes: Routes = [
    {
        path: '', /* localhost:4200/ */
        component: SignInComponent,
        /* 
            Especifica qual é a guarda de rota.
            Pode ser mais de uma, com responsabilidades
            diferentes, por isso [].

            Geralmente o AngularCLI se perde quando
            colocamos um guardião de rota.
            Por isso é bom reiniciar o AngularCLI.
         */
        canActivate: [AuthGuard]
    },
    {
        path: 'signup',
        component: SignUpComponent        
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