import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario-unico.validator';

export class Usuario {
    id: number;
    
    /*
        /class-transform/
        Na hora da serialização/desserialização mudar o nome
        do atribuito para o nome definido em "name".
        No caso, a aplicação frontend espera e envia 
        os atribuitos em Inglês.
    */
    @Expose({
        name: 'userName'
    })
    // class-validator
    @IsNotEmpty({
        message: 'nomeDeUsuario é obrigatório.'
    })
    // class-validator
    @IsString({
        message: 'nomeDeUsuario precisa ser uma string.'
    })
    // class-validator
    @IsNomeDeUsuarioUnico({
        message: 'nomeDeUsuario precisa ser único.'
    })
    nomeDeUsuario: string;
    
    /*
        /class-transform/
        Na hora da serialização/desserialização mudar o nome
        do atribuito para o nome definido em "name".
        No caso, a aplicação frontend espera e envia 
        os atribuitos em Inglês.
    */
    @Expose({
        name: 'email'
    })
    // class-validator
    @IsEmail({}, {
        message: 'email precisar ser um endereço de e-mail válido.'
    })
    email: string;    
    
    /*
        /class-transform/
        Exclui o atribuito na hora da serialização (saída do objeto).
    */
    @Exclude({
        toPlainOnly: true
    })
    /*
        /class-transform/
        Na hora da serialização/desserialização mudar o nome
        do atribuito para o nome definido em "name".
        No caso, a aplicação frontend espera e envia os 
        atribuitos em Inglês.
    */
    @Expose({
        name: 'password'
    })
    // class-validator
    @IsNotEmpty({
        message: 'senha é obrigatório.'
    })
    senha: string;    
    
    /*
        /class-transform/
        Na hora da serialização/desserialização mudar o nome
        do atribuito para o nome definido em "name".
        No caso, a aplicação frontend espera e envia os 
        atribuitos em Inglês.
    */
    @Expose({
        name: 'fullName'
    })
    // class-validator
    @IsNotEmpty({
        message: 'nomeCompleto é obrigatório'
    })
    nomeCompleto: string;
    
    /*
        /class-transform/
        Na hora da serialização/desserialização mudar o nome
        do atribuito para o nome definido em "name".
        No caso, a aplicação frontend espera e envia 
        os atribuitos em Inglês.
    */
    @Expose({
        name: 'joinDate'
    })
    dataDeEntrada: Date;
}