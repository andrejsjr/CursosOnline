import { Injectable } from '@nestjs/common';

import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
    
    private usuarios: Usuario[] = [{
        id: 1,
        nomeDeUsuario: 'gabriel',
        email: 'gabriel.leite@alura.com.br',
        senha: '123456',
        nomeCompleto: 'Gabriel Leite',
        dataDeEntrada: new Date()
    }];    
    
    public cria(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);
        return usuario;
    }
    
    public buscaPorNomeDeUsuario(nomeDeUsuario: string): Usuario {
        return this.usuarios.find(usuario => usuario.nomeDeUsuario == nomeDeUsuario);    
    }
}