let path = require('path');
let merge = require('webpack-merge');

const LOADERS = require("./config/webpack.loaders")(__dirname);
const PLUGINS = require("./config/webpack.plugins");

const resolve = require("./config/webpack.resolve")(__dirname);

let common = {
	resolve: resolve,

	module: {
		rules: LOADERS
	},

	plugins: PLUGINS.COMMON
};

module.exports = merge(common, {
	devtool: 'eval',

	entry: [
    'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		'./src/mainstyle.css',
		'./src/index.tsx',
	],

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/assets',
		filename: '[name].js',
		pathinfo: true
	},

	plugins: PLUGINS.DEV
});
