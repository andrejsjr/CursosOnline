import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /*
    Registrando o pipe ValidationPipe de forma
    global na aplicação.

    Os pipes aplicam transformações/validações em objetos
    passados na requisição antes que eles cheguem ao 
    controller responsável.

    Como estamos aplicando validações na classe Usuario
    através do class-validator, o pipe ValidationPipe
    faz com que essas validações sejam aplicadas antes
    do objeto cair no controller responsável.
  */
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  
  /*
    Indica ao class-validator que o container de injeção
    de dependência utilizado é o do NestJS e que o mesmo
    deve ser responsável pelo propagação de eventuais erros.

    Isso é necessário para o funcionamento de validações
    customizadas que utilizam injeção de dependência 
    no class-validator.
  */
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  
  await app.listen(3000);
}
bootstrap();
