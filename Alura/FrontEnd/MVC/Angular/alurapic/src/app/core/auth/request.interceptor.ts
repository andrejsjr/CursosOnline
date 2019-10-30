import { Injectable } from "@angular/core";
import {
    HttpInterceptor, HttpRequest,  HttpHandler,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
    HttpResponse, HttpUserEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    // Injeção de dependência do Angular.
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        /* 
            O objetivo do interceptador é
            é clonar o objeto da requisição (req),
            adicionar coisas no clone e retornar esse
            clone ao invés do objeto original.

            No caso, estamos adicionando headers
            ao objeto da requisição afim de incluir
            o token, caso o usuário esteja logado.

            Dessa forma, toda requisição enviada ao back end
            conterá o token caso o usuário esteja logado.
        */

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            req = req.clone({
                setHeaders : {
                    'x-access-token': token
                }
            });
        }
        return next.handle(req);
    }
}