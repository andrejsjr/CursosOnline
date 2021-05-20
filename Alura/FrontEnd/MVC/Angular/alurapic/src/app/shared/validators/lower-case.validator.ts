import { AbstractControl } from '@angular/forms';

/*
    Todo validator recebe como parâmetro um AbstractControl.
    Esse parâmetro receberá controles de entrada de dados (inputs do DOM).
*/
export function lowerCaseValidator(control: AbstractControl) {
    /*
        Se não validar, é preciso retornar um objeto com uma propriedade
        cujo nome será acessado no template (errors?.xxxx) de valor true.
        Se validar retorna null.
    */
    
    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true }
    }
    return null;
}