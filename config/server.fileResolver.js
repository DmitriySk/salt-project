const manifest = require('../public/assets/manifest.json');
let path = "/";

function resolve(names_array) {
	return names_array.map((source) => {
		if (!manifest[source]) { return; }
		return path + manifest[source];
	}).filter(file => file !== undefined);
}

function resolveJS(names) {
	return resolve(names).map((src, i) =>
		`<script src='${src}'></script>`
	).join(' ');
}

function resolveCSS(names) {
	return resolve(names).map((src, i) =>
		`<link rel="stylesheet" href='${src}' />`
	).join(' ');
}

function init(initPath) {
	path = initPath || path;
	return {
		css: resolveCSS,
		js: resolveJS
	};
}

module.exports = init;