import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { NewUser } from './new-user';

/* 
    No Angular, não podemos fazer requisição AJAX
    na mão, ou então usar JQuery.
    Precisamos usar o classe HttpClient do Angular
    que encapsula essa funcionalidade
    de forma integrada ao framework.

    Para que um HttpClient seja injetado automaticamente
    pelo Angular em http através do construtor
    é necessário que um provider esteja disponível.

    Para que o provider esteja disponível
    é necessário que o módulo HttpClientModule
    esteja importado.
*/

const API = 'http://localhost:3000';

/* 
    Como queremos que SignUpService
    esteja disponível para qualquer
    artefato que esteja dentro de HomeModule apenas,
    faremos essa configuração em HomeModule.
    Não usaremos, portanto, providedIn: 'root' em @Injectable.
*/
@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) { }

    checkUserNameTaken(userName: string){
        return this.http.get(`${API}/user/exists/${userName}`);
    }

    signup(newUser: NewUser) {
        return this.http.post(`${API}/user/signup`, newUser);
    }
}