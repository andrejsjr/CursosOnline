// file writeFile.js

const fs = require("fs");

const file = 'webschool.txt';
const data = 'webschool é nois';
const encoding = 'utf8';

const callback = erro => {
	if(erro) throw erro;
	console.log('Salvei async!');
};

// Async
fs.writeFile(file, data, encoding, callback);
// fs.writeFile(file, data, callback);
// Se não passar o encoding, o default é utf8.

// Sync
fs.writeFileSync(file, data);
console.log('Salvei sync!');

console.log('Final da execução');