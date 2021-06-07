import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Livro } from './livro.model';
import { LivrosController } from './livros.controller';
import { LivrosService } from './livros.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'livraria',
      //models: [],
      // Para reconhecer automaticamente os modelos do projeto.
      autoLoadModels: true,
      /*
        Sicroniza automaticamente os modelos declarados em
        SequelizeModule.forFeatures() com as tabelas do BD.
        Por ex: Se a tabela equivalente ao modelo não existir,
        cria no banco.
      */
      synchronize: true
    }),
    // Necessário para reconhecimento dos modelos em autoLoadModels.
    SequelizeModule.forFeature([Livro])
  ],
  controllers: [
    AppController, 
    LivrosController
  ],
  providers: [
    AppService,
    LivrosService
  ],
})
export class AppModule {}
