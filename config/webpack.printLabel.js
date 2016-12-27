let colors = require("colors");
let size = require('window-size');

function printLabel(label, color) {
	let w = size.width ? size.width : 31;
	let top = '';
	let center = '#';

	for(let i=1;i<=w;i++) {
		top += '#';
	}

	for(var i=1; i<=(w-2);i++) {
		center += ' ';
	}

	center += '#';

	let text = '#';

	for(let i=1;i<=(w/2-7);i++){
		text += ' ';
	}

	text += label;

	for(let i=1;i<=(w/2-5);i++){
		text += ' ';
	}

	text += '#';

	console.log(colors[color](top));
	console.log(colors[color](center));
	console.log(colors[color](text));
	console.log(colors[color](center));
	console.log(colors[color](top));
	console.log(colors[color](''));
}

module.exports = printLabel;