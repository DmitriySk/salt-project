module.exports = function(app) {
	const webpack = require('webpack');
	const webpack_hot = require('webpack-hot-middleware');
	const webpack_middle = require('webpack-dev-middleware');
	const webpackConfig = require('../webpack.config.dev');
	const webpackCompiler = webpack(webpackConfig);
	app.use(webpack_middle(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		},
		noInfo: true,
		hot: true,
		inline: true,
		lazy: false,
		historyApiFallback: true,
		quiet: true
	}));
	app.use(webpack_hot(webpackCompiler));
};