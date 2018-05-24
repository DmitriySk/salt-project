module.exports = function(app) {
	const webpack = require('webpack');
	const webpackConfig = require('../webpack.config.dev');
	const webpackCompiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		},
		noInfo: true,
		// hot: true,
		// inline: true,
		// lazy: false,
		// historyApiFallback: true,
		// quiet: true
	}));
	app.use(require('webpack-hot-middleware')(webpackCompiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 5000
	}));
};