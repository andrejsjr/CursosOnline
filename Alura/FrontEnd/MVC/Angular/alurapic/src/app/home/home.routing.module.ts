/* 
    Como eu quero fazer lazing loading de home
    é necessário que este tenha o seu próprio
    módulo de rotas.
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

// De-para de rotas => componentes
const routes: Routes = [
    {
        /* 
            Esta rota vazia e suas filhas são dependentes
            da rota home definida em app.routing.module.ts.
        */
        path: '', /*  /home  */
        component: HomeComponent,
        /* 
            Especifica qual é a guarda de rota.
            Pode ser mais de uma, com responsabilidades
            diferentes, por isso [].

            Geralmente o AngularCLI se perde quando
            colocamos um guardião de rota.
            Por isso é bom reiniciar o AngularCLI.
         */
        canActivate: [AuthGuard],
        // Rotas filhas são exibidas dentro de HomeComponent.
        children: [
            /* 
                Como já está em /home e o path da rota filha
                é '', então acaba sendo /home também.
                
                Isso faz com que SignInComponent seja
                a rota filha que será exibida de primeira
                dentro do router-outlet de HomeComponent.

            */
            {
                path: '', /* /home */
                component: SignInComponent        
            },
            {
                path: 'signup', /* /home/signup */
                component: SignUpComponent        
            },
        ]
    }
];

@NgModule({
    imports: [
        /* 
            Módulo de rotas do Angular.
            Importamos o módulo já configurando suas rotas
            conforme o que listamos em routes.
            
            Aqui não pode ser RouterModule.forRoot(routes)
            pois routes aqui são rotas dependentes que
            carregaremos de forma lazing loading.
        */
        RouterModule.forChild(routes)
    ],    
    
    /* 
        Exportanto RouterModule para que
        qualquer módulo que importe AppRoutingModule
        já tenha acesso automaticamente a RouterModule
        não precisando assim importá-lo.
        
        Dessa forma, AppModule, ao importar AppRoutingModule,
        passa também a ter acesso as diretivas de rotas
        presentes em RouterModule.
    */
    
    exports: [ RouterModule ]
})
export class HomeRoutingModule {

}