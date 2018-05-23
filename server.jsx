require('node-jsx-babel').install();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const React = require('react');
const {renderToStaticMarkup, renderToString} = require('react-dom/server');
const {RouterContext, match} = require('react-router');

const routes = require('./src/routes').default;

const app = express();

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

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			console.log(error);
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			// You can also check renderProps.components or renderProps.routes for
			// your "not found" component or route respectively, and send a 404 as
			// below, if you're using a catch-all route.
			let html = renderToString(<RouterContext {...renderProps}/>);
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


module.exports = app;
