let path = require('path');
let colors = require("colors");
let rimraf = require('rimraf');
let webpack = require('webpack');
let postcssAssets = require('postcss-assets');
let postcssNext = require('postcss-cssnext');
let stylelint = require('stylelint');
let ManifestPlugin = require('webpack-manifest-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

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
		mainpage: ['./src/mainstyle.css', './src/index.js',]
	},

	output: {
		path: path.resolve("./public/assets"),
		publicPath: '/asstes/',
		filename: '[name].[chunkhash].min.js',
		pathinfo: true
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.css$/,
				include: [path.resolve('./src'), path.resolve('./node_modules')],
				loader: ExtractTextPlugin.extract(
					'style',
					'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
					'postcss'
				)
			},
			{
				test: /\.eot(\?.*)?$/,
				loader: 'file?name=font/[hash].[ext]'
			},
			{
				test: /\.(woff|woff2)(\?.*)?$/,
				loader: 'file?name=font/[hash].[ext]'
			},
			{
				test: /\.ttf(\?.*)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream&name=font/[hash].[ext]'
			},
			{
				test: /\.svg(\?.*)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml&name=font/[hash].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'url?limit=1000&name=img/[hash].[ext]'
			}
		]
	},

	postcss: function () {
		return [
			stylelint({ files: './src/*.css' }),
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: [
		new ManifestPlugin({
			fileName: 'manifest.json'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: '[name].[chunkhash].min.js',
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('[name].[chunkhash].min.css'),
		new webpack.DefinePlugin({
			'process.env.BROWSER': JSON.stringify(true),
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
};

printLabel("PRODUCTION ", "red");
function printLabel(label, color) {
	var size = require('window-size');
	var w = size.width ? size.width : 31;
	var top = ''; for(var i=1;i<=w;i++){ top += '#'; }
	var center = '#';
	for(var i=1; i<=(w-2);i++){ center += ' '; }
	center += '#';

	var text = '#';
	for(var i=1;i<=(w/2-7);i++){ text += ' '; }
	text += label;
	for(var i=1;i<=(w/2-5);i++){ text += ' '; }
	text += '#';


	console.log(colors[color](top));
	console.log(colors[color](center));
	console.log(colors[color](text));
	console.log(colors[color](center));
	console.log(colors[color](top));
	console.log(colors[color](''));
}

module.exports = config;
