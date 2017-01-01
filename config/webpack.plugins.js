let webpack = require('webpack');
let colors = require("colors");
let CompressionPlugin = require("compression-webpack-plugin");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');


module.exports.COMMON = [
	new ManifestPlugin({
		fileName: 'manifest.json'
	}),
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
	}),
];

module.exports.DEV = [
	new webpack.DefinePlugin({
		'process.env.BROWSER': JSON.stringify(true),
		'process.env.NODE_ENV': JSON.stringify('development')
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
];

module.exports.PROD = [
	new webpack.DefinePlugin({
		'process.env.BROWSER': JSON.stringify(true),
		'process.env.NODE_ENV': JSON.stringify('production')
	}),
	new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.js$|\.html$|\.css$/,
		threshold: 10240,
		minRatio: 0.8
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		filename: '[name].[chunkhash].min.js',
		minChunks: Infinity
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new ExtractTextPlugin('[name].[chunkhash].min.css'),
];