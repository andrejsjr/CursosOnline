var Pessoa = function (nome, idade) {
	this.nome = nome;
	this.idade = idade;
};

var Homem = function (nome, idade) {
	new Pessoa(nome, idade);
};

var joao = new Homem('Joao', 20);
console.log(joao);
console.log(joao.nome);
console.log(joao.idade);