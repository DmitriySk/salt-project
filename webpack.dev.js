let path = require('path');
let colors = require("colors");
let rimraf = require('rimraf');
let webpack = require('webpack');
let postcssAssets = require('postcss-assets');
let postcssNext = require('postcss-cssnext');
let ManifestPlugin = require('webpack-manifest-plugin');

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
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'react-hot/webpack!ts'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.css$/,
				include: [path.resolve('./src'), path.resolve('./node_modules')],
				loaders: [
					'style',
					'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
					'postcss'
				]
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
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: [
		new ManifestPlugin({
			fileName: 'manifest.json'
		}),
		new webpack.DefinePlugin({
			'process.env.BROWSER': JSON.stringify(true),
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProgressPlugin(function handler(percentage, msg) {
			let msgArr = msg.split(" "), allChanks = -1, curChank = -1;

			if (msgArr[0].indexOf("/") != -1) {
				curChank = parseInt(msgArr[0].split("/")[0]);
				allChanks = parseInt(msgArr[0].split("/")[1]);

				process.stdout.write("\r\x1b[K");

				let count = 25, hashes="";
				let c = allChanks / count;
				for (let i = 0; i < count; ++i) {
					hashes += curChank > i*c ? "#" : " ";
				}

				process.stdout.write(
					colors.red("progress:")
					+ colors.green(" ["+hashes+"] ")
					+ colors.blue(msg)
				);
			}
		})
	]
};


printLabel("DEVELOPMENT", "green");
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
