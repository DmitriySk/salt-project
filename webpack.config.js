let path = require('path');
let colors = require("colors");
let rimraf = require('rimraf');
let webpack = require('webpack');
let merge = require('webpack-merge');
let postcssAssets = require('postcss-assets');
let postcssNext = require('postcss-cssnext');
let stylelint = require('stylelint');

const LOADERS = require("./config/webpack.loaders");
const PLUGINS = require("./config/webpack.plugins");

const resolve = require("./config/webpack.resolve")(__dirname);

let printLabel = require("./config/webpack.printLabel");

let common = {
	resolve: resolve,

	entry: {
		main: ['./src/mainstyle.css', './src/index.js',]
	},

	module: {
		loaders: LOADERS.COMMON
	},

	plugins: PLUGINS.COMMON
};

let dev = merge(common, {
	devtool: 'eval',
	debug: true,

	entry: {
		main: [
			'webpack-hot-middleware/client?reload=true',
			'./src/mainstyle.css',
			'./src/index.js',
		]
	},

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/assets',
		filename: '[name].js',
		pathinfo: true
	},

	module: {
		loaders: LOADERS.DEV
	},

	postcss: function () {
		return [
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: PLUGINS.DEV
});


let prod = merge(common, {
	bail: true,

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/assets/',
		filename: '[name].[chunkhash].min.js',
		pathinfo: true
	},

	module: {
		loaders: LOADERS.PROD
	},

	postcss: function () {
		return [
			stylelint({ files: './src/*.css' }),
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: PLUGINS.PROD
});

if (process.env.NODE_ENV !== 'production') {
	printLabel("DEVELOPMENT", "green");
	module.exports = dev;
} else {
	printLabel("PRODUCTION ", "red");
	module.exports = prod;
}

module.exports.dev = dev;
module.exports.prod = prod;
