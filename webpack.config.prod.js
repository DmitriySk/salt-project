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
	bail: true,

  entry: ['./src/mainstyle.css', './src/index.tsx'],

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/assets/',
		filename: '[name].[chunkhash].min.js',
		pathinfo: true
	},

	plugins: PLUGINS.PROD
});
