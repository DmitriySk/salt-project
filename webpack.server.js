let path = require('path');
let fs = require('fs');
const resolve = require("./config/webpack.resolve")(__dirname);
const cssLocalIdentName = '[name]__[local]_[hash:base64:5]';

module.exports = {
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
		rules: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.css$/,
				loaders: [
					'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: cssLocalIdentName
            }
          }
				]
			},
			{
				test: /\.svg(\?.*)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=public/assets/[hash].[ext]'
			},
			{
        test: /\.(png|gif|jpe?g|svg|ttf|otf|eot|woff2?)$/,
				loader: 'url-loader?limit=1000&name=public/assets/[hash].[ext]'
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
