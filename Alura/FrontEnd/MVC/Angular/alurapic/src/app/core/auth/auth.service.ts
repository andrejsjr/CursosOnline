import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  // Única instância para aplicação inteira
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // Injetados automaticamente pelo Angular
    private http: HttpClient,
    private userService: UserService
    ) { }

  /* 
    .pipe() do rxjs está forçando a execucução de um código
    entre a execução da operação (post()) e o subscribe()
    Para tal está utilizando o operador tap() do rxjs
  */
  authenticate(userName: string, password: string) {
    return this.http
      .post(
        `${API_URL}/user/login`,
        { userName, password },
        /* 
          Indica que queremos ter acesso a tudo
          que vem no response
          Precisamos disso para ter acesso ao headers,
          por exemplo
        */
        { observe: 'response' }) 
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
      }))
  }
}
