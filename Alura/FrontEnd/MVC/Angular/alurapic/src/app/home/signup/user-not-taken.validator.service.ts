import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first } from "rxjs/operators";

import { SignUpService } from "./signup.service";

/* 
    Um Validator que valida se o usuário já existe
    precisa de SignUpService, que é quem solicita
    essa checagem ao back end.
    
    No entanto, um Validator não pode receber
    injeção de dependência.
    Por esse motivo, esse "Validator" precisa
    ser, "ao mesmo tempo", um validador e um serviço.
*/

/* 
    Como será injetado apenas SignUpComponent,
    não faz sentido ter o providedIn: 'root'
    em @Injectable.
    No caso, o próprio SignUpComponent está
    provendo um SignUpComponent para injeção
    em sí mesmo.
*/
@Injectable()
export class UserNotTakenValidatorService {
    
    constructor(private signUpService: SignUpService) { }

    /* 
        Retorna uma função de validação que,
        por estar dentro de um serviço,
        possui acesso a signUpService que
        foi injetado.
    */
    checkUserNameTaken() {
        
        return (control: AbstractControl) => {
        
            /* 
                Aqui não podemos simplesmente trabalhar com
                control.values (valor digitado).

                Como função será assíncrona, precisamos de
                control.valueChanges, pois este é um Observable.

                O sistema de validação assíncrona do Angular
                se inscreverá no Observable para obter os
                valores digitados.
            */

            return control
                .valueChanges
                /* 
                    Pipe com o operador debonceTime para evitar
                    de invocar a função que irá no back end
                    a cada tecla digitada.
                */
                .pipe(debounceTime(300))
                /* 
                    Pipe com o operador switchMap.
                    Usado para pausar a escuta do
                    Observable anterior (control.valueChanges),
                    pegando o último valor emitido (userName)
                    e chavear para inscrição no Observable seguinte
                    (this.signUpService.checkUserNameTaken(userName)).
                */
                .pipe(switchMap(userName => 
                    this.signUpService.checkUserNameTaken(userName)
                ))
                /* 
                    Como o retorno do Observable anterior, chamada
                    da função checkUserNameTaken é true ou false,
                    precisavamos o usar o Pipe com o operador map
                    para finalmente mapear esse retorno para o objeto
                    JavaScript { key: true} ou null, que é o que o
                    sistema de validação do Angular espera ter acesso
                    ao invocar o Validator.
                */
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                /* 
                    No entanto, para funcionar, o sistema de validação
                    assíncrona do Angular precisa entender que ele deve
                    completar a inscrição em this.signUpService.checkUserNameTaken(userName)
                    logo na primeira emissão, senão ficará escutando eternamente
                    sem poder ter acesso ao objeto JavaScript final.
                */
               .pipe(first());
        }
    }
}