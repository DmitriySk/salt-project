const manifest = require('../public/assets/manifest.json');

function resolve(names_array) {
	return names_array.map((source) => {
		if (!manifest[source]) { return; }
		return manifest[source];
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

module.exports = {
  css: resolveCSS,
  js: resolveJS
};