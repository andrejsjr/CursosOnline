class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }
    
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;        
    }
    
    static textoParaData(texto) {
        if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(texto))
            throw new Error('"texto" deve ser uma data válida no formato aaaa-mm-dd');
        
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }
}