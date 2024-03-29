import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NestResponse } from './nest-response';

@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {    

    // Representação genérica do adaptador HTTP (Express ou Fastfy)
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        // adapterHost representa a aplicação.
        // Peço a aplicação o adaptador HTTP (Express ou Fastfy) que está sendo utilizado.
        this.httpAdapter = adapterHost.httpAdapter;
    }
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((respostaDoControlador: NestResponse) => {
                    if (respostaDoControlador instanceof NestResponse) {
                        const contexto = context.switchToHttp();
                        const response = contexto.getResponse();

                        const { status, headers, body } = respostaDoControlador;

                        // {
                        //     cabecalho1: 'xpto1',
                        //     cabecalho2: 'xpto2',
                        // }

                        // ['cabecalho1', 'cabecalho2']
                        const nomeDosCabecalhos = Object.getOwnPropertyNames(headers);

                        for (const nomeDoCabecalho of nomeDosCabecalhos) {
                            const valorDoCabecalho = headers[nomeDoCabecalho];
                            this.httpAdapter.setHeader(response, nomeDoCabecalho, valorDoCabecalho);
                        }

                        this.httpAdapter.status(response, status);

                        return body;
                    }
                    
                    return respostaDoControlador;                    
                })
            )
    }
}