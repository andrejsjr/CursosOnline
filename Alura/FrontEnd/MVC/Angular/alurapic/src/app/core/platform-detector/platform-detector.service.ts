import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformDetectorService{ 

    /*
        Injeção de token.
        PLATFORM_ID é um token do Angular.
        Como platformId é uma string, precisamos indicar ao Angular
        que string devemos injetar.
        Por isso usamos @Inject(PLATAFORM_ID), para indicar ao Angular
        que estamos injetando em platformId o token (identificador) do Angular
        PLATFORM_ID. 
    */
    constructor(@Inject(PLATFORM_ID) private platformId: string) { }

    // Testa de o código está rodando no navegador.
    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}