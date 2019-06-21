import { Imprimivel } from "../models/index";

export function imprime(...objetos: Imprimivel[]) {
    for (const objeto of objetos) {
        objeto.paraTexto();
    }
}