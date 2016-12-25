/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//require('node-jsx-babel').install();


	let winston = __webpack_require__(1);
	__webpack_require__(2);

	if (process.env.WL_TOKEN && process.env.WL_DOMAIN) {
		winston.add(winston.transports.Loggly, {
			token: process.env.WL_TOKEN,
			subdomain: process.env.WL_DOMAIN,
			tags: ["Winston-NodeJS"],
			json: true
		});
	}

	let express = __webpack_require__(3);
	let path = __webpack_require__(4);
	let favicon = __webpack_require__(5);
	let logger = __webpack_require__(6);
	let cookieParser = __webpack_require__(7);
	let bodyParser = __webpack_require__(8);
	let React = __webpack_require__(9);
	let ReactServer = __webpack_require__(10);
	let Router = __webpack_require__(11);

	let routes = __webpack_require__(12).default;

	const manifest = __webpack_require__(25);

	let app = express();

	if (process.env.NODE_ENV !== 'production') {
		const webpack = __webpack_require__(26);
		const webpack_hot = __webpack_require__(27);
		const webpack_middle = __webpack_require__(28);
		const webpackConfig = __webpack_require__(29);
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

	app.set('port', process.env.PORT || 3000);

	// view engine setup
	app.set('views', path.resolve(__dirname, './src/Views'));
	app.set('view engine', 'jade');

	//app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('default', {stream: {write: function(line) {
		winston.log('info', line);
	}}}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	const resolve = (files) => {
		return files.map((src) => {
			if (!manifest[src]) { return; }
			return '/assets/' + manifest[src];
		}).filter(file => file !== undefined);
	};

	const styles = resolve(['vendor.css', 'mainpage.css']);
	const renderStyles = styles.map((src, i) =>
		`<link rel="stylesheet" href='${src}' />`
	).join(' ');

	const scripts = resolve(['vendor.js', 'mainpage.js']);
	const renderScripts = scripts.map((src, i) =>
		`<script src='${src}'></script>`
	).join(' ');

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

	/// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	/// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res) {
			res.status(err.status || 500);
			res.render('index', {
				message: err.message,
				error: err.stack
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.render('index', {
			message: err.message,
			error: {}
		});
	});

	let server = app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + server.address().port);
		//winston.log('info', 'Express server listening on port ' + server.address().port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("winston-loggly-bulk");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Main_1 = __webpack_require__(13);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    path: '/',
	    indexRoute: { component: Main_1.default },
	    childRoutes: []
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(9);
	var header_1 = __webpack_require__(14);
	var footer_1 = __webpack_require__(23);
	var center_1 = __webpack_require__(24);
	var Main = (function (_super) {
	    __extends(Main, _super);
	    function Main(props) {
	        var _this = _super.call(this, props) || this;
	        _this.state = {
	            click_count: 0
	        };
	        _this.onClick = _this.onClick.bind(_this);
	        return _this;
	    }
	    Main.prototype.onClick = function () {
	        this.setState({
	            click_count: this.state.click_count + 1
	        });
	    };
	    Main.prototype.render = function () {
	        return React.createElement("div", { className: "main_page" },
	            React.createElement(header_1.default, null),
	            React.createElement(center_1.default, null),
	            React.createElement(footer_1.default, null));
	    };
	    return Main;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(9);
	var s = __webpack_require__(15);
	var name_svg = __webpack_require__(22);
	var Header = (function (_super) {
	    __extends(Header, _super);
	    function Header() {
	        return _super.apply(this, arguments) || this;
	    }
	    Header.prototype.render = function () {
	        return React.createElement("div", { className: s["m-header"] },
	            React.createElement("div", { className: s["m-header-topline"] }),
	            React.createElement("div", { className: s['m-header-inner'] },
	                React.createElement("div", null,
	                    React.createElement("img", { className: s['m-header-name-img'], src: name_svg })),
	                React.createElement("div", null)),
	            React.createElement("div", { className: s['m-header-bottomline'] }));
	    };
	    return Header;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Header;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(16);
	    var insertCss = __webpack_require__(18);

	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }

	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./style.css", function() {
	        content = require("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./style.css");

	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }

	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, ".m-header___FDGle {\r\n\theight: 100vh;\r\n\tbackground: #222225;\r\n\tposition: relative;\r\n}\r\n\r\n.m-header-topline___3tbNo {\r\n\theight: 25px;\r\n\tbackground: #ffba37;\r\n}\r\n\r\n.m-header-inner___2Lb2i {\r\n\tdisplay: flex;\r\n\tflex-flow: column nowrap;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\theight: calc(100% - 25px - 25px);\r\n}\r\n\r\n.m-header-name-img___1aBj5 {\r\n\twidth: 500px;\r\n}\r\n\r\n.m-header-bottomline___3bDYY {\r\n\theight: 0px;\r\n\twidth: 100%;\r\n\tborder-top: 1px solid #f0eeef;\r\n\tposition: absolute;\r\n\tbottom: 23px;\r\n}", "", {"version":3,"sources":["/./src/containers/header/style.css"],"names":[],"mappings":"AAAA;CACC,cAAc;CACd,oBAAoB;CACpB,mBAAmB;CACnB;;AAED;CACC,aAAa;CACb,oBAAoB;CACpB;;AAED;CACC,cAAc;CACd,yBAAyB;CACzB,oBAAoB;CACpB,wBAAwB;CACxB,iCAAiC;CACjC;;AAED;CACC,aAAa;CACb;;AAED;CACC,YAAY;CACZ,YAAY;CACZ,8BAA8B;CAC9B,mBAAmB;CACnB,aAAa;CACb","file":"style.css","sourcesContent":[".m-header {\r\n\theight: 100vh;\r\n\tbackground: #222225;\r\n\tposition: relative;\r\n}\r\n\r\n.m-header-topline {\r\n\theight: 25px;\r\n\tbackground: #ffba37;\r\n}\r\n\r\n.m-header-inner {\r\n\tdisplay: flex;\r\n\tflex-flow: column nowrap;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\theight: calc(100% - 25px - 25px);\r\n}\r\n\r\n.m-header-name-img {\r\n\twidth: 500px;\r\n}\r\n\r\n.m-header-bottomline {\r\n\theight: 0px;\r\n\twidth: 100%;\r\n\tborder-top: 1px solid #f0eeef;\r\n\tposition: absolute;\r\n\tbottom: 23px;\r\n}"],"sourceRoot":"webpack://"}]);

	// exports
	exports.locals = {
		"m-header": "m-header___FDGle",
		"m-header-topline": "m-header-topline___3tbNo",
		"m-header-inner": "m-header-inner___2Lb2i",
		"m-header-name-img": "m-header-name-img___1aBj5",
		"m-header-bottomline": "m-header-bottomline___3bDYY"
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(19);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _slicedToArray2 = __webpack_require__(20);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _getIterator2 = __webpack_require__(21);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Isomorphic CSS style loader for Webpack
	 *
	 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.txt file in the root directory of this source tree.
	 */

	var prefix = 's';
	var inserted = {};

	// Base64 encoding and decoding - The "Unicode Problem"
	// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
	function b64EncodeUnicode(str) {
	  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
	    return String.fromCharCode('0x' + p1);
	  }));
	}

	/**
	 * Remove style/link elements for specified node IDs
	 * if they are no longer referenced by UI components.
	 */
	function removeCss(ids) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var id = _step.value;

	      if (--inserted[id] <= 0) {
	        var elem = document.getElementById(prefix + id);
	        if (elem) {
	          elem.parentNode.removeChild(elem);
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	/**
	 * Example:
	 *   // Insert CSS styles object generated by `css-loader` into DOM
	 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
	 *
	 *   // Remove it from the DOM
	 *   removeCss();
	 */
	function insertCss(styles) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$replace = _ref.replace,
	      replace = _ref$replace === undefined ? false : _ref$replace,
	      _ref$prepend = _ref.prepend,
	      prepend = _ref$prepend === undefined ? false : _ref$prepend;

	  var ids = [];
	  for (var i = 0; i < styles.length; i++) {
	    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
	        moduleId = _styles$i[0],
	        css = _styles$i[1],
	        media = _styles$i[2],
	        sourceMap = _styles$i[3];

	    var id = moduleId + '-' + i;

	    ids.push(id);

	    if (inserted[id]) {
	      if (!replace) {
	        inserted[id]++;
	        continue;
	      }
	    }

	    inserted[id] = 1;

	    var elem = document.getElementById(prefix + id);
	    var create = false;

	    if (!elem) {
	      create = true;

	      elem = document.createElement('style');
	      elem.setAttribute('type', 'text/css');
	      elem.id = prefix + id;

	      if (media) {
	        elem.setAttribute('media', media);
	      }
	    }

	    var cssText = css;
	    if (sourceMap && btoa) {
	      // skip IE9 and below, see http://caniuse.com/atob-btoa
	      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
	      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
	    }

	    if ('textContent' in elem) {
	      elem.textContent = cssText;
	    } else {
	      elem.styleSheet.cssText = cssText;
	    }

	    if (create) {
	      if (prepend) {
	        document.head.insertBefore(elem, document.head.childNodes[0]);
	      } else {
	        document.head.appendChild(elem);
	      }
	    }
	  }

	  return removeCss.bind(null, ids);
	}

	module.exports = insertCss;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1ODYuNTkgMTI0LjUxIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2VmYjk0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPm5hbWU8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTY1Ny44NSw0MDIuNzFjLTEsMC0zLjQtLjEtMy40LTEuNiwwLTguOSwxLjItMTcuOCwyLjQtMjYuNiwxLjgtMTMuNyw0LjEtMjcuNCw3LjEtNDAuOS0yLjguMy02LjEsMS4xLTguNiwxLjEtMC45LDAtMS42LS4zLTEuNi0xLjMsMC0yLjksMTAuOS0zLjEsMTAuOS0zLjEsMS4xLTQuOSwzLjUtOS41LDkuNi05LjVhMS41NiwxLjU2LDAsMCwxLDEuNiwxLjUsMi4zNiwyLjM2LDAsMCwxLS4yLjgsMzIsMzIsMCwwLDAtMS45LDYuOWMyMC4yLDAsMzQuOCw5LjcsMzQuOCwzMS4zLDAsMjIuNC0zMS44LDM3LjEtNDQuNywzNy4xQzY2My44NSwzOTguNDEsNjYzLjU1LDQwMi43MSw2NTcuODUsNDAyLjcxWm00NS00MmMwLTE2LjktMTMuOC0yNy4xLTI5LjgtMjcuMy0yLjUsMTIuNS00LjcsMjUuMS02LjYsMzcuNy0xLDctMi4yLDE0LjEtMi4yLDIxLjJDNjc1LjU2LDM5Mi4zMSw3MDIuODYsMzgwLjMsNzAyLjg2LDM2MC43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1My43NSAtMzE1LjEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzM4LjM2LDM3NC41di02LjJjMC0uNiwwLTIuMS0xLTIuMS00LjEsMC0xNy45LDI0LjktMjAsMjkuNS0wLjcsMS41LTEuNywzLTMuNiwzYTIsMiwwLDAsMS0yLTIuMmMwLTYuMSw1LjYtMzUsOC4yLTM5LjksMS40LTIuNiw1LTQsNy44LTQsMS41LDAsMi4xLDEsMi4xLDIuNCwwLDIuOC0yLjUsNy44LTMuNiwxMC41YTQ5LjEyLDQ5LjEyLDAsMCwwLTMsMTEuNHMxMC44LTE3LjEsMTYuMi0xNy4xYzMuMiwwLDQuMiw0LjYsNC4yLDcuNWwtMC4yLDE0LjFzLTAuMSw1LjIuOCw1LjJjMC40LDAsMS4yLTEuNCwxLjQtMS44LDIuNC00LDUuMi03LjgsNy45LTExLjYsMy4yLTQuNSw4LjUtMTMuNSwxNC43LTEzLjUsNC4zLDAsNi4yLDQuNiw2LjIsOC4zLDAsNy43LTEuNCwxNS40LTEuNCwyMy4xLDAsMS45LDAsNS40LDIuNyw1LjQsNC41LDAsMTIuMi04LjQsMTQuOC0xMS45LDAuNy0uOSwxLjgtMi42LDMuMS0yLjZzMS40LDEuMiwxLjQsMi4xYTMuODEsMy44MSwwLDAsMS0xLDJjLTMuOSw1LjQtMTQsMTUuNy0yMSwxNS43LTYuNiwwLTYuOS04LjYtNi45LTEzLjQsMC02LC45LTEyLDAuOS0xOC4xLDAtMS4xLDAtNC4xLTEuNy00LjEtNC44LDAtMTcuNywyNC45LTIwLjcsMjkuN2EzLjExLDMuMTEsMCwwLDEtMi43LDEuOEM3MzguNzYsMzk3LjcxLDczOC4zNiwzODMuMyw3MzguMzYsMzc0LjVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjUzLjc1IC0zMTUuMSkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04MDQuMTUsMzk1LjQxYzUuNCwwLDEzLjItMTEuNSwxNi4yLTE2LjIsMC42LS45LDEuNC0yLjEsMi41LTIuMSwxLjMsMCwxLjMsMS4yLDEuMywyLjIsMCwxLjMtMS45LDQtMi43LDUuMS0zLjgsNS40LTEyLjMsMTYtMTkuNCwxNi03LjksMC05LjEtMTEuMy05LjEtMTcuMWE0Ni42Myw0Ni42MywwLDAsMSwyLjEtMTIuM2MxLjItMy42LDMtNi40LDcuMi02LjQsMS41LDAsMi4zLjYsMi4zLDIuMiwwLDIuNy0yLjMsNy42LTMsMTAuNmE0NC4wNSw0NC4wNSwwLDAsMC0uOSw4LjlDODAwLjY1LDM4OC42LDgwMC43NSwzOTUuNDEsODA0LjE1LDM5NS40MVptNC00Mi4zYzAsMi42LTIuMSw1LjMtNC44LDUuM2EzLjUzLDMuNTMsMCwwLDEtMy40LTMuOGMwLTIuNSwyLTUuMyw0LjctNS4zQTMuNjEsMy42MSwwLDAsMSw4MDguMTYsMzUzLjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjUzLjc1IC0zMTUuMSkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04MzEuODUsMzY4LjhjLTEuMiwyLjEtNC4yLDYuMS00LjIsNi4xYTE2LjQyLDE2LjQyLDAsMCwwLS4yLDIuMmMwLDQsLjksMTksNi4zLDE5LDYuMiwwLDEzLjUtMTAuNiwxNi41LTE1LjQsMC41LS45LDEuNS0yLjMsMi42LTIuM2ExLjQ1LDEuNDUsMCwwLDEsMS40LDEuNSw4LDgsMCwwLDEtMS42LDQuMWMtMy44LDYuNC0xMi43LDE4LjItMjAuOCwxOC4yLTEwLjQsMC0xMi40LTIxLjItMTIuNC0yOC43YTk5LjE5LDk5LjE5LDAsMCwxLDEuNy0xOS42LDcuNjEsNy42MSwwLDAsMS0yLjEuMywyLjEyLDIuMTIsMCwwLDEtMi40LTIuNGMwLTIuNywzLTMuMSw1LjEtMy4zLDIuMi03LjIsOC0yNy4xLDE3LjQtMjcuMSw0LjIsMCw0LjUsNiw0LjUsOWE1NS42NCw1NS42NCwwLDAsMS0yLjIsMTUuNyw1Mi40Niw1Mi40NiwwLDAsMSw2LjgtLjgsMS4xNiwxLjE2LDAsMCwxLDEuNCwxLjMsMi4wNSwyLjA1LDAsMCwxLTEuMywxLjljLTEsLjYtNi43LDItOC4yLDIuM0M4MzguNTUsMzU2LjksODM1LjE1LDM2My40LDgzMS44NSwzNjguOFptLTUuMi4zYTY1LjA2LDY1LjA2LDAsMCwwLDguOC0xNy4yYy0yLjQuNS00LjgsMC41LTcuMSwxLjJDODI3LjE1LDM1OC4zLDgyNy4wNSwzNjMuOCw4MjYuNjUsMzY5LjFabTIuMy0yMS40YzIuNy0uNCw1LjUtMC41LDguMi0xLjFhNjMuMTUsNjMuMTUsMCwwLDAsMi44LTE3LjJjMC0uNiwwLTMtMS0zQzgzNC4zNSwzMjYuNCw4MjkuNDUsMzQzLjcsODI5LDM0Ny43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1My43NSAtMzE1LjEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODU5LDM3MC43Yy0yLjEsNS44LTUuMiwxMy40LTkuNiwxNy45YTQuMSw0LjEsMCwwLDEtMi43LDEuNSwxLjIxLDEuMjEsMCwwLDEtMS4zLTEuMywzLjg1LDMuODUsMCwwLDEsLjktMi4yYzMuOC01LjUsNy44LTExLjMsOC42LTE4LjFhMTQsMTQsMCwwLDEtMi42LTguNGMwLTMuMSwxLjktMTEuMiw1LjktMTEuMiwyLjgsMCwzLjMsNS44LDMuMyw3LjhhMzguNjMsMzguNjMsMCwwLDEtLjMsNC44YzMuMSw0LjcsMTEuOSw1LjEsMTEuOSwxNGExNy4zNiwxNy4zNiwwLDAsMS0uNSwzLjksNjEuNDksNjEuNDksMCwwLDAtMiwxNC4xYzAsMS4zLDAsMy43LDEuOSwzLjcsNC42LDAsMTIuOC0xMC40LDE1LjQtMTQuMywwLjYtLjksMS41LTIuMiwyLjYtMi4yczEuNCwxLjEsMS40LDIuMWEzLjg2LDMuODYsMCwwLDEtLjgsMi4xYy0zLjIsNS4yLTEzLjMsMTctMTkuNywxNy02LjYsMC03LTkuMy03LTE0LDAtMy43LjUtNy4zLDAuNS0xMUM4NjQuODUsMzczLjYsODYxLjg1LDM3MS42LDg1OSwzNzAuN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTMuNzUgLTMxNS4xKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTg5MC4zNSw0MjguODFjMC0xMy40LDE1LjktMjYuNiwyNi4yLTMzLjQsMC4xLTEuOS4xLTMuOCwwLjEtNS43LDAtNS4yLS4xLTEwLjMtMC4zLTE1LjUtMy4zLDUuNS0xNi41LDIwLjYtMjMuMSwyMC42LTQuNSwwLTUuNC00LjQtNS40LTgsMC02LDEuNy0xMi4zLDMuNS0xOGEyNC4zLDI0LjMsMCwwLDEsMS4zLTMuOGMwLjgtMS42LDEuOS0yLjgsMy44LTIuOGE0LjI5LDQuMjksMCwwLDEsNC4zLDQuMWMwLDEuNy0xLjUsNC40LTIuMSw2LTEuNCwzLjUtNC4yLDEyLjEtNC4yLDE1LjcsMCwwLjYsMCwyLjEsMSwyLjEsMS42LDAsNS44LTQuMiw3LTUuNCw1LjQtNS41LDkuOC0xMiwxNC42LTE4LjEsMC45LTEuMSwyLTIuOCwzLjYtMi44YTMuNzIsMy43MiwwLDAsMSwyLC43YzEuNiwxLjEsMS42LDguNywxLjYsMTEuMSwwLDE3LjktLjYsMzguNi0xMC40LDUzLjgtMy4zLDUuMS04LjcsMTAuMi0xNS4xLDEwLjJDODkyLjY1LDQzOS42MSw4OTAuMzUsNDM0LjExLDg5MC4zNSw0MjguODFabTQuNCwwLjJjMCwyLjUuNyw2LjQsMy45LDYuNHM2LjMtMy43LDguMS02YzUuMi03LDguNC0yMSw5LjMtMjkuN0M5MDcuNTUsNDA2LjUxLDg5NC43NSw0MTcuMjEsODk0Ljc1LDQyOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTMuNzUgLTMxNS4xKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEwMDYuNjUsMzMyLjJjMC0yLTMuNi0yLTQuOS0yYTM4LjE5LDM4LjE5LDAsMCwwLTYuOC41Yy02LjMsMS4xLTE2LjksNi4zLTE2LjksMTMuOCwwLDEyLjQsMjcuOSwyMiwyNy45LDM3LjcsMCwxNS40LTI0LjIsMTguMy0zNS42LDE4LjNhNDcsNDcsMCwwLDEtNS4zLS4zYy0xLjctLjItNy41LTAuMy03LjUtMi45LDAtMi4yLDEuNC0yLjIsMy4yLTIuMiwzLjMsMCw2LjUsMS4zLDkuOCwxLjMsNy4yLDAsMjguMi0yLjIsMjguMi0xMi4xLDAtMTEuMi0zMC4xLTIwLjYtMzAuMS0zOC42LDAtMTUuOCwyMy41LTE4LjgsMzUuMy0xOC44LDMuNywwLDEwLjguOCwxMC44LDUuOGE5LjQ5LDkuNDksMCwwLDEtMyw2LjdjLTEuOSwxLjgtNi40LDQuNi05LjEsNC42YTIuNDQsMi40NCwwLDAsMS0yLjYtMi41QzEwMDAuMDUsMzM4LjIsMTAwNi42NSwzMzUuMywxMDA2LjY1LDMzMi4yWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1My43NSAtMzE1LjEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTAyMi4xNSw0MDQuMjFjMCwxLjgtLjEsNC43LTIuNiw0LjctMS43LDAtMi4zLTEuMy0yLjYtMi44LTAuOS00LjgtLjktMTEuNS0wLjktMTguMmEyMzUuNDIsMjM1LjQyLDAsMCwxLDMtMzYuNWMxLjQtOSwyLjktMTguMiw1LjYtMjcsMS4yLTQsMy42LTcuNiw4LjItNy42LDEuNywwLDIuNSwxLDIuNSwyLjdhMTMuNDEsMTMuNDEsMCwwLDEtMSw0LjRjLTEuNCwzLjktMi40LDgtNC4yLDE1LjNhMjg5LjY5LDI4OS42OSwwLDAsMC02LjEsMzQuNWM1LjgtNi4xLDEyLjEtMTEuNiwxOC4yLTE3LjQsMC45LS44LDIuMy0yLjQsMy42LTIuNGEyLjM3LDIuMzcsMCwwLDEsMi4xLDIuM2MwLDEuNS0xLjYsMi44LTIuNywzLjctNi45LDUuNi0xMy4zLDExLjctMTkuNywxNy44YTU0LjU0LDU0LjU0LDAsMCwxLDcuNiwzLjksMTMzLDEzMywwLDAsMSwxMi4xLDcuMmMxLjQsMSwzLjEsMi42LDMuMSw0LjUsMCwxLjItMS4yLDEuNC0yLjEsMS40YTcuMDgsNy4wOCwwLDAsMS0zLjEtMWwtMTMuNS03LjFhNDIuMjksNDIuMjksMCwwLDAtNS43LTIuN0ExNDguMjEsMTQ4LjIxLDAsMCwwLDEwMjIuMTUsNDA0LjIxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1My43NSAtMzE1LjEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTA5OC4xNSwzODYuMWMtMy43LDUuMi0xMSwxNC4zLTE4LDE0LjMtNi42LDAtNy40LTEwLjgtNy40LTE1LjUtMi42LDQuMS04LjcsMTMuMi0xNCwxMy4yLTQuOSwwLTYtNi42LTYtMTAuNCwwLTEwLjUsMTAuOS0yOC44LDIyLjYtMjguOCwxLjQsMCwzLjMsMS43LDMuMywzLjFhMS41MiwxLjUyLDAsMCwxLTEsMS4yLDQ0LjI5LDQ0LjI5LDAsMCwwLTkuOCw3LjRjLTUuMiw1LjMtOC41LDEyLjEtOC41LDE5LjYsMCwwLjguMSwyLjQsMS4zLDIuNCw0LjUsMCwxMi45LTE3LjcsMTQuOC0yMS44LDAuNy0xLjUsMS41LTMsMy40LTMsMSwwLDIuMy4zLDIuMywxLjZzLTEuMyw0LjMtMS44LDUuOGEzOC4wOSwzOC4wOSwwLDAsMC0xLjUsMTEuMWMwLDIuMS4xLDkuOCwzLjIsOS44LDQuNywwLDEyLjItOS45LDE0LjktMTMuNSwwLDAsMS40LTIuNSwyLjgtMi41LDEuMiwwLDEuNi44LDEuNiwxLjlTMTA5OC44NSwzODUuMSwxMDk4LjE1LDM4Ni4xWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1My43NSAtMzE1LjEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTA5Ni4zNSwzNzAuNWMwLTEzLjksMi4xLTI3LjksNy42LTQwLjcsMi4xLTQuOCw3LjgtMTQuNywxMy44LTE0LjcsNC43LDAsNiw1LjIsNiw5LDAsMTIuNS02LjUsMzAuMy0xMi41LDQxLjItMS40LDIuNy0zLjIsNS4xLTQuOCw3LjdhMTYuOTEsMTYuOTEsMCwwLDAtMS43LDIuOSwxNi4wNywxNi4wNywwLDAsMC0uNCw0LjRjMCwzLjkuOCwxNS44LDYuMywxNS44LDQuOSwwLDExLjctOC4zLDE0LjItMTIuMmwyLjYtNC4xYTIuNDMsMi40MywwLDAsMSwyLjEtMS40YzEuMSwwLDEuNC45LDEuNCwxLjhhNyw3LDAsMCwxLTEuNCwzLjVsLTAuMS4xYy0zLjksNi41LTEyLjYsMTguMy0yMC45LDE4LjNDMTA5Ny40NSw0MDIuMTEsMTA5Ni4zNSwzNzguMywxMDk2LjM1LDM3MC41Wm0xMy40LTM2LjljLTIuOSw5LjYtNS43LDIwLjYtNS43LDMwLjJhMjcuOTQsMjcuOTQsMCwwLDAsLjEsMi45YzYuNS0xMC45LDE1LjQtMzAuNCwxNS40LTQzLjEsMC0uOSwwLTMuNy0xLjUtMy43QzExMTMuODUsMzE5LjksMTExMC44NSwzMjkuOSwxMTA5Ljc1LDMzMy42WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1My43NSAtMzE1LjEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTE1MC4xNSwzODkuNDFhMTMuMzgsMTMuMzgsMCwwLDEtMi4zLDcuN2M0LjYsMCwxNC0xMC4zLDE2LjYtMTQuMiwwLjYtLjksMS41LTIuMiwyLjYtMi4yczEuNSwxLDEuNSwyYTUuNTcsNS41NywwLDAsMS0uOSwyLjFjLTcuNSwxMS44LTE2LjEsMTguNy0zMC42LDE4LjctMy44LDAtOC45LS41LTExLjgtMy4zYTMuMTMsMy4xMywwLDAsMS0xLjEtMi4yLDEuNDQsMS40NCwwLDAsMSwxLjYtMS41LDYsNiwwLDAsMSwxLjguN2MyLjEsMS42LDQuNSwxLjksNy4xLDEuOSw1LjMsMCw4LjEtMy42LDguMS04LjcsMC02LTMuNy0xNC41LTctMTkuNC0xLjksNS40LTUuOCwxMy42LTkuOCwxNy42LTAuNi42LTEuNiwxLjYtMi42LDEuNmExLjM3LDEuMzcsMCwwLDEtMS40LTEuNCw0LjQ2LDQuNDYsMCwwLDEsMS4yLTIuNiw1OS42OCw1OS42OCwwLDAsMCwxMC4yLTE5LjEsMTUuOTQsMTUuOTQsMCwwLDEtLjktNS4zYzAtMy45LDIuNi0xMS43LDcuNC0xMS43LDIuNSwwLDMuMiwzLjQsMy4yLDUuNGEyOC41OCwyOC41OCwwLDAsMS0yLjMsOS45QzExNDMuOTUsMzczLjEsMTE1MC4xNSwzODAuOCwxMTUwLjE1LDM4OS40MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTMuNzUgLTMxNS4xKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTExNzIuNTUsNDA0LjIxYzAsMS44LS4xLDQuNy0yLjYsNC43LTEuNywwLTIuMy0xLjMtMi42LTIuOC0wLjktNC44LS45LTExLjUtMC45LTE4LjJhMjM1LjQyLDIzNS40MiwwLDAsMSwzLTM2LjVjMS40LTksMi45LTE4LjIsNS42LTI3LDEuMi00LDMuNi03LjYsOC4yLTcuNiwxLjcsMCwyLjUsMSwyLjUsMi43YTEzLjQxLDEzLjQxLDAsMCwxLTEsNC40Yy0xLjQsMy45LTIuNCw4LTQuMiwxNS4zYTI4OS42OSwyODkuNjksMCwwLDAtNi4xLDM0LjVjNS44LTYuMSwxMi4xLTExLjYsMTguMi0xNy40LDAuOS0uOCwyLjMtMi40LDMuNi0yLjRhMi4zNywyLjM3LDAsMCwxLDIuMSwyLjNjMCwxLjUtMS42LDIuOC0yLjcsMy43LTYuOSw1LjYtMTMuMywxMS43LTE5LjcsMTcuOGE1NC41NCw1NC41NCwwLDAsMSw3LjYsMy45LDEzMy4wOCwxMzMuMDgsMCwwLDEsMTIuMSw3LjJjMS40LDEsMy4xLDIuNiwzLjEsNC41LDAsMS4yLTEuMiwxLjQtMi4xLDEuNGE3LjA4LDcuMDgsMCwwLDEtMy4xLTFsLTEzLjUtNy4xYTQyLjI0LDQyLjI0LDAsMCwwLTUuNy0yLjdBMTQ4LjM4LDE0OC4zOCwwLDAsMCwxMTcyLjU1LDQwNC4yMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTMuNzUgLTMxNS4xKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyMDYuNDUsNDI4LjgxYzAtMTMuNCwxNS45LTI2LjYsMjYuMi0zMy40LDAuMS0xLjkuMS0zLjgsMC4xLTUuNywwLTUuMi0uMS0xMC4zLTAuMy0xNS41LTMuMyw1LjUtMTYuNSwyMC42LTIzLjEsMjAuNi00LjUsMC01LjQtNC40LTUuNC04LDAtNiwxLjctMTIuMywzLjUtMThhMjQuMywyNC4zLDAsMCwxLDEuMy0zLjhjMC44LTEuNiwxLjktMi44LDMuOC0yLjhhNC4yOSw0LjI5LDAsMCwxLDQuMyw0LjFjMCwxLjctMS41LDQuNC0yLjEsNi0xLjQsMy41LTQuMiwxMi4xLTQuMiwxNS43LDAsMC42LDAsMi4xLDEsMi4xLDEuNiwwLDUuOC00LjIsNy01LjQsNS40LTUuNSw5LjgtMTIsMTQuNi0xOC4xLDAuOS0xLjEsMi0yLjgsMy42LTIuOGEzLjczLDMuNzMsMCwwLDEsMiwuN2MxLjYsMS4xLDEuNiw4LjcsMS42LDExLjEsMCwxNy45LS42LDM4LjYtMTAuNCw1My44LTMuMyw1LjEtOC43LDEwLjItMTUuMSwxMC4yQzEyMDguNzUsNDM5LjYxLDEyMDYuNDUsNDM0LjExLDEyMDYuNDUsNDI4LjgxWm00LjQsMC4yYzAsMi41LjcsNi40LDMuOSw2LjRzNi4zLTMuNyw4LjEtNmM1LjItNyw4LjQtMjEsOS4zLTI5LjdDMTIyMy42NSw0MDYuNTEsMTIxMC44NSw0MTcuMjEsMTIxMC44NSw0MjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjUzLjc1IC0zMTUuMSkiLz48L3N2Zz4="

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(9);
	var Footer = (function (_super) {
	    __extends(Footer, _super);
	    function Footer() {
	        return _super.apply(this, arguments) || this;
	    }
	    Footer.prototype.render = function () {
	        return React.createElement("div", null, "Footer");
	    };
	    return Footer;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Footer;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(9);
	var Center = (function (_super) {
	    __extends(Center, _super);
	    function Center() {
	        return _super.apply(this, arguments) || this;
	    }
	    Center.prototype.render = function () {
	        return React.createElement("div", null, "Center");
	    };
	    return Center;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Center;


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
		"mainpage.js": "mainpage.js"
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	let path = __webpack_require__(4);
	let colors = __webpack_require__(30);
	let rimraf = __webpack_require__(31);
	let webpack = __webpack_require__(26);
	let postcssAssets = __webpack_require__(32);
	let postcssNext = __webpack_require__(33);
	let ManifestPlugin = __webpack_require__(34);

	let config = {
		devtool: 'eval',

		debug: true,

		resolve: {
			alias: {
				_page: path.resolve(__dirname, "src/Pages"),
				_component: path.resolve(__dirname, "./src/components"),
				_container: path.resolve(__dirname, "./src/containers"),
			},
			root: path.resolve(__dirname),
			modulesDirectories: ["src", "node_modules"],
			extensions: ['', '.ts', '.tsx', '.js', '.jsx']
		},

		entry: {
			mainpage: [
				'webpack-hot-middleware/client?reload=true',
				'./src/mainstyle.css',
				'./src/index.js',
			]
		},

		output: {
			path: path.resolve("./public/assets"),
			publicPath: '/assets/',
			filename: '[name].js',
			pathinfo: true
		},

		module: {
			loaders: [
				{
					test: /\.tsx?$/,
					loader: 'react-hot/webpack!ts'
				},
				{
					test: /\.json$/,
					loader: 'json'
				},
				{
					test: /\.css$/,
					include: [path.resolve('./src'), path.resolve('./node_modules')],
					loaders: [
						'style',
						'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
						'postcss'
					]
				},
				{
					test: /\.eot(\?.*)?$/,
					loader: 'file?name=font/[hash].[ext]'
				},
				{
					test: /\.(woff|woff2)(\?.*)?$/,
					loader: 'file?name=font/[hash].[ext]'
				},
				{
					test: /\.ttf(\?.*)?$/,
					loader: 'url?limit=10000&mimetype=application/octet-stream&name=font/[hash].[ext]'
				},
				{
					test: /\.svg(\?.*)?$/,
					loader: 'url?limit=10000&mimetype=image/svg+xml&name=font/[hash].[ext]'
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					loader: 'url?limit=1000&name=img/[hash].[ext]'
				}
			]
		},

		postcss: function () {
			return [
				postcssNext(),
				postcssAssets({ relative: true })
			];
		},

		plugins: [
			new ManifestPlugin({
				fileName: 'manifest.json'
			}),
			new webpack.DefinePlugin({
				'process.env.BROWSER': JSON.stringify(true),
				'process.env.NODE_ENV': JSON.stringify('development')
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
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
			})
		]
	};


	printLabel("DEVELOPMENT", "green");
	function printLabel(label, color) {
		var size = __webpack_require__(35);
		var w = size.width ? size.width : 31;
		var top = ''; for(var i=1;i<=w;i++){ top += '#'; }
		var center = '#';
		for(var i=1; i<=(w-2);i++){ center += ' '; }
		center += '#';

		var text = '#';
		for(var i=1;i<=(w/2-7);i++){ text += ' '; }
		text += label;
		for(var i=1;i<=(w/2-5);i++){ text += ' '; }
		text += '#';


		console.log(colors[color](top));
		console.log(colors[color](center));
		console.log(colors[color](text));
		console.log(colors[color](center));
		console.log(colors[color](top));
		console.log(colors[color](''));
	}

	module.exports = config;


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("rimraf");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("postcss-assets");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("webpack-manifest-plugin");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("window-size");

/***/ }
/******/ ]);