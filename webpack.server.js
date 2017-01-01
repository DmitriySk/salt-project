let path = require('path');
let fs = require('fs');
const LOADERS = require("./config/webpack.loaders");

let config = {
	externals: [
		(context, request, callback) => {
			const originRequest = request.split('!').pop();

			if (originRequest[0] !== '.' && originRequest[0] !== '/') {
				callback(null, `commonjs ${originRequest}`);
				return;
			}

			callback();
		}
	],

	target: 'node',

	resolve: {
		extensions: ['', '.ts', '.tsx', '.js'],
	},

	entry: './server.ts',

	output: {
		path: "./",
		filename: './server.js',
		publicPath: '/public/',
	},

	module: {
		loaders: LOADERS.COMMON.concat(LOADERS.DEV)
	},

	plugins: [],

	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	}
};

module.exports = config;
