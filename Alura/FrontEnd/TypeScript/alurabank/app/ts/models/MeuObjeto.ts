import { Imprimivel } from './Imprimivel.js';
import { Igualavel } from './Igualavel.js';

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {
    
}