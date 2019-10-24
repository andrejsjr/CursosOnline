import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
    // Única instância para aplicação inteira
    providedIn: 'root'
})
export class UserService {

    /* 
        userSubject não pode ser Subject comum
        pois, numa situação onde o usuário já
        está logado, fecha a SPA e entra novamente
        o usuário logado não aparecerá no header

        Isso acontece porque, quando UserService for
        criado, seu constructor for executado, e, por
        já existir token, ocorrer a emissão do usuário
        através do decodeAndNotify(), o HeaderComponent
        ainda não terá sido renderizado
        fazendo com que o usuário logado não apareça

        Para resolver essa situação, é preciso usar
        um BehaviorSubject
        Diferente de um Subject, BehaviorSubject,
        ao emitir um valor, mantém esse valor disponível
        para posterior escuta (subscribe())

        Dessa forma, quando HeaderComponent for renderizado,
        o usuário logado ainda estará disponível,
        permitindo que HeaderComponent escute o obtenha
        o valor para exibição

        O constructor de BehaviorSubject precisa receber um
        valor de emissão padrão no momento da construção
        No caso, passamos null
    */
    
    // private userSubject = new Subject<User>();
    private userSubject = new BehaviorSubject<User>(null);

    constructor(
        // Injetado pelo Angular
        private tokenService: TokenService
    ) {
        tokenService.hasToken() && this.decodeAndNotify()
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify()
    }

    getUser() {
        return this.userSubject.asObservable();    
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        // Pega o payload do token
        const user = jwt_decode(token) as User;
        // 
        this.userSubject.next(user);
    }
 }