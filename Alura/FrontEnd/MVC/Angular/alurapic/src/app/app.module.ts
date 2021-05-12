import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /*
      BrowserModule contem recursos do Angular
      para serem usados no browser, além de diretivas,
      através de CommonModule carregado internamente.
      Por isso, malandramente, o Angular já o importa
      automaticamente.
    */
    BrowserModule,
    PhotosModule,
    ErrorsModule,
    HomeModule,
    /*
      Como é no template de AppComponent que os componentes
      serão carregados conforme a rota acessada,
      AppModule precisa ter acesso à AppRoutingModule.
      Porém, ter acesso à AppRoutingModule não é suficiente para
      se ter acesso à diretivas como <router-outlet></router-outlet>.
      Para tal, AppModule precisaria ter acesso também a RouterModule.
      No entanto, como AppRoutingModule está exportando RouterModule,
      ao importar o AppRoutingModule, AppModule passa a ter acesso às
      diretivas de RouterModule, como <router-outlet></router-outlet>.
    */
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
