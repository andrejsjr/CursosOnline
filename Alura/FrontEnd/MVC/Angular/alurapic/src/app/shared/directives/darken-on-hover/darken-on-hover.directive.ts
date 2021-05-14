import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
import { renderComponent } from '@angular/core/src/render3';

/*
    Diretivas são instruções (códigos de programação)
    aplicadas a um template.

    Diretivas são aplicadas diretamente ao elemento
    do DOM como se fosse um atributo. Ex:

    <a apDarkOnHover></a>

    Componentes também são diretivas,
    porém são diretivas que possuem um template
    associado.
*/
@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';
    
    /*
        O Angular injetará em el, uma referência para
        o elemento do DOM onde a diretiva foi aplicada,
        permitindo assim a sua manipulação no TypeScript.
        ElementRef é uma classe do Angular, uma camada
        de proteção sobre o elemento nativo.
    */
    constructor(
        private el: ElementRef,
        private render: Renderer) { }

    /*
        @HostListener marca o método para responder
        ao evento JavaScript passado no parâmetro.
    */
    @HostListener('mouseover') // Quando passar o mouse em cima.
    darkenOn() {
        /*
            Não manipularemos o DOM diretamente através de el.
            Usaremos o Renderer porque ele garante a rendereção
            do DOM mesmo no backend (Angular Universal).
        */

        /*
            Aplicando estilo em el.
            Propriedade filter, valor brightness(70%)
        */
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    /*
        @HostListener marca o método para responder
        ao evento JavaScript passado no parâmetro.
    */
    @HostListener('mouseleave') // Quando tirar o mouse de cima.
    darkenOff() {
        /*
            Não manipularemos o DOM diretamente através de el.
            Usaremos o Renderer porque ele garante a rendereção
            do DOM mesmo no backend (Angular Universe).
        */

        /*
            Aplicando estilo em el.
            Propriedade filter, valor brightness(70%)
        */
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}