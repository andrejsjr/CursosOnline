import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Traz tudo que é necessário para o Angular rodar no navegador
    // e também as diretivas como ngIf, ngFor etc...
    // As diretivas na verdade estão em CommonModule
    // que é importado internamente em BrowserModule
    BrowserModule,
    
    PhotosModule,
    
    // Ao importar AppRoutingModule
    // já temos BrowserModule com as rotas configuradas
    // No entanto é necessário que AppRoutingModule
    // exporte RouteModule para que AppModule tenha acesso
    // às diretivas de rotas
    
    // OBS: Quando o AngularCLI importa um módulo de rotas,
    // ele se perde caso esteja em execução
    // Portanto, é necessário parar a execução
    // e iniciar novamente
    AppRoutingModule,

    ErrorsModule,
    HomeModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
