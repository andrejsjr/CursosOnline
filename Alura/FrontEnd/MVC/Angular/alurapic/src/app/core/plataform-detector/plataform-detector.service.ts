import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/* 
    Classe utilizada para verificar se a plataforma
    utilizada pelo usuário é o browser
*/

@Injectable({
    // Única instância para toda a aplicação
    providedIn: 'root'
})
export class PlatformDetectorService { 
    
    constructor(
        /* 
            Injection Token do Angular
            Passamos um identificador (constante)
            para que o Angular injete a string correspondente
        */
        @Inject(PLATFORM_ID) private platformId: string
    ) { }

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}