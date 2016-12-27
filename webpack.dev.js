let path = require('path');
let colors = require("colors");
let rimraf = require('rimraf');
let webpack = require('webpack');
let postcssAssets = require('postcss-assets');
let postcssNext = require('postcss-cssnext');

let LOADERS_COMMON = require("./config/webpack.loaders").LOADERS_COMMON;
let LOADERS_DEV = require("./config/webpack.loaders").LOADERS_DEV;
let PLUGINS_COMMON = require("./config/webpack.plugins").PLUGINS_COMMON;
let PLUGINS_DEV = require("./config/webpack.plugins").PLUGINS_DEV;

let printLabel = require("./config/webpack.printLabel");

let config = {
	devtool: 'eval',

	debug: true,

	resolve: {
		alias: {
			_page: path.resolve(__dirname, "src/Pages"),
			_component: path.resolve(__dirname, "./src/components"),
			_container: path.resolve(__dirname, "./src/containers"),
		},
		root: path.resolve(__dirname),
		modulesDirectories: ["src", "node_modules"],
		extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	},

	entry: {
		mainpage: [
			'webpack-hot-middleware/client?reload=true',
			'./src/mainstyle.css',
			'./src/index.js',
		]
	},

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/assets/',
		filename: '[name].js',
		pathinfo: true
	},

	module: {
		loaders: LOADERS_COMMON.concat(LOADERS_DEV)
	},

	postcss: function () {
		return [
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: PLUGINS_COMMON.concat(PLUGINS_DEV)
};


printLabel("DEVELOPMENT", "green");

module.exports = config;
