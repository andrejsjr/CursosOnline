// file sayName.js

'use strict';

function callback(erro, result) {
	if(erro) throw new Error(erro);
	console.log('Meu nome é', result);
};

function sayName(name, callback) {
	if(typeof name === 'string') return callback(null, name);
	const erro = 'Você precisa passar uma STRING para name';	
	return callback(erro, null);
};

sayName('André', callback);