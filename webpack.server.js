let path = require('path');
let fs = require('fs');
const resolve = require("./config/webpack.resolve")(__dirname);

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

	resolve: resolve,

	entry: './server.ts',

	output: {
		path: __dirname,
		filename: './server.js',
		publicPath: '/public/',
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: [
					'isomorphic-style-loader',
					'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]'
				]
			},
			{
				test: /\.eot(\?.*)?$/,
				loader: 'file?name=public/assets/[hash].[ext]'
			},
			{
				test: /\.(woff|woff2)(\?.*)?$/,
				loader: 'file-loader?name=public/assets/[hash].[ext]'
			},
			{
				test: /\.ttf(\?.*)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream&name=public/assets/[hash].[ext]'
			},
			{
				test: /\.svg(\?.*)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml&name=public/assets/[hash].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'url?limit=1000&name=public/assets/[hash].[ext]'
			}
		]
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
