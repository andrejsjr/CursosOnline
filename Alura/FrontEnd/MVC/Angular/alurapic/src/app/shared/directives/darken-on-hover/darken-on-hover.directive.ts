import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

/* 
    Diretivas funcionam como componentes
    mas não estão amarradas a um template

    Na verdade, todos os componentes são diretivas
    porém estão amarrados a um template
*/

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';
    
    constructor(
        /* 
            Ao usarmos um ElementRef no contructor,
            o angular injeta como dependência o elemento do DOM
            onde a diretiva foi utilizada.

            Esse elemento não é o elemento nativo,
            é um wrapper do Angular para elementos do DOM,
            para que se possa trabalhar com o elemento
            de forma integrada ao framework.
        */    
        private el: ElementRef,
        
        /* 
            Também injetado pelo Angular.
            Pemite manipular o DOM sem escrever diretamente
            o que se deseja fazer.

            Garante que o código não vai dar problema
            caso haja uma renderização em server side.
        */
        private render: Renderer
    ) { }

    /* 
        @HostListener diz pro Angular em qual evento JavaScript
        do elemento hospedeiro da diretiva o método escrito deve atuar
    */
   
    @HostListener('mouseover')
    darkenOn() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}