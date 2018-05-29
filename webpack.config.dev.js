let path = require('path');
let merge = require('webpack-merge');

const LOADERS = require("./config/webpack.loaders")(__dirname, true);
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
	mode: 'development',
  performance: { hints: false },

	entry: [
		'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.tsx')
	],

	output: {
		path: path.resolve(__dirname, 'public/assets'),
		publicPath: '/assets/',
		filename: '[name].js'
	},

	plugins: PLUGINS.DEV
});
