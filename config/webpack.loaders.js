let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports.COMMON = [
	{
		test: /\.json$/,
		loader: 'json'
	},
	{
		test: /\.eot(\?.*)?$/,
		loader: 'file?name=[hash].[ext]'
	},
	{
		test: /\.(woff|woff2)(\?.*)?$/,
		loader: 'file?name=[hash].[ext]'
	},
	{
		test: /\.ttf(\?.*)?$/,
		loader: 'url?limit=10000&mimetype=application/octet-stream&name=[hash].[ext]'
	},
	{
		test: /\.svg(\?.*)?$/,
		loader: 'url?limit=10000&mimetype=image/svg+xml&name=[hash].[ext]'
	},
	{
		test: /\.(jpe?g|png|gif)$/i,
		loader: 'url?limit=1000&name=[hash].[ext]'
	}
];

module.exports.DEV = [
	{
		test: /\.tsx?$/,
		loader: 'react-hot/webpack!ts'
	},
	{
		test: /\.css$/,
		include: [path.resolve('./src'), path.resolve('./node_modules')],
		loaders: [
			'style',
			'css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
			'postcss',
			'resolve-url'
		]
	},
];

module.exports.PROD = [
	{
		test: /\.tsx?$/,
		loader: 'ts'
	},
	{
		test: /\.css$/,
		include: [path.resolve('./src'), path.resolve('./node_modules')],
		loader: ExtractTextPlugin.extract(
			'style',
			'css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
			'postcss',
			'resolve-url'
		)
	},
];