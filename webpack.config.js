let dev = require('./webpack.config.dev');
let prod = require('./webpack.config.prod');
let printLabel = require('./config/webpack.printLabel');

if (process.env.NODE_ENV !== 'production') {
  printLabel("DEVELOPMENT", "green");
	module.exports = dev;
} else {
	printLabel("PRODUCTION ", "red");
	module.exports = prod;
}
