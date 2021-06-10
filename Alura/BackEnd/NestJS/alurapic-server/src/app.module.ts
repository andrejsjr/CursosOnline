import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { FiltroDeExcecaoHttp } from './common/filtros/filtro-de-excecao-http';
import { TransformaRespostaInterceptor } from './core/http/transforma-resposta.interceptor';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    /*
      Interceptor de serialização/desserialização do NestJS
      que garante a aplicação das transformações do class-transformer
      em qualquer requisição (por isso foi registrado no module root),
      tanto na entrada, antes de chegar no controllador responsável,
      quanto após a saída do controllador.
    */
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformaRespostaInterceptor
    },
    /*
      Filtros de Exceção também devem ser declarados como 
    */
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoHttp
    }
  ],
})
export class AppModule {}
