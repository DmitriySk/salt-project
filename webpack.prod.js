let path = require('path');
let colors = require("colors");
let webpack = require('webpack');
let postcssAssets = require('postcss-assets');
let postcssNext = require('postcss-cssnext');
let stylelint = require('stylelint');

let LOADERS_COMMON = require("./config/webpack.loaders").LOADERS_COMMON;
let LOADERS_PROD = require("./config/webpack.loaders").LOADERS_PROD;
let PLUGINS_COMMON = require("./config/webpack.plugins").PLUGINS_COMMON;
let PLUGINS_PROD = require("./config/webpack.plugins").PLUGINS_PROD;

let printLabel = require("./config/webpack.printLabel");

let config = {
	bail: true,

	resolve: {
		alias: {
			_page: path.resolve(__dirname, "src/Pages"),
			_component: path.resolve(__dirname, "./src/components"),
			_container: path.resolve(__dirname, "./src/containers"),
		},
		root: __dirname,
		modulesDirectories: ["src", "node_modules"],
		extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	},

	entry: {
		main: ['./src/mainstyle.css', './src/index.js',]
	},

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/asstes/',
		filename: '[name].[chunkhash].min.js',
		pathinfo: true
	},

	module: {
		loaders: LOADERS_COMMON.concat(LOADERS_PROD)
	},

	postcss: function () {
		return [
			stylelint({ files: './src/*.css' }),
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: PLUGINS_COMMON.concat(PLUGINS_PROD)
};

printLabel("PRODUCTION ", "red");

module.exports = config;
