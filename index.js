//require('node-jsx-babel').install();


let express = require('express');
let expressStaticGzip = require("express-static-gzip");
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
let bodyParser = require('body-parser');
let React = require('react');
let ReactServer = require('react-dom/server');
let Router = require('react-router');
let routes = require('./src/routes').default;
let fileResolver = require("./config/server.fileResolver")("/assets/");
let winstonLogger = require("./config/server.logger");

let app = express();

const renderStyles = fileResolver.css(['common.css', 'main.css']);
const renderScripts = fileResolver.js(['common.js', 'main.js']);

if (process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const webpack_hot = require('webpack-hot-middleware');
	const webpack_middle = require('webpack-dev-middleware');
	const webpackConfig = require('./webpack.dev');
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
}

let port = process.env.NODE_ENV === 'production' ? 8080 : 3000;
app.set('port', process.env.PORT || port);

// view engine setup
app.set('views', path.resolve(__dirname, './src/Views'));
app.set('view engine', 'jade');

/** Protect from web vulnerability  */
app.use(helmet());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('short', {stream: {write: function(line) {
	winstonLogger.log('info', line);
}}}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/** Returns gzip compressed static files if they are exists */
app.use("/", expressStaticGzip(path.resolve(__dirname, "public"), { indexFromEmptyFile: false }));

/** Matches route and return prerendered markup */
app.use(function(req, res) {
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
			let html = ReactServer.renderToString(React.createElement(Router.RouterContext, renderProps));
			//console.log(renderProps);
			res.render('index', {
				html: html,
				styles: renderStyles,
				scripts: renderScripts
			});
		} else {
			res.status(404).send('Not found');
		}
	});
});

/*** catch 404 and forward to error handler */
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/*** error handlers */
if (app.get('env') === 'development') {
	// development error handler
	// will print stacktrace
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.render('index', {
			message: err.message,
			error: err.stack
		});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.render('index', {
			message: err.message,
			error: {}
		});
	});
}

let server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});