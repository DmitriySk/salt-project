var path = require('path');
var colors = require("colors");
var rimraf = require('rimraf');
var webpack = require('webpack');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	bail: true,

	resolve: {
		alias: {
			_page: path.resolve(__dirname, "./src/Pages"),
		},
		root: path.resolve(__dirname),
		extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	},

	entry: {
		mainpage: './src/index.js',
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'redux-thunk'
		]
	},

	output: {
		path: path.resolve(__dirname, "./public"),
		publicPath: '/assets/',
		filename: 'h/[name].[chunkhash].min.js'
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader',
					{publicPath: '../'}
				)
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

	postcss: function () {
		return [
			stylelint({ files: '../../src/app/*.css' }),
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: [
		{
			apply: function(compiler) {
				rimraf.sync(path.resolve(__dirname, "./public/js"));
			}
		},
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'h/[name].[chunkhash].min.js',
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('h/[name].[chunkhash].min.css'),
		new webpack.DefinePlugin({
			'process.env.BROWSER': JSON.stringify(true),
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
};

module.exports = config;
