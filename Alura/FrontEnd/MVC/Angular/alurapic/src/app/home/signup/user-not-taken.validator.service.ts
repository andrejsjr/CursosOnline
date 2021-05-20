import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { SignUpService } from './signup.service';

@Injectable({ providedIn: 'root' })
export class UserNotTakenValidatorService { 

    constructor(private signUpService: SignUpService) { }

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                /*
                    O operador switchMap() troca o Observable retornado (Observable<xxxx>)
                    por outro (Observable<yyyy>).
                    O Observable retornado por control.valueChanges é
                    Observable<string> (valor digitado no campo user name).
                    Está sendo trocado através de swithMap por Observable<boolean>,
                    que é o retorno da função checkUserNameTaken de signUpService.
                */
                .pipe(switchMap(userName => this.signUpService.checkUserNameTaken(userName)))
                /*
                    O map está trocando apenas o valor da emissão do Observable atual <boolean>
                    para <{ userNameTaken: true } | null>
                */
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                /*
                    Para que o sistema de validação assíncrona do Angular
                    possa fazer o subscribe() e pegar o valor emitido é necessário
                    informar que o processo de emissão completou.

                    O operador first() informa ao sistema de validação assíncrona
                    do Angular para pegar o primeiro valor emitido a partir daqui.
                */
                .pipe(first());
        }
    }
}