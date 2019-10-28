import { AbstractControl } from '@angular/forms';

/* 
    No Angular, todo validator customizado
    recebe como parâmetro um AbstractControl.
*/
export function lowerCaseValidator(control: AbstractControl) {    
    
    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        /* 
            Se o erro acontecer, deve-se retornar um objeto
            com a propriedade correspondente ao erro que
            vai ser referenciado no template, com valor true.
            
            Ex:

            <ap-vmessage
                *ngIf="signupForm.get('userName').errors?.lowerCase"
                text="Must be lower case!">
            </ap-vmessage>
        */
        return { lowerCase: true }
    }
    // Se o erro não ocorrer, retorna-se null.
    return null;
}