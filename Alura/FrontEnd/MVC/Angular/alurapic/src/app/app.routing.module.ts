import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignInComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';

// De-para de rotas => componentes
const routes: Routes = [
    {
        path: '', // Raiz da aplicação => localhost:4200/
        component: SignInComponent,
        
        /*
            Guarda de rotas que redireciona automaticamente para
            a página fotos do usuário caso o mesmo esteja logado
            e tente acessar a página de login.
        */
        canActivate: [AuthGuard]
    },
    
    {
        path: 'user/:userName',
        component: PhotoListComponent,
        
        /*
            Como o Resolver entra em ação na hora da ativação
            da rota, precisa ser indicado aqui.
        */
        resolve: {
            /*
                Property photos do objeto resolve terá acesso
                ao retorno de PhotoListResolver
            */
            photos: PhotoListResolver
        }
    },
    
    {
        path: 'p/add',
        component: PhotoFormComponent
    },
    
    //Qualquer outro path (**)
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        /*
            Importamos o módulo de rotas do Angular já configurando
            as rotas da aplicação através de forRoot(routes).
        */
        RouterModule.forRoot(routes)
    ],
    /*
        Exportando RouterModule para que, quem importe o AppRoutingModule
        já tenha acesso automaticamente às diretivas de RouterModule,
        como <router-outlet></router-oulet>, não precisando assim importar
        também o RouterModule.
    */
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}