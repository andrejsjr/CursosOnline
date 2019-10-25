import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({
    // Única instância para aplicação inteira.
    providedIn: 'root'    
})
/* 
    CanActivate é uma interface de guarda de rotas
    (router guard do Angular).
    Serve para verificar se a rota pode ser acessada
    ou não no momento do acesso.
 */
export class AuthGuard implements CanActivate{
    
    constructor(
        // Injetados pelo Angular
        private userService: UserService,
        private router: Router
    ) { }
    
    // Se retornar true, o acesso a rota é liberada.
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        
        if (this.userService.isLogged()) {
            this.router.navigate(['user', this.userService.getUserName()]);
            return true;
        }
        return true;
    }
}
