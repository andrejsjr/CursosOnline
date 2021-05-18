import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName: string, password: string) {
    return this.http
      .post(
        `${API_URL}/user/login`, 
        { userName, password }, 
        /*
          Para que se tenha acesso a tudo que é retornado
          na resposta, inclusive o headers.
        */
        { observe: 'response' }
      )
      /*
        O método post de http retorna um observable.
        Antes de quem invocar o método authenticate
        dar o subscribe(), o pipe será executado.
        o operador tap() dará acesso à resposta da
        requisição enviada pelo backend.
      */      
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
      }));
  }
}
