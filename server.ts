let express = require('express');
let expressStaticGzip = require("express-static-gzip");
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
let bodyParser = require('body-parser');

let app = express();

const winstonLogger = require("./config/server.logger");
const reactRouter = require("./config/server.react_router");

if (process.env.NODE_ENV !== 'production') {
	const devMiddle = require('./config/server.dev_middle');
	devMiddle(app);
}

let port = process.env.NODE_ENV === 'production' ? 8080 : 3333;
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
//app.use("/", express.static("public"));
app.use("/", expressStaticGzip("public", { indexFromEmptyFile: false }));

/** Matches route and return prerendered markup */
app.use(reactRouter());

/*** catch 404 and forward to error handler */
app.use(function(req, res, next) {
	class ServerError extends Error {
		status: number;
	}
	const err: ServerError = new ServerError('Not Found');
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