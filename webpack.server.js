let path = require('path');
let fs = require('fs');

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

	entry: './index.js',

	output: {
		path: "./",
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
				exclude: [path.resolve('./node_modules/@cian/components')],
				loaders: [
					'isomorphic-style-loader',
					'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]'
				]
			},
			{
				test: /\.css$/,
				include: [path.resolve('./node_modules/@cian/components')],
				loaders: [
					'isomorphic-style-loader',
					'css-loader?modules&importLoaders=2&localIdentName=[local]'
				]
			},
			{
				test: /\.eot(\?.*)?$/,
				loader: 'file?name=h/[hash].[ext]'
			},
			{
				test: /\.(woff|woff2)(\?.*)?$/,
				loader: 'file-loader?name=h/[hash].[ext]'
			},
			{
				test: /\.ttf(\?.*)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream&name=h/[hash].[ext]'
			},
			{
				test: /\.svg(\?.*)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml&name=h/[hash].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'url?limit=1000&name=h/[hash].[ext]'
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
