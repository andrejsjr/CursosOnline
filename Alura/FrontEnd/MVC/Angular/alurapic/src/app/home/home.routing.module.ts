import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { HomeComponent } from './home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

// De-para de rotas => componentes (LAZY LOADING)
const routes: Routes = [
    {
        path: '', // rota raiz do Pai (/home)
        component: HomeComponent,
        
        /*
            Guarda de rotas que redireciona automaticamente para
            a página fotos do usuário caso o mesmo esteja logado
            e tente acessar a página de login.
        */
        canActivate: [AuthGuard],
        
        // Rotas filhas
        children: [
            {
                path: '', // /home
                component: SignInComponent,
            },
            
            {
                path: 'signup', // /home/signup
                component: SignUpComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        /*
            Importamos o módulo rotas já configurando
            as rotas filhas (LAZY LOADING) através de forChild(routes).
        */
        RouterModule.forChild(routes)
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
export class HomeRoutingModule {

}