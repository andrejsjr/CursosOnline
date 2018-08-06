// file writeFile.cmd.js

const fs = require("fs");

const file = process.argv[2] || 'webschool.txt';
const data = process.argv[3] || 'Foi que foi';
const encoding = 'utf8';

const callback = erro => {
	if(erro) throw erro;
	console.log('Salvei async!');
};

// Async
fs.writeFile(file, data, callback);

console.log('Final da execução');