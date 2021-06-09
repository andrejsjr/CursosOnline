import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {

    // Representação genérica do adaptador HTTP (Express ou Fastfy)
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        // adapterHost representa a aplicação.
        // Peço a aplicação o adaptador HTTP (Express ou Fastfy) que está sendo utilizado.
        this.httpAdapter = adapterHost.httpAdapter;
    }
    
    catch(exception: Error, host: ArgumentsHost) {
        // Obtem o contexto HTTP.
        const contexto = host.switchToHttp();
        const requisicao = contexto.getRequest();
        const resposta = contexto.getResponse();

        const { status, body } = exception instanceof HttpException
            ? {
                status: exception.getStatus(),
                body: exception.getResponse()
            }
            : {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toString(),
                    message: exception.message,
                    path: requisicao.path
                }
            };

        /*
            Construindo a resposta que abstrai o adaptador
            que aplicação está utilizando (Express ou Fastfy),
            fazendo o código funcionar em qualquer uma das duas.
        */
        this.httpAdapter.reply(resposta, body, status);
    }
}