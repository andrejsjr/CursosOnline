import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';

import { UsuarioService } from './usuario.service';

/*
    O processo de injeção de dependência não funciona
    na classe de validação por que o class-validator
    está sendo executado no NestJS que possui um
    container próprio de injeção de dependência.

    Para resolver esse problema precisamos tornar 
    a classe um provider (@Injectable).
    Precisamos também, no main.ts, invocar o método
    useContainer() do class-validator, passando o
    container do de injeção de dependência do NestJS 
    como parâmetro e também delegando ao mesmo o
    tratamento de erros.
*/
@Injectable()
@ValidatorConstraint()
export class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface {
    constructor(private usuarioService: UsuarioService) {}    
    
    validate(nomeDeUsuario: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);        
    }
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNomeDeUsuarioUnicoConstraint
        });
    };
}