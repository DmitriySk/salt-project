let path = require('path');
let colors = require("colors");
let rimraf = require('rimraf');
let webpack = require('webpack');
let postcssAssets = require('postcss-assets');
let postcssNext = require('postcss-cssnext');

let config = {
	devtool: 'eval',

	debug: true,

	resolve: {
		alias: {
			_page: path.resolve(__dirname, "src/Pages"),
			_component: path.resolve(__dirname, "./src/components"),
			_container: path.resolve(__dirname, "./src/containers"),
		},
		root: __dirname,
		modulesDirectories: ["src", "node_modules"],
		extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css']
	},

	entry: {
		mainpage: [
			'webpack-hot-middleware/client?reload=true',
			'./src/index.js',
		]
	},

	output: {
		path: path.resolve(__dirname, "public/js/"),
		publicPath: '/js/',
		filename: '[name].js',
		pathinfo: true
	},

	module: {
		loaders: [
			{
				test: /(\.tsx?|\.jsx)$/,
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
				loader: 'file?name=h/[hash].[ext]'
			},
			{
				test: /\.(woff|woff2)(\?.*)?$/,
				loader: 'file?name=h/[hash].[ext]'
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
			postcssNext(),
			postcssAssets({ relative: true })
		];
	},

	plugins: [
		{
			apply: function(compiler) {
				console.log(__dirname);
				//rimraf.sync(path.resolve(__dirname, "public/js"));
			}
		},
		new webpack.DefinePlugin({
			'process.env.BROWSER': JSON.stringify(true),
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProgressPlugin(function handler(percentage, msg) {
			var msgArr = msg.split(" "), allChanks = -1, curChank = -1;

			if (msgArr[0].indexOf("/") != -1) {
				curChank = parseInt(msgArr[0].split("/")[0]);
				allChanks = parseInt(msgArr[0].split("/")[1]);

				process.stdout.write("\r\x1b[K");

				var count = 25, hashes="";
				var c = allChanks / count;
				for (var i = 0; i < count; ++i) {
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

module.exports = config;
