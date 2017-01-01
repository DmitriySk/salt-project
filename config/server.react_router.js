let React = require('react');
let ReactServer = require('react-dom/server');
let Router = require('react-router');
let routes = require('../src/routes').default;

const fileResolver = require("./server.fileResolver")("/assets/");

const renderStyles = fileResolver.css(['common.css', 'main.css']);
const renderScripts = fileResolver.js(['common.js', 'main.js']);

module.exports = function() {
	return function(req, res, next) {
		Router.match({ routes: routes, location: req.url }, function(error, redirectLocation, renderProps) {
			if (error) {
				next(error);
				//console.log(error);
				//res.status(500).send(error.message);
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				let html = ReactServer.renderToString(React.createElement(Router.RouterContext, renderProps));
				res.render('index', {
					html: html,
					styles: renderStyles,
					scripts: renderScripts
				});
			} else {
				next();
				//res.status(404).send('Not found');
			}
		});
	};
};