import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    /*
        Serviços são carregados antes dos componentes.
        Por esse motivo, o usuário emitido em decodeAndNotify()
        será emitido antes do HeaderComponent ser carregado.
        Assim, caso um usuário logado faça um refresh na página,
        ou feche-a e a abra novamente, o HeaderComponent deixará
        de exibir o usuário logado, porque usuário será emitido
        antes do componente ser carregado.

        Por esse motivo estamos utilizando um BehaviorSubject.
        Um BehaviorSubject guarda o último valor emitido,
        de maneira que quem faça a inscrição tenha acesso imediato
        ao último valor emitido.
    */
    private userSubject = new BehaviorSubject<User>(null); // Requer um valor default.

    private userName = '';

    constructor(private tokenService: TokenService) { 
        /*
            É necessário executar decodeAndNotify()
            toda vez que o componente for inicializado,
            pois o usuário pode fechar e abrir a aba da aplicação.
            Nesse caso, caso o usuário esteja logado, 
            é preciso recuperá-lo.

            Aqui não podemos implementar a interface OnInit
            por não estarmos em um componente.
        */
        tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    getUserName() {
        return this.userName;
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }
}