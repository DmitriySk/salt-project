require('node-jsx-babel').install();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var React = require('react');
var ReactServer = require('react-dom/server');
var Router = require('react-router');

var routes = require('./src/routes').default;

var app = express();

if (process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.config');
	const webpackCompiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {colors: true},
		noInfo: true,
		hot: true,
		inline: true,
		lazy: false,
		historyApiFallback: true,
		quiet: true,
	}));
	app.use(require('webpack-hot-middleware')(webpackCompiler));
	app.set('port', process.env.PORT || 3000);
}

// view engine setup
app.set('views', path.resolve(__dirname, './src/Views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {

	Router.match({ routes: routes, location: req.url }, function(error, redirectLocation, renderProps) {
		if (error) {
			console.log(error);
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			// You can also check renderProps.components or renderProps.routes for
			// your "not found" component or route respectively, and send a 404 as
			// below, if you're using a catch-all route.
			var html = ReactServer.renderToString(React.createElement(Router.RouterContext, renderProps));
			//console.log(renderProps);
			res.render('index', {html: html});
		} else {
			res.status(404).send('Not found');
		}
	});

});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('index', {
			message: err.message,
			error: err.stack
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('index', {
		message: err.message,
		error: {}
	});
});

let server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});