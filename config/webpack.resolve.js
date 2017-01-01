let path = require('path');

module.exports = function(dirname) {
	return {
		alias: {
			_page: path.resolve(dirname, "src/Pages"),
			_component: path.resolve(dirname, "./src/components"),
			_container: path.resolve(dirname, "./src/containers"),
			_ui: path.resolve(dirname, "./src/components/ui"),
		},
		root: dirname,
		modulesDirectories: ["src", "node_modules"],
		extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	};
};