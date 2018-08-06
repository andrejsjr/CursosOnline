class Funcionario {

    constructor(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }
}

    let f1 = new Proxy(new Funcionario('naiana.bucetao@gmail.com'), {
    /* set(target, prop, value, receiver) {
        console.log(`Propriedade alterada: ${prop}`);
        console.log(`Valor atual: ${target[prop]}`);
        console.log(`Novo valor: ${value}`);
        return Reflect.set(target, prop, value, receiver);
    } */

    get(target, prop, value, receiver) {
        console.log(`Propriedade obtida: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
}); 

// f1.email = 'naina.bucetuda@gmail.com';
console.log(f1.email);

/* let funcionario = new Proxy(new Funcionario('abc@abc.com'), {

    get(target, prop, receiver) {
        console.log('Armadilha aqui!');

        return Reflect.get(target, prop, receiver);
    }

});

console.log(funcionario.email); */