let winston = require('winston');
require('winston-loggly-bulk');

if (process.env.WL_TOKEN && process.env.WL_DOMAIN) {
	winston.add(winston.transports.Loggly, {
		token: process.env.WL_TOKEN,
		subdomain: process.env.WL_DOMAIN,
		tags: ["Winston-NodeJS"],
		json: true
	});
}

module.exports = winston;